"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/web.timers.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _signature_pad = _interopRequireDefault(require("signature_pad"));

var _resizeObserverPolyfill = _interopRequireDefault(require("resize-observer-polyfill"));

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SignatureComponent = /*#__PURE__*/function (_Input) {
  _inherits(SignatureComponent, _Input);

  var _super = _createSuper(SignatureComponent);

  function SignatureComponent() {
    _classCallCheck(this, SignatureComponent);

    return _super.apply(this, arguments);
  }

  _createClass(SignatureComponent, [{
    key: "init",
    value: function init() {
      var _this$component$overl, _this$component$overl2;

      _get(_getPrototypeOf(SignatureComponent.prototype), "init", this).call(this);

      this.currentWidth = 0;
      this.scale = 1;

      if (!this.component.width) {
        this.component.width = '100%';
      }

      if (!this.component.height) {
        this.component.height = '200px';
      }

      if (this.component.keepOverlayRatio && this.options.pdf && (_this$component$overl = this.component.overlay) !== null && _this$component$overl !== void 0 && _this$component$overl.width && (_this$component$overl2 = this.component.overlay) !== null && _this$component$overl2 !== void 0 && _this$component$overl2.height) {
        var _this$component$overl3, _this$component$overl4;

        this.ratio = ((_this$component$overl3 = this.component.overlay) === null || _this$component$overl3 === void 0 ? void 0 : _this$component$overl3.width) / ((_this$component$overl4 = this.component.overlay) === null || _this$component$overl4 === void 0 ? void 0 : _this$component$overl4.height);
        this.component.width = '100%';
        this.component.height = 'auto';
      }
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return '';
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SignatureComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(SignatureComponent.prototype), "inputInfo", this);

      info.type = 'input';
      info.attr.type = 'hidden';
      return info;
    }
  }, {
    key: "className",
    get: function get() {
      return "".concat(_get(_getPrototypeOf(SignatureComponent.prototype), "className", this), " signature-pad");
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return this.component.hideLabel;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(SignatureComponent.prototype), "setValue", this).call(this, value, flags);

      if (this.refs.signatureImage && (this.options.readOnly || this.disabled)) {
        this.refs.signatureImage.setAttribute('src', value);
        this.showCanvas(false);
      }

      if (this.signaturePad) {
        if (!value) {
          this.signaturePad.clear();
        } else if (changed) {
          this.triggerChange();
        }
      }

      if (this.signaturePad && this.dataValue && this.signaturePad.isEmpty()) {
        this.setDataToSigaturePad();
      }

      return changed;
    }
  }, {
    key: "showCanvas",
    value: function showCanvas(show) {
      if (show) {
        if (this.refs.canvas) {
          this.refs.canvas.style.display = 'inherit';
        }

        if (this.refs.signatureImage) {
          this.refs.signatureImage.style.display = 'none';
        }
      } else {
        if (this.refs.canvas) {
          this.refs.canvas.style.display = 'none';
        }

        if (this.refs.signatureImage) {
          this.refs.signatureImage.style.display = 'inherit';
          this.refs.signatureImage.style.height = '150px';
        }
      }
    }
  }, {
    key: "onDisabled",
    value: function onDisabled() {
      this.showCanvas(!_get(_getPrototypeOf(SignatureComponent.prototype), "disabled", this));

      if (this.signaturePad) {
        if (_get(_getPrototypeOf(SignatureComponent.prototype), "disabled", this)) {
          this.signaturePad.off();

          if (this.refs.refresh) {
            this.refs.refresh.classList.add('disabled');
          }

          if (this.refs.signatureImage && this.dataValue) {
            this.refs.signatureImage.setAttribute('src', this.dataValue);
          }
        } else {
          this.signaturePad.on();

          if (this.refs.refresh) {
            this.refs.refresh.classList.remove('disabled');
          }
        }
      }
    }
  }, {
    key: "checkSize",
    value: function checkSize(force, scale) {
      if (this.refs.padBody && (force || this.refs.padBody && this.refs.padBody.offsetWidth !== this.currentWidth)) {
        this.scale = force ? scale : this.scale;
        this.currentWidth = this.refs.padBody.offsetWidth;
        var width = this.currentWidth * this.scale;
        this.refs.canvas.width = width;
        var height = this.ratio ? width / this.ratio : this.refs.padBody.offsetHeight * this.scale;
        this.refs.canvas.height = height;
        this.refs.canvas.style.maxWidth = "".concat(this.currentWidth * this.scale, "px");
        this.refs.canvas.style.maxHeight = "".concat(this.refs.padBody.offsetHeight * this.scale, "px");
        var ctx = this.refs.canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / this.scale, 1 / this.scale);
        ctx.fillStyle = this.signaturePad.backgroundColor;
        ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.signaturePad.clear();

        if (this.dataValue) {
          this.signaturePad.fromDataURL(this.dataValue);
        }

        this.showCanvas(true);
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      return this.renderTemplate('signature', {
        element: _get(_getPrototypeOf(SignatureComponent.prototype), "renderElement", this).call(this, value, index),
        required: _lodash["default"].get(this.component, 'validate.required', false)
      });
    }
  }, {
    key: "hasModalSaveButton",
    get: function get() {
      return false;
    }
  }, {
    key: "getModalPreviewTemplate",
    value: function getModalPreviewTemplate() {
      return this.renderTemplate('modalPreview', {
        previewText: this.dataValue ? "<img src=".concat(this.dataValue, " ref='openModal' style=\"width: 100%;height: 100%;\" />") : this.t('Click to Sign')
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this = this;

      this.loadRefs(element, {
        canvas: 'single',
        refresh: 'single',
        padBody: 'single',
        signatureImage: 'single'
      });

      var superAttach = _get(_getPrototypeOf(SignatureComponent.prototype), "attach", this).call(this, element);

      if (this.refs.refresh && this.options.readOnly) {
        this.refs.refresh.classList.add('disabled');
      } // Create the signature pad.


      if (this.refs.canvas) {
        this.signaturePad = new _signature_pad["default"](this.refs.canvas, {
          minWidth: this.component.minWidth,
          maxWidth: this.component.maxWidth,
          penColor: this.component.penColor,
          backgroundColor: this.component.backgroundColor
        });
        this.signaturePad.addEventListener('endStroke', function () {
          return _this.setValue(_this.signaturePad.toDataURL());
        });
        this.refs.signatureImage.setAttribute('src', this.signaturePad.toDataURL());
        this.onDisabled(); // Ensure the signature is always the size of its container.

        if (this.refs.padBody) {
          if (!this.refs.padBody.style.maxWidth) {
            this.refs.padBody.style.maxWidth = '100%';
          }

          if (!this.builderMode && !this.options.preview) {
            this.observer = new _resizeObserverPolyfill["default"](function () {
              _this.checkSize();
            });
            this.observer.observe(this.refs.padBody);
          }

          this.addEventListener(window, 'resize', _lodash["default"].debounce(function () {
            return _this.checkSize();
          }, 10));
          setTimeout(function checkWidth() {
            if (this.refs.padBody && this.refs.padBody.offsetWidth) {
              this.checkSize();
            } else {
              setTimeout(checkWidth.bind(this), 20);
            }
          }.bind(this), 20);
        }
      }

      this.addEventListener(this.refs.refresh, 'click', function (event) {
        event.preventDefault();

        _this.showCanvas(true);

        _this.signaturePad.clear();

        _this.setValue(_this.defaultValue);
      });
      this.setValue(this.dataValue);
      return superAttach;
    }
    /* eslint-enable max-statements */

  }, {
    key: "detach",
    value: function detach() {
      if (this.observer) {
        this.observer.disconnect();
        this.observer = null;
      }

      if (this.signaturePad) {
        this.signaturePad.off();
      }

      this.signaturePad = null;
      this.currentWidth = 0;

      _get(_getPrototypeOf(SignatureComponent.prototype), "detach", this).call(this);
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      return value ? 'Yes' : 'No';
    }
  }, {
    key: "focus",
    value: function focus() {
      this.refs.padBody.focus();
    }
  }, {
    key: "setDataToSigaturePad",
    value: function setDataToSigaturePad() {
      this.signaturePad.fromDataURL(this.dataValue, {
        ratio: 1,
        width: this.refs.canvas.width,
        height: this.refs.canvas.height
      });
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2["default"].schema.apply(_Input2["default"], [{
        type: 'signature',
        label: 'Signature',
        key: 'signature',
        footer: 'Sign above',
        width: '100%',
        height: '150px',
        penColor: 'black',
        backgroundColor: 'rgb(245,245,235)',
        minWidth: '0.5',
        maxWidth: '2.5',
        keepOverlayRatio: true
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Signature',
        group: 'advanced',
        icon: 'pencil',
        weight: 120,
        documentation: '/userguide/forms/form-components#signature',
        schema: SignatureComponent.schema()
      };
    }
  }]);

  return SignatureComponent;
}(_Input2["default"]);

exports["default"] = SignatureComponent;