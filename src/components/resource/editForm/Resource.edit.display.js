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
    type: 'tags',
    input: true,
    key: 'searchFields',
    label: 'Search Fields',
    tooltip: 'A list of search filters based on the fields of the resource. See the <a target=\'_blank\' href=\'https://github.com/travist/resourcejs#filtering-the-results\'>Resource.js documentation</a> for the format of these filters.',
    placeholder: 'The fields to query on the server',
    weight: 52
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
