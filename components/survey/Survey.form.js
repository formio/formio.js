"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _SurveyEdit = _interopRequireDefault(require("./editForm/Survey.edit.data"));

var _SurveyEdit2 = _interopRequireDefault(require("./editForm/Survey.edit.display"));

var _SurveyEdit3 = _interopRequireDefault(require("./editForm/Survey.edit.validation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _SurveyEdit2.default
  }, {
    key: 'data',
    components: _SurveyEdit.default
  }, {
    key: 'validation',
    components: _SurveyEdit3.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}