"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _FileEdit = _interopRequireDefault(require("./editForm/File.edit.data"));

var _FileEdit2 = _interopRequireDefault(require("./editForm/File.edit.display"));

var _FileEdit3 = _interopRequireDefault(require("./editForm/File.edit.file"));

var _FileEdit4 = _interopRequireDefault(require("./editForm/File.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _FileEdit2.default
  }, {
    key: 'data',
    components: _FileEdit.default
  }, {
    label: 'File',
    key: 'file',
    weight: 5,
    components: _FileEdit3.default
  }, {
    key: 'validation',
    components: _FileEdit4.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}