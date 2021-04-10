export default [
  {
    type: 'textfield',
    input: true,
    key: 'defaultDate',
    label: 'Default Date',
    placeholder: 'moment()',
    tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')',
    weight: 6
  },{
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 28,
    input: true,
    key: 'customOptions',
    label: 'Flatpickr options',
    tooltip: 'A raw JSON object to use as options for the Date / Time component (Flatpickr).',
    defaultValue: {},
  },
];
