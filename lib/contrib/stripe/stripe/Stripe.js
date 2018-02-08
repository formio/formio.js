'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StripeComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Validator = require('../../../components/Validator');

var _Base = require('../../../components/base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals Stripe */


// Register a custom validor to use card validition from Stripe
if (typeof _Validator.Validator.validators.stripe === 'undefined') {
  _Validator.Validator.validators.stripe = {
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

var StripeComponent = exports.StripeComponent = function (_BaseComponent) {
  _inherits(StripeComponent, _BaseComponent);

  function StripeComponent(component, options, data) {
    _classCallCheck(this, StripeComponent);

    // Get the source for Stripe API
    var _this = _possibleConstructorReturn(this, (StripeComponent.__proto__ || Object.getPrototypeOf(StripeComponent)).call(this, component, options, data));

    var src = 'https://js.stripe.com/v3/';

    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */
    _this.stripeReady = _Base.BaseComponent.requireLibrary('stripe', 'Stripe', src, true);

    /**
     * The last result returned by Stripe.
     * @type {Object}
     */
    _this.lastResult = null;

    /**
     * The state of the payment.
     * @type {Boolean}
     */
    _this.paymentDone = false;

    // Use stripe validator
    _this.validators.push('stripe');
    return _this;
  }

  _createClass(StripeComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(StripeComponent.prototype.__proto__ || Object.getPrototypeOf(StripeComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }

    /**
     * Set CSS classes for pending authorization
     */

  }, {
    key: 'authorizePending',
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
    key: 'authorizeError',
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
    key: 'authorizeDone',
    value: function authorizeDone(result) {
      this.removeClass(this.element, 'stripe-submit-error');
      this.removeClass(this.element, 'stripe-submitting');
      this.addClass(this.element, 'stripe-submitted');

      this.stripeSuccess.style.display = 'block';
      if (this.component.stripe.payButton && this.component.stripe.payButton.enable) {
        this.stripeElementPayButton.style.display = 'none';
        this.stripeSeparator.style.display = 'none';
      }
      this.stripeElementCard.style.display = 'none';

      // Store token in hidden input
      this.setValue(result.token.id);

      this.paymentDone = true;
    }

    /**
     * Call Stripe API to get token
     */

  }, {
    key: 'authorize',
    value: function authorize() {
      if (this.paymentDone) {
        return;
      }

      var that = this;
      return new Promise(function (resolve, reject) {
        that.authorizePending();

        // Get all additionnal data to send to Stripe
        var cardData = _lodash2.default.cloneDeep(that.component.stripe.cardData) || {};
        _lodash2.default.each(cardData, function (value, key) {
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
    key: 'onElementCardChange',
    value: function onElementCardChange(result) {
      // If the field is not required and the field is empty, do not throw an error
      if (result.empty && (!this.component.validate || !this.component.validate.required)) {
        delete result.error;
      }

      // Force change when complete or when an error is thrown or fixed
      var changed = result.complete || this.lastResult && !!this.lastResult.error !== !!result.error || this.lastResult && this.lastResult.error && result.error && this.lastResult.error.code !== result.error.code || false;
      this.lastResult = result;

      // When the field is not empty, use "." as value to not trigger "required" validator
      var value = result.empty ? '' : '.';
      this.setValue(value, {
        changed: changed
      });
    }
  }, {
    key: 'beforeSubmit',
    value: function beforeSubmit() {
      // Get the token before submitting when the field is not empty or required
      if (this.lastResult && !this.lastResult.empty || this.component.validate && this.component.validate.required) {
        return this.authorize();
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var _this2 = this;

      _get(StripeComponent.prototype.__proto__ || Object.getPrototypeOf(StripeComponent.prototype), 'build', this).call(this);

      var successLabel = this.component.stripe.payButton.successLabel || 'Payment successful';
      this.stripeSuccess = this.ce('div', {
        class: 'Stripe-success',
        style: 'display: none'
      }, this.t(successLabel));
      this.element.appendChild(this.stripeSuccess);

      // Add container for pay button
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
      }

      // Create container for stripe cart input
      this.stripeElementCard = this.ce('div');
      this.element.appendChild(this.stripeElementCard);

      this.stripeReady.then(function () {
        _this2.stripe = new Stripe(_this2.component.stripe.apiKey);

        // Create an instance of Elements
        var stripeElementsOptions = {};
        if (_this2.component.stripe) {
          stripeElementsOptions = _lodash2.default.cloneDeep(_this2.component.stripe.stripeElementsOptions) || {};
        }
        if (typeof stripeElementsOptions.locale === 'undefined') {
          stripeElementsOptions.locale = _this2.options.language;
        }
        var elements = _this2.stripe.elements(stripeElementsOptions);

        // Create an instance of the card Element
        var stripeElementOptions = {};
        if (_this2.component.stripe) {
          stripeElementOptions = _this2.component.stripe.stripeElementOptions || {};
        }
        _this2.stripeCard = elements.create('card', stripeElementOptions);

        // Add an instance of the card Element into the `card-element` <div>
        _this2.stripeCard.mount(_this2.stripeElementCard);

        // Handle real-time validation errors from the card Element.
        _this2.addEventListener(_this2.stripeCard, 'change', _this2.onElementCardChange.bind(_this2));

        // If there is a pay button, then create it and add listener
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
}(_Base.BaseComponent);