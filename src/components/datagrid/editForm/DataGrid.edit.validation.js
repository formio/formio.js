export default [
  {
    ignore: true,
    key: 'validateOn',
  },
  {
    ignore: true,
    key: 'validate.required',
  },
  {
    ignore: true,
    key: 'unique',
  },
  {
    ignore: true,
    key: 'errorLabel',
  },
  {
    ignore: true,
    key: 'validate.customMessage',
  },
  {
    weight: 110,
    key: 'validate.minLength',
    label: 'Minimum Length',
    placeholder: 'Minimum Length',
    type: 'textfield',
    tooltip: 'The minimum length requirement this field must meet.',
    input: true
  },
  {
    weight: 120,
    key: 'validate.maxLength',
    label: 'Maximum Length',
    placeholder: 'Maximum Length',
    type: 'textfield',
    tooltip: 'The maximum length requirement this field must meet.',
    input: true
  }
];
