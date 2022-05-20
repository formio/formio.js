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
};
exports.default = _default;