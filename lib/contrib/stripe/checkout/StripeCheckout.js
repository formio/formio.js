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

var _Button = _interopRequireDefault(require("../../../components/button/Button"));

var _Formio = _interopRequireDefault(require("../../../Formio"));

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

var StripeCheckoutComponent = /*#__PURE__*/function (_ButtonComponent) {
  _inherits(StripeCheckoutComponent, _ButtonComponent);

  var _super = _createSuper(StripeCheckoutComponent);

  function StripeCheckoutComponent(component, options, data) {
    var _this;

    _classCallCheck(this, StripeCheckoutComponent);

    _this = _super.call(this, component, options, data); // Get the source for Stripe API

    var src = 'https://checkout.stripe.com/checkout.js';
    /**
     * Promise when Stripe is ready.
     * @type {Promise}
     */

    _this.stripeCheckoutReady = _Formio.default.requireLibrary('stripeCheckout', 'StripeCheckout', src, true);
    /**
     * Keep initial component action
     * @type {String}
     */

    _this.componentAction = _this.component.action; // Force button to handle event action to build button

    _this.component.action = 'event';
    return _this;
  }

  _createClass(StripeCheckoutComponent, [{
    key: "getValue",
    value: function getValue() {
      return this.dataValue;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.updateValue(value, flags);
    }
    /**
     * Handle event dispatched by Stripe library
     * @param {Object} token - The token returned by Stripe.
     */

  }, {
    key: "onToken",
    value: function onToken(token) {
      this.setValue(token.id); // In case of submit, submit the form

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
    key: "onClickButton",
    value: function onClickButton(event) {
      var _this2 = this;

      // Return if component call is not the current component
      if (this.component.key !== event.component.key) {
        return;
      } // Open Checkout with further options:


      var popupConfiguration = _lodash.default.cloneDeep(this.component.stripe.popupConfiguration) || {};

      _lodash.default.each(popupConfiguration, function (value, key) {
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
    key: "build",
    value: function build() {
      var _this3 = this;

      // Build button
      _get(_getPrototypeOf(StripeCheckoutComponent.prototype), "build", this).call(this); // In case of submit, add event listeners


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
      } // When stripe checkout is ready, create the handler and add event listeners


      this.stripeCheckoutReady.then(function () {
        var handlerConfiguration = _lodash.default.cloneDeep(_this3.component.stripe.handlerConfiguration) || {};
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
  }], [{
    key: "builderInfo",
    get: function get() {
      return {
        group: false,
        schema: _Button.default.schema()
      };
    }
  }]);

  return StripeCheckoutComponent;
}(_Button.default);

exports.default = StripeCheckoutComponent;

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.Formio && global.Formio.registerComponent) {
  global.Formio.registerComponent('stripeCheckout', StripeCheckoutComponent);
}