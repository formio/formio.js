import Evaluator from '../../../utils/Evaluator';
import EditFormUtils from '../../_classes/component/editForm/utils';

export default [
  {
    type: 'checkbox',
    input: true,
    key: 'enableDate',
    label: 'Enable Date Input',
    weight: 0,
    tooltip: 'Enables date input for this field.'
  },
  {
    type: 'checkbox',
    input: true,
    key: 'enableMinDateInput',
    label: 'Use Input to add moment.js for minDate',
    persistent: false,
    weight: 0,
    tooltip: 'Enables to use input for moment functions instead of calendar.'
  },
  {
    type: 'datetime',
    input: true,
    key: 'datePicker.minDate',
    label: 'Use calendar to set minDate',
    weight: 10,
    tooltip: 'Enables to use calendar to set date.',
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {
        return false;
      }
      return !data.enableMinDateInput;
    },
  },
  {
    type: 'textfield',
    input: true,
    enableTime: false,
    key: 'datePicker.minDate',
    label: 'Minimum Date',
    tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {
        return true;
      }
      return data.enableMinDateInput;
    },
    weight: 10
  },
  {
    type: 'checkbox',
    input: true,
    key: 'enableMaxDateInput',
    label: 'Use Input to add moment.js for maxDate',
    persistent: false,
    weight: 20,
    tooltip: 'Enables to use input for moment functions instead of calendar.'
  },
  {
    type: 'textfield',
    input: true,
    enableTime: false,
    key: 'datePicker.maxDate',
    label: 'Maximum Date',
    tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
    weight: 20,
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {
        return true;
      }
      return data.enableMaxDateInput;
    },
  },
  {
    type: 'datetime',
    input: true,
    key: 'datePicker.maxDate',
    label: 'Use calendar to set maxDate',
    weight: 20,
    tooltip: 'Enables to use calendar to set date.',
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {
        return false;
      }
      return !data.enableMaxDateInput;
    },
  },
  {
    type: 'tags',
    input: true,
    key: 'datePicker.disable',
    label: 'Disable specific dates or dates by range',
    placeholder: '(yyyy-MM-dd) or (yyyy-MM-dd - yyyy-MM-dd)',
    tooltip: 'Add dates that you want to blacklist. For example: \n \n 2025-02-21',
    weight: 21
  },
  {
    type: 'panel',
    title: 'Custom Disabled Dates',
    collapsible: true,
    collapsed: true,
    style: { 'margin-bottom': '10px' },
    key: 'panel-disable-function',
    customConditional() {
      return !Evaluator.noeval;
    },
    components: [
      EditFormUtils.logicVariablesTable('<tr><th>date</th><td>The date object.</td></tr>'),
      {
        type: 'textarea',
        input: true,
        editor: 'ace',
        key: 'datePicker.disableFunction',
        label: 'Disabling dates by a function',
        description: 'For more information check out the <a href="https://flatpickr.js.org/examples/#disabling-dates" target="_blank">Docs</a>',
        weight: 22
      },
      {
        type: 'htmlelement',
        tag: 'div',
        content: '<h4>Example</h4>' +
          `<pre>// Disable all weekends<br>date.getDay() === 0 || date.getDay() === 6</pre>
          `
      }
    ]
  },
  {
    type: 'checkbox',
    input: true,
    key: 'datePicker.disableWeekends',
    label: 'Disable weekends',
    tooltip: 'Check to disable weekends',
    weight: 23
  },
  {
    type: 'checkbox',
    input: true,
    key: 'datePicker.disableWeekdays',
    label: 'Disable weekdays',
    tooltip: 'Check to disable weekdays',
    weight: 23
  }
];
