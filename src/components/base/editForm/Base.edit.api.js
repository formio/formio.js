export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'key',
    label: 'Property Name',
    tooltip: 'The name of this field in the API endpoint.',
    validate: {
      pattern: '[A-Za-z0-9\-\.]+',
      patternMessage: 'The property name must only contain alpha numeric characters.'
    }
  },
  {
    weight: 100,
    type: 'tags',
    input: true,
    label: 'Field Tags',
    storeas: 'array',
    tooltip: 'Tag the field for use in custom logic.',
    key: 'tags'
  },
  {
    weight: 200,
    type: 'datagrid',
    label: 'Custom Properties',
    tooltip: 'This allows you to configure any custom properties for this component.',
    key: 'properties',
    components: [
      {
        type: 'textfield',
        key: 'key',
        label: 'Key',
        input: true
      },
      {
        type: 'textfield',
        key: 'value',
        label: 'Value',
        input: true
      }
    ]
  }
];
