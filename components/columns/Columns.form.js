"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _NestedComponent = _interopRequireDefault(require("../_classes/nested/NestedComponent.form"));

var _ColumnsEdit = _interopRequireDefault(require("./editForm/Columns.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _NestedComponent.default.apply(void 0, [[{
    key: 'display',
    components: _ColumnsEdit.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}