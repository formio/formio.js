"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _NestedComponent = _interopRequireDefault(require("../_classes/nested/NestedComponent.form"));

var _PanelEdit = _interopRequireDefault(require("./editForm/Panel.edit.display"));

var _PanelEdit2 = _interopRequireDefault(require("./editForm/Panel.edit.conditional"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _NestedComponent.default.apply(void 0, [[{
    key: 'display',
    components: _PanelEdit.default
  }, {
    key: 'conditional',
    components: _PanelEdit2.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}