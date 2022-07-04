"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  type: 'form',
  components: [{
    label: 'Edit Grid',
    openWhenEmpty: true,
    tableView: false,
    rowDrafts: false,
    key: 'editGrid',
    type: 'editgrid',
    input: true,
    components: [{
      label: 'Text Field',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true
    }]
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }],
  title: 'FIO-2819',
  display: 'form',
  name: 'fio2819'
};
exports["default"] = _default;