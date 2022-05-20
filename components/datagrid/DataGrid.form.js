"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _DataGridEdit = _interopRequireDefault(require("./editForm/DataGrid.edit.data"));

var _DataGridEdit2 = _interopRequireDefault(require("./editForm/DataGrid.edit.display"));

var _DataGridEdit3 = _interopRequireDefault(require("./editForm/DataGrid.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _DataGridEdit2.default
  }, {
    key: 'data',
    components: _DataGridEdit.default
  }, {
    key: 'validation',
    components: _DataGridEdit3.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}