"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Data Grid',
  reorder: false,
  addAnotherPosition: 'bottom',
  defaultOpen: false,
  layoutFixed: false,
  enableRowGroups: false,
  initEmpty: false,
  tableView: true,
  modalEdit: true,
  defaultValue: [{
    textField: '',
    radio1: '',
    email: ''
  }],
  key: 'dataGrid',
  type: 'datagrid',
  input: true,
  components: [{
    label: 'Text Field',
    tableView: true,
    key: 'textField',
    type: 'textfield',
    input: true
  }, {
    label: 'Number',
    mask: false,
    spellcheck: true,
    tableView: true,
    delimiter: false,
    requireDecimal: false,
    inputFormat: 'plain',
    key: 'number',
    type: 'number',
    input: true
  }, {
    label: 'Radio',
    optionsLabelPosition: 'right',
    inline: false,
    tableView: true,
    values: [{
      label: 'Ra',
      value: 'ra',
      shortcut: ''
    }, {
      label: 'Rb',
      value: 'rb',
      shortcut: ''
    }, {
      label: 'Rc',
      value: 'rc',
      shortcut: ''
    }],
    key: 'radio1',
    type: 'radio',
    input: true
  }, {
    label: 'Email',
    tableView: true,
    key: 'email',
    type: 'email',
    input: true
  }]
};
exports.default = _default;