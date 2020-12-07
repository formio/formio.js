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
  'type': 'panel',
  'components': [{
    'conditional': {
      'eq': '',
      'when': null,
      'show': ''
    },
    'tags': [],
    'type': 'day',
    'validate': {
      'custom': ''
    },
    'clearOnHide': true,
    'persistent': true,
    'protected': false,
    'dayFirst': false,
    'fields': {
      'year': {
        'required': false,
        'placeholder': '',
        'type': 'number'
      },
      'month': {
        'required': false,
        'placeholder': '',
        'type': 'select'
      },
      'day': {
        'required': false,
        'placeholder': '',
        'type': 'number'
      }
    },
    'key': 'date',
    'label': 'Date',
    'tableView': true,
    'input': true
  }],
  'nextPage': null,
  'theme': 'default',
  'title': 'User Information',
  'input': false,
  'disabled': true,
  'key': 'panel1'
};
exports.default = _default;