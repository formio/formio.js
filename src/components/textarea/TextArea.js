/* global Quill */
import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
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
    this.editors = [];
    this.editorsReady = [];
    this.updateSizes = [];

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

  validateMultiple() {
    return !this.component.as === 'json';
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.content = value;
    if (this.options.readOnly || this.disabled) {
      return this.renderTemplate('well', {
        children: '<div ref="input"></div>',
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

  get autoExpand() {
    return this.component.autoExpand;
  }

  /**
   * Updates the editor value.
   *
   * @param newValue
   */
  updateEditorValue(index, newValue) {
    newValue = this.getConvertedValue(this.removeBlanks(newValue));
    const dataValue = this.dataValue;
    if (Array.isArray(dataValue)) {
      const newArray = _.clone(dataValue);
      newArray[index] = newValue;
      newValue = newArray;
    }

    if ((!_.isEqual(newValue, dataValue)) && (!_.isEmpty(newValue) || !_.isEmpty(dataValue))) {
      this.updateValue(newValue, {
        modified: !this.autoModified
      });
    }
    this.autoModified = false;
  }

  attachElement(element, index) {
    if (this.autoExpand && (this.isPlain || this.options.readOnly || this.options.htmlView)) {
      if (element.nodeName === 'TEXTAREA') {
        this.addAutoExpanding(element, index);
      }
    }

    if (this.options.readOnly) {
      return element;
    }

    if (this.component.wysiwyg && !this.component.editor) {
      this.component.editor = 'ckeditor';
    }

    let settings = _.isEmpty(this.component.wysiwyg) ? this.wysiwygDefault : this.component.wysiwyg;

    // Keep track of when this editor is ready.
    this.editorsReady[index] = new NativePromise((editorReady) => {
      // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
      switch (this.component.editor) {
        case 'ace':
          if (!settings) {
            settings = {};
          }
          settings.mode = this.component.as || 'javascript';
          this.addAce(element, settings, (newValue) => this.updateEditorValue(index, newValue)).then((ace) => {
            this.editors[index] = ace;
            ace.on('input', () => this.acePlaceholder());
            let dataValue = this.dataValue;
            dataValue = Array.isArray(dataValue) ? dataValue[index] : dataValue;
            ace.setValue(this.setConvertedValue(dataValue, index));
            if (this.component.placeholder) {
              setTimeout(() => {
                const shouldShow = !ace.session.getValue().length;
                let node = ace.renderer.emptyMessageNode;
                if (!shouldShow && node) {
                  ace.renderer.scroller.removeChild(ace.renderer.emptyMessageNode);
                  ace.renderer.emptyMessageNode = null;
                }
                else if (shouldShow && !node) {
                  node = ace.renderer.emptyMessageNode = this.ce('div');
                  node.textContent = this.t(this.component.placeholder);
                  node.className = 'ace_invisible ace_emptyMessage';
                  node.style.padding = '0 9px';
                  ace.renderer.scroller.appendChild(node);
                }
              }, 100);
            }
            editorReady(ace);
            return ace;
          }).catch(err => console.warn(err));
          break;
        case 'quill':
          // Normalize the configurations for quill.
          if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
            console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
            settings = this.wysiwygDefault;
          }

          // Add the quill editor.
          this.addQuill(
            element,
            settings, () => this.updateEditorValue(index, this.editors[index].root.innerHTML)
          ).then((quill) => {
            this.editors[index] = quill;
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

            let dataValue = this.dataValue;
            dataValue = Array.isArray(dataValue) ? dataValue[index] : dataValue;
            quill.setContents(quill.clipboard.convert(this.setConvertedValue(dataValue, index)));
            editorReady(quill);
            return quill;
          }).catch(err => console.warn(err));
          break;
        case 'ckeditor':
          settings = settings || {};
          settings.rows = this.component.rows;
          this.addCKE(element, settings, (newValue) => this.updateEditorValue(index, newValue))
            .then((editor) => {
              this.editors[index] = editor;
              if (this.options.readOnly || this.component.disabled) {
                editor.isReadOnly = true;
              }
              const numRows = parseInt(this.component.rows, 10);
              if (_.isFinite(numRows) && _.has(editor, 'ui.view.editable.editableElement')) {
                // Default height is 21px with 10px margin + a 14px top margin.
                const editorHeight = (numRows * 31) + 14;
                editor.ui.view.editable.editableElement.style.height = `${(editorHeight)}px`;
              }
              let dataValue = this.dataValue;
              dataValue = Array.isArray(dataValue) ? dataValue[index] : dataValue;
              editor.data.set(this.setConvertedValue(dataValue, index));
              editorReady(editor);
              return editor;
            });
          break;
        case 'tiny':
          if (!settings) {
            settings = {};
          }
          settings.mode = this.component.as || 'javascript';
          this.addTiny(element, settings, (newValue) => this.updateEditorValue(newValue))
            .then((tiny) => {
              this.editors[index] = tiny;
              tiny.setContent(this.setConvertedValue(this.dataValue));
              editorReady(tiny);
              return tiny;
            }).catch(err => console.warn(err));
          break;
        default:
          super.attachElement(element, index);
          this.addEventListener(element, this.inputInfo.changeEvent, () => {
            this.updateValue(null, {
              modified: true
            }, index);
          });
      }
    });

    return element;
  }

  attach(element) {
    const attached = super.attach(element);
    // Make sure we restore the value after attaching since wysiwygs and readonly texts need an additional set.
    this.restoreValue();
    return attached;
  }

  imageHandler(quillInstance) {
    let fileInput = quillInstance.container.querySelector('input.ql-image[type=file]');
    if (fileInput == null) {
      fileInput = document.createElement('input');
      fileInput.setAttribute('type', 'file');
      fileInput.setAttribute('accept', 'image/*');
      fileInput.classList.add('ql-image');
      this.addEventListener(fileInput, 'change', () => {
        const files = fileInput.files;
        const range = quillInstance.quill.getSelection(true);

        if (!files || !files.length) {
          console.warn('No files selected');
          return;
        }

        quillInstance.quill.enable(false);
        const { uploadStorage, uploadUrl, uploadOptions, uploadDir, fileKey } = this.component;
        let requestData;
        this.root.formio
          .uploadFile(
            uploadStorage,
            files[0],
            uniqueName(files[0].name),
            uploadDir || '', //should pass empty string if undefined
            null,
            uploadUrl,
            uploadOptions,
            fileKey
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

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
  }

  setValueAt(index, value, flags) {
    super.setValueAt(index, value, flags);
    if (this.editorsReady[index]) {
      this.editorsReady[index].then((editor) => {
        this.autoModified = true;
        if (!flags.skipWysiwyg) {
          switch (this.component.editor) {
            case 'ace':
              editor.setValue(this.setConvertedValue(value, index));
              break;
            case 'quill':
              if (this.component.isUploadEnabled) {
                this.setAsyncConvertedValue(value)
                  .then(result => {
                    editor.setContents(editor.clipboard.convert(result));
                  });
              }
              else {
                editor.setContents(editor.clipboard.convert(this.setConvertedValue(value, index)));
              }
              break;
            case 'ckeditor':
              editor.data.set(this.setConvertedValue(value, index));
              break;
            case 'tiny':
              editor.setContent(this.setConvertedValue(value));
              break;
          }
        }
      });
    }
  }

  setValue(value, flags) {
    flags = flags || {};
    if (this.isPlain || this.options.readOnly || this.disabled) {
      value = Array.isArray(value) ?
        value.map((val, index) => this.setConvertedValue(val, index)) :
        this.setConvertedValue(value);
      return super.setValue(value, flags);
    }
    flags.skipWysiwyg = _.isEqual(value, this.getValue());
    return super.setValue(value, flags);
  }

  setReadOnlyValue(value, index) {
    index = index || 0;
    if (this.options.readOnly || this.disabled) {
      if (this.refs.input && this.refs.input[index]) {
        this.setContent(this.refs.input[index], this.interpolate(value));
      }
    }
  }

  setConvertedValue(value, index) {
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

    this.setReadOnlyValue(value, index);
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
      return NativePromise.resolve(value);
    }
  }

  setImagesUrl(images) {
    return NativePromise.all(_.map(images, image => {
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

  addAutoExpanding(textarea, index) {
    let heightOffset = null;
    let previousHeight = null;

    const changeOverflow = (value) => {
      const width = textarea.style.width;

      textarea.style.width = '0px';
      textarea.offsetWidth;
      textarea.style.width = width;

      textarea.style.overflowY = value;
    };

    const preventParentScroll = (element, changeSize) => {
      const nodeScrolls = [];

      while (element && element.parentNode && element.parentNode instanceof Element) {
        if (element.parentNode.scrollTop) {
          nodeScrolls.push({
            node: element.parentNode,
            scrollTop: element.parentNode.scrollTop,
          });
        }
        element = element.parentNode;
      }

      changeSize();

      nodeScrolls.forEach((nodeScroll) => {
        nodeScroll.node.scrollTop = nodeScroll.scrollTop;
      });
    };

    const resize = () => {
      if (textarea.scrollHeight === 0) {
        return;
      }

      preventParentScroll(textarea, () => {
        textarea.style.height = '';
        textarea.style.height = `${textarea.scrollHeight + heightOffset}px`;
      });
    };

    const update = _.debounce(() => {
      resize();
      const styleHeight = Math.round(parseFloat(textarea.style.height));
      const computed = window.getComputedStyle(textarea, null);
      let currentHeight = textarea.offsetHeight;
      if (currentHeight < styleHeight && computed.overflowY === 'hidden') {
        changeOverflow('scroll');
      }
      else if (computed.overflowY !== 'hidden') {
        changeOverflow('hidden');
      }

      resize();
      currentHeight = textarea.offsetHeight;
      if (previousHeight !== currentHeight) {
        previousHeight = currentHeight;
        update();
      }
    }, 200);
    const computedStyle = window.getComputedStyle(textarea, null);

    textarea.style.resize = 'none';
    heightOffset = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth) || 0;

    if (window) {
      this.addEventListener(window, 'resize', update);
    }

    this.addEventListener(textarea, 'input', update);
    this.on('initialized', update);
    this.updateSizes[index] = update;
    update();
  }

  removeBlanks(value) {
    if (!value) {
      return value;
    }
    const removeBlanks = function(input) {
      if (typeof input !== 'string') {
        return input;
      }
      return input.replace(/<p>&nbsp;<\/p>|<p><br><\/p>|<p><br>&nbsp;<\/p>/g, '').trim();
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

  onChange(flags, fromRoot) {
    const changed = super.onChange(flags, fromRoot);
    this.updateSizes.forEach(updateSize => updateSize());
    return changed;
  }

  hasChanged(newValue, oldValue) {
    return super.hasChanged(this.removeBlanks(newValue), this.removeBlanks(oldValue));
  }

  isEmpty(value = this.dataValue) {
    return super.isEmpty(this.removeBlanks(value));
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.editor === 'quill' && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
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

  detach() {
    // Destroy all editors.
    this.editors.forEach(editor => {
      if (editor.destroy) {
        editor.destroy();
      }
    });
    this.editors = [];
    this.editorsReady = [];
    this.updateSizes.forEach(updateSize => this.removeEventListener(window, 'resize', updateSize));
    this.updateSizes = [];
  }

  getValue() {
    if (this.isPlain) {
      return this.getConvertedValue(super.getValue());
    }

    return this.dataValue;
  }
}
