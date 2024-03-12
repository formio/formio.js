import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';
import NativePromise from 'native-promise-only';

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
      documentation: '/userguide/#textarea',
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
    if (this.options.readOnly || this.disabled) {
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

    // Keep track of when this editor is ready.
    this.editorsReady[index] = new NativePromise(() => {
      // We don't use WYSIWYG editor for text area
      super.attachElement(element, index);
    });

    return element;
  }

  attach(element) {
    const attached = super.attach(element);
    // Make sure we restore the value after attaching since wysiwygs and readonly texts need an additional set.
    this.restoreValue();
    return attached;
  }

  get isPlain() {
    return (!this.component.wysiwyg && !this.component.editor);
  }

  get htmlView() {
    return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
  }

  setValue(value, flags = {}) {
    if (this.isPlain || this.options.readOnly || this.disabled) {
      value = (this.component.multiple && Array.isArray(value)) ?
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
        this.setContent(this.refs.input[index], this.interpolate(value, {}, true));
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
        if (this.editors[0].editing?.view?.focus) {
          this.editors[0].editing.view.focus();
        }
        this.element.scrollIntoView();
        break;
      }
      case 'ace': {
        this.editors[0].focus();
        this.element.scrollIntoView();
        break;
      }
      case 'quill': {
        this.editors[0].focus();
        break;
      }
    }
  }
}
