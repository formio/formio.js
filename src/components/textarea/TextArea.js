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

    this.wysiwygRendered = false;
    // Never submit on enter for text areas.
    this.options.submitOnEnter = false;
  }

  get defaultSchema() {
    return TextAreaComponent.schema();
  }

  show(show, noClear) {
    if (show && !this.wysiwygRendered) {
      this.enableWysiwyg();
      this.setWysiwygValue(this.dataValue);
      this.wysiwygRendered = true;
    }
    else if (!show && this.wysiwygRendered) {
      this.destroyWysiwyg();
      this.wysiwygRendered = false;
    }

    return super.show(show, noClear);
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

  /**
   * Updates the editor value.
   *
   * @param newValue
   */
  updateEditorValue(newValue) {
    newValue = this.getConvertedValue(this.removeBlanks(newValue));
    if ((newValue !== this.dataValue) && (!_.isEmpty(newValue) || !_.isEmpty(this.dataValue))) {
      this.updateValue({
        modified: !this.autoModified
      }, newValue);
    }
    this.autoModified = false;
  }

  /* eslint-disable max-statements */
  createInput(container) {
    if (this.options.readOnly) {
      this.input = this.ce('div', {
        class: 'well'
      });
      container.appendChild(this.input);
      return this.input;
    }
    else if (this.isPlain) {
      return super.createInput(container);
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

    return this.input;
  }
  /* eslint-enable max-statements */

  enableWysiwyg() {
    if (this.isPlain || this.options.readOnly || this.options.htmlView) {
      return;
    }

    if (this.component.editor === 'ace') {
      this.editorReady = Formio.requireLibrary('ace', 'ace', 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.4.1/ace.js', true)
        .then(() => {
          const mode = this.component.as || 'javascript';
          this.editor = ace.edit(this.input);
          this.editor.on('change', () => this.updateEditorValue(this.editor.getValue()));
          this.editor.getSession().setTabSize(2);
          this.editor.getSession().setMode(`ace/mode/${mode}`);
          this.editor.on('input', () => this.acePlaceholder());
          setTimeout(() => this.acePlaceholder(), 100);
          return this.editor;
        });
      return this.input;
    }

    if (this.component.editor === 'ckeditor') {
      this.editorReady = this.addCKE(this.input, null, (newValue) => this.updateEditorValue(newValue))
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
      this.component.wysiwyg, () => this.updateEditorValue(this.quill.root.innerHTML)
    ).then((quill) => {
      if (this.component.isUploadEnabled) {
        const _this = this;
        quill.getModule('toolbar').addHandler('image', function() {
          //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
          //we also need current component instance as we use some fields and methods from it as well
          _this.imageHandler.call(_this, this);
        } );
      }
      quill.root.spellcheck = this.component.spellcheck;
      if (this.options.readOnly || this.component.disabled) {
        quill.disable();
      }

      return quill;
    }).catch(err => console.warn(err));
  }

  destroyWysiwyg() {
    if (this.editor) {
      this.editor.destroy();
    }
  }

  imageHandler(quillInstance) {
    let fileInput = quillInstance.container.querySelector('input.ql-image[type=file]');

    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.classList.add('ql-image');
      fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        const range = quillInstance.quill.getSelection(true);

        if (!files || !files.length) {
          console.warn('No files selected');
          return;
        }

        quillInstance.quill.enable(false);
        const { uploadStorage, uploadUrl, uploadOptions, uploadDir } = this.component;
        let requestData;
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
          .then(result => {
            requestData = result;
            return this.root.formio.downloadFile(result);
          })
          .then(result => {
            quillInstance.quill.enable(true);
            const Delta = Quill.import('delta');
            quillInstance.quill.updateContents(new Delta()
                .retain(range.index)
                .delete(range.length)
                .insert(
                  {
                    image: result.url
                  },
                  {
                    alt: JSON.stringify(requestData),
                  })
              , Quill.sources.USER);
            fileInput.value = '';
          }).catch(error => {
          console.warn('Quill image upload failed');
          console.warn(error);
          quillInstance.quill.enable(true);
        });
      });
      quillInstance.container.appendChild(fileInput);
    }
    fileInput.click();
  }

  setWysiwygValue(value, skipSetting) {
    if (this.isPlain || this.options.readOnly || this.options.htmlView) {
      return;
    }

    if (this.editorReady) {
      this.editorReady.then((editor) => {
        this.autoModified = true;
        if (!skipSetting) {
          if (this.component.editor === 'ace') {
            editor.setValue(this.setConvertedValue(value));
          }
          else if (this.component.editor === 'ckeditor') {
            editor.data.set(this.setConvertedValue(value));
          }
          else {
            if (this.component.isUploadEnabled) {
              this.setAsyncConvertedValue(value)
                .then(result => {
                  editor.setContents(editor.clipboard.convert(result));
                });
            }
            else {
              editor.setContents(editor.clipboard.convert(this.setConvertedValue(value)));
            }
          }
        }
      });
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

    if (!_.isString(value)) {
      value = '';
    }

    return value;
  }

  setAsyncConvertedValue(value) {
    if (this.component.as && this.component.as === 'json' && value) {
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

    const htmlDoc = new DOMParser().parseFromString(value,'text/html');
    const images = htmlDoc.getElementsByTagName('img');
    if (images.length) {
      return this.setImagesUrl(images)
        .then( () => {
          value = htmlDoc.getElementsByTagName('body')[0].firstElementChild;
          return new XMLSerializer().serializeToString(value);
        });
    }
    else {
      return Promise.resolve(value);
    }
  }

  setImagesUrl(images) {
    return Promise.all(_.map(images, image => {
      let requestData;
      try {
        requestData = JSON.parse(image.getAttribute('alt'));
      }
      catch (error) {
        console.warn(error);
      }

      return this.root.formio.downloadFile(requestData)
        .then((result) => {
          image.setAttribute('src', result.url);
        });
    }));
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
    if (this.component.wysiwyg && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  setValue(value, flags) {
    const skipSetting = _.isEqual(value, this.getValue());
    value = value || '';
    if (this.options.readOnly || this.htmlView) {
      // For readOnly, just view the contents.
      if (this.input) {
        if (Array.isArray(value)) {
          value = value.join('<br/><br/>');
        }
        this.input.innerHTML = this.interpolate(value);
      }
      this.dataValue = value;
      return;
    }
    else if (this.isPlain) {
      value = Array.isArray(value) ? value.map((val) => this.setConvertedValue(val)) : this.setConvertedValue(value);
      return super.setValue(value, flags);
    }

    // Set the value when the editor is ready.
    this.dataValue = value;

    this.setWysiwygValue(value, skipSetting, flags);
    this.updateValue(flags);
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

    return this.dataValue;
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
