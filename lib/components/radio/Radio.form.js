"use strict";

require("core-js/modules/es.object.define-property.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _RadioEdit = _interopRequireDefault(require("./editForm/Radio.edit.data"));

var _RadioEdit2 = _interopRequireDefault(require("./editForm/Radio.edit.display"));

var _RadioEdit3 = _interopRequireDefault(require("./editForm/Radio.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components["default"].baseEditForm.apply(_Components["default"], [[{
    key: 'display',
    components: _RadioEdit2["default"]
  }, {
    key: 'data',
    components: _RadioEdit["default"]
  }, {
    key: 'validation',
    components: _RadioEdit3["default"]
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}