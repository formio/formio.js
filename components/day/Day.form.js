"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

require("core-js/modules/es.array.concat.js");

var _Components = _interopRequireDefault(require("../Components"));

var _DayEdit = _interopRequireDefault(require("./editForm/Day.edit.data"));

var _DayEdit2 = _interopRequireDefault(require("./editForm/Day.edit.display"));

var _DayEdit3 = _interopRequireDefault(require("./editForm/Day.edit.validation"));

var _DayEdit4 = _interopRequireDefault(require("./editForm/Day.edit.day"));

var _DayEdit5 = _interopRequireDefault(require("./editForm/Day.edit.month"));

var _DayEdit6 = _interopRequireDefault(require("./editForm/Day.edit.year"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default() {
  for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
    extend[_key] = arguments[_key];
  }

  return _Components.default.baseEditForm.apply(_Components.default, [[{
    key: 'display',
    components: _DayEdit2.default
  }, {
    key: 'data',
    components: _DayEdit.default
  }, {
    key: 'validation',
    components: _DayEdit3.default
  }, {
    key: 'day',
    label: 'Day',
    weight: 3,
    components: _DayEdit4.default
  }, {
    key: 'month',
    label: 'Month',
    weight: 3,
    components: _DayEdit5.default
  }, {
    key: 'year',
    label: 'Year',
    weight: 3,
    components: _DayEdit6.default
  }, {
    key: 'addons',
    ignore: true
  }]].concat(extend));
}