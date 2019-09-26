"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'type': 'stripeCheckout',
  'theme': 'primary',
  'disableOnInvalid': false,
  'action': 'button',
  'block': false,
  'rightIcon': '',
  'leftIcon': '',
  'size': 'md',
  'key': 'card',
  'tableView': false,
  'label': 'Authorize payment',
  'input': true,
  'stripe': {
    'apiKey': '',
    'handlerConfiguration': {},
    'popupConfiguration': {}
  }
};
exports.default = _default;