export default [
  //select is a custom component , in order to differentiate between form.io 's select component we have used 'selectF'
// tabs and functinalities are removed
  // {
  //   weight: 110,
  //   key: 'validate.minLength',
  //   label: 'Minimum Length',
  //   placeholder: 'Minimum Length',
  //   type: 'number',
  //   tooltip: 'The minimum length requirement this field must meet.',
  //   input: true
  // },
  // {
  //   weight: 120,
  //   key: 'validate.maxLength',
  //   label: 'Maximum Length',
  //   placeholder: 'Maximum Length',
  //   type: 'number',
  //   tooltip: 'The maximum length requirement this field must meet.',
  //   input: true
  // },
  // {
  //   weight: 125,
  //   key: 'validate.minWords',
  //   label: 'Minimum Word Length',
  //   placeholder: 'Minimum Word Length',
  //   type: 'number',
  //   tooltip: 'The minimum amount of words that can be added to this field.',
  //   input: true
  // },
  // {
  //   weight: 126,
  //   key: 'validate.maxWords',
  //   label: 'Maximum Word Length',
  //   placeholder: 'Maximum Word Length',
  //   type: 'number',
  //   tooltip: 'The maximum amount of words that can be added to this field.',
  //   input: true
  // },
  // {
  //   weight: 130,
  //   key: 'validate.pattern',
  //   label: 'Regular Expression Pattern',
  //   placeholder: 'Regular Expression Pattern',
  //   type: 'textfield',
  //   tooltip: 'The regular expression pattern test that the field value must pass before the form can be submitted.',
  //   input: true
  // }
  {
      // Or add your own. The syntax is form.io component definitions.
      type: 'CONDITIONAL_FORMATTING_EDIT',
      input: true,
      key: 'conditinalFormattingEdit',
      //refreshOn: 'componentSelect'
      // This will be available as component.myCustomSetting
  }
];
