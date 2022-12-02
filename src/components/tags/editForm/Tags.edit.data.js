export default [
  {
    key: 'multiple',
    ignore: true
  },
  {
    weight: 20,
    type: 'textfield',
    input: true,
    key: 'delimeter',
    label: 'Delimiter',
    tooltip: 'What is used to separate the tags.</a>'
  },
  {
    weight: 22,
    type: 'number',
    input: true,
    key: 'maxTags',
    label: 'Max Tags',
    defaultValue: 0,
    tooltip: 'The maximum amount of tags that can be added. 0 for infinity.'
  },
  {
    type: 'checkbox',
    label: 'Allow Duplicate',
    key: 'allowDuplicate',
    tooltip: 'Check if you want to allow duplicate data',
    weight: 405,
    input: true,
    clearOnHide: false,
  },
  // {
  //   weight: 24,
  //   type: 'selectF',   //select is a custom component , in order to differentiate between form.io 's select component we have used 'selectF'
  //   input: true,
  //   key: 'storeas',
  //   label: 'Store As',
  //   dataSrc: 'values',
  //   data: {
  //     values: [
  //       { label: 'String (CSV)', value: 'string' },
  //       { label: 'Array of Tags', value: 'array' }
  //     ]
  //   }
  // }
];
