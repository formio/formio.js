"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _TextArea = _interopRequireDefault(require("../textarea/TextArea.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _TextArea.default.apply(void 0, [[{
    key: 'display',
    components: [{
      key: 'rows',
      ignore: true
    }, {
      key: 'multiple',
      ignore: true
    }]
  }]].concat(extend));
}