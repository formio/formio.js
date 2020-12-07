"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _DataMapEdit = _interopRequireDefault(require("./editForm/DataMap.edit.data"));

var _DataMapEdit2 = _interopRequireDefault(require("./editForm/DataMap.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'display',
    components: _DataMapEdit2.default
  }, {
    key: 'data',
    components: _DataMapEdit.default
  }]].concat(extend));
}