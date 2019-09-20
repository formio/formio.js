export default [
  {
    type: 'checkbox',
    input: true,
    key: 'validate.strictDateValidation',
    label: 'Enable Strict Date Validation',
    tooltip: 'Makes sure the date inputted for this field is full and valid.',
    weight: 50,
    customCoditional(context) {
      return context.data.weight.type === 'calendar';
    }
  }
];
