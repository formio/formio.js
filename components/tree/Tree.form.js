"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _TreeEdit = _interopRequireDefault(require("./editForm/Tree.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'data',
    components: _TreeEdit.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}