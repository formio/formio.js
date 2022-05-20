"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _DataMapEdit = _interopRequireDefault(require("./editForm/DataMap.edit.data"));

var _DataMapEdit2 = _interopRequireDefault(require("./editForm/DataMap.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _DataMapEdit2.default
  }, {
    key: 'data',
    components: _DataMapEdit.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}