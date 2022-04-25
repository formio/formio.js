"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Evaluator = _interopRequireDefault(require("../../../utils/Evaluator"));

var _utils = _interopRequireDefault(require("../../_classes/component/editForm/utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = [{
  type: 'checkbox',
  input: true,
  key: 'enableDate',
  label: 'Enable Date Input',
  weight: 0,
  tooltip: 'Enables date input for this field.'
}, {
  type: 'checkbox',
  input: true,
  key: 'enableMinDateInput',
  label: 'Use Input to add moment.js for minDate',
  persistent: false,
  weight: 0,
  tooltip: 'Enables to use input for moment functions instead of calendar.'
}, {
  type: 'datetime',
  input: true,
  key: 'datePicker.minDate',
  label: 'Use calendar to set minDate',
  weight: 10,
  tooltip: 'Enables to use calendar to set date.',
  customConditional: function customConditional(_ref) {
    var data = _ref.data,
        component = _ref.component;

    if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {
      return false;
    }

    return !data.enableMinDateInput;
  }
}, {
  type: 'textfield',
  input: true,
  enableTime: false,
  key: 'datePicker.minDate',
  label: 'Minimum Date',
  tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
  customConditional: function customConditional(_ref2) {
    var data = _ref2.data,
        component = _ref2.component;

    if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {
      return true;
    }

    return data.enableMinDateInput;
  },
  weight: 10
}, {
  type: 'checkbox',
  input: true,
  key: 'enableMaxDateInput',
  label: 'Use Input to add moment.js for maxDate',
  persistent: false,
  weight: 20,
  tooltip: 'Enables to use input for moment functions instead of calendar.'
}, {
  type: 'textfield',
  input: true,
  enableTime: false,
  key: 'datePicker.maxDate',
  label: 'Maximum Date',
  tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
  weight: 20,
  customConditional: function customConditional(_ref3) {
    var data = _ref3.data,
        component = _ref3.component;

    if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {
      return true;
    }

    return data.enableMaxDateInput;
  }
}, {
  type: 'datetime',
  input: true,
  key: 'datePicker.maxDate',
  label: 'Use calendar to set maxDate',
  weight: 20,
  tooltip: 'Enables to use calendar to set date.',
  customConditional: function customConditional(_ref4) {
    var data = _ref4.data,
        component = _ref4.component;

    if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {
      return false;
    }

    return !data.enableMaxDateInput;
  }
}, {
  type: 'tags',
  input: true,
  key: 'datePicker.disable',
  label: 'Disable specific dates or dates by range',
  placeholder: '(yyyy-MM-dd) or (yyyy-MM-dd - yyyy-MM-dd)',
  tooltip: 'Add dates that you want to blacklist. For example: \n \n 2025-02-21',
  validate: {
    custom: 'if (_.isEmpty(input)) {\n  return true;\n}\nconst dates = _.isArray(input) ?\ninput : input.split(component.delimeter);\nconst isValid = _.every(dates, (data) => \n  !!data.match(/\\d{4}-\\d{2}-\\d{2}/g));\nvalid = isValid || \'Invalid date\';'
  },
  weight: 21
}, {
  type: 'panel',
  title: 'Custom Disabled Dates',
  collapsible: true,
  collapsed: true,
  style: {
    'margin-bottom': '10px'
  },
  key: 'panel-disable-function',
  customConditional: function customConditional() {
    return !_Evaluator.default.noeval || _Evaluator.default.protectedEval;
  },
  components: [_utils.default.logicVariablesTable('<tr><th>date</th><td>The date object.</td></tr>'), {
    type: 'textarea',
    input: true,
    editor: 'ace',
    key: 'datePicker.disableFunction',
    label: 'Disabling dates by a function',
    description: 'For more information check out the <a href="https://flatpickr.js.org/examples/#disabling-dates" target="_blank">Docs</a>',
    weight: 22
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: '<h4>Example</h4>' + "<pre>// Disable all weekends<br>date.getDay() === 0 || date.getDay() === 6</pre>\n          "
  }]
}, {
  type: 'checkbox',
  input: true,
  key: 'datePicker.disableWeekends',
  label: 'Disable weekends',
  tooltip: 'Check to disable weekends',
  weight: 23
}, {
  type: 'checkbox',
  input: true,
  key: 'datePicker.disableWeekdays',
  label: 'Disable weekdays',
  tooltip: 'Check to disable weekdays',
  weight: 23
}];
exports.default = _default;