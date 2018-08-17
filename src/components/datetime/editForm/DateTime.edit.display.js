export default [
  {
    type: 'select',
    input: true,
    key: 'displayInTimezone',
    label: 'Display in Timezone',
    tooltip: 'This will display the captured date time in the select timezone.',
    weight: 30,
    defaultValue: 'viewer',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'of Viewer', value: 'viewer' },
        { label: 'of Submission', value: 'submission' },
        { label: 'of Location', value: 'location' },
        { label: 'of GMT', value: 'gmt' }
      ]
    }
  },
  {
    type: 'select',
    input: true,
    key: 'timezone',
    label: 'Select Timezone',
    tooltip: 'Select the timezone you wish to display this Date',
    weight: 31,
    defaultValue: '',
    lazyLoad: true,
    dataSrc: 'url',
    data: {
      url: 'https://cdn.rawgit.com/travist/8ea624349d947b6f736bf1c09da2461e/raw/timezones.json'
    },
    template: '<span>{{ item.name }}</span>',
    conditional: {
      json: { '===': [{ var: 'data.displayInTimezone' }, 'location'] }
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
