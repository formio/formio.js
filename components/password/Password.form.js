"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _ComponentEdit = _interopRequireDefault(require("../_classes/component/editForm/Component.edit.addons"));

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
  }, {
    label: 'Addons',
    key: 'addons',
    weight: 70,
    components: _ComponentEdit.default
  }]].concat(extend));
}