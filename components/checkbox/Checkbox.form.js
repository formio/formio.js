"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _CheckboxEdit = _interopRequireDefault(require("./editForm/Checkbox.edit.data"));

var _CheckboxEdit2 = _interopRequireDefault(require("./editForm/Checkbox.edit.display"));

var _CheckboxEdit3 = _interopRequireDefault(require("./editForm/Checkbox.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'data',
    components: _CheckboxEdit.default
  }, {
    key: 'display',
    components: _CheckboxEdit2.default
  }, {
    key: 'validation',
    components: _CheckboxEdit3.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}