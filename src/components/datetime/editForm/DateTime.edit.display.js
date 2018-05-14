export default [
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
];
