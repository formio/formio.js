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
    weight: 24,
    type: 'select',
    input: true,
    key: 'storeas',
    label: 'Store As',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'String (CSV)', value: 'string' },
        { label: 'Array of Tags', value: 'array' }
      ]
    }
  }
];
