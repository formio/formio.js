"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _NumberEdit = _interopRequireDefault(require("./editForm/Number.edit.data"));

var _NumberEdit2 = _interopRequireDefault(require("./editForm/Number.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'data',
    components: _NumberEdit.default
  }, {
    key: 'validation',
    components: _NumberEdit2.default
  }]].concat(extend));
}