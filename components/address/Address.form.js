"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _AddressEdit = _interopRequireDefault(require("./editForm/Address.edit.data"));

var _AddressEdit2 = _interopRequireDefault(require("./editForm/Address.edit.display"));

var _AddressEdit3 = _interopRequireDefault(require("./editForm/Address.edit.provider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
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
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}