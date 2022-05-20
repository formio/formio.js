"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _CurrencyEdit = _interopRequireDefault(require("./editForm/Currency.edit.display"));

var _CurrencyEdit2 = _interopRequireDefault(require("./editForm/Currency.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'display',
    components: _CurrencyEdit.default
  }, {
    key: 'data',
    components: _CurrencyEdit2.default
  }, {
    key: 'validation',
    components: [{
      key: 'validate.minLength',
      ignore: true
    }, {
      key: 'validate.maxLength',
      ignore: true
    }, {
      key: 'validate.minWords',
      ignore: true
    }, {
      key: 'validate.maxWords',
      ignore: true
    }, {
      key: 'validate.pattern',
      ignore: true
    }]
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}