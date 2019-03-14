export default [
  {
    weight: 0,
    type: 'textfield',
    input: true,
    key: 'key',
    label: 'Property Name',
    tooltip: 'The name of this field in the API endpoint.',
    validate: {
      pattern: '(\\w|\\w[\\w-.]*\\w)',
      patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.'
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
    type: 'datamap',
    label: 'Custom Properties',
    tooltip: 'This allows you to configure any custom properties for this component.',
    key: 'properties',
    valueComponent: {
      type: 'textfield',
      key: 'value',
      label: 'Value',
      defaultValue: 'Value',
      input: true
    }
  },
  {
    type: 'panel',
    legend: 'PDF Overlay',
    title: 'PDF Overlay',
    key: 'overlay',
    weight: 2000,
    collapsible: true,
    collapsed: true,
    components: [
      {
        type: 'textfield',
        input: true,
        key: 'overlay.style',
        label: 'Style',
        placeholder: '',
        tooltip: ''
      },
      {
        type: 'textfield',
        input: true,
        key: 'overlay.left',
        label: 'Left',
        placeholder: '',
        tooltip: ''
      },
      {
        type: 'textfield',
        input: true,
        key: 'overlay.top',
        label: 'Top',
        placeholder: '',
        tooltip: ''
      },
      {
        type: 'textfield',
        input: true,
        key: 'overlay.width',
        label: 'Width',
        placeholder: '',
        tooltip: ''
      },
      {
        type: 'textfield',
        input: true,
        key: 'overlay.height',
        label: 'Height',
        placeholder: '',
        tooltip: ''
      },

    ]
  }
];
