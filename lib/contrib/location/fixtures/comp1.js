"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'input': true,
  'tableView': true,
  'label': 'Location',
  'key': 'location',
  'placeholder': '',
  'multiple': false,
  'protected': false,
  'clearOnHide': true,
  'unique': false,
  'persistent': true,
  'map': {
    'gmapId': '',
    'region': '',
    'key': '',
    'autocompleteOptions': {
      'componentRestrictions': {
        'country': ['']
      }
    }
  },
  'validate': {
    'required': false
  },
  'type': 'location',
  'tags': [],
  'conditional': {
    'show': '',
    'when': null,
    'eq': ''
  }
};
exports.default = _default;