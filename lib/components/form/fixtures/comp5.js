"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  type: 'form',
  owner: null,
  components: [{
    title: 'Panel 333',
    collapsible: true,
    key: 'panel333',
    type: 'panel',
    label: 'Panel 333',
    input: false,
    tableView: false,
    components: [{
      label: 'Form',
      tableView: true,
      display: 'form',
      components: [{
        label: 'Text Field',
        tableView: true,
        key: 'textField',
        type: 'textfield',
        input: true
      }],
      key: 'form',
      type: 'form',
      input: true
    }],
    collapsed: true
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }]
};
exports["default"] = _default;