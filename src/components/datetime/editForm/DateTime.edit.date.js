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
    type: 'textfield',
    input: true,
    key: 'datePicker.minDate',
    label: 'Minimum Date',
    placeholder: 'yyyy-MM-dd',
    tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
    weight: 10
  },
  {
    type: 'textfield',
    input: true,
    key: 'datePicker.maxDate',
    label: 'Maximum Date',
    placeholder: 'yyyy-MM-dd',
    tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
    weight: 20
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
