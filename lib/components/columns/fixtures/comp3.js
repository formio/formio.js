"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  label: 'Columns',
  columns: [{
    components: [{
      label: 'Text Field',
      tableView: true,
      key: 'textField',
      type: 'textfield',
      input: true,
      hideOnChildrenHidden: false
    }],
    width: 6,
    offset: 0,
    push: 0,
    pull: 0,
    size: 'md',
    currentWidth: 6
  }, {
    components: [{
      label: 'Number',
      mask: false,
      tableView: false,
      delimiter: false,
      requireDecimal: false,
      inputFormat: 'plain',
      truncateMultipleSpaces: false,
      key: 'number',
      type: 'number',
      input: true,
      hideOnChildrenHidden: false
    }],
    width: 6,
    offset: 0,
    push: 0,
    pull: 0,
    size: 'md',
    currentWidth: 6
  }],
  modalEdit: true,
  key: 'columns',
  type: 'columns',
  input: false,
  tableView: false
};
exports["default"] = _default;