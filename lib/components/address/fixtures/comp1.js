"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'input': true,
  'tableView': true,
  'label': 'address',
  'key': 'address',
  'placeholder': '',
  'multiple': false,
  'protected': false,
  'clearOnHide': true,
  'unique': false,
  'persistent': true,
  'provider': 'nominatim',
  'validate': {
    'customPrivate': false,
    'custom': '',
    'required': false
  },
  'type': 'address',
  'tags': [],
  'conditional': {
    'show': '',
    'when': null,
    'eq': ''
  },
  'components': [{
    label: 'Street',
    tableView: true,
    key: 'street',
    type: 'textfield',
    input: true
  }, {
    label: 'City',
    tableView: true,
    key: 'city',
    type: 'textfield',
    input: true
  }, {
    label: 'County',
    tableView: true,
    key: 'county',
    type: 'textfield',
    input: true
  }, {
    label: 'State',
    tableView: true,
    key: 'state',
    type: 'textfield',
    input: true
  }, {
    label: 'Zip Code',
    tableView: true,
    key: 'zip',
    type: 'textfield',
    input: true
  }, {
    label: 'Country',
    tableView: true,
    key: 'country',
    type: 'textfield',
    input: true
  }]
};
exports.default = _default;