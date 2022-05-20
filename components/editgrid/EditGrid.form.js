"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _EditGridEdit = _interopRequireDefault(require("./editForm/EditGrid.edit.data"));

var _EditGridEdit2 = _interopRequireDefault(require("./editForm/EditGrid.edit.display"));

var _EditGridEdit3 = _interopRequireDefault(require("./editForm/EditGrid.edit.templates"));

var _EditGridEdit4 = _interopRequireDefault(require("./editForm/EditGrid.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    label: 'Templates',
    key: 'templates',
    weight: 5,
    components: _EditGridEdit3.default
  }, {
    key: 'display',
    components: _EditGridEdit2.default
  }, {
    key: 'data',
    components: _EditGridEdit.default
  }, {
    key: 'validation',
    components: _EditGridEdit4.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}