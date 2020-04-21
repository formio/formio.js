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
  'minDate': '2020-02-04',
  'maxDate': '2020-02-09',
  'clearOnHide': true,
  'persistent': true,
  'protected': false,
  'dayFirst': true,
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