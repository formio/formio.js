export default [
  {
    key: 'unique',
    ignore: true
  },
  {
    // Or add your own. The syntax is form.io component definitions.
    type: 'CONDITIONAL_FORMATTING_EDIT',
    input: true,
    key: 'conditinalFormattingEdit',
    //refreshOn: 'componentSelect'
    // This will be available as component.myCustomSetting
  },
  {
    key: 'validate.minLength',
    ignore: true
  },
  {
    key: 'validate.maxLength',
    ignore: true
  },
  {
    key: 'validate.minWords',
    ignore: true
  },
  {
    key: 'validate.maxWords',
    ignore: true
  },
  {
    key: 'validate.pattern',
    ignore: true
  },
  //tabs & functionalities are removed/modified
  // {
  //   type: 'number',
  //   label: 'Minimum Value',
  //   key: 'validate.min',
  //   input: true,
  //   placeholder: 'Minimum Value',
  //   tooltip: 'The minimum value this field must have before the form can be submitted.',
  //   weight: 150
  // },
  // {
  //   type: 'number',
  //   label: 'Maximum Value',
  //   key: 'validate.max',
  //   input: true,
  //   placeholder: 'Maximum Value',
  //   tooltip: 'The maximum value this field can have before the form can be submitted.',
  //   weight: 160
  // }
];
