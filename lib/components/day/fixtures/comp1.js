'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var component = exports.component = {
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
      'type': 'text'
    },
    'month': {
      'required': false,
      'placeholder': '',
      'type': 'select'
    },
    'day': {
      'required': false,
      'placeholder': '',
      'type': 'text'
    }
  },
  'key': 'date',
  'label': 'Date',
  'tableView': true,
  'input': true
};