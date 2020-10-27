"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _Formio = _interopRequireDefault(require("./Formio"));

var _WebformBuilder2 = _interopRequireDefault(require("./WebformBuilder"));

var _utils = require("./utils/utils");

var _formUtils = require("./utils/formUtils");

var _builder = _interopRequireDefault(require("./utils/builder"));

var _PDF = _interopRequireDefault(require("./PDF"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

var PDFBuilder = /*#__PURE__*/function (_WebformBuilder) {
  _inherits(PDFBuilder, _WebformBuilder);

  var _super = _createSuper(PDFBuilder);

  function PDFBuilder() {
    var _this;

    _classCallCheck(this, PDFBuilder);

    var element, options;

    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    } else {
      options = arguments[0];
    } // Force superclass to skip the automatic init; we'll trigger it manually


    options.skipInit = true;

    if (element) {
      _this = _super.call(this, element, options);
    } else {
      _this = _super.call(this, options);
    }

    _this.dragDropEnabled = false;
    return _possibleConstructorReturn(_this);
  }

  _createClass(PDFBuilder, [{
    key: "init",
    value: function init() {
      this.options.attachMode = 'builder';
      this.webform = this.webform || this.createForm(this.options);
      this.webform.init();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var result = this.renderTemplate('pdfBuilder', {
        sidebar: this.renderTemplate('builderSidebar', {
          scrollEnabled: this.sideBarScroll,
          groupOrder: this.groupOrder,
          groupId: "builder-sidebar-".concat(this.id),
          groups: this.groupOrder.map(function (groupKey) {
            return _this2.renderTemplate('builderSidebarGroup', {
              group: _this2.groups[groupKey],
              groupKey: groupKey,
              groupId: "builder-sidebar-".concat(_this2.id),
              subgroups: _this2.groups[groupKey].subgroups.map(function (group) {
                return _this2.renderTemplate('builderSidebarGroup', {
                  group: group,
                  groupKey: group.key,
                  groupId: "builder-sidebar-".concat(groupKey),
                  subgroups: []
                });
              })
            });
          })
        }),
        form: this.hasPDF ? this.webform.render() : this.renderTemplate('pdfBuilderUpload', {})
      });
      return result;
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this3 = this;

      // PDF Upload
      if (!this.hasPDF) {
        this.loadRefs(element, {
          'fileDrop': 'single',
          'fileBrowse': 'single',
          'hiddenFileInputElement': 'single',
          'uploadError': 'single',
          'uploadProgress': 'single',
          'uploadProgressWrapper': 'single',
          'dragDropText': 'single'
        });
        this.addEventListener(this.refs['pdf-upload-button'], 'click', function (event) {
          event.preventDefault();
        }); // Init the upload error.

        if (!this.projectUrl) {
          this.setUploadError('Form options.projectUrl not set. Please set the "projectUrl" property of the options for this form or use Formio.setProjectUrl(). This setting is necessary to upload a pdf background.');
        } else {
          this.setUploadError();
        }

        if (this.refs.fileDrop) {
          var _element = this;

          this.addEventListener(this.refs.fileDrop, 'dragover', function (event) {
            this.className = 'fileSelector fileDragOver';
            event.preventDefault();
          });
          this.addEventListener(this.refs.fileDrop, 'dragleave', function (event) {
            this.className = 'fileSelector';
            event.preventDefault();
          });
          this.addEventListener(this.refs.fileDrop, 'drop', function (event) {
            this.className = 'fileSelector';
            event.preventDefault();

            _element.upload(event.dataTransfer.files[0]);

            return false;
          });
        }

        if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
          this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
            event.preventDefault(); // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
            // a click event on it.

            if (typeof _this3.refs.hiddenFileInputElement.trigger === 'function') {
              _this3.refs.hiddenFileInputElement.trigger('click');
            } else {
              _this3.refs.hiddenFileInputElement.click();
            }
          });
          this.addEventListener(this.refs.hiddenFileInputElement, 'change', function () {
            _this3.upload(_this3.refs.hiddenFileInputElement.files[0]);

            _this3.refs.hiddenFileInputElement.value = '';
          });
        }

        return _nativePromiseOnly.default.resolve();
      } // Normal PDF Builder


      return _get(_getPrototypeOf(PDFBuilder.prototype), "attach", this).call(this, element).then(function () {
        _this3.loadRefs(_this3.element, {
          iframeDropzone: 'single',
          'sidebar-container': 'multiple',
          'sidebar-loader': 'single'
        });

        _this3.afterAttach();

        return _this3.element;
      });
    }
  }, {
    key: "afterAttach",
    value: function afterAttach() {
      var _this4 = this;

      this.on('saveComponent', function (component) {
        _this4.webform.postMessage({
          name: 'updateElement',
          data: component
        });
      });
      this.on('removeComponent', function (component) {
        _this4.webform.postMessage({
          name: 'removeElement',
          data: component
        });
      });

      if (this.refs['sidebar-loader']) {
        this.webform.on('iframe-ready', function () {
          var sidebarLoader = _this4.refs['sidebar-loader'];

          if (sidebarLoader && sidebarLoader.parentNode) {
            sidebarLoader.parentNode.removeChild(sidebarLoader);
          }
        }, true);
      }

      this.initIframeEvents();
      this.updateDropzoneDimensions();
      this.initDropzoneEvents();
      this.prepSidebarComponentsForDrag();
    }
  }, {
    key: "upload",
    value: function upload(file) {
      var _this5 = this;

      var formio = new _Formio.default(this.projectUrl);
      this.refs.dragDropText.style.display = 'none';
      this.refs.uploadProgressWrapper.style.display = 'inherit';
      formio.uploadFile('url', file, file, '', function (event) {
        var progress = Math.floor(event.loaded / event.total * 100);
        _this5.refs.uploadProgress.style.width = "".concat(progress, "%");

        if (progress > 98) {
          _this5.refs.uploadProgress.innerHTML = _this5.t('Converting PDF. Please wait.');
        } else {
          _this5.refs.uploadProgress.innerHTML = "".concat(_this5.t('Uploading'), " ").concat(progress, "%");
        }
      }, "".concat(this.projectUrl, "/upload"), {}, 'file').then(function (result) {
        _lodash.default.set(_this5.webform.form, 'settings.pdf', {
          id: result.data.file,
          src: "".concat(result.data.filesServer).concat(result.data.path)
        });

        _this5.refs.dragDropText.style.display = 'inherit';
        _this5.refs.uploadProgressWrapper.style.display = 'none';

        _this5.emit('pdfUploaded', result.data);

        _this5.redraw();
      }).catch(function (err) {
        return _this5.setUploadError(err);
      });
    }
  }, {
    key: "setUploadError",
    value: function setUploadError(message) {
      if (!this.refs.uploadError) {
        return;
      }

      this.refs.uploadError.style.display = message ? '' : 'none';
      this.refs.uploadError.innerHTML = message;
    }
  }, {
    key: "createForm",
    value: function createForm(options) {
      var _this6 = this;

      // Instantiate the webform from the PDF class instead of Webform
      options.skipInit = false;
      options.hideLoader = true;
      this.webform = new _PDF.default(this.element, options);
      this.webform.on('attach', function () {
        // If the dropzone exists but has been removed in a PDF rebuild, reinstate it
        console.log('atached finished', _this6.refs.form);

        if (_this6.refs.iframeDropzone && !_toConsumableArray(_this6.refs.form.children).includes(_this6.refs.iframeDropzone)) {
          _this6.prependTo(_this6.refs.iframeDropzone, _this6.refs.form);
        }
      });
      return this.webform;
    }
  }, {
    key: "destroy",
    value: function destroy(deleteFromGlobal) {
      _get(_getPrototypeOf(PDFBuilder.prototype), "destroy", this).call(this, deleteFromGlobal);

      this.webform.destroy(deleteFromGlobal);
    } // d8b 8888888888                                                                              888
    // Y8P 888                                                                                     888
    //     888                                                                                     888
    // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
    // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
    // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
    // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
    // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'

  }, {
    key: "getParentContainer",
    value: function getParentContainer(component) {
      var container = [];
      var originalComponent = null;
      (0, _formUtils.eachComponent)(this.webform._form.components, function (comp, path, components) {
        if (comp.id === component.component.id) {
          container = components;
          originalComponent = comp;
          return true;
        }
      }, true);
      return {
        formioComponent: component.parent,
        formioContainer: container,
        originalComponent: originalComponent
      };
    }
  }, {
    key: "initIframeEvents",
    value: function initIframeEvents() {
      var _this7 = this;

      this.webform.off('iframe-elementUpdate');
      this.webform.off('iframe-componentUpdate');
      this.webform.off('iframe-componentClick');
      this.webform.on('iframe-elementUpdate', function (schema) {
        var component = _this7.webform.getComponentById(schema.id);

        if (component && component.component) {
          var isNew = true;
          component.component.overlay = {
            page: schema.page,
            left: schema.left,
            top: schema.top,
            height: schema.height,
            width: schema.width
          };

          if (!_this7.options.noNewEdit && !component.component.noNewEdit) {
            _this7.editComponent(component.component, _this7.getParentContainer(component), isNew);
          }

          _this7.emit('updateComponent', component.component);
        }

        return component;
      });
      this.webform.on('iframe-componentUpdate', function (schema) {
        var component = _this7.webform.getComponentById(schema.id);

        if (component && component.component) {
          component.component.overlay = {
            page: schema.overlay.page,
            left: schema.overlay.left,
            top: schema.overlay.top,
            height: schema.overlay.height,
            width: schema.overlay.width
          };

          _this7.emit('updateComponent', component.component);

          _this7.emit('change', _this7.form);
        }

        return component;
      });
      this.webform.on('iframe-componentClick', function (schema) {
        var component = _this7.webform.getComponentById(schema.id);

        if (component) {
          _this7.editComponent(component.component, _this7.getParentContainer(component));
        }
      }, true);
    } // 8888888b.                                                                   888                   d8b
    // 888  "Y88b                                                                  888                   Y8P
    // 888    888                                                                  888
    // 888    888 888d888 .d88b.  88888b. 88888888  .d88b.  88888b.   .d88b.       888  .d88b.   .d88b.  888  .d8888b
    // 888    888 888P"  d88""88b 888 "88b   d88P  d88""88b 888 "88b d8P  Y8b      888 d88""88b d88P"88b 888 d88P"
    // 888    888 888    888  888 888  888  d88P   888  888 888  888 88888888      888 888  888 888  888 888 888
    // 888  .d88P 888    Y88..88P 888 d88P d88P    Y88..88P 888  888 Y8b.          888 Y88..88P Y88b 888 888 Y88b.
    // 8888888P"  888     "Y88P"  88888P" 88888888  "Y88P"  888  888  "Y8888       888  "Y88P"   "Y88888 888  "Y8888P
    //                            888                                                                888
    //                            888                                                           Y8b d88P
    //                            888                                                            "Y88P"

  }, {
    key: "initDropzoneEvents",
    value: function initDropzoneEvents() {
      if (!this.refs.iframeDropzone) {
        return;
      } // This is required per HTML spec in order for the drop event to fire


      this.removeEventListener(this.refs.iframeDropzone, 'dragover');
      this.removeEventListener(this.refs.iframeDropzone, 'drop');
      this.addEventListener(this.refs.iframeDropzone, 'dragover', function (e) {
        e.preventDefault();
        return false;
      });
      this.addEventListener(this.refs.iframeDropzone, 'drop', this.onDropzoneDrop.bind(this));
    }
  }, {
    key: "updateDragAndDrop",
    value: function updateDragAndDrop() {
      this.initDropzoneEvents();
      this.prepSidebarComponentsForDrag();
    }
  }, {
    key: "prepSidebarComponentsForDrag",
    value: function prepSidebarComponentsForDrag() {
      var _this8 = this;

      if (!this.refs['sidebar-container']) {
        return;
      }

      this.refs['sidebar-container'].forEach(function (container) {
        _toConsumableArray(container.children).forEach(function (el) {
          el.draggable = true;
          el.setAttribute('draggable', true);

          _this8.removeEventListener(el, 'dragstart');

          _this8.removeEventListener(el, 'dragend');

          _this8.addEventListener(el, 'dragstart', _this8.onDragStart.bind(_this8), true);

          _this8.addEventListener(el, 'dragend', _this8.onDragEnd.bind(_this8), true);

          _this8.addEventListener(el, 'drag', function (e) {
            e.target.style.cursor = 'none';
          });
        });
      });
    }
  }, {
    key: "updateDropzoneDimensions",
    value: function updateDropzoneDimensions() {
      if (!this.refs.iframeDropzone) {
        return;
      }

      var iframeRect = (0, _utils.getElementRect)(this.webform.refs.iframeContainer);
      this.refs.iframeDropzone.style.height = iframeRect && iframeRect.height ? "".concat(iframeRect.height, "px") : '1000px';
      this.refs.iframeDropzone.style.width = iframeRect && iframeRect.width ? "".concat(iframeRect.width, "px") : '100%';
    }
  }, {
    key: "onDragStart",
    value: function onDragStart(e) {
      // Taking the current offset of a dragged item relative to the cursor
      var _e$offsetX = e.offsetX,
          offsetX = _e$offsetX === void 0 ? 0 : _e$offsetX,
          _e$offsetY = e.offsetY,
          offsetY = _e$offsetY === void 0 ? 0 : _e$offsetY;
      this.itemOffsetX = offsetX;
      this.itemOffsetY = offsetY;
      e.dataTransfer.setData('text', '');
      this.updateDropzoneDimensions();
      this.addClass(this.refs.iframeDropzone, 'enabled');
    }
  }, {
    key: "onDropzoneDrop",
    value: function onDropzoneDrop(e) {
      this.dropEvent = e;
      e.preventDefault();
      return false;
    }
  }, {
    key: "onDragEnd",
    value: function onDragEnd(e) {
      // IMPORTANT - must retrieve offsets BEFORE disabling the dropzone - offsets will
      // reflect absolute positioning if accessed after the target element is hidden
      var layerX = this.dropEvent ? this.dropEvent.layerX : null;
      var layerY = this.dropEvent ? this.dropEvent.layerY : null;
      var WIDTH = 100;
      var HEIGHT = 20; // Always disable the dropzone on drag end

      this.removeClass(this.refs.iframeDropzone, 'enabled'); // If there hasn't been a drop event on the dropzone, we're done

      if (!this.dropEvent) {
        return;
      }

      var element = e.target;
      var type = element.getAttribute('data-type');
      var schema = (0, _utils.fastCloneDeep)(this.schemas[type]);
      schema.key = _lodash.default.camelCase(schema.label || schema.placeholder || schema.type); // Set a unique key for this component.

      _builder.default.uniquify([this.webform.component], schema);

      this.webform._form.components.push(schema);

      schema.overlay = {
        top: layerY - this.itemOffsetY + HEIGHT,
        left: layerX - this.itemOffsetX,
        width: WIDTH,
        height: HEIGHT
      };
      this.webform.addComponent(schema, {}, null, true);
      this.webform.postMessage({
        name: 'addElement',
        data: schema
      });
      this.emit('addComponent', schema, this.webform, schema.key, this.webform.component.components.length, !this.options.noNewEdit && !schema.noNewEdit); // Delete the stored drop event now that it's been handled

      this.dropEvent = null;
      e.target.style.cursor = 'default';
    }
  }, {
    key: "highlightInvalidComponents",
    value: function highlightInvalidComponents() {
      var _this9 = this;

      var repeatablePaths = this.findRepeatablePaths(); // update elements which path was duplicated if any pathes have been changed

      if (!_lodash.default.isEqual(this.repeatablePaths, repeatablePaths)) {
        (0, _formUtils.eachComponent)(this.webform.getComponents(), function (comp, path) {
          if (_this9.repeatablePaths.includes(path)) {
            _this9.webform.postMessage({
              name: 'updateElement',
              data: comp.component
            });
          }
        });
        this.repeatablePaths = repeatablePaths;
      }

      if (!repeatablePaths.length) {
        return;
      }

      (0, _formUtils.eachComponent)(this.webform.getComponents(), function (comp, path) {
        if (_this9.repeatablePaths.includes(path)) {
          _this9.webform.postMessage({
            name: 'showBuilderErrors',
            data: {
              compId: comp.component.id,
              errorMessage: "API Key is not unique: ".concat(comp.key)
            }
          });
        }
      });
    }
  }, {
    key: "defaultGroups",
    get: function get() {
      return {
        pdf: {
          title: 'PDF Fields',
          weight: 0,
          default: true,
          components: {
            textfield: true,
            number: true,
            password: true,
            email: true,
            phoneNumber: true,
            currency: true,
            checkbox: true,
            signature: true,
            select: true,
            textarea: true,
            datetime: true,
            file: true,
            htmlelement: true
          }
        },
        basic: false,
        advanced: false,
        layout: false,
        data: false,
        premium: false,
        resource: false
      };
    }
  }, {
    key: "hasPDF",
    get: function get() {
      return _lodash.default.has(this.webform.form, 'settings.pdf');
    }
  }, {
    key: "projectUrl",
    get: function get() {
      return this.options.projectUrl || _Formio.default.getProjectUrl();
    }
  }]);

  return PDFBuilder;
}(_WebformBuilder2.default);

exports.default = PDFBuilder;