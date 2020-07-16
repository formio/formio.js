"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var TextAreaComponent = /*#__PURE__*/function (_TextFieldComponent) {
  _inherits(TextAreaComponent, _TextFieldComponent);

  var _super = _createSuper(TextAreaComponent);

  function TextAreaComponent() {
    _classCallCheck(this, TextAreaComponent);

    return _super.apply(this, arguments);
  }

  _createClass(TextAreaComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(TextAreaComponent.prototype), "init", this).call(this);

      this.editors = [];
      this.editorsReady = [];
      this.updateSizes = []; // Never submit on enter for text areas.

      this.options.submitOnEnter = false;
    }
  }, {
    key: "validateMultiple",
    value: function validateMultiple() {
      return !this.isJsonValue;
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      var info = this.inputInfo;
      info.attr = info.attr || {};
      info.content = value;

      if (this.options.readOnly || this.disabled) {
        return this.renderTemplate('well', {
          children: '<div ref="input"></div>',
          nestedKey: this.key,
          value: value
        });
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
    value: function updateEditorValue(index, newValue) {
      newValue = this.getConvertedValue(this.removeBlanks(newValue));
      var dataValue = this.dataValue;

      if (this.component.multiple && Array.isArray(dataValue)) {
        var newArray = _lodash.default.clone(dataValue);

        newArray[index] = newValue;
        newValue = newArray;
      }

      if (!_lodash.default.isEqual(newValue, dataValue) && (!_lodash.default.isEmpty(newValue) || !_lodash.default.isEmpty(dataValue))) {
        this.updateValue(newValue, {
          modified: !this.autoModified
        }, index);
      }

      this.autoModified = false;
    }
  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this2 = this;

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

      var settings = _lodash.default.isEmpty(this.component.wysiwyg) ? this.wysiwygDefault[this.component.editor] || this.wysiwygDefault.default : this.component.wysiwyg; // Keep track of when this editor is ready.

      this.editorsReady[index] = new _nativePromiseOnly.default(function (editorReady) {
        // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
        switch (_this2.component.editor) {
          case 'ace':
            if (!settings) {
              settings = {};
            }

            settings.mode = _this2.component.as;

            _this2.addAce(element, settings, function (newValue) {
              return _this2.updateEditorValue(index, newValue);
            }).then(function (ace) {
              _this2.editors[index] = ace;
              var dataValue = _this2.dataValue;
              dataValue = _this2.component.multiple && Array.isArray(dataValue) ? dataValue[index] : dataValue;
              ace.setValue(_this2.setConvertedValue(dataValue, index));
              editorReady(ace);
              return ace;
            }).catch(function (err) {
              return console.warn(err);
            });

            break;

          case 'quill':
            // Normalize the configurations for quill.
            if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
              console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
              settings = _this2.wysiwygDefault.quill;
            } // Add the quill editor.


            _this2.addQuill(element, settings, function () {
              return _this2.updateEditorValue(index, _this2.editors[index].root.innerHTML);
            }).then(function (quill) {
              _this2.editors[index] = quill;

              if (_this2.component.isUploadEnabled) {
                var _this = _this2;
                quill.getModule('toolbar').addHandler('image', function () {
                  //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
                  //we also need current component instance as we use some fields and methods from it as well
                  _this.imageHandler.call(_this, this);
                });
              }

              quill.root.spellcheck = _this2.component.spellcheck;

              if (_this2.options.readOnly || _this2.component.disabled) {
                quill.disable();
              }

              var dataValue = _this2.dataValue;
              dataValue = _this2.component.multiple && Array.isArray(dataValue) ? dataValue[index] : dataValue;
              quill.setContents(quill.clipboard.convert({
                html: _this2.setConvertedValue(dataValue, index)
              }));
              editorReady(quill);
              return quill;
            }).catch(function (err) {
              return console.warn(err);
            });

            break;

          case 'ckeditor':
            settings = settings || {};
            settings.rows = _this2.component.rows;

            _this2.addCKE(element, settings, function (newValue) {
              return _this2.updateEditorValue(index, newValue);
            }).then(function (editor) {
              _this2.editors[index] = editor;
              var dataValue = _this2.dataValue;
              dataValue = _this2.component.multiple && Array.isArray(dataValue) ? dataValue[index] : dataValue;

              var value = _this2.setConvertedValue(dataValue, index);

              var isReadOnly = _this2.options.readOnly || _this2.component.disabled;

              if ((0, _utils.getIEBrowserVersion)()) {
                editor.on('instanceReady', function () {
                  editor.setReadOnly(isReadOnly);
                  editor.setData(value);
                });
              } else {
                var numRows = parseInt(_this2.component.rows, 10);

                if (_lodash.default.isFinite(numRows) && _lodash.default.has(editor, 'ui.view.editable.editableElement')) {
                  // Default height is 21px with 10px margin + a 14px top margin.
                  var editorHeight = numRows * 31 + 14;
                  editor.ui.view.editable.editableElement.style.height = "".concat(editorHeight, "px");
                }

                editor.isReadOnly = isReadOnly;
                editor.data.set(value);
              }

              editorReady(editor);
              return editor;
            });

            break;

          default:
            _get(_getPrototypeOf(TextAreaComponent.prototype), "attachElement", _this2).call(_this2, element, index);

            break;
        }
      });
      return element;
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var attached = _get(_getPrototypeOf(TextAreaComponent.prototype), "attach", this).call(this, element); // Make sure we restore the value after attaching since wysiwygs and readonly texts need an additional set.


      this.restoreValue();
      return attached;
    }
  }, {
    key: "imageHandler",
    value: function imageHandler(quillInstance) {
      var _this3 = this;

      var fileInput = quillInstance.container.querySelector('input.ql-image[type=file]');

      if (fileInput == null) {
        fileInput = document.createElement('input');
        fileInput.setAttribute('type', 'file');
        fileInput.setAttribute('accept', 'image/*');
        fileInput.classList.add('ql-image');
        this.addEventListener(fileInput, 'change', function () {
          var files = fileInput.files;
          var range = quillInstance.quill.getSelection(true);

          if (!files || !files.length) {
            console.warn('No files selected');
            return;
          }

          quillInstance.quill.enable(false);
          var _this3$component = _this3.component,
              uploadStorage = _this3$component.uploadStorage,
              uploadUrl = _this3$component.uploadUrl,
              uploadOptions = _this3$component.uploadOptions,
              uploadDir = _this3$component.uploadDir,
              fileKey = _this3$component.fileKey;
          var requestData;

          _this3.fileService.uploadFile(uploadStorage, files[0], (0, _utils.uniqueName)(files[0].name), uploadDir || '', //should pass empty string if undefined
          null, uploadUrl, uploadOptions, fileKey).then(function (result) {
            requestData = result;
            return _this3.fileService.downloadFile(result);
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
    key: "setValueAt",
    value: function setValueAt(index, value) {
      var _this4 = this;

      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      _get(_getPrototypeOf(TextAreaComponent.prototype), "setValueAt", this).call(this, index, value, flags);

      if (this.editorsReady[index]) {
        var setEditorsValue = function setEditorsValue(flags) {
          return function (editor) {
            _this4.autoModified = true;

            if (!flags.skipWysiwyg) {
              switch (_this4.component.editor) {
                case 'ace':
                  editor.setValue(_this4.setConvertedValue(value, index));
                  break;

                case 'quill':
                  if (_this4.component.isUploadEnabled) {
                    _this4.setAsyncConvertedValue(value).then(function (result) {
                      var content = editor.clipboard.convert({
                        html: result
                      });
                      editor.setContents(content);
                    });
                  } else {
                    var convertedValue = _this4.setConvertedValue(value, index);

                    var content = editor.clipboard.convert({
                      html: convertedValue
                    });
                    editor.setContents(content);
                  }

                  break;

                case 'ckeditor':
                  editor.data.set(_this4.setConvertedValue(value, index));
                  break;
              }
            }
          };
        };

        this.editorsReady[index].then(setEditorsValue(_lodash.default.clone(flags)));
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this5 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.isPlain || this.options.readOnly || this.disabled) {
        value = this.component.multiple && Array.isArray(value) ? value.map(function (val, index) {
          return _this5.setConvertedValue(val, index);
        }) : this.setConvertedValue(value);
        return _get(_getPrototypeOf(TextAreaComponent.prototype), "setValue", this).call(this, value, flags);
      }

      flags.skipWysiwyg = _lodash.default.isEqual(value, this.getValue());
      return _get(_getPrototypeOf(TextAreaComponent.prototype), "setValue", this).call(this, value, flags);
    }
  }, {
    key: "setReadOnlyValue",
    value: function setReadOnlyValue(value, index) {
      index = index || 0;

      if (this.options.readOnly || this.disabled) {
        if (this.refs.input && this.refs.input[index]) {
          this.setContent(this.refs.input[index], this.interpolate(value));
        }
      }
    }
  }, {
    key: "setConvertedValue",
    value: function setConvertedValue(value, index) {
      if (this.isJsonValue && !_lodash.default.isNil(value)) {
        try {
          value = JSON.stringify(value, null, 2);
        } catch (err) {
          console.warn(err);
        }
      }

      if (!_lodash.default.isString(value)) {
        value = '';
      }

      this.setReadOnlyValue(value, index);
      return value;
    }
  }, {
    key: "setAsyncConvertedValue",
    value: function setAsyncConvertedValue(value) {
      if (this.isJsonValue && value) {
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

        return _this6.fileService.downloadFile(requestData).then(function (result) {
          image.setAttribute('src', result.url);
        });
      }));
    }
  }, {
    key: "addAutoExpanding",
    value: function addAutoExpanding(textarea, index) {
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
      this.updateSizes[index] = update;
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

      this.updateSizes.forEach(function (updateSize) {
        return updateSize();
      });
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
    key: "getConvertedValue",
    value: function getConvertedValue(value) {
      if (this.isJsonValue && value) {
        try {
          value = JSON.parse(value);
        } catch (err) {// console.warn(err);
        }
      }

      return value;
    }
  }, {
    key: "detach",
    value: function detach() {
      var _this7 = this;

      // Destroy all editors.
      this.editors.forEach(function (editor) {
        if (editor.destroy) {
          editor.destroy();
        }
      });
      this.editors = [];
      this.editorsReady = [];
      this.updateSizes.forEach(function (updateSize) {
        return _this7.removeEventListener(window, 'resize', updateSize);
      });
      this.updateSizes = [];
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
      return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
    }
  }, {
    key: "isJsonValue",
    get: function get() {
      return this.component.as && this.component.as === 'json';
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
        fixedSize: true,
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