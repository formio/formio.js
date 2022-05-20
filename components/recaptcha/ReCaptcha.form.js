"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Components = _interopRequireDefault(require("../Components"));

var _ReCaptchaEdit = _interopRequireDefault(require("./editForm/ReCaptcha.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  return _Components.default.baseEditForm([{
    key: 'display',
    components: _ReCaptchaEdit.default
  }, {
    key: 'data',
    ignore: true
  }, {
    key: 'validation',
    ignore: true
  }, {
    key: 'conditional',
    ignore: true
  }, {
    key: 'logic',
    ignore: true
  }, {
    key: 'addons',
    ignore: true
  }]);
}