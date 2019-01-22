import TextFieldComponent from '../textfield/TextField';
import Formio from '../../Formio';
import _ from 'lodash';

export default class TextAreaComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'textarea',
      label: 'Text Area',
      key: 'textArea',
      rows: 3,
      wysiwyg: false,
      editor: '',
      validate: {
        minWords: '',
        maxWords: ''
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Text Area',
      group: 'basic',
      icon: 'font',
      documentation: 'http://help.form.io/userguide/#textarea',
      weight: 40,
      schema: TextAreaComponent.schema()
    };
  }

  init() {
    super.init();

    // Never submit on enter for text areas.
    this.options.submitOnEnter = false;
  }

  get defaultSchema() {
    return TextAreaComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.type = 'textarea';
    if (this.component.hasOwnProperty('spellcheck')) {
      info.attr.rows = this.component.rows;
    }
    return info;
  }

  get wysiwygDefault() {
    return {
      theme: 'snow',
      placeholder: this.t(this.component.placeholder),
      modules: {
        toolbar: [
          [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'font': [] }],
          ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }, 'clean'],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
          ['blockquote', 'code-block'],
          ['link', 'image', 'video', 'formula', 'source']
        ]
      }
    };
  }

  setupValueElement(element) {
    let value = this.getValue();
    value = this.isEmpty(value) ? this.defaultViewOnlyValue : this.getView(value);
    if (this.component.wysiwyg) {
      value = this.interpolate(value);
    }
    element.innerHTML = value;
  }

  acePlaceholder() {
    if (!this.component.placeholder || !this.editor) {
      return;
    }
    const shouldShow = !this.editor.session.getValue().length;
    let node = this.editor.renderer.emptyMessageNode;
    if (!shouldShow && node) {
      this.editor.renderer.scroller.removeChild(this.editor.renderer.emptyMessageNode);
      this.editor.renderer.emptyMessageNode = null;
    }
    else if (shouldShow && !node) {
      node = this.editor.renderer.emptyMessageNode = this.ce('div');
      node.textContent = this.t(this.component.placeholder);
      node.className = 'ace_invisible ace_emptyMessage';
      node.style.padding = '0 9px';
      this.editor.renderer.scroller.appendChild(node);
    }
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.content = value;
    if (this.options.readOnly || this.disabled) {
      return this.renderTemplate('well', {
        children: value,
        nestedKey: this.key,
        value
      });
    }
    return this.renderTemplate('input', {
      input: info,
      value,
      index
    });
  }

  attachElement(element, index) {
    if (this.options.readOnly) {
      return element;
    }
    // Normalize the configurations.
    if (this.component.wysiwyg && this.component.wysiwyg.toolbarGroups) {
      console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
      this.component.wysiwyg = this.wysiwygDefault;
    }
    if (!this.component.wysiwyg || (typeof this.component.wysiwyg === 'boolean')) {
      this.component.wysiwyg = this.wysiwygDefault;
    }

    const settings = _.isEmpty(this.component.wysiwyg) ? this.wysiwygDefault : this.component.wysiwyg;
    const mode = this.component.as || 'javascript';

    // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
    switch (this.component.editor) {
      case 'ace':
        this.editorReady = Formio.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', true)
          .then((editor) => {
            this.editor = editor.edit(element);
            this.editor.setOptions({
              maxLines: 12,
              minLines: 12
            });
            this.editor.on('change', () => {
              const newValue = this.getConvertedValue(this.editor.getValue());
              // Do not bother to update if they are both empty.
              if (!_.isEmpty(newValue) || !_.isEmpty(this.dataValue)) {
                this.updateValue(null, newValue, index);
              }
            });
            this.editor.getSession().setTabSize(2);
            this.editor.getSession().setMode(`ace/mode/${mode}`);
            this.editor.on('input', () => this.acePlaceholder());
            setTimeout(() => this.acePlaceholder(), 100);
            return this.editor;
          });
        break;
      case 'quill':
        Formio.requireLibrary(`quill-css-${settings.theme}`, 'Quill', [
          { type: 'styles', src: `https://cdn.quilljs.com/1.3.6/quill.${settings.theme}.css` }
         ], true);

        this.editorReady = Formio.requireLibrary('quill', 'Quill', 'https://cdn.quilljs.com/1.3.6/quill.min.js', true)
          .then((Editor) => {
            this.editor = new Editor(element, settings);

            this.editor.root.spellcheck = this.component.spellcheck;

            /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
            const txtArea = document.createElement('textarea');
            txtArea.setAttribute('class', 'quill-source-code');
            this.editor.addContainer('ql-custom').appendChild(txtArea);
            const qlSource = element.parentNode.querySelector('.ql-source');
            if (qlSource) {
              this.addEventListener(qlSource, 'click', (event) => {
                event.preventDefault();
                if (txtArea.style.display === 'inherit') {
                  this.editor.setContents(this.editor.clipboard.convert(txtArea.value));
                }
                txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
              });
            }
            /** END CODEBLOCK **/

              // Allows users to skip toolbar items when tabbing though form
            const elm = document.querySelectorAll('.ql-formats > button');
            for (let i = 0; i < elm.length; i++) {
              elm[i].setAttribute('tabindex', '-1');
            }

            if (this.options.readOnly || this.disabled) {
              this.editor.disable();
            }

            this.editor.on('text-change', () => {
              this.updateValue(null, this.getConvertedValue(this.editor.root.innerHTML));
            });

            return this.editor;
          });
        break;
      case 'ckeditor':
        this.editorReady = Formio.requireLibrary('ckeditor', 'ClassicEditor', 'https://cdn.ckeditor.com/ckeditor5/11.2.0/classic/ckeditor.js', true)
          .then((ClassicEditor) => {
            ClassicEditor.create(element, settings).then(editor => {
              editor.model.document.on('change', () => this.updateValue(null, editor.data.get()));
              this.editor = editor;
            });
            return this.editor;
          });
        break;
      default:
        this.addEventListener(element, this.inputInfo.changeEvent, () => {
          this.updateValue(null, element.value, index);
        });
    }

    return element;
  }

  get isPlain() {
    return (!this.component.wysiwyg || !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && this.component.wysiwyg;
  }

  setConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && value) {
      try {
        value = JSON.stringify(value, null, 2);
      }
      catch (err) {
        console.warn(err);
      }
    }
    return value;
  }

  isEmpty(value) {
    if (this.component.editor === 'quill') {
      return (!value || (value === '<p><br></p>'));
    }
    else {
      return super.isEmpty(value);
    }
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.editor === 'quill' && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  setValue(value, flags) {
    //should set value if new value is not equal to current
    let shouldSetValue = !_.isEqual(value, this.getValue());
    //should set value if is in read only mode
    shouldSetValue = shouldSetValue || this.options.readOnly;
    if (!shouldSetValue) {
      return;
    }
    value = value || '';
    if (this.isPlain) {
      return super.setValue(this.setConvertedValue(value), flags);
    }

    if (!this.editorReady) {
      return value;
    }

    // Set the value when the editor is ready.
    this.dataValue = value;

    if (this.htmlView) {
      // For HTML view, just view the contents.
      this.input.innerHTML = this.interpolate(value);
    }
    else if (this.editorReady) {
      this.editorReady.then((editor) => {
        switch (this.component.editor) {
          case 'ace':
            editor.setValue(this.setConvertedValue(value));
            break;
          case 'quill':
            editor.setContents(editor.clipboard.convert(this.setConvertedValue(value)));
            break;
          case 'ckeditor':
            super.setValue(this.setConvertedValue(value), flags);
            break;
          default:
        }
      });
    }
  }

  getConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && value) {
      try {
        value = JSON.parse(value);
      }
      catch (err) {
        console.warn(err);
      }
    }
    return value;
  }

  getValue() {
    if (this.viewOnly || this.htmlView || this.options.readOnly) {
      return this.dataValue;
    }

    if (this.isPlain) {
      return this.getConvertedValue(super.getValue());
    }

    if (this.editor) {
      return this.dataValue;
    }

    return this.component.multiple ? [''] : '';
  }
}
