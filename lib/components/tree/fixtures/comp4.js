"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'form',
  owner: null,
  components: [{
    label: 'Tree',
    tableView: false,
    key: 'tree',
    type: 'tree',
    input: true,
    tree: true,
    components: [{
      title: 'Required validation',
      collapsible: false,
      key: 'panel',
      type: 'panel',
      label: 'Panel',
      input: false,
      tableView: false,
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
    }]
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }]
};
exports.default = _default;