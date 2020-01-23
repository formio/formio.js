"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _PasswordEdit = _interopRequireDefault(require("./editForm/Password.edit.display"));

var _PasswordEdit2 = _interopRequireDefault(require("./editForm/Password.edit.data"));

var _PasswordEdit3 = _interopRequireDefault(require("./editForm/Password.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'data',
    components: _PasswordEdit2.default
  }, {
    key: 'display',
    components: _PasswordEdit.default
  }, {
    key: 'validation',
    components: _PasswordEdit3.default
  }]].concat(extend));
}