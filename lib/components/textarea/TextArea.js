"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TextField = _interopRequireDefault(require("../textfield/TextField"));

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TextAreaComponent =
/*#__PURE__*/
function (_TextFieldComponent) {
  _inherits(TextAreaComponent, _TextFieldComponent);

  function TextAreaComponent() {
    _classCallCheck(this, TextAreaComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(TextAreaComponent).apply(this, arguments));
  }

  _createClass(TextAreaComponent, [{
    key: "init",
    value: function init() {
      var _this2 = this;

      _get(_getPrototypeOf(TextAreaComponent.prototype), "init", this).call(this);

      this.editorReady = new _nativePromiseOnly.default(function (resolve) {
        _this2.editorReadyResolve = resolve;
      }); // Never submit on enter for text areas.

      this.options.submitOnEnter = false;
    }
  }, {
    key: "setupValueElement",
    value: function setupValueElement(element) {
      var value = this.getValue();
      value = this.isEmpty(value) ? this.defaultViewOnlyValue : this.getValueAsString(value);

      if (this.component.wysiwyg) {
        value = this.interpolate(value);
      }

      if (element) {
        this.setContent(element, value);
      }
    }
  }, {
    key: "acePlaceholder",
    value: function acePlaceholder() {
      if (!this.component.placeholder || !this.editor) {
        return;
      }

      var shouldShow = !this.editor.session.getValue().length;
      var node = this.editor.renderer.emptyMessageNode;

      if (!shouldShow && node) {
        this.editor.renderer.scroller.removeChild(this.editor.renderer.emptyMessageNode);
        this.editor.renderer.emptyMessageNode = null;
      } else if (shouldShow && !node) {
        node = this.editor.renderer.emptyMessageNode = this.ce('div');
        node.textContent = this.t(this.component.placeholder);
        node.className = 'ace_invisible ace_emptyMessage';
        node.style.padding = '0 9px';
        this.editor.renderer.scroller.appendChild(node);
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      var info = this.inputInfo;
      info.attr = info.attr || {};
      info.content = value;

      if (this.options.readOnly || this.disabled) {
        return this.renderTemplate('well', {
          children: value,
          nestedKey: this.key,
          value: value
        });
      } // Editors work better on divs.


      if (this.component.editor || this.component.wysiwyg) {
        return '<div ref="input"></div>';
      }

      return this.renderTemplate('input', {
        input: info,
        value: value,
        index: index
      });
    }
  }, {
    key: "updateEditorValue",

    /**
     * Updates the editor value.
     *
     * @param newValue
     */
    value: function updateEditorValue(newValue) {
      newValue = this.getConvertedValue(this.removeBlanks(newValue));

      if (newValue !== this.dataValue && (!_lodash.default.isEmpty(newValue) || !_lodash.default.isEmpty(this.dataValue))) {
        this.updateValue(newValue, {
          modified: !this.autoModified
        });
      }

      this.autoModified = false;
    }
  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this3 = this;

      if (this.autoExpand && (this.isPlain || this.options.readOnly || this.options.htmlView)) {
        element.childNodes.forEach(function (element) {
          if (element.nodeName === 'TEXTAREA') {
            _this3.addAutoExpanding(element);
          }
        });
      }

      if (this.options.readOnly) {
        return element;
      }

      if (this.component.wysiwyg && !this.component.editor) {
        this.component.editor = 'ckeditor';
      }

      var settings = _lodash.default.isEmpty(this.component.wysiwyg) ? this.wysiwygDefault : this.component.wysiwyg; // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.

      switch (this.component.editor) {
        case 'ace':
          if (!settings) {
            settings = {};
          }

          settings.mode = this.component.as || 'javascript';
          this.addAce(element, settings, function (newValue) {
            return _this3.updateEditorValue(newValue);
          }).then(function (ace) {
            _this3.editor = ace;

            _this3.editor.on('input', function () {
              return _this3.acePlaceholder();
            });

            _this3.editor.setValue(_this3.setConvertedValue(_this3.dataValue));

            setTimeout(function () {
              _this3.acePlaceholder();
            }, 100);

            _this3.editorReadyResolve(ace);

            return ace;
          }).catch(function (err) {
            return console.warn(err);
          });
          break;

        case 'quill':
          // Normalize the configurations for quill.
          if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
            console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
            settings = this.wysiwygDefault;
          } // Add the quill editor.


          this.addQuill(element, settings, function () {
            return _this3.updateEditorValue(_this3.editor.root.innerHTML);
          }).then(function (quill) {
            _this3.editor = quill;

            if (_this3.component.isUploadEnabled) {
              var _this = _this3;
              quill.getModule('toolbar').addHandler('image', function () {
                //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
                //we also need current component instance as we use some fields and methods from it as well
                _this.imageHandler.call(_this, this);
              });
            }

            quill.root.spellcheck = _this3.component.spellcheck;

            if (_this3.options.readOnly || _this3.component.disabled) {
              _this3.editor.disable();
            }

            _this3.editor.setContents(_this3.editor.clipboard.convert(_this3.setConvertedValue(_this3.dataValue)));

            _this3.editorReadyResolve(_this3.editor);

            return quill;
          }).catch(function (err) {
            return console.warn(err);
          });
          break;

        case 'ckeditor':
          settings = settings || {};
          settings.rows = this.component.rows;
          this.addCKE(element, settings, function (newValue) {
            return _this3.updateEditorValue(newValue);
          }).then(function (editor) {
            _this3.editor = editor;

            if (_this3.options.readOnly || _this3.component.disabled) {
              _this3.editor.isReadOnly = true;
            }

            var numRows = parseInt(_this3.component.rows, 10);

            if (_lodash.default.isFinite(numRows) && _lodash.default.has(editor, 'ui.view.editable.editableElement')) {
              // Default height is 21px with 10px margin + a 14px top margin.
              var editorHeight = numRows * 31 + 14;
              editor.ui.view.editable.editableElement.style.height = "".concat(editorHeight, "px");
            }

            editor.data.set(_this3.setConvertedValue(_this3.dataValue));

            _this3.editorReadyResolve(_this3.editor);

            return editor;
          });
          break;

        default:
          this.addEventListener(element, this.inputInfo.changeEvent, function () {
            _this3.updateValue(null, {
              modified: true
            }, index);
          });
      }

      return element;
    }
  }, {
    key: "imageHandler",
    value: function imageHandler(quillInstance) {
      var _this4 = this;

      var fileInput = quillInstance.container.querySelector('input.ql-image[type=file]');

      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.classList.add('ql-image');
        fileInput.addEventListener('change', function () {
          var files = fileInput.files;
          var range = quillInstance.quill.getSelection(true);

          if (!files || !files.length) {
            console.warn('No files selected');
            return;
          }

          quillInstance.quill.enable(false);
          var _this4$component = _this4.component,
              uploadStorage = _this4$component.uploadStorage,
              uploadUrl = _this4$component.uploadUrl,
              uploadOptions = _this4$component.uploadOptions,
              uploadDir = _this4$component.uploadDir;
          var requestData;

          _this4.root.formio.uploadFile(uploadStorage, files[0], (0, _utils.uniqueName)(files[0].name), uploadDir || '', //should pass empty string if undefined
          null, uploadUrl, uploadOptions).then(function (result) {
            requestData = result;
            return _this4.root.formio.downloadFile(result);
          }).then(function (result) {
            quillInstance.quill.enable(true);
            var Delta = Quill.import('delta');
            quillInstance.quill.updateContents(new Delta().retain(range.index).delete(range.length).insert({
              image: result.url
            }, {
              alt: JSON.stringify(requestData)
            }), Quill.sources.USER);
            fileInput.value = '';
          }).catch(function (error) {
            console.warn('Quill image upload failed');
            console.warn(error);
            quillInstance.quill.enable(true);
          });
        });
        quillInstance.container.appendChild(fileInput);
      }

      fileInput.click();
    }
  }, {
    key: "setWysiwygValue",

    /* eslint-enable max-statements */
    value: function setWysiwygValue(value, skipSetting) {
      var _this5 = this;

      if (this.htmlView) {
        // For HTML view, just view the contents.
        if (this.input) {
          this.setContent(this.input, this.interpolate(value));
        }
      } else if (this.editorReady) {
        return this.editorReady.then(function (editor) {
          _this5.autoModified = true;

          if (!skipSetting) {
            switch (_this5.component.editor) {
              case 'ace':
                editor.setValue(_this5.setConvertedValue(value));
                break;

              case 'quill':
                if (_this5.component.isUploadEnabled) {
                  _this5.setAsyncConvertedValue(value).then(function (result) {
                    editor.setContents(editor.clipboard.convert(result));
                  });
                } else {
                  editor.setContents(editor.clipboard.convert(_this5.setConvertedValue(value)));
                }

                break;

              case 'ckeditor':
                editor.data.set(_this5.setConvertedValue(value));
                break;
            }
          }
        });
      }

      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "setConvertedValue",
    value: function setConvertedValue(value) {
      if (this.component.as && this.component.as === 'json' && !_lodash.default.isNil(value)) {
        try {
          value = JSON.stringify(value, null, 2);
        } catch (err) {
          console.warn(err);
        }
      }

      if (!_lodash.default.isString(value)) {
        value = '';
      }

      return value;
    }
  }, {
    key: "setAsyncConvertedValue",
    value: function setAsyncConvertedValue(value) {
      if (this.component.as && this.component.as === 'json' && value) {
        try {
          value = JSON.stringify(value, null, 2);
        } catch (err) {
          console.warn(err);
        }
      }

      if (!_lodash.default.isString(value)) {
        value = '';
      }

      var htmlDoc = new DOMParser().parseFromString(value, 'text/html');
      var images = htmlDoc.getElementsByTagName('img');

      if (images.length) {
        return this.setImagesUrl(images).then(function () {
          value = htmlDoc.getElementsByTagName('body')[0].firstElementChild;
          return new XMLSerializer().serializeToString(value);
        });
      } else {
        return _nativePromiseOnly.default.resolve(value);
      }
    }
  }, {
    key: "setImagesUrl",
    value: function setImagesUrl(images) {
      var _this6 = this;

      return _nativePromiseOnly.default.all(_lodash.default.map(images, function (image) {
        var requestData;

        try {
          requestData = JSON.parse(image.getAttribute('alt'));
        } catch (error) {
          console.warn(error);
        }

        return _this6.root.formio.downloadFile(requestData).then(function (result) {
          image.setAttribute('src', result.url);
        });
      }));
    }
  }, {
    key: "addAutoExpanding",
    value: function addAutoExpanding(textarea) {
      var heightOffset = null;
      var previousHeight = null;

      var changeOverflow = function changeOverflow(value) {
        var width = textarea.style.width;
        textarea.style.width = '0px';
        textarea.offsetWidth;
        textarea.style.width = width;
        textarea.style.overflowY = value;
      };

      var preventParentScroll = function preventParentScroll(element, changeSize) {
        var nodeScrolls = [];

        while (element && element.parentNode && element.parentNode instanceof Element) {
          if (element.parentNode.scrollTop) {
            nodeScrolls.push({
              node: element.parentNode,
              scrollTop: element.parentNode.scrollTop
            });
          }

          element = element.parentNode;
        }

        changeSize();
        nodeScrolls.forEach(function (nodeScroll) {
          nodeScroll.node.scrollTop = nodeScroll.scrollTop;
        });
      };

      var resize = function resize() {
        if (textarea.scrollHeight === 0) {
          return;
        }

        preventParentScroll(textarea, function () {
          textarea.style.height = '';
          textarea.style.height = "".concat(textarea.scrollHeight + heightOffset, "px");
        });
      };

      var update = _lodash.default.debounce(function () {
        resize();
        var styleHeight = Math.round(parseFloat(textarea.style.height));
        var computed = window.getComputedStyle(textarea, null);
        var currentHeight = textarea.offsetHeight;

        if (currentHeight < styleHeight && computed.overflowY === 'hidden') {
          changeOverflow('scroll');
        } else if (computed.overflowY !== 'hidden') {
          changeOverflow('hidden');
        }

        resize();
        currentHeight = textarea.offsetHeight;

        if (previousHeight !== currentHeight) {
          previousHeight = currentHeight;
          update();
        }
      }, 200);

      var computedStyle = window.getComputedStyle(textarea, null);
      textarea.style.resize = 'none';
      heightOffset = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth) || 0;

      if (window) {
        this.addEventListener(window, 'resize', update);
      }

      this.addEventListener(textarea, 'input', update);
      this.on('initialized', update);
      this.updateSize = update;
      update();
    }
  }, {
    key: "removeBlanks",
    value: function removeBlanks(value) {
      if (!value) {
        return value;
      }

      var removeBlanks = function removeBlanks(input) {
        if (typeof input !== 'string') {
          return input;
        }

        return input.replace(/<p>&nbsp;<\/p>|<p><br><\/p>|<p><br>&nbsp;<\/p>/g, '').trim();
      };

      if (Array.isArray(value)) {
        value.forEach(function (input, index) {
          value[index] = removeBlanks(input);
        });
      } else {
        value = removeBlanks(value);
      }

      return value;
    }
  }, {
    key: "onChange",
    value: function onChange(flags, fromRoot) {
      var changed = _get(_getPrototypeOf(TextAreaComponent.prototype), "onChange", this).call(this, flags, fromRoot);

      if (this.updateSize) {
        this.updateSize();
      }

      return changed;
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(newValue, oldValue) {
      return _get(_getPrototypeOf(TextAreaComponent.prototype), "hasChanged", this).call(this, this.removeBlanks(newValue), this.removeBlanks(oldValue));
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      return _get(_getPrototypeOf(TextAreaComponent.prototype), "isEmpty", this).call(this, this.removeBlanks(value));
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this7 = this;

      var skipSetting = _lodash.default.isEqual(value, this.getValue());

      value = value || '';

      if (this.isPlain) {
        value = Array.isArray(value) ? value.map(function (val) {
          return _this7.setConvertedValue(val);
        }) : this.setConvertedValue(value);
        return _get(_getPrototypeOf(TextAreaComponent.prototype), "setValue", this).call(this, value, flags);
      } // Set the value when the editor is ready.


      var newValue = value === undefined || value === null ? this.getValue() : value;
      var changed = newValue !== undefined ? this.hasChanged(newValue, this.dataValue) : false;

      if (changed) {
        this.setWysiwygValue(newValue, skipSetting, function () {
          return _this7.updateOnChange(flags, changed);
        });
      }

      return changed;
    }
  }, {
    key: "getConvertedValue",
    value: function getConvertedValue(value) {
      if (this.component.as && this.component.as === 'json' && value) {
        try {
          value = JSON.parse(value);
        } catch (err) {// console.warn(err);
        }
      }

      return value;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.editorReady) {
        this.editorReady.then(function (editor) {
          if (editor.destroy) {
            return editor.destroy();
          }
        });
      }

      if (this.updateSize) {
        this.removeEventListener(window, 'resize', this.updateSize);
      }

      return _get(_getPrototypeOf(TextAreaComponent.prototype), "destroy", this).call(this);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.isPlain) {
        return this.getConvertedValue(_get(_getPrototypeOf(TextAreaComponent.prototype), "getValue", this).call(this));
      }

      return this.dataValue;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TextAreaComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(TextAreaComponent.prototype), "inputInfo", this);

      info.type = this.component.wysiwyg ? 'div' : 'textarea';

      if (this.component.rows) {
        info.attr.rows = this.component.rows;
      }

      return info;
    }
  }, {
    key: "autoExpand",
    get: function get() {
      return this.component.autoExpand;
    }
  }, {
    key: "isPlain",
    get: function get() {
      return !this.component.wysiwyg && !this.component.editor;
    }
  }, {
    key: "htmlView",
    get: function get() {
      return this.options.readOnly && this.component.wysiwyg;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(TextAreaComponent.prototype), "defaultValue", this);

      if (this.component.editor === 'quill' && !defaultValue) {
        defaultValue = '<p><br></p>';
      }

      return defaultValue;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _TextField.default.schema.apply(_TextField.default, [{
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
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Text Area',
        group: 'basic',
        icon: 'font',
        documentation: 'http://help.form.io/userguide/#textarea',
        weight: 20,
        schema: TextAreaComponent.schema()
      };
    }
  }]);

  return TextAreaComponent;
}(_TextField.default);

exports.default = TextAreaComponent;