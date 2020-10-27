"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  label: 'Time',
  tableView: true,
  multiple: true,
  validate: {
    multiple: true
  },
  key: 'time',
  type: 'time',
  input: true,
  inputMask: '99:99',
  defaultValue: ['10:00:00', '11:00:00']
};
exports.default = _default;