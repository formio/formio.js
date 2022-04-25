"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'input': true,
  'tree': true,
  'components': [{
    'input': true,
    'tableView': true,
    'inputType': 'text',
    'inputMask': '',
    'label': 'First Name',
    'key': 'firstName',
    'placeholder': '',
    'prefix': '',
    'suffix': '',
    'multiple': false,
    'defaultValue': '',
    'protected': false,
    'unique': false,
    'persistent': true,
    'validate': {
      'required': false,
      'minLength': '',
      'maxLength': '',
      'pattern': '',
      'custom': '',
      'customPrivate': false
    },
    'conditional': {
      'show': '',
      'when': null,
      'eq': ''
    },
    'type': 'textfield',
    'tags': []
  }, {
    'input': true,
    'tableView': true,
    'inputType': 'text',
    'inputMask': '',
    'label': 'Last Name',
    'key': 'lastName',
    'placeholder': '',
    'prefix': '',
    'suffix': '',
    'multiple': false,
    'defaultValue': '',
    'protected': false,
    'unique': false,
    'persistent': true,
    'validate': {
      'required': false,
      'minLength': '',
      'maxLength': '',
      'pattern': '',
      'custom': '',
      'customPrivate': false
    },
    'conditional': {
      'show': '',
      'when': null,
      'eq': ''
    },
    'type': 'textfield',
    'tags': []
  }],
  'tableView': true,
  'label': 'User',
  'key': 'user',
  'protected': false,
  'persistent': true,
  'type': 'container',
  'tags': [],
  'conditional': {
    'show': '',
    'when': null,
    'eq': ''
  }
};
exports.default = _default;