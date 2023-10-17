/* global Quill */
import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';
import NativePromise from 'native-promise-only';
import { uniqueName, getBrowserInfo } from '../../utils/utils';

export default class TextAreaComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'textarea',
      label: 'Text Area',
      key: 'textArea',
      rows: 3,
      wysiwyg: false,
      editor: '',
      fixedSize: true,
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
      documentation: '/userguide/form-building/form-components#text-area',
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
    return !this.isJsonValue;
  }

  renderElement(value, index) {
    const info = this.inputInfo;
    info.attr = info.attr || {};
    info.content = value;
    if ((this.options.readOnly || this.disabled) && !this.isHtmlRenderMode()) {
      const elementStyle = this.info.attr.style || '';
      const children = `<div ref="input" class="formio-editor-read-only-content" ${elementStyle ? `style='${elementStyle}'` : ''}></div>`;

      return this.renderTemplate('well', {
        children,
        nestedKey: this.key,
        value
      });
    }

    return this.renderTemplate('input', {
      prefix: this.prefix,
      suffix: this.suffix,
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
    newValue = this.getConvertedValue(this.trimBlanks(newValue));
    const dataValue = this.dataValue;
    if (this.component.multiple && Array.isArray(dataValue)) {
      const newArray = _.clone(dataValue);
      newArray[index] = newValue;
      newValue = newArray;
    }

    if ((!_.isEqual(newValue, dataValue)) && (!_.isEmpty(newValue) || !_.isEmpty(dataValue))) {
      this.updateValue(newValue, {
        modified: !this.autoModified
      }, index);
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

    let settings = _.isEmpty(this.component.wysiwyg) ?
      this.wysiwygDefault[this.component.editor] || this.wysiwygDefault.default
      : this.component.wysiwyg;

    // Keep track of when this editor is ready.
    this.editorsReady[index] = new NativePromise((editorReady) => {
      // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
      switch (this.component.editor) {
        case 'ace':
          if (!settings) {
            settings = {};
          }
          settings.mode = this.component.as ? `ace/mode/${this.component.as}` : 'ace/mode/javascript';
          this.addAce(element, settings, (newValue) => this.updateEditorValue(index, newValue)).then((ace) => {
            this.editors[index] = ace;
            let dataValue = this.dataValue;
            dataValue = (this.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
            ace.setValue(this.setConvertedValue(dataValue, index));
            editorReady(ace);
            return ace;
          }).catch(err => console.warn(err));
          break;
        case 'quill':
          // Normalize the configurations for quill.
          if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
            console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
            settings = this.wysiwygDefault.quill;
          }

          // Add the quill editor.
          this.addQuill(
            element,
            settings, () => this.updateEditorValue(index, this.editors[index].root.innerHTML)
          ).then((quill) => {
            this.editors[index] = quill;
            if (this.component.isUploadEnabled) {
              const _this = this;
              quill.getModule('uploader').options.handler = function(...args) {
                //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
                //we also need current component instance as we use some fields and methods from it as well
                _this.imageHandler.call(_this, this, ...args);
              };
            }
            quill.root.spellcheck = this.component.spellcheck;
            if (this.options.readOnly || this.disabled) {
              quill.disable();
            }

            let dataValue = this.dataValue;
            dataValue = (this.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
            quill.setContents(quill.clipboard.convert({ html: this.setConvertedValue(dataValue, index) }));
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
              let dataValue = this.dataValue;
              dataValue = (this.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
              const value = this.setConvertedValue(dataValue, index);
              const isReadOnly = this.options.readOnly || this.disabled;
              // Use ckeditor 4 in IE browser
              if (getBrowserInfo().ie) {
                editor.on('instanceReady', () => {
                  editor.setReadOnly(isReadOnly);
                  editor.setData(value);
                });
              }
              else {
                const numRows = parseInt(this.component.rows, 10);

                if (_.isFinite(numRows) && _.has(editor, 'ui.view.editable.editableElement')) {
                  // Default height is 21px with 10px margin + a 14px top margin.
                  const editorHeight = (numRows * 31) + 14;
                  editor.ui.view.editable.editableElement.style.height = `${(editorHeight)}px`;
                }
                editor.isReadOnly = isReadOnly;
                editor.data.set(value);
              }

              editorReady(editor);
              return editor;
            });
          break;
        default:
          super.attachElement(element, index);
          break;
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

  imageHandler(moduleInstance, range, files) {
    const quillInstance = moduleInstance.quill;

    if (!files || !files.length) {
      console.warn('No files selected');
      return;
    }

    quillInstance.enable(false);
    const { uploadStorage, uploadUrl, uploadOptions, uploadDir, fileKey } = this.component;
    let requestData;
    this.fileService
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
        return this.fileService.downloadFile(result);
      })
      .then(result => {
        quillInstance.enable(true);
        const Delta = Quill.import('delta');
        quillInstance.updateContents(new Delta()
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
      }).catch(error => {
      console.warn('Quill image upload failed');
      console.warn(error);
      quillInstance.enable(true);
    });
  }

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
  }

  setValueAt(index, value, flags = {}) {
    super.setValueAt(index, value, flags);

    if (this.editorsReady[index]) {
      const setEditorsValue = (flags) => (editor) => {
        if (!flags.skipWysiwyg) {
          this.autoModified = true;
          switch (this.component.editor) {
            case 'ace':
              editor.setValue(this.setConvertedValue(value, index));
              break;
            case 'quill':
              if (this.component.isUploadEnabled) {
                this.setAsyncConvertedValue(value)
                  .then(result => {
                    const content = editor.clipboard.convert({ html: result });
                    editor.setContents(content);
                  });
              }
              else {
                const convertedValue = this.setConvertedValue(value, index);
                const content = editor.clipboard.convert({ html: convertedValue });
                editor.setContents(content);
              }
              break;
            case 'ckeditor':
              editor.data.set(this.setConvertedValue(value, index));
              break;
          }
        }
      };

      this.editorsReady[index].then(setEditorsValue(_.clone(flags)));
    }
  }

  setValue(value, flags = {}) {
    if (this.isPlain || this.options.readOnly || this.disabled) {
      value = (this.component.multiple && Array.isArray(value)) ?
        value.map((val, index) => this.setConvertedValue(val, index)) :
        this.setConvertedValue(value);
      return super.setValue(value, flags);
    }
    flags.skipWysiwyg = value === '' && flags.resetValue ? false : _.isEqual(value, this.getValue());
    return super.setValue(value, flags);
  }

  setContent(element, content, forceSanitize) {
    super.setContent(element, content, forceSanitize, {
      addAttr: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
      addTags: ['iframe'],
    });
  }

  setReadOnlyValue(value, index) {
    index = index || 0;
    if (this.options.readOnly || this.disabled) {
      if (this.refs.input && this.refs.input[index]) {
        if (this.component.inputFormat === 'plain') {
          this.refs.input[index].innerText = this.isPlain ? value : this.interpolate(value, {}, { noeval: true });
        }
        else {
          this.setContent(this.refs.input[index], this.isPlain ? value : this.interpolate(value, {}, { noeval: true }), this.shouldSanitizeValue);
        }
      }
    }
  }

  get isJsonValue() {
    return this.component.as && this.component.as === 'json';
  }

  setConvertedValue(value, index) {
    if (this.isJsonValue && !_.isNil(value)) {
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
    if (this.isJsonValue && value) {
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
          value = htmlDoc.getElementsByTagName('body')[0].innerHTML;
          return value;
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

      return this.fileService.downloadFile(requestData)
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

  trimBlanks(value) {
    if (!value || this.isPlain) {
      return value;
    }

    const trimBlanks = (value) => {
      const nbsp = '<p>&nbsp;</p>';
      const br = '<p><br></p>';
      const brNbsp = '<p><br>&nbsp;</p>';
      const regExp = new RegExp(`^${nbsp}|${nbsp}$|^${br}|${br}$|^${brNbsp}|${brNbsp}$`, 'g');
      return typeof value === 'string' ? value.replace(regExp, '') : value;
    };

    if (Array.isArray(value)) {
      value.forEach((input, index) => {
        value[index] = trimBlanks(input);
      });
    }
    else {
      value = trimBlanks(value);
    }
    return value;
  }

  onChange(flags, fromRoot) {
    const changed = super.onChange(flags, fromRoot);
    this.updateSizes.forEach(updateSize => updateSize());
    return changed;
  }

  hasChanged(newValue, oldValue) {
    return super.hasChanged(this.trimBlanks(newValue), this.trimBlanks(oldValue));
  }

  isEmpty(value = this.dataValue) {
    return super.isEmpty(this.trimBlanks(value));
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (this.component.editor === 'quill' && !defaultValue) {
      defaultValue = '<p><br></p>';
    }
    return defaultValue;
  }

  getConvertedValue(value) {
    if (this.isJsonValue && value) {
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
    super.detach();
  }

  getValue() {
    if (this.isPlain) {
      return this.getConvertedValue(super.getValue());
    }

    return this.dataValue;
  }

  focus() {
    super.focus();
    switch (this.component.editor) {
      case 'ckeditor': {
        // Wait for the editor to be ready.
        this.editorsReady[0]?.then(() => {
          if (this.editors[0].editing?.view?.focus) {
            this.editors[0].editing.view.focus();
          }
          this.element.scrollIntoView();
        }).catch((err) => {
          console.warn('An editor did not initialize properly when trying to focus:', err);
        });
        break;
      }
      case 'ace': {
        this.editorsReady[0]?.then(() => {
          this.editors[0].focus();
          this.element.scrollIntoView();
        }).catch((err) => {
          console.warn('An editor did not initialize properly when trying to focus:', err);
        });
        break;
      }
      case 'quill': {
        this.editorsReady[0]?.then(() => {
          this.editors[0].focus();
        }).catch((err) => {
          console.warn('An editor did not initialize properly when trying to focus:', err);
        });
        break;
      }
    }
  }
}
