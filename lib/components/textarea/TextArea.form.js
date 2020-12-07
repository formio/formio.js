"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _TextAreaEdit = _interopRequireDefault(require("./editForm/TextArea.edit.display"));

var _TextAreaEdit2 = _interopRequireDefault(require("./editForm/TextArea.edit.layout"));

var _TextAreaEdit3 = _interopRequireDefault(require("./editForm/TextArea.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'display',
    components: _TextAreaEdit.default
  }, {
    key: 'validation',
    components: _TextAreaEdit3.default
  }, {
    key: 'layout',
    components: _TextAreaEdit2.default
  }]].concat(extend));
}