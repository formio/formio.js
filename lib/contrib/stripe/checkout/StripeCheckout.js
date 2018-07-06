'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StripeCheckoutComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../../../components/base/Base');

var _Button = require('../../../components/button/Button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* globals StripeCheckout */


var StripeCheckoutComponent = exports.StripeCheckoutComponent = function (_ButtonComponent) {
  _inherits(StripeCheckoutComponent, _ButtonComponent);

  function StripeCheckoutComponent(component, options, data) {
    _classCallCheck(this, StripeCheckoutComponent);

    // Get the source for Stripe API
    var _this = _possibleConstructorReturn(this, (StripeCheckoutComponent.__proto__ || Object.getPrototypeOf(StripeCheckoutComponent)).call(this, component, options, data));

    var src = 'https://checkout.stripe.com/checkout.js';

    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */
    _this.stripeCheckoutReady = _Base.BaseComponent.requireLibrary('stripeCheckout', 'StripeCheckout', src, true);

    /**
     * Keep initial component action
     * @type {String}
     */
    _this.componentAction = _this.component.action;

    // Force button to handle event action to build button
    _this.component.action = 'event';
    return _this;
  }

  _createClass(StripeCheckoutComponent, [{
    key: 'getValue',
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      return this.updateValue(flags);
    }

    /**
     * Handle event dispatched by Stripe library
     * @param {Object} token - The token returned by Stripe.
     */

  }, {
    key: 'onToken',
    value: function onToken(token) {
      this.setValue(token.id);
      // In case of submit, submit the form
      if (this.componentAction === 'submit') {
        this.emit('submitButton');
      } else {
        this.addClass(this.element, 'btn-success');
        this.disabled = true;
      }
    }

    /**
     * Handle customEvent event on the button
     * @param {Object} event - The event returned by ButtonComponent.
     */

  }, {
    key: 'onClickButton',
    value: function onClickButton(event) {
      var _this2 = this;

      // Return if component call is not the current component
      if (this.component.key !== event.component.key) {
        return;
      }

      // Open Checkout with further options:
      var popupConfiguration = _lodash2.default.cloneDeep(this.component.stripe.popupConfiguration) || {};
      _lodash2.default.each(popupConfiguration, function (value, key) {
        popupConfiguration[key] = _this2.t(value);
      });

      if (this.componentAction === 'submit') {
        // In case of submit, validate the form before opening button
        if (this.root.isValid(event.data, true)) {
          this.handler.open(popupConfiguration);
        } else {
          // If the form is not valid, submit it to draw errors
          this.emit('submitButton');
        }
      } else {
        this.handler.open(popupConfiguration);
      }
    }
  }, {
    key: 'build',
    value: function build() {
      var _this3 = this;

      // Build button
      _get(StripeCheckoutComponent.prototype.__proto__ || Object.getPrototypeOf(StripeCheckoutComponent.prototype), 'build', this).call(this);

      // In case of submit, add event listeners
      if (this.componentAction === 'submit') {
        this.on('submitButton', function () {
          _this3.loading = true;
          _this3.disabled = true;
        }, true);
        this.on('submitDone', function () {
          _this3.loading = false;
          _this3.disabled = false;
        }, true);
        this.on('change', function (value) {
          _this3.loading = false;
          _this3.disabled = _this3.component.disableOnInvalid && !_this3.root.isValid(value.data, true);
        }, true);
        this.on('error', function () {
          _this3.loading = false;
        }, true);
      }

      // When stripe checkout is ready, create the handler and add event listeners
      this.stripeCheckoutReady.then(function () {
        var handlerConfiguration = _lodash2.default.cloneDeep(_this3.component.stripe.handlerConfiguration) || {};
        handlerConfiguration.key = _this3.component.stripe.apiKey;
        handlerConfiguration.token = _this3.onToken.bind(_this3);
        if (typeof handlerConfiguration.locale === 'undefined') {
          handlerConfiguration.locale = _this3.options.language;
        }
        _this3.handler = StripeCheckout.configure(handlerConfiguration);

        _this3.on('customEvent', _this3.onClickButton.bind(_this3));

        _this3.addEventListener(window, 'popstate', function () {
          _this3.handler.close();
        });
      });
    }
  }]);

  return StripeCheckoutComponent;
}(_Button.ButtonComponent);