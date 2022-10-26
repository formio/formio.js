"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'form',
  tags: [],
  components: [{
    label: 'Container',
    tableView: false,
    key: 'container',
    type: 'container',
    input: true,
    components: [{
      label: 'Text Field',
      tableView: true,
      validate: {
        required: true,
        minLength: 2
      },
      key: 'textField',
      type: 'textfield',
      input: true
    }]
  }, {
    label: 'Edit Grid',
    tableView: false,
    validate: {
      required: true
    },
    rowDrafts: false,
    key: 'editGrid',
    type: 'editgrid',
    input: true,
    components: [{
      label: 'Text Field',
      tableView: true,
      validate: {
        required: true
      },
      key: 'textField',
      type: 'textfield',
      input: true
    }]
  }, {
    label: 'Submit',
    showValidations: false,
    tableView: false,
    key: 'submit',
    type: 'button',
    input: true,
    saveOnEnter: false
  }],
  title: 'FIO-3715',
  display: 'form',
  name: 'fio3715',
  path: 'fio3715'
};
exports.default = _default;