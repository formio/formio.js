export default [
  {
    type: 'select',
    input: true,
    weight: 0,
    tooltip: 'The source to get the data data. You can fetch from a URL or use javascript to get the value.',
    key: 'dataSrc',
    defaultValue: 'url',
    label: 'Data Source Type',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'URL', value: 'url' },
        // { label: 'Custom Javascript', value: 'custom' },
      ],
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'fetch.url',
    weight: 10,
    label: 'Data Source URL',
    placeholder: 'Data Source URL',
    tooltip: 'A URL that returns data. You can interpolate form data using curly bracket notation.',
    clearOnHide: true,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'select',
    input: true,
    label: 'Method',
    key: 'fetch.method',
    clearOnHide: true,
    tooltip: 'The HTTP Request method to use when making the request.',
    defaultValue: 'get',
    weight: 11,
    template: '<span>{{ item.label }}</span>',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Get', value: 'get' },
        { label: 'Put', value: 'put' },
        { label: 'Post', value: 'post' },
        { label: 'Patch', value: 'patch' },
        { label: 'Delete', value: 'delete' },
      ],
    },
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Request Headers',
    key: 'fetch.headers',
    tooltip: 'Set any headers that should be sent along with the request to the url. This is useful for authentication.',
    weight: 12,
    components: [
      {
        label: 'Key',
        key: 'key',
        input: true,
        type: 'textfield',
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
      },
    ],
    clearOnHide: true,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 26,
    key: 'fetch.authenticate',
    label: 'Form.io Authentication',
    tooltip: 'Check this if you would like to pass Form.io Authentication headers with the request.',
    clearOnHide: true,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  // TODO: Add custom calculation of value with async possibility.
];
