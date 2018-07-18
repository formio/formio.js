/* global ace */
import TextFieldComponent from '../textfield/TextField';
import Formio from '../../Formio';

export default class TextAreaComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'textarea',
      label: 'Text Area',
      key: 'textArea',
      rows: 3,
      wysiwyg: false,
      editor: ''
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
    return this.renderTemplate('input', {
      input: info,
      index
    });
  }

  attachElement(element, index) {
    if (this.isPlain) {
      this.addEventListener(this.refs.input[index], this.inputInfo.changeEvent, () => this.updateValue());
      return;
    }

    // if (this.htmlView) {
    //   this.input = this.ce('div', {
    //     class: 'well'
    //   });
    //   container.appendChild(this.input);
    //   return this.input;
    // }

    if (this.component.editor === 'ace') {
      this.editorReady = Formio.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.3/ace.js', true)
        .then(() => {
          const mode = this.component.as || 'javascript';
          this.editor = ace.edit(element);
          this.editor.on('change', () => {
            this.updateValue(null, this.getConvertedValue(this.editor.getValue()));
          });
          this.editor.getSession().setTabSize(2);
          this.editor.getSession().setMode(`ace/mode/${mode}`);
          this.editor.on('input', () => this.acePlaceholder());
          setTimeout(() => this.acePlaceholder(), 100);
          return this.editor;
        });
      return this.refs.input[index];
    }

    // Normalize the configurations.
    if (this.component.wysiwyg && this.component.wysiwyg.toolbarGroups) {
      console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
      this.component.wysiwyg = this.wysiwygDefault;
      this.emit('componentEdit', this);
    }
    if (!this.component.wysiwyg || (typeof this.component.wysiwyg === 'boolean')) {
      this.component.wysiwyg = this.wysiwygDefault;
      this.emit('componentEdit', this);
    }

    // Add the quill editor.
    this.editorReady = this.addQuill(
      this.refs.input[index],
      this.component.wysiwyg, () => {
        this.updateValue(null, this.getConvertedValue(this.quill.root.innerHTML));
      }
    ).then((quill) => {
      quill.root.spellcheck = this.component.spellcheck;
      if (this.options.readOnly || this.component.disabled) {
        quill.disable();
      }

      return quill;
    });

    return this.refs.input[index];
  }

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && this.component.wysiwyg;
  }

  setConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && value) {
      try {
        value = JSON.stringify(value);
      }
      catch (err) {
        console.warn(err);
      }
    }
    return value;
  }

  isEmpty(value) {
    if (this.quill) {
      return (!value || (value === '<p><br></p>'));
    }
    else {
      return super.isEmpty(value);
    }
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.wysiwyg && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  setValue(value, flags) {
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
        if (this.component.editor === 'ace') {
          editor.setValue(this.setConvertedValue(value));
        }
        else {
          editor.setContents(editor.clipboard.convert(this.setConvertedValue(value)));
          this.updateValue(flags);
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
    if (this.viewOnly || this.htmlView) {
      return this.dataValue;
    }

    if (this.isPlain) {
      return this.getConvertedValue(super.getValue());
    }

    if (this.editor || this.quill) {
      return this.dataValue;
    }

    return this.component.multiple ? [''] : '';
  }
}
