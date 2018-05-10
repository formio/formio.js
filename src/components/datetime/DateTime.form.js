import baseEditForm from '../base/Base.form';
/* eslint-disable max-len */
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Display',
      key: 'display',
      weight: 0,
      components: [
        {
          type: 'checkbox',
          input: true,
          key: 'useLocaleSettings',
          label: 'Use Locale Settings',
          tooltip: 'Use locale settings to display date and time.',
          weight: 50
        },
        {
          type: 'textfield',
          input: true,
          key: 'format',
          label: 'Format',
          placeholder: 'Format',
          tooltip: 'The moment.js format for saving the value of this field.',
          weight: 51
        }
      ]
    },
    {
      label: 'Date',
      key: 'date',
      weight: 1,
      components: [
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
              {label: 'Sunday', value: 0},
              {label: 'Monday', value: 1},
              {label: 'Tuesday', value: 2},
              {label: 'Wednesday', value: 3},
              {label: 'Thursday', value: 4},
              {label: 'Friday', value: 5},
              {label: 'Saturday', value: 6}
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
              {label: 'Day', value: 'day'},
              {label: 'Month', value: 'month'},
              {label: 'Year', value: 'year'}
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
              {label: 'Day', value: 'day'},
              {label: 'Month', value: 'month'},
              {label: 'Year', value: 'year'}
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
      ]
    },
    {
      label: 'Time',
      key: 'time',
      weight: 2,
      components: [
        {
          type: 'checkbox',
          input: true,
          key: 'enableTime',
          label: 'Enable Time Input',
          tooltip: 'Enables time input for this field.',
          weight: 0
        },
        {
          type: 'number',
          input: true,
          key: 'timePicker.hourStep',
          label: 'Hour Step Size',
          tooltip: 'The number of hours to increment/decrement in the time picker.',
          weight: 10
        },
        {
          type: 'number',
          input: true,
          key: 'timePicker.minuteStep',
          label: 'Minute Step Size',
          tooltip: 'The number of minutes to increment/decrement in the time picker.',
          weight: 20
        },
        {
          type: 'checkbox',
          input: true,
          key: 'timePicker.showMeridian',
          label: '12 Hour Time (AM/PM)',
          tooltip: 'Display time in 12 hour time with AM/PM.',
          weight: 30
        },
        {
          type: 'checkbox',
          input: true,
          key: 'timePicker.readonlyInput',
          label: 'Read-Only Input',
          tooltip: 'Makes the time picker input boxes read-only. The time can only be changed by the increment/decrement buttons.',
          weight: 40
        }
      ]
    },
    {
      label: 'Data',
      key: 'data',
      weight: 10,
      components: [
        {
          type: 'textfield',
          input: true,
          key: 'defaultDate',
          label: 'Default Value',
          placeholder: 'Default Value',
          tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')',
          weight: 1
        }
      ]
    }
  ]);
}
/* eslint-enable max-len */
