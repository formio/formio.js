"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _HiddenEdit = _interopRequireDefault(require("./editForm/Hidden.edit.display"));

var _HiddenEdit2 = _interopRequireDefault(require("./editForm/Hidden.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
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
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}