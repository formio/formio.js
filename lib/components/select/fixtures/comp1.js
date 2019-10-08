"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'conditional': {
    'eq': '',
    'when': null,
    'show': ''
  },
  'tags': [],
  'type': 'select',
  'validate': {
    'required': false
  },
  'persistent': true,
  'unique': false,
  'protected': false,
  'multiple': false,
  'template': '<span>{{ item.label }}</span>',
  'authenticate': false,
  'filter': '',
  'refreshOn': '',
  'defaultValue': '',
  'valueProperty': '',
  'dataSrc': 'values',
  'data': {
    'custom': '',
    'resource': '',
    'url': '',
    'json': '',
    'values': [{
      'label': 'Red',
      'value': 'red'
    }, {
      'label': 'Blue',
      'value': 'blue'
    }, {
      'label': 'Green',
      'value': 'green'
    }, {
      'label': 'Yellow',
      'value': 'yellow'
    }, {
      'label': 'Purple',
      'value': 'purple'
    }, {
      'label': 'Orange',
      'value': 'orange'
    }, {
      'label': 'Black',
      'value': 'black'
    }]
  },
  'placeholder': 'Enter your favorite color',
  'key': 'favoriteColor',
  'label': 'Favorite Color',
  'tableView': true,
  'input': true
};
exports.default = _default;