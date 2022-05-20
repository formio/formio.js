"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Radio = _interopRequireDefault(require("../radio/Radio.form"));

var _SelectBoxesEdit = _interopRequireDefault(require("./editForm/SelectBoxes.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Radio.default.apply(void 0, [[{
    key: 'data',
    components: [{
      key: 'dataType',
      ignore: true
    }]
  }, {
    key: 'validation',
    components: _SelectBoxesEdit.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}