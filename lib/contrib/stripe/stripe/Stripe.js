"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

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

var _lodash = _interopRequireDefault(require("lodash"));

var _Validator = _interopRequireDefault(require("../../../validator/Validator"));

var _Component2 = _interopRequireDefault(require("../../../components/_classes/component/Component"));

var _Formio = _interopRequireDefault(require("../../../Formio"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

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

// Register a custom validor to use card validition from Stripe
if (typeof _Validator.default.validators.stripe === 'undefined') {
  _Validator.default.validators.stripe = {
    key: 'validate.stripe',
    message: function message(component) {
      var stripeMessage = '';

      if (component.lastResult && component.lastResult.error) {
        stripeMessage = component.lastResult.error.message;
      }

      return component.t(component.errorMessage('stripe'), {
        field: component.errorLabel,
        stripe: stripeMessage,
        stripeError: component.lastResult.error,
        data: component.data
      });
    },
    check: function check(component, setting, value) {
      if (!component.paymentDone && component.lastResult) {
        return !component.lastResult.error && !component.isEmpty(value);
      }

      return true;
    }
  };
}
/**
 * This is the StripeComponent class.
 */


var StripeComponent = /*#__PURE__*/function (_Component) {
  _inherits(StripeComponent, _Component);

  var _super = _createSuper(StripeComponent);

  function StripeComponent(component, options, data) {
    var _this;

    _classCallCheck(this, StripeComponent);

    _this = _super.call(this, component, options, data); // Get the source for Stripe API

    var src = 'https://js.stripe.com/v3/';
    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */

    _this.stripeReady = _Formio.default.requireLibrary('stripe', 'Stripe', src, true);
    /**
     * The last result returned by Stripe.
     * @type {Object}
     */

    _this.lastResult = null;
    /**
     * The state of the payment.
     * @type {Boolean}
     */

    _this.paymentDone = false; // Use stripe validator

    _this.validators.push('stripe');

    return _this;
  }

  _createClass(StripeComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(StripeComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }
    /**
     * Set CSS classes for pending authorization
     */

  }, {
    key: "authorizePending",
    value: function authorizePending() {
      this.addClass(this.element, 'stripe-submitting');
      this.removeClass(this.element, 'stripe-error');
      this.removeClass(this.element, 'stripe-submitted');
    }
    /**
     * Set CSS classes and display error when error occurs during authorization
     * @param {Object} resultError - The result error returned by Stripe API.
     */

  }, {
    key: "authorizeError",
    value: function authorizeError(resultError) {
      this.removeClass(this.element, 'stripe-submitting');
      this.addClass(this.element, 'stripe-submit-error');
      this.removeClass(this.element, 'stripe-submitted');

      if (!this.lastResult) {
        this.lastResult = {};
      }

      this.lastResult.error = resultError;
      this.setValue(this.getValue(), {
        changed: true
      });
    }
    /**
     * Set CSS classes and save token when authorization successed
     * @param {Object} result - The result returned by Stripe API.
     */

  }, {
    key: "authorizeDone",
    value: function authorizeDone(result) {
      this.removeClass(this.element, 'stripe-submit-error');
      this.removeClass(this.element, 'stripe-submitting');
      this.addClass(this.element, 'stripe-submitted');
      this.stripeSuccess.style.display = 'block';

      if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
        this.stripeElementPayButton.style.display = 'none';
        this.stripeSeparator.style.display = 'none';
      }

      this.stripeElementCard.style.display = 'none'; // Store token in hidden input

      this.setValue(result.token.id);
      this.paymentDone = true;
    }
    /**
     * Call Stripe API to get token
     */

  }, {
    key: "authorize",
    value: function authorize() {
      if (this.paymentDone) {
        return;
      }

      var that = this;
      return new _nativePromiseOnly.default(function (resolve, reject) {
        that.authorizePending(); // Get all additionnal data to send to Stripe

        var cardData = _lodash.default.cloneDeep(that.component.stripe.cardData) || {};

        _lodash.default.each(cardData, function (value, key) {
          cardData[key] = that.t(value);
        });

        return that.stripe.createToken(that.stripeCard, cardData).then(function (result) {
          if (result.error) {
            that.authorizeError(result.error);
            reject(result.error);
          } else {
            that.authorizeDone(result);
            resolve();
          }
        });
      });
    }
    /**
     * Handle event dispatched by Stripe library
     * @param {Object} result - The result returned by Stripe.
     */

  }, {
    key: "onElementCardChange",
    value: function onElementCardChange(result) {
      // If the field is not required and the field is empty, do not throw an error
      if (result.empty && (!this.component.validate || !this.component.validate.required)) {
        delete result.error;
      } // Force change when complete or when an error is thrown or fixed


      var changed = result.complete || this.lastResult && !!this.lastResult.error !== !!result.error || this.lastResult && this.lastResult.error && result.error && this.lastResult.error.code !== result.error.code || false;
      this.lastResult = result; // When the field is not empty, use "." as value to not trigger "required" validator

      var value = result.empty ? '' : '.';
      this.setValue(value, {
        changed: changed
      });
    }
  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      // Get the token before submitting when the field is not empty or required
      if (this.lastResult && !this.lastResult.empty || this.component.validate && this.component.validate.required) {
        return this.authorize();
      }
    }
  }, {
    key: "build",
    value: function build() {
      var _this2 = this;

      _get(_getPrototypeOf(StripeComponent.prototype), "build", this).call(this);

      var successLabel = this.component.stripe.payButton.successLabel || 'Payment successful';
      this.stripeSuccess = this.ce('div', {
        class: 'Stripe-success',
        style: 'display: none'
      }, this.t(successLabel));
      this.element.appendChild(this.stripeSuccess); // Add container for pay button

      if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
        this.stripeElementPayButton = this.ce('div', {
          class: 'Stripe-paybutton'
        });
        this.element.appendChild(this.stripeElementPayButton);
        var separatorLabel = this.component.stripe.payButton.separatorLabel || 'Or';
        this.stripeSeparator = this.ce('div', {
          class: 'Stripe-separator',
          style: 'display: none'
        }, this.t(separatorLabel));
        this.element.appendChild(this.stripeSeparator);
      } // Create container for stripe cart input


      this.stripeElementCard = this.ce('div');
      this.element.appendChild(this.stripeElementCard);
      this.stripeReady.then(function () {
        _this2.stripe = new Stripe(_this2.component.stripe.apiKey); // Create an instance of Elements

        var stripeElementsOptions = {};

        if (_this2.component.stripe) {
          stripeElementsOptions = _lodash.default.cloneDeep(_this2.component.stripe.stripeElementsOptions) || {};
        }

        if (typeof stripeElementsOptions.locale === 'undefined') {
          stripeElementsOptions.locale = _this2.options.language;
        }

        var elements = _this2.stripe.elements(stripeElementsOptions); // Create an instance of the card Element


        var stripeElementOptions = {};

        if (_this2.component.stripe) {
          stripeElementOptions = _this2.component.stripe.stripeElementOptions || {};
        }

        _this2.stripeCard = elements.create('card', stripeElementOptions); // Add an instance of the card Element into the `card-element` <div>

        _this2.stripeCard.mount(_this2.stripeElementCard); // Handle real-time validation errors from the card Element.


        _this2.addEventListener(_this2.stripeCard, 'change', _this2.onElementCardChange.bind(_this2)); // If there is a pay button, then create it and add listener


        if (_this2.component.stripe.payButton && _this2.component.stripe.payButton.enable) {
          var paymentRequest = _this2.stripe.paymentRequest(_this2.component.stripe.payButton.paymentRequest);

          _this2.addEventListener(paymentRequest, 'token', function (result) {
            _this2.authorizeDone(result, true);

            result.complete('success');
          });

          var stripeOptionsPayButton = {};

          if (_this2.component.stripe.payButton) {
            stripeOptionsPayButton = _this2.component.stripe.payButton.stripeOptions || {};
          }

          stripeOptionsPayButton.paymentRequest = paymentRequest;
          var paymentRequestElement = elements.create('paymentRequestButton', stripeOptionsPayButton);
          paymentRequest.canMakePayment().then(function (result) {
            if (result) {
              // Display label separator
              _this2.stripeSeparator.style.display = 'block';
              paymentRequestElement.mount(_this2.stripeElementPayButton);
            }
          });
        }
      });
    }
  }]);

  return StripeComponent;
}(_Component2.default);

exports.default = StripeComponent;

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.Formio && global.Formio.registerComponent) {
  global.Formio.registerComponent('stripe', StripeComponent);
}