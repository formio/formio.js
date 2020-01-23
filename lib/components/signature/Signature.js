"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

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

var _signature_pad = _interopRequireDefault(require("signature_pad/dist/signature_pad.js"));

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

var _lodash = _interopRequireDefault(require("lodash"));

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

var SignatureComponent =
/*#__PURE__*/
function (_Input) {
  _inherits(SignatureComponent, _Input);

  function SignatureComponent() {
    _classCallCheck(this, SignatureComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SignatureComponent).apply(this, arguments));
  }

  _createClass(SignatureComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(SignatureComponent.prototype), "init", this).call(this);

      this.currentWidth = 0;
      this.scale = 1;

      if (!this.component.width) {
        this.component.width = '100%';
      }

      if (!this.component.height) {
        this.component.height = '200px';
      }
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return true;
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = flags || {};

      var changed = _get(_getPrototypeOf(SignatureComponent.prototype), "setValue", this).call(this, value, flags);

      if (value && this.refs.signatureImage && (!flags.noSign || this.options.readOnly)) {
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
      if (force || this.refs.padBody.offsetWidth !== this.currentWidth) {
        this.scale = force ? scale : this.scale;
        this.currentWidth = this.refs.padBody.offsetWidth;
        this.refs.canvas.width = this.currentWidth * this.scale;
        this.refs.canvas.height = this.refs.padBody.offsetHeight * this.scale;
        var ctx = this.refs.canvas.getContext('2d');
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(1 / this.scale, 1 / this.scale);
        ctx.fillStyle = this.signaturePad.backgroundColor;
        ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
        this.signaturePad.clear();
      }
    }
  }, {
    key: "renderElement",
    value: function renderElement(value, index) {
      return this.renderTemplate('signature', {
        element: _get(_getPrototypeOf(SignatureComponent.prototype), "renderElement", this).call(this, value, index),
        required: _lodash.default.get(this.component, 'validate.required', false)
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

      this.onDisabled();

      if (this.refs.refresh && this.options.readOnly) {
        this.refs.refresh.classList.add('disabled');
      } // Create the signature pad.


      if (this.refs.canvas) {
        this.signaturePad = new _signature_pad.default(this.refs.canvas, {
          minWidth: this.component.minWidth,
          maxWidth: this.component.maxWidth,
          penColor: this.component.penColor,
          backgroundColor: this.component.backgroundColor
        });

        this.signaturePad.onEnd = function () {
          return _this.setValue(_this.signaturePad.toDataURL(), {
            noSign: true
          });
        };

        this.refs.signatureImage.setAttribute('src', this.signaturePad.toDataURL()); // Ensure the signature is always the size of its container.

        if (this.refs.padBody) {
          if (!this.refs.padBody.style.maxWidth) {
            this.refs.padBody.style.maxWidth = '100%';
          }

          this.addEventListener(window, 'resize', _lodash.default.debounce(function () {
            return _this.checkSize();
          }, 100));
          setTimeout(function checkWidth() {
            if (this.refs.padBody && this.refs.padBody.offsetWidth) {
              this.checkSize();
            } else {
              setTimeout(checkWidth.bind(this), 200);
            }
          }.bind(this), 200);
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
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2.default.schema.apply(_Input2.default, [{
        type: 'signature',
        label: 'Signature',
        key: 'signature',
        footer: 'Sign above',
        width: '100%',
        height: '150px',
        penColor: 'black',
        backgroundColor: 'rgb(245,245,235)',
        minWidth: '0.5',
        maxWidth: '2.5'
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
        documentation: 'http://help.form.io/userguide/#signature',
        schema: SignatureComponent.schema()
      };
    }
  }]);

  return SignatureComponent;
}(_Input2.default);

exports.default = SignatureComponent;