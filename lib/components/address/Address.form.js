"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _AddressEdit = _interopRequireDefault(require("./editForm/Address.edit.data"));

var _AddressEdit2 = _interopRequireDefault(require("./editForm/Address.edit.display"));

var _AddressEdit3 = _interopRequireDefault(require("./editForm/Address.edit.provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'data',
    components: _AddressEdit.default
  }, {
    key: 'display',
    components: _AddressEdit2.default
  }, {
    label: 'Provider',
    key: 'provider',
    weight: 15,
    components: _AddressEdit3.default
  }]].concat(extend));
}