"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  _id: '5ec5107f54969741745be8c2',
  type: 'form',
  tags: [],
  owner: '5e05a6b7549cdc2ece30c6b0',
  components: [{
    label: 'Time',
    inputType: 'text',
    tableView: true,
    validate: {
      required: true
    },
    key: 'time',
    type: 'time',
    format: 'HH:mm A',
    input: true,
    inputMask: '99:99 AA'
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }],
  controller: '',
  revisions: '',
  _vid: 0,
  title: 'time',
  display: 'form',
  access: [{
    roles: ['5e96e79ee1c3ad3178454100', '5e96e79ee1c3ad3178454101', '5e96e79ee1c3ad3178454102'],
    type: 'read_all'
  }],
  submissionAccess: [],
  settings: {},
  properties: {},
  name: 'time',
  path: 'time',
  project: '5e96e79ee1c3ad31784540ff'
};
exports.default = _default;