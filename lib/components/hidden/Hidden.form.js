"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _HiddenEdit = _interopRequireDefault(require("./editForm/Hidden.edit.display"));

var _HiddenEdit2 = _interopRequireDefault(require("./editForm/Hidden.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'display',
    components: _HiddenEdit.default
  }, {
    key: 'data',
    components: _HiddenEdit2.default
  }, {
    key: 'validation',
    ignore: true
  }, {
    key: 'conditional',
    ignore: true
  }]].concat(extend));
}