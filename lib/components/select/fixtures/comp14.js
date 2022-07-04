"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = {
  type: 'form',
  components: [{
    label: 'Select',
    tableView: true,
    data: {
      values: [{
        label: '',
        value: ''
      }]
    },
    selectThreshold: 0.3,
    validate: {
      onlyAvailableItems: false
    },
    key: 'select',
    type: 'select',
    indexeddb: {
      filter: {}
    },
    input: true
  }, {
    type: 'button',
    label: 'Submit',
    key: 'submit',
    disableOnInvalid: true,
    input: true,
    tableView: false
  }],
  title: 'test',
  display: 'form',
  name: 'selectform',
  path: 'selectform'
};
exports["default"] = _default;