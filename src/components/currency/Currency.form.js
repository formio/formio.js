"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Base = _interopRequireDefault(require("../base/Base.form"));

var _CurrencyEdit = _interopRequireDefault(require("./editForm/Currency.edit.display"));

var _CurrencyEdit2 = _interopRequireDefault(require("./editForm/Currency.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Base.default.apply(void 0, [[{
    key: 'display',
    components: _CurrencyEdit.default
  }, {
    key: 'data',
    components: _CurrencyEdit2.default
  }]].concat(extend));
}