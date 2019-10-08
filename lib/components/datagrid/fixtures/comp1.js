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
  'type': 'datagrid',
  'persistent': true,
  'protected': false,
  'key': 'cars',
  'label': 'Cars',
  'tableView': true,
  'components': [{
    'tags': [],
    'hideLabel': true,
    'type': 'textfield',
    'conditional': {
      'eq': '',
      'when': null,
      'show': ''
    },
    'validate': {
      'customPrivate': false,
      'custom': '',
      'pattern': '',
      'maxLength': '',
      'minLength': '',
      'required': false
    },
    'persistent': true,
    'unique': false,
    'protected': false,
    'defaultValue': '',
    'multiple': false,
    'suffix': '',
    'prefix': '',
    'placeholder': '',
    'key': 'make',
    'label': 'Make',
    'inputMask': '',
    'inputType': 'text',
    'tableView': true,
    'input': true
  }, {
    'tags': [],
    'hideLabel': true,
    'type': 'textfield',
    'conditional': {
      'eq': '',
      'when': null,
      'show': ''
    },
    'validate': {
      'customPrivate': false,
      'custom': '',
      'pattern': '',
      'maxLength': '',
      'minLength': '',
      'required': false
    },
    'persistent': true,
    'unique': false,
    'protected': false,
    'defaultValue': '',
    'multiple': false,
    'suffix': '',
    'prefix': '',
    'placeholder': '',
    'key': 'model',
    'label': 'Model',
    'inputMask': '',
    'inputType': 'text',
    'tableView': true,
    'input': true
  }, {
    'conditional': {
      'eq': '',
      'when': null,
      'show': ''
    },
    'tags': [],
    'hideLabel': true,
    'type': 'number',
    'validate': {
      'custom': '',
      'multiple': '',
      'integer': '',
      'step': 'any',
      'max': '',
      'min': '',
      'required': false
    },
    'persistent': true,
    'protected': false,
    'defaultValue': '',
    'suffix': '',
    'prefix': '',
    'placeholder': '',
    'key': 'year',
    'label': 'Year',
    'inputType': 'number',
    'delimiter': true,
    'tableView': true,
    'input': true
  }],
  'tree': true,
  'input': true
};
exports.default = _default;