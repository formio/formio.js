"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;
require("core-js/modules/es.array.concat.js");
var _Components = _interopRequireDefault(require("../../Components"));
var _ListComponentEdit = _interopRequireDefault(require("./editForm/ListComponent.edit.data"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }
  return _Components["default"].baseEditForm.apply(_Components["default"], [[{
    key: 'data',
    components: _ListComponentEdit["default"]
  }]].concat(extend));
}