"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  '_id': '5ece2d11b8c2fe102c726057',
  'type': 'form',
  'owner': '5e05a6b7549cdc2ece30c6b0',
  'components': [{
    'label': 'Edit Grid',
    'tableView': false,
    'modal': true,
    'validate': {
      'required': true
    },
    'key': 'editGrid',
    'type': 'editgrid',
    'input': true,
    'components': [{
      'label': 'Text Field',
      'tableView': true,
      'validate': {
        'required': true,
        'minLength': 4
      },
      'key': 'textField',
      'type': 'textfield',
      'input': true
    }]
  }, {
    'label': 'Submit',
    'showValidations': false,
    'tableView': false,
    'key': 'submit',
    'type': 'button',
    'input': true
  }],
  'controller': '',
  'revisions': '',
  '_vid': 0,
  'title': 'modalEditGridConfirm',
  'display': 'form',
  'access': [{
    'roles': ['5e96e79ee1c3ad3178454100', '5e96e79ee1c3ad3178454101', '5e96e79ee1c3ad3178454102'],
    'type': 'read_all'
  }],
  'name': 'modalEditGridConfirm',
  'path': 'modaleditgridconfirm'
};
exports.default = _default;