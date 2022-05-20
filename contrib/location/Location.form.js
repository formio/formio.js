"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Component = _interopRequireDefault(require("../../components/_classes/component/Component.form"));

var _LocationEdit = _interopRequireDefault(require("./editForm/Location.edit.map"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    label: 'Map',
    key: 'map',
    weight: 1,
    components: _LocationEdit.default
  }]].concat(extend));
}