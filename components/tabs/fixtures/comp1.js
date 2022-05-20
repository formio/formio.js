"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Tabs',
  components: [{
    label: 'Tab 1',
    key: 'tab1',
    components: []
  }, {
    label: 'Tab 2',
    key: 'tab2',
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
  }],
  key: 'tabs',
  type: 'tabs',
  input: false,
  tableView: false,
  modalEdit: true
};
exports.default = _default;