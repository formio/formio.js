"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _UnknownEdit = _interopRequireDefault(require("./editForm/Unknown.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return {
    components: [{
      type: 'tabs',
      key: 'tabs',
      components: [{
        label: 'Custom',
        key: 'display',
        weight: 0,
        components: _UnknownEdit.default
      }]
    }]
  };
}