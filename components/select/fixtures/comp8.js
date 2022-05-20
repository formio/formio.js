"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  type: 'form',
  components: [{
    label: 'Number',
    mask: false,
    spellcheck: true,
    tableView: false,
    delimiter: false,
    requireDecimal: false,
    inputFormat: 'plain',
    key: 'number',
    type: 'number',
    input: true
  }, {
    label: 'Select',
    tableView: true,
    data: {
      values: [{
        label: 'a',
        value: 'a'
      }, {
        label: 'b',
        value: 'b'
      }, {
        label: 'c',
        value: 'c'
      }]
    },
    refreshOn: 'number',
    clearOnRefresh: true,
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
  name: 'test',
  path: 'test'
};
exports.default = _default;