"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _UnknownEdit = _interopRequireDefault(require("./editForm/Unknown.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return (0, _Base.default)([{
    key: 'display',
    components: _UnknownEdit.default
  }, {
    key: 'data',
    ignore: true
  }, {
    key: 'validation',
    ignore: true
  }, {
    key: 'api',
    ignore: true
  }, {
    key: 'conditional',
    ignore: true
  }, {
    key: 'logic',
    ignore: true
  }]);
}