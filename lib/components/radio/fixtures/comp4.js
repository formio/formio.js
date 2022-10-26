"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Radio',
  optionsLabelPosition: 'right',
  inline: false,
  tableView: false,
  defaultValue: false,
  values: [{
    label: 'Yes',
    value: 'true',
    shortcut: ''
  }, {
    label: 'No',
    value: 'false',
    shortcut: ''
  }],
  validate: {
    onlyAvailableItems: false
  },
  key: 'radio1',
  type: 'radio',
  input: true
};
exports.default = _default;