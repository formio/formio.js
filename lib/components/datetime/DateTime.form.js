"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _Component = _interopRequireDefault(require("../_classes/component/Component.form"));

var _DateTimeEdit = _interopRequireDefault(require("./editForm/DateTime.edit.data"));

var _DateTimeEdit2 = _interopRequireDefault(require("./editForm/DateTime.edit.date"));

var _DateTimeEdit3 = _interopRequireDefault(require("./editForm/DateTime.edit.display"));

var _DateTimeEdit4 = _interopRequireDefault(require("./editForm/DateTime.edit.time"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Component.default.apply(void 0, [[{
    key: 'display',
    components: _DateTimeEdit3.default
  }, {
    label: 'Date',
    key: 'date',
    weight: 1,
    components: _DateTimeEdit2.default
  }, {
    label: 'Time',
    key: 'time',
    weight: 2,
    components: _DateTimeEdit4.default
  }, {
    key: 'data',
    components: _DateTimeEdit.default
  }]].concat(extend));
}