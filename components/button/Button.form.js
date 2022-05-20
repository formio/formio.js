"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _ButtonEdit = _interopRequireDefault(require("./editForm/Button.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _ButtonEdit.default
  }, {
    key: 'data',
    ignore: true
  }, {
    key: 'validation',
    ignore: true
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}