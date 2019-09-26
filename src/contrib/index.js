"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Stripe = _interopRequireDefault(require("./stripe/stripe/Stripe"));

var _StripeCheckout = _interopRequireDefault(require("./stripe/checkout/StripeCheckout"));

var _sketchpad = _interopRequireDefault(require("./sketchpad/sketchpad"));

var _tagpad = _interopRequireDefault(require("./tagpad/tagpad"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var Contrib = {
  stripe: {
    stripe: _Stripe.default,
    checkout: _StripeCheckout.default
  },
  sketchpad: _sketchpad.default,
  tagpad: _tagpad.default
};
var _default = Contrib;
exports.default = _default;

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;

  if (global.Formio.Components) {
    global.Formio.Components.setComponents(Contrib);
  } else {
    console.log('Failed to register contrib components');
  }
}