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
    type: 'select',
    input: true,
    key: 'datePicker.startingDay',
    label: 'Starting Day',
    tooltip: 'The first day of the week.',
    weight: 30,
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Sunday', value: 0 },
        { label: 'Monday', value: 1 },
        { label: 'Tuesday', value: 2 },
        { label: 'Wednesday', value: 3 },
        { label: 'Thursday', value: 4 },
        { label: 'Friday', value: 5 },
        { label: 'Saturday', value: 6 }
      ]
    }
  },
  {
    type: 'select',
    input: true,
    key: 'datePicker.minMode',
    label: 'Minimum Mode',
    tooltip: 'The smallest unit of time view to display in the date picker.',
    weight: 40,
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Day', value: 'day' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' }
      ]
    }
  },
  {
    type: 'select',
    input: true,
    key: 'datePicker.maxMode',
    label: 'Maximum Mode',
    tooltip: 'The largest unit of time view to display in the date picker.',
    weight: 50,
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Day', value: 'day' },
        { label: 'Month', value: 'month' },
        { label: 'Year', value: 'year' }
      ]
    }
  },
  {
    type: 'textfield',
    input: true,
    key: 'datePicker.yearRows',
    label: 'Number of Years Displayed (Rows)',
    placeholder: 'Year Range (Rows)',
    tooltip: 'The number of years to display in the years view (Rows).',
    weight: 60
  },
  {
    type: 'textfield',
    input: true,
    key: 'datePicker.yearColumns',
    label: 'Number of Years Displayed (Columns)',
    placeholder: 'Year Range (Columns)',
    tooltip: 'The number of years to display in the years view (Columns).',
    weight: 70
  },
  {
    type: 'checkbox',
    input: true,
    key: 'datePicker.showWeeks',
    label: 'Show Week Numbers',
    tooltip: 'Displays the week numbers on the date picker.',
    weight: 70
  }
];
