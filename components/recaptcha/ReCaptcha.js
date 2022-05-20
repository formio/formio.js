"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Component2 = _interopRequireDefault(require("../_classes/component/Component"));

var _Formio = require("../../Formio");

var _get3 = _interopRequireDefault(require("lodash/get"));

var _debounce2 = _interopRequireDefault(require("lodash/debounce"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get2() { if (typeof Reflect !== "undefined" && Reflect.get) { _get2 = Reflect.get; } else { _get2 = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get2.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

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
      this.recaptchaResult = null;

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
          this.recaptchaApiReady = _Formio.GlobalFormio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
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
        this.recaptchaApiReady = _Formio.GlobalFormio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
      }

      if (this.recaptchaApiReady) {
        this.recaptchaVerifiedPromise = new _nativePromiseOnly.default(function (resolve, reject) {
          _this.recaptchaApiReady.then(function () {
            if (!_this.isLoading) {
              _this.isLoading = true;
              grecaptcha.ready((0, _debounce2.default)(function () {
                grecaptcha.execute(siteKey, {
                  action: actionName
                }).then(function (token) {
                  return _this.sendVerificationRequest(token).then(function (_ref) {
                    var verificationResult = _ref.verificationResult,
                        token = _ref.token;
                    _this.recaptchaResult = _objectSpread(_objectSpread({}, verificationResult), {}, {
                      token: token
                    });

                    _this.updateValue(_this.recaptchaResult);

                    return resolve(verificationResult);
                  });
                }).catch(function () {
                  _this.isLoading = false;
                });
              }, 1000));
            }
          }).catch(function () {
            return reject();
          });
        }).then(function () {
          _this.isLoading = false;
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
      return _Formio.GlobalFormio.makeStaticRequest("".concat(_Formio.GlobalFormio.projectUrl, "/recaptcha?recaptchaToken=").concat(token)).then(function (verificationResult) {
        return {
          verificationResult: verificationResult,
          token: token
        };
      });
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row) {
      var _this3 = this;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      data = data || this.rootValue;
      row = row || this.data;
      var _options$async = options.async,
          async = _options$async === void 0 ? false : _options$async; // Verification could be async only

      if (!async) {
        return _get2(_getPrototypeOf(ReCaptchaComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, row, options);
      }

      var componentData = row[this.component.key];

      if (!componentData || !componentData.token) {
        this.setCustomValidity('ReCAPTCHA: Token is not specified in submission');
        return _nativePromiseOnly.default.resolve(false);
      }

      if (!componentData.success) {
        this.setCustomValidity('ReCAPTCHA: Token validation error');
        return _nativePromiseOnly.default.resolve(false);
      }

      return this.hook('validateReCaptcha', componentData.token, function () {
        return _nativePromiseOnly.default.resolve(true);
      }).then(function (success) {
        return success;
      }).catch(function (err) {
        _this3.setCustomValidity(err.message || err);

        return false;
      });
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(newValue) {
      // If a recaptcha result has already been established, then do not allow it to be reset.
      return this.recaptchaResult ? this.recaptchaResult : newValue;
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
        documentation: '/userguide/#recaptcha',
        weight: 40,
        schema: ReCaptchaComponent.schema()
      };
    }
  }]);

  return ReCaptchaComponent;
}(_Component2.default);

exports.default = ReCaptchaComponent;