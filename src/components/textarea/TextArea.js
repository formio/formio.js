import TextFieldComponent from '../textfield/TextField';
import BaseComponent from '../base/Base';

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
      icon: 'fa fa-font',
      documentation: 'http://help.form.io/userguide/#textarea',
      weight: 40,
      schema: TextAreaComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);

    // Never submit on enter for text areas.
    this.options.submitOnEnter = false;
  }

  get defaultSchema() {
    return TextAreaComponent.schema();
  }

  acePlaceholder() {
    if (!this.component.placeholder || !this.editor) {
      return;
    }
    var shouldShow = !this.editor.session.getValue().length;
    var node = this.editor.renderer.emptyMessageNode;
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

  createInput(container) {
    if (!this.component.wysiwyg && !this.component.editor) {
      return super.createInput(container);
    }

    // Add the input.
    this.input = this.ce('div', {
      class: 'formio-wysiwyg-editor'
    });
    container.appendChild(this.input);

    if (this.component.editor === 'ace') {
      this.editorReady = BaseComponent.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.0/ace.js', true)
        .then(() => {
          let mode = this.component.as || 'javascript';
          this.editor = ace.edit(this.input);
          this.editor.on('change', () => {
            this.updateValue(null, this.getConvertedValue(this.editor.getValue()));
          });
          this.editor.getSession().setTabSize(2);
          this.editor.getSession().setMode('ace/mode/' + mode);
          this.editor.on('input', () => this.acePlaceholder());
          setTimeout(() => this.acePlaceholder(), 100);
          return this.editor;
        });
      return this.input;
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
      this.input,
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

    return this.input;
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
    if (!this.component.wysiwyg && !this.component.editor) {
      return super.setValue(this.setConvertedValue(value), flags);
    }

    // Set the value when the editor is ready.
    this.dataValue = value;
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
    if (this.viewOnly) {
      return this.dataValue;
    }

    if (!this.component.wysiwyg && !this.component.editor) {
      return this.getConvertedValue(super.getValue());
    }

    if (this.editor || this.quill) {
      return this.dataValue;
    }

    return this.component.multiple ? [''] : '';
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'textarea';
    if (this.component.rows) {
      info.attr.rows = this.component.rows;
    }
    return info;
  }
}
