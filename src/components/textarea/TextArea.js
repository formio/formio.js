/* global ace, Quill */
import TextFieldComponent from '../textfield/TextField';
import Formio from '../../Formio';
import _ from 'lodash';
import { uniqueName } from '../../utils/utils';

export default class TextAreaComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'textarea',
      label: 'Text Area',
      key: 'textArea',
      rows: 3,
      wysiwyg: false,
      editor: '',
      inputFormat: 'html',
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
      weight: 20,
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
    info.type = this.component.wysiwyg ? 'div' : 'textarea';
    if (this.component.rows) {
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
    if (element) {
      this.setContent(element, value);
    }
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
    // Editors work better on divs.
    if (this.component.editor || this.component.wysiwyg) {
      return '<div ref="input"></div>';
    }

    return this.renderTemplate('input', {
      input: info,
      value,
      index
    });
  }

  /**
   * Updates the editor value.
   *
   * @param newValue
   */
  updateEditorValue(newValue) {
    newValue = this.getConvertedValue(this.removeBlanks(newValue));
    if ((newValue !== this.dataValue) && (!_.isEmpty(newValue) || !_.isEmpty(this.dataValue))) {
      this.updateValue({
        modified: true
      }, newValue);
    }
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

    if (this.component.wysiwyg && !this.component.editor) {
      this.component.editor = 'ckeditor';
    }

    let settings = _.isEmpty(this.component.wysiwyg) ? this.wysiwygDefault : this.component.wysiwyg;
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
            this.editor.on('change', () => this.updateEditorValue(this.editor.getValue()));
            this.editor.getSession().setTabSize(2);
            this.editor.getSession().setMode(`ace/mode/${mode}`);
            this.editor.on('input', () => this.acePlaceholder());
            setTimeout(() => this.acePlaceholder(), 100);
            this.editor.setValue(this.setConvertedValue(this.dataValue));
            return this.editor;
          });
        break;
      case 'quill':
        // Add the quill editor.
        this.editorReady = this.addQuill(
          element,
          settings, () => this.updateEditorValue(this.quill.root.innerHTML)
        ).then((quill) => {
          this.editor = quill;
          if (this.options.readOnly || this.component.disabled) {
            this.editor.disable();
          }

          this.editor.setContents(this.editor.clipboard.convert(this.setConvertedValue(this.dataValue)));
          return quill;
        }).catch(err => console.warn(err));
        break;
      case 'ckeditor':
        settings = settings || {};
        settings.base64Upload = true;
        this.editorReady = this.addCKE(element, settings, (newValue) => this.updateEditorValue(newValue))
          .then((editor) => {
            this.editor = editor;
            if (this.options.readOnly || this.component.disabled) {
              this.editor.isReadOnly = true;
            }
            const numRows = parseInt(this.component.rows, 10);
            if (_.isFinite(numRows) && _.has(editor, 'ui.view.editable.editableElement')) {
              // Default height is 21px with 10px margin + a 14px top margin.
              const editorHeight = (numRows * 31) + 14;
              editor.ui.view.editable.editableElement.style.height = `${(editorHeight)}px`;
            }
            editor.data.set(this.setConvertedValue(this.dataValue));
            return editor;
          });
        break;
      default:
        this.addEventListener(element, this.inputInfo.changeEvent, () => {
          this.updateValue(null, null, index);
        });
    }

    return element;
  }

  imageHandler() {
    let fileInput = this.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        const range = this.editor.getSelection(true);

        if (!files || !files.length) {
          console.warn('No files selected');
          return;
        }

        this.editor.enable(false);
        const { uploadStorage, uploadUrl, uploadOptions, uploadDir } = this.component;
        this.root.formio
          .uploadFile(
            uploadStorage,
            files[0],
            uniqueName(files[0].name),
            uploadDir || '', //should pass empty string if undefined
            null,
            uploadUrl,
            uploadOptions
          )
          .then((result) => {
            return this.root.formio.downloadFile(result);
          })
          .then(result => {
            this.editor.enable(true);
            const Delta = Quill.import('delta');
            this.editor.updateContents(new Delta()
              .retain(range.index)
              .delete(range.length)
              .insert({ image: result.url })
              , Quill.sources.USER);
            fileInput.value = '';
          }).catch(error => {
            console.warn('Quill image upload failed');
            console.warn(error);
            this.editor.enable(true);
          });
      });
      this.container.appendChild(fileInput);
    }
    fileInput.click();
  }

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && this.component.wysiwyg;
  }
  /* eslint-enable max-statements */

  setConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && !_.isNil(value)) {
      try {
        value = JSON.stringify(value, null, 2);
      }
      catch (err) {
        console.warn(err);
      }
    }

    if (!_.isString(value)) {
      value = '';
    }

    return value;
  }

  removeBlanks(value) {
    if (!value) {
      return value;
    }
    const removeBlanks = function(input) {
      if (typeof input !== 'string') {
        return input;
      }
      return input.replace(/<p>&nbsp;<\/p>|<p><br><\/p>|<p><br>&nbsp;<\/p>/g, '');
    };

    if (Array.isArray(value)) {
      value.forEach((input, index) => {
        value[index] = removeBlanks(input);
      });
    }
    else {
      value = removeBlanks(value);
    }
    return value;
  }

  hasChanged(before, after) {
    return super.hasChanged(this.removeBlanks(before), this.removeBlanks(after));
  }

  isEmpty(value) {
    return super.isEmpty(this.removeBlanks(value));
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.editor === 'quill' && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  setValue(value, flags) {
    const shouldSetValue = !_.isEqual(value, this.getValue());
    value = value || '';
    if (this.isPlain) {
      return super.setValue(this.setConvertedValue(value), flags);
    }

    // Set the value when the editor is ready.
    const newValue = (value === undefined || value === null) ? this.getValue() : value;
    const changed = (newValue !== undefined) ? this.hasChanged(newValue, this.dataValue) : false;
    this.dataValue = newValue;

    if (this.htmlView) {
      // For HTML view, just view the contents.
      if (this.input) {
        this.setContent(this.input, this.interpolate(value));
      }
    }
    else if (this.editorReady) {
      this.editorReady.then((editor) => {
        switch (this.component.editor) {
          case 'ace':
            if (shouldSetValue) {
              editor.setValue(this.setConvertedValue(value));
            }
            break;
          case 'quill':
            if (shouldSetValue) {
              editor.setContents(editor.clipboard.convert(this.setConvertedValue(value)));
            }
            break;
          case 'ckeditor':
            if (shouldSetValue) {
              editor.data.set(this.setConvertedValue(value));
            }
            break;
        }
        this.updateValue(flags);
      });
    }

    // Update on change.
    this.updateOnChange(flags, changed);

    // Return if the value has changed.
    return changed;
  }

  getConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && value) {
      try {
        value = JSON.parse(value);
      }
      catch (err) {
        // console.warn(err);
      }
    }
    return value;
  }

  destroy() {
    if (this.editorReady) {
      this.editorReady.then((editor) => editor.destroy());
    }
    return super.destroy();
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

    return this.component.multiple ? [] : '';
  }
}
