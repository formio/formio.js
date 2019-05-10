export default [
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form?type=resource&limit=4294967295&select=_id,title'
    },
    template: '<span>{{ item.title }}</span>',
    valueProperty: '_id',
    label: 'Resource',
    key: 'resource',
    weight: 50,
    tooltip: 'The resource to be used with this field.'
  },
  {
    type: 'tags',
    input: true,
    key: 'selectFields',
    label: 'Select Fields',
    tooltip: 'The properties on the resource to return as part of the options. If left blank, all properties will be returned.',
    placeholder: 'Enter the fields to select.',
    weight: 51
  },
  {
    type: 'textfield',
    input: true,
    key: 'filter',
    label: 'Filter Query',
    description: 'The filter query for results.',
    tooltip: 'Use this to provide additional filtering using query parameters.',
    weight: 51.3
  },
  {
    type: 'textfield',
    input: true,
    key: 'sort',
    label: 'Sort Query',
    description: 'The sort query for results.',
    tooltip: 'Use this to provide additional sorting using query parameters.',
    weight: 51.6
  },
  {
    type: 'textfield',
    input: true,
    key: 'searchField',
    label: 'Search Query Name',
    weight: 52,
    description: 'Name of URL query parameter',
    tooltip: 'The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter.'
  },
  {
    type: 'number',
    input: true,
    key: 'minSearch',
    weight: 52.5,
    label: 'Minimum Search Length',
    tooltip: 'The minimum amount of characters they must type before a search is made.',
    defaultValue: 0,
    conditional: {
      json: { '!=': [{ var: 'data.searchField' }, ''] }
    }
  },
  {
    type: 'textarea',
    input: true,
    key: 'template',
    label: 'Item Template',
    editor: 'ace',
    as: 'html',
    rows: 3,
    weight: 53,
    tooltip: 'The HTML template for the result data items.'
  }
];
