export default [
  {
    type: 'select',
    input: true,
    key: 'displayInTimezone',
    label: 'Display in Timezone',
    tooltip: 'This will display the captured date time in the select timezone.',
    weight: 30,
    defaultValue: 'submission',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'of Viewer', value: 'viewer' },
        { label: 'of Submission', value: 'submission' },
        { label: 'of GMT', value: 'gmt' }
      ]
    }
  },
  {
    type: 'checkbox',
    input: true,
    key: 'useLocaleSettings',
    label: 'Use Locale Settings',
    tooltip: 'Use locale settings to display date and time.',
    weight: 51
  },
  {
    type: 'checkbox',
    input: true,
    key: 'allowInput',
    label: 'Allow Manual Input',
    tooltip: 'Check this if you would like to allow the user to manually enter in the date.',
    weight: 51
  },
  {
    type: 'textfield',
    input: true,
    key: 'format',
    label: 'Format',
    placeholder: 'Format',
    tooltip: 'The moment.js format for saving the value of this field.',
    weight: 52
  }
];
