"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _WebformBuilder2 = _interopRequireDefault(require("./WebformBuilder"));

var _utils = require("./utils/utils");

var _PDF = _interopRequireDefault(require("./PDF"));

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

var PDFBuilder =
/*#__PURE__*/
function (_WebformBuilder) {
  _inherits(PDFBuilder, _WebformBuilder);

  function PDFBuilder() {
    _classCallCheck(this, PDFBuilder);

    return _possibleConstructorReturn(this, _getPrototypeOf(PDFBuilder).apply(this, arguments));
  }

  _createClass(PDFBuilder, [{
    key: "addDropZone",
    value: function addDropZone() {
      var _this = this;

      if (!this.dropZone) {
        this.dropZone = this.ce('div', {
          class: 'formio-drop-zone'
        });
        this.prepend(this.dropZone);
      }

      this.addEventListener(this.dropZone, 'dragover', function (event) {
        event.preventDefault();
        return false;
      });
      this.addEventListener(this.dropZone, 'drop', function (event) {
        event.preventDefault();

        _this.dragStop(event);

        return false;
      });
      this.disableDropZone();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return this.onElement.then(function () {
        _this2.build(_this2.clear());

        _this2.isBuilt = true;

        _this2.on('resetForm', function () {
          return _this2.resetValue();
        }, true);

        _this2.on('refreshData', function () {
          return _this2.updateValue();
        }, true);

        setTimeout(function () {
          _this2.onChange();

          _this2.emit('render');
        }, 1);
      });
    }
  }, {
    key: "enableDropZone",
    value: function enableDropZone() {
      if (this.dropZone) {
        var iframeRect = (0, _utils.getElementRect)(this.pdfForm.element);
        this.dropZone.style.height = iframeRect && iframeRect.height ? "".concat(iframeRect.height, "px") : '1000px';
        this.dropZone.style.width = iframeRect && iframeRect.width ? "".concat(iframeRect.width, "px") : '100%';
        this.addClass(this.dropZone, 'enabled');
      }
    }
  }, {
    key: "disableDropZone",
    value: function disableDropZone() {
      if (this.dropZone) {
        this.removeClass(this.dropZone, 'enabled');
      }
    }
  }, {
    key: "addComponentTo",
    value: function addComponentTo(schema, parent, element, sibling) {
      var comp = _get(_getPrototypeOf(PDFBuilder.prototype), "addComponentTo", this).call(this, schema, parent, element, sibling);

      comp.isNew = true;

      if (this.pdfForm && schema.overlay) {
        this.pdfForm.postMessage({
          name: 'addElement',
          data: schema
        });
      }

      return comp;
    }
  }, {
    key: "addComponent",
    value: function addComponent(component, element, data, before, noAdd, state) {
      return _get(_getPrototypeOf(PDFBuilder.prototype), "addComponent", this).call(this, component, element, data, before, true, state);
    }
  }, {
    key: "deleteComponent",
    value: function deleteComponent(component) {
      if (this.pdfForm && component.component) {
        this.pdfForm.postMessage({
          name: 'removeElement',
          data: component.component
        });
      }

      return _get(_getPrototypeOf(PDFBuilder.prototype), "deleteComponent", this).call(this, component);
    }
  }, {
    key: "dragStart",
    value: function dragStart(event, component) {
      event.stopPropagation();
      event.dataTransfer.setData('text/plain', 'true');
      this.currentComponent = component;
      this.enableDropZone();
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners(all) {
      var _this3 = this;

      _get(_getPrototypeOf(PDFBuilder.prototype), "removeEventListeners", this).call(this, all);

      _lodash.default.each(this.groups, function (group) {
        _lodash.default.each(group.components, function (builderComponent) {
          _this3.removeEventListener(builderComponent, 'dragstart');

          _this3.removeEventListener(builderComponent, 'dragend');
        });
      });
    }
  }, {
    key: "clear",
    value: function clear() {
      var state = {};
      this.destroy(state);
      return state;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (this.pdfForm) {
        this.pdfForm.postMessage({
          name: 'redraw'
        });
      }
    }
  }, {
    key: "dragStop",
    value: function dragStop(event) {
      var schema = this.currentComponent ? this.currentComponent.schema : null;

      if (!schema) {
        return false;
      }

      schema.overlay = {
        top: event.offsetY,
        left: event.offsetX,
        width: 100,
        height: 20
      };
      this.addComponentTo(schema, this, this.getContainer());
      this.disableDropZone();
      return false;
    } // Don't need to add a submit button here... the pdfForm will already do this.

  }, {
    key: "addSubmitButton",
    value: function addSubmitButton() {}
  }, {
    key: "addBuilderComponent",
    value: function addBuilderComponent(component, group) {
      var _this4 = this;

      var builderComponent = _get(_getPrototypeOf(PDFBuilder.prototype), "addBuilderComponent", this).call(this, component, group);

      if (builderComponent) {
        builderComponent.element.draggable = true;
        builderComponent.element.setAttribute('draggable', true);
        this.addEventListener(builderComponent.element, 'dragstart', function (event) {
          return _this4.dragStart(event, component);
        }, true);
        this.addEventListener(builderComponent.element, 'dragend', function () {
          return _this4.disableDropZone();
        }, true);
      }

      return builderComponent;
    }
  }, {
    key: "refreshDraggable",
    value: function refreshDraggable() {
      this.addSubmitButton();
      this.builderReadyResolve();
    }
  }, {
    key: "build",
    value: function build() {
      var _this5 = this;

      this.buildSidebar();

      if (!this.pdfForm) {
        this.element.noDrop = true;
        this.pdfForm = new _PDF.default(this.element, this.options);
        this.addClass(this.pdfForm.element, 'formio-pdf-builder');
      }

      this.pdfForm.destroy(true);
      this.pdfForm.on('iframe-elementUpdate', function (schema) {
        var component = _this5.getComponentById(schema.id);

        if (component && component.component) {
          component.component.overlay = {
            page: schema.page,
            left: schema.left,
            top: schema.top,
            height: schema.height,
            width: schema.width
          };

          _this5.editComponent(component);

          _this5.emit('updateComponent', component);
        }

        return component;
      }, true);
      this.pdfForm.on('iframe-componentUpdate', function (schema) {
        var component = _this5.getComponentById(schema.id);

        if (component && component.component) {
          component.component.overlay = {
            page: schema.overlay.page,
            left: schema.overlay.left,
            top: schema.overlay.top,
            height: schema.overlay.height,
            width: schema.overlay.width
          };

          _this5.emit('updateComponent', component);

          var localComponent = _lodash.default.find(_this5.form.components, {
            id: schema.id
          });

          if (localComponent) {
            localComponent.overlay = _lodash.default.clone(component.component.overlay);
          }

          _this5.emit('change', _this5.form);
        }

        return component;
      }, true);
      this.pdfForm.on('iframe-componentClick', function (schema) {
        var component = _this5.getComponentById(schema.id);

        if (component) {
          _this5.editComponent(component);
        }
      }, true);
      this.addComponents();
      this.addDropZone();
      this.updateDraggable();
      this.formReadyResolve();
    }
  }, {
    key: "setForm",
    value: function setForm(form) {
      var _this6 = this;

      // If this is a brand new form, make sure it has a submit button component
      if (!form.created && !_lodash.default.find(form.components || [], {
        type: 'button',
        action: 'submit'
      })) {
        form.components.push({
          type: 'button',
          label: this.t('Submit'),
          key: 'submit',
          size: 'md',
          block: false,
          action: 'submit',
          disableOnInvalid: true,
          theme: 'primary'
        });
      }

      return _get(_getPrototypeOf(PDFBuilder.prototype), "setForm", this).call(this, form).then(function () {
        return _this6.ready.then(function () {
          if (_this6.pdfForm) {
            return _this6.pdfForm.setForm(form).then(function (newForm) {
              _lodash.default.each(_this6.components, function (c, i) {
                c.component = _lodash.default.cloneDeep(newForm.components[i]);
                c.id = c.component.id;
              });

              return newForm;
            });
          }

          return form;
        });
      });
    }
  }, {
    key: "defaultComponents",
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
            file: true
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
  }]);

  return PDFBuilder;
}(_WebformBuilder2.default);

exports.default = PDFBuilder;