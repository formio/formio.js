"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'type': 'form',
  'components': [{
    'label': 'Edit Grid',
    'tableView': false,
    'rowDrafts': false,
    'key': 'editGrid',
    'type': 'editgrid',
    'input': true,
    'components': [{
      'label': 'Container',
      'tableView': false,
      'key': 'container',
      'type': 'container',
      'input': true,
      'components': [{
        'label': 'Number',
        'mask': false,
        'tableView': false,
        'delimiter': false,
        'requireDecimal': false,
        'inputFormat': 'plain',
        'key': 'number',
        'type': 'number',
        'input': true
      }, {
        'label': 'Text Field',
        'tableView': true,
        'validate': {
          'required': true
        },
        'key': 'textField',
        'customConditional': 'show = row.number === 5;',
        'type': 'textfield',
        'input': true
      }]
    }]
  }, {
    'type': 'button',
    'label': 'Submit',
    'key': 'submit',
    'disableOnInvalid': true,
    'input': true,
    'tableView': false
  }],
  'title': 'test form',
  'display': 'form'
};
exports.default = _default;