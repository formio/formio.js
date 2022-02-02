export default [
  {
    type: 'checkbox',
    input: true,
    key: 'enableMinDateInput',
    label: 'Use Input to add moment.js for minDate',
    persistent: false,
    weight: 10,
    tooltip: 'Enables to use input for moment functions instead of calendar.'
  },
  {
    type: 'datetime',
    input: true,
    key: 'datePicker.minDate',
    label: 'Use calendar to set minDate',
    skipMerge: true,
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
    skipMerge: true,
    label: 'Minimum Date',
    weight: 10,
    tooltip: 'The minimum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().subtract(10, \'days\')',
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.minDate && component.datePicker.minDate.indexOf('moment') !== -1) {
        return true;
      }
      return data.enableMinDateInput;
    },
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
    type: 'datetime',
    input: true,
    key: 'datePicker.maxDate',
    skipMerge: true,
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
    type: 'textfield',
    input: true,
    enableTime: false,
    key: 'datePicker.maxDate',
    skipMerge: true,
    label: 'Maximum Date',
    tooltip: 'The maximum date that can be picked. You can also use Moment.js functions. For example: \n \n moment().add(10, \'days\')',
    weight: 20,
    customConditional({ data, component }) {
      if (component.datePicker && component.datePicker.maxDate && component.datePicker.maxDate.indexOf('moment') !== -1) {
        return true;
      }
      return data.enableMaxDateInput;
    },
  }
];
