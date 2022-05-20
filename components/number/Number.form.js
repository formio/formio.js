"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _NumberEdit = _interopRequireDefault(require("./editForm/Number.edit.display"));

var _NumberEdit2 = _interopRequireDefault(require("./editForm/Number.edit.data"));

var _NumberEdit3 = _interopRequireDefault(require("./editForm/Number.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'display',
    components: _NumberEdit.default
  }, {
    key: 'data',
    components: _NumberEdit2.default
  }, {
    key: 'validation',
    components: _NumberEdit3.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}