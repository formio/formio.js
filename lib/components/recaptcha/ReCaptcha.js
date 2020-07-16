"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component2 = _interopRequireDefault(require("../_classes/component/Component"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _get3 = _interopRequireDefault(require("lodash/get"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get2(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get2 = Reflect.get; } else { _get2 = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get2(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ReCaptchaComponent = /*#__PURE__*/function (_Component) {
  _inherits(ReCaptchaComponent, _Component);

  var _super = _createSuper(ReCaptchaComponent);

  function ReCaptchaComponent() {
    _classCallCheck(this, ReCaptchaComponent);

    return _super.apply(this, arguments);
  }

  _createClass(ReCaptchaComponent, [{
    key: "render",
    value: function render() {
      if (this.builderMode) {
        return _get2(_getPrototypeOf(ReCaptchaComponent.prototype), "render", this).call(this, 'reCAPTCHA');
      } else {
        return _get2(_getPrototypeOf(ReCaptchaComponent.prototype), "render", this).call(this, '', true);
      }
    }
  }, {
    key: "createInput",
    value: function createInput() {
      if (this.builderMode) {
        // We need to see it in builder mode.
        this.append(this.text(this.name));
      } else {
        var siteKey = (0, _get3.default)(this.root.form, 'settings.recaptcha.siteKey');

        if (siteKey) {
          var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=".concat(siteKey);
          this.recaptchaApiReady = _Formio.default.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
        } else {
          console.warn('There is no Site Key specified in settings in form JSON');
        }
      }
    }
  }, {
    key: "createLabel",
    value: function createLabel() {
      return;
    }
  }, {
    key: "verify",
    value: function verify(actionName) {
      var _this = this;

      var siteKey = (0, _get3.default)(this.root.form, 'settings.recaptcha.siteKey');

      if (!siteKey) {
        console.warn('There is no Site Key specified in settings in form JSON');
        return;
      }

      if (!this.recaptchaApiReady) {
        var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=".concat((0, _get3.default)(this.root.form, 'settings.recaptcha.siteKey'));
        this.recaptchaApiReady = _Formio.default.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
      }

      if (this.recaptchaApiReady) {
        this.recaptchaVerifiedPromise = new _nativePromiseOnly.default(function (resolve, reject) {
          _this.recaptchaApiReady.then(function () {
            grecaptcha.ready(function () {
              grecaptcha.execute(siteKey, {
                action: actionName
              }).then(function (token) {
                return _this.sendVerificationRequest(token);
              }).then(function (verificationResult) {
                _this.setValue(verificationResult);

                return resolve(verificationResult);
              });
            });
          }).catch(function () {
            return reject();
          });
        });
      }
    }
  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      var _this2 = this;

      if (this.recaptchaVerifiedPromise) {
        return this.recaptchaVerifiedPromise.then(function () {
          return _get2(_getPrototypeOf(ReCaptchaComponent.prototype), "beforeSubmit", _this2).call(_this2);
        });
      }

      return _get2(_getPrototypeOf(ReCaptchaComponent.prototype), "beforeSubmit", this).call(this);
    }
  }, {
    key: "sendVerificationRequest",
    value: function sendVerificationRequest(token) {
      return _Formio.default.makeStaticRequest("".concat(_Formio.default.projectUrl, "/recaptcha?recaptchaToken=").concat(token));
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;
      return changed;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Component2.default.schema.apply(_Component2.default, [{
        type: 'recaptcha',
        key: 'recaptcha',
        label: 'reCAPTCHA'
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'reCAPTCHA',
        group: 'premium',
        icon: 'refresh',
        documentation: 'http://help.form.io/userguide/#recaptcha',
        weight: 40,
        schema: ReCaptchaComponent.schema()
      };
    }
  }]);

  return ReCaptchaComponent;
}(_Component2.default);

exports.default = ReCaptchaComponent;