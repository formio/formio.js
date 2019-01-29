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

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && this.component.wysiwyg;
  }

  createInput(container) {
    const _this = this;
    if (this.isPlain) {
      if (this.options.readOnly) {
        this.input = this.ce('div', {
          class: 'well'
        });
        container.appendChild(this.input);
        return this.input;
      }
      else {
        return super.createInput(container);
      }
    }

    if (this.htmlView) {
      this.input = this.ce('div', {
        class: 'well'
      });
      container.appendChild(this.input);
      return this.input;
    }

    // Add the input.
    this.input = this.ce('div', {
      class: 'formio-wysiwyg-editor'
    });
    container.appendChild(this.input);
    this.addCounter(container);

    if (this.component.editor === 'ace') {
      this.editorReady = Formio.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', true)
        .then(() => {
          const mode = this.component.as || 'javascript';
          this.editor = ace.edit(this.input);
          this.editor.on('change', () => {
            const newValue = this.getConvertedValue(this.editor.getValue());
            // Do not bother to update if they are both empty.
            if (!_.isEmpty(newValue) || !_.isEmpty(this.dataValue)) {
              this.updateValue(null, newValue);
            }
          });
          this.editor.getSession().setTabSize(2);
          this.editor.getSession().setMode(`ace/mode/${mode}`);
          this.editor.on('input', () => this.acePlaceholder());
          setTimeout(() => this.acePlaceholder(), 100);
          return this.editor;
        });
      return this.input;
    }

    if (this.component.editor === 'ckeditor') {
      this.editorReady = this.addCKE(this.input, null, (newValue) => this.updateValue(null, newValue)).then((editor) => {
        this.editor = editor;
        if (this.options.readOnly || this.component.disabled) {
          this.editor.isReadOnly = true;
        }

        // Set the default rows.
        let value = '';
        const numRows = parseInt(this.component.rows, 10);
        for (let i = 0; i < numRows; i++) {
          value += '<p></p>';
        }
        editor.data.set(value);
        return editor;
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
      if (this.component.isUploadEnabled) {
        quill.getModule('toolbar').addHandler('image', imageHandler);
      }
      quill.root.spellcheck = this.component.spellcheck;
      if (this.options.readOnly || this.component.disabled) {
        quill.disable();
      }

      return quill;
    }).catch(err => console.warn(err));

    return this.input;

    function imageHandler() {
      let fileInput = this.container.querySelector('input.ql-image[type=file]');

      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', () => {
          const files = fileInput.files;
          const range = this.quill.getSelection(true);

          if (!files || !files.length) {
            console.warn('No files selected');
            return;
          }

          this.quill.enable(false);
          const { uploadStorage, uploadUrl, uploadOptions, uploadDir } = _this.component;
          _this.root.formio
            .uploadFile(
              uploadStorage,
              files[0],
              uniqueName(files[0].name),
              uploadDir || '', //should pass empty string if undefined
              null,
              uploadUrl,
              uploadOptions
            )
            .then(result => {
              return _this.root.formio.downloadFile(result);
            })
            .then(result => {
              this.quill.enable(true);
              const Delta = Quill.import('delta');
              this.quill.updateContents(new Delta()
                  .retain(range.index)
                  .delete(range.length)
                  .insert({ image: result.url })
                , Quill.sources.USER);
              fileInput.value = '';
            }).catch(error => {
            console.warn('Quill image upload failed');
            console.warn(error);
            this.quill.enable(true);
          });
        });
        this.container.appendChild(fileInput);
      }
      fileInput.click();
    }
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
      if (this.options.readOnly) {
        // For readOnly, just view the contents.
        if (this.input) {
          this.input.innerHTML = this.interpolate(value);
        }
        this.dataValue = value;
        return;
      }
      else {
        return super.setValue(this.setConvertedValue(value), flags);
      }
    }

    // Set the value when the editor is ready.
    this.dataValue = value;

    if (this.htmlView) {
      // For HTML view, just view the contents.
      if (this.input) {
        this.input.innerHTML = this.interpolate(value);
      }
    }
    else if (this.editorReady) {
      this.editorReady.then((editor) => {
        if (this.component.editor === 'ace') {
          editor.setValue(this.setConvertedValue(value));
        }
        else if (this.component.editor === 'ckeditor') {
          editor.data.set(this.setConvertedValue(value));
          this.updateValue(flags);
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
    if (this.viewOnly || this.htmlView || this.options.readOnly) {
      return this.dataValue;
    }

    if (this.isPlain) {
      return this.getConvertedValue(super.getValue());
    }

    if (this.editor || this.quill) {
      return this.dataValue;
    }

    return this.component.multiple ? [] : '';
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
