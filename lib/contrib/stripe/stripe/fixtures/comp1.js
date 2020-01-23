"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'input': true,
  'tableView': true,
  'label': 'stripe',
  'key': 'stripe',
  'placeholder': '',
  'multiple': false,
  'protected': false,
  'clearOnHide': true,
  'unique': false,
  'persistent': true,
  'action': 'button',
  'stripe': {
    'apiKey': '',
    'payButton': {
      'enable': false,
      'separatorLabel': 'Or',
      'paymentRequest': {},
      'stripeOptions': {}
    },
    'cardData': {},
    'successLabel': 'Payment successful',
    'stripeElementsOptions': {},
    'stripeElementOptions': {}
  },
  'validate': {
    'required': true
  },
  'type': 'stripe',
  'tags': [],
  'conditional': {
    'show': '',
    'when': null,
    'eq': ''
  }
};
exports.default = _default;