"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _UrlEdit = _interopRequireDefault(require("./editForm/Url.edit.display"));

var _UrlEdit2 = _interopRequireDefault(require("./editForm/Url.edit.data"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'display',
    components: _UrlEdit.default
  }, {
    key: 'data',
    components: _UrlEdit2.default
  }]].concat(extend));
}