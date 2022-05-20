"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _TextField = _interopRequireDefault(require("../textfield/TextField.form"));

var _PhoneNumberEdit = _interopRequireDefault(require("./editForm/PhoneNumber.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextField.default.apply(void 0, [[{
    key: 'display',
    components: [{
      key: 'showWordCount',
      ignore: true
    }, {
      key: 'showCharCount',
      ignore: true
    }]
  }, {
    key: 'validation',
    components: _PhoneNumberEdit.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}