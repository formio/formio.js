"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _TextFieldEdit = _interopRequireDefault(require("./editForm/TextField.edit.data"));

var _TextFieldEdit2 = _interopRequireDefault(require("./editForm/TextField.edit.display"));

var _TextFieldEdit3 = _interopRequireDefault(require("./editForm/TextField.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'display',
    components: _TextFieldEdit2.default
  }, {
    key: 'data',
    components: _TextFieldEdit.default
  }, {
    key: 'validation',
    components: _TextFieldEdit3.default
  }]].concat(extend));
}