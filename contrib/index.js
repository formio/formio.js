"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _Stripe = _interopRequireDefault(require("./stripe/stripe/Stripe"));

var _StripeCheckout = _interopRequireDefault(require("./stripe/checkout/StripeCheckout"));

var _Location = _interopRequireDefault(require("./location/Location"));

var _EditTable = _interopRequireDefault(require("./edittable/EditTable"));

var _ModalEdit = _interopRequireDefault(require("./modaledit/ModalEdit"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var Contrib = {
  stripe: {
    stripe: _Stripe.default,
    checkout: _StripeCheckout.default
  },
  location: _Location.default,
  edittable: _EditTable.default,
  modaledit: _ModalEdit.default
};
var _default = Contrib;
exports.default = _default;

if ((typeof global === "undefined" ? "undefined" : _typeof(global)) === 'object' && global.Formio) {
  global.Formio.contrib = Contrib;
}