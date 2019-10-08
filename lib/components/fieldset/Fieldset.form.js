"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _NestedComponent = _interopRequireDefault(require("../_classes/nested/NestedComponent.form"));

var _FieldsetEdit = _interopRequireDefault(require("./editForm/Fieldset.edit.display"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _NestedComponent.default.apply(void 0, [[{
    key: 'display',
    components: _FieldsetEdit.default
  }]].concat(extend));
}