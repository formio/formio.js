export default [
  {
    weight: 110,
    key: 'validate.minLength',
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'number',
    tooltip: 'The minimum length requirement this field must meet.',
    input: true
  },
  {
    weight: 120,
    key: 'validate.maxLength',
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'number',
    tooltip: 'The maximum length requirement this field must meet.',
    input: true
  },
  {
    weight: 130,
    key: 'validate.pattern',
    label: 'Regular Expression Pattern',
    placeholder: 'Regular Expression Pattern',
    type: 'textfield',
    tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.',
    input: true
  }
];
