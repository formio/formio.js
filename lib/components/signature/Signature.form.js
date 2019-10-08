"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _SignatureEdit = _interopRequireDefault(require("./editForm/Signature.edit.data"));

var _SignatureEdit2 = _interopRequireDefault(require("./editForm/Signature.edit.display"));

var _SignatureEdit3 = _interopRequireDefault(require("./editForm/Signature.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'display',
    components: _SignatureEdit2.default
  }, {
    key: 'data',
    components: _SignatureEdit.default
  }, {
    key: 'validation',
    components: _SignatureEdit3.default
  }]].concat(extend));
}