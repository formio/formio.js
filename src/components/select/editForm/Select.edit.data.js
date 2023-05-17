import { eachComponent } from '../../../utils/utils';

export default [
  {
    key: 'dataSrc',
    data: {
      values: [
        { label: 'Values', value: 'values' },
        { label: 'URL', value: 'url' },
        { label: 'Resource', value: 'resource' },
        { label: 'Custom', value: 'custom' },
        { label: 'Raw JSON', value: 'json' },
      ],
    },
  },
  {
    type: 'textfield',
    weight: 10,
    input: true,
    key: 'indexeddb.database',
    label: 'Database name',
    tooltip: 'The name of the indexeddb database.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'indexeddb'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'indexeddb.table',
    label: 'Table name',
    weight: 16,
    tooltip: 'The name of table in the indexeddb database.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'indexeddb'] },
    }
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 18,
    input: true,
    key: 'indexeddb.filter',
    label: 'Row Filter',
    tooltip: 'Filter table items that match the object.',
    defaultValue: {},
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'indexeddb'] },
    },
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 10,
    input: true,
    key: 'data.json',
    label: 'Data Source Raw JSON',
    tooltip: 'A valid JSON array to use as a data source.',
    description: '<div>Example: <pre>["apple", "banana", "orange"].</pre></div> <div>Example 2: <pre>[{"name": "John", "email": "john.doe@test.com"}, {"name": "Jane", "email": "jane.doe@test.com"}].</pre></div>',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'json'] },
    },
  },
  {
    type: 'checkbox',
    input: true,
    label: 'Lazy Load Data',
    key: 'lazyLoad',
    tooltip: 'When set, this will not fire off the request to the URL until this control is within focus. This can improve performance if you have many Select dropdowns on your form where the API\'s will only fire when the control is activated.',
    weight: 11,
    conditional: {
      json: {
        and: [
          {
            in: [
              { var: 'data.dataSrc' },
              [
                'resource',
                'url',
              ],
            ],
          },
          {
            '!==': [
              { var: 'data.widget' },
              'html5'
            ]
          }
        ]
      },
    },
  },
  {
    type: 'datagrid',
    input: true,
    label: 'Data Source Values',
    key: 'data.values',
    tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
    weight: 10,
    reorder: true,
    defaultValue: [{ label: '', value: '' }],
    components: [
      {
        label: 'Label',
        key: 'label',
        input: true,
        type: 'textfield',
      },
      {
        label: 'Value',
        key: 'value',
        input: true,
        type: 'textfield',
        allowCalculateOverride: true,
        calculateValue: 'value = _.camelCase(row.label);',
      },
    ],
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'values'] },
    },
  },
  {
    type: 'select',
    input: true,
    dataSrc: 'url',
    data: {
      url: '/form?type=resource&limit=1000000&select=_id,title',
    },
    authenticate: true,
    template: '<span>{{ item.title }}</span>',
    valueProperty: '_id',
    clearOnHide: false,
    label: 'Resource',
    key: 'data.resource',
    lazyLoad: false,
    weight: 10,
    tooltip: 'The resource to be used with this field.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'resource'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    label: 'Data Path',
    key: 'selectValues',
    weight: 12,
    description: 'The object path to the iterable items.',
    tooltip: 'The property within the source data, where iterable items reside. For example: results.items or results[0].items',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'select',
    input: true,
    label: 'Value Property',
    key: 'valueProperty',
    skipMerge: true,
    clearOnHide: true,
    tooltip: 'The field to use as the value.',
    weight: 11,
    refreshOn: 'data.resource',
    template: '<span>{{ item.label }}</span>',
    valueProperty: 'key',
    dataSrc: 'url',
    lazyLoad: false,
    onSetItems(component, form) {
      const newItems = form.type === 'resource'
        ? [{
            label: '{Entire Object}',
            key: 'data',
          }]
        : [];

      eachComponent(form.components, (component, path) => {
        if (component.input) {
          newItems.push({
            label: component.label || component.key,
            key: `data.${path}`
          });
        }
      });
      return newItems;
    },
    onChange(context) {
      if (context && context.flags && context.flags.modified) {
        const valueProp = context.instance.data.valueProperty;
        const templateProp = valueProp ? valueProp : 'data';
        const template = `<span>{{ item.${templateProp} }}</span>`;
        const searchField = valueProp ? `${valueProp}__regex` : '';
        context.instance.root.getComponent('template').setValue(template);
        context.instance.root.getComponent('searchField').setValue(searchField);
      }
    },
    data: {
      url: '/form/{{ data.data.resource }}',
    },
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'resource'] },
          { '!==': [{ var: 'data.reference' }, true] },
          { var: 'data.data.resource' },
        ],
      },
    },
  },
  {
    type: 'select',
    input: true,
    label: 'Storage Type',
    key: 'dataType',
    clearOnHide: true,
    tooltip: 'The type to store the data. If you select something other than autotype, it will force it to that type.',
    weight: 12,
    template: '<span>{{ item.label }}</span>',
    dataSrc: 'values',
    data: {
      values: [
        { label: 'Autotype', value: 'auto' },
        { label: 'String', value: 'string' },
        { label: 'Number', value: 'number' },
        { label: 'Boolean', value: 'boolean' },
        { label: 'Object', value: 'object' },
      ],
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'idPath',
    weight: 12,
    label: 'ID Path',
    placeholder: 'id',
    tooltip: 'Path to the select option id.'
  },
  {
    type: 'textfield',
    input: true,
    label: 'Select Fields',
    key: 'selectFields',
    tooltip: 'The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.',
    placeholder: 'Comma separated list of fields to select.',
    weight: 14,
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'resource'] },
          { '===': [{ var: 'data.valueProperty' }, ''] },
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    key: 'disableLimit',
    label: 'Disable limiting response',
    tooltip: 'When enabled the request will not include the limit and skip options in the query string',
    weight: 15,
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'searchField',
    label: 'Search Query Name',
    weight: 16,
    description: 'Name of URL query parameter',
    tooltip: 'The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'searchDebounce',
    label: 'Search request delay',
    weight: 16,
    description: 'The delay (in seconds) before the search request is sent.',
    tooltip: 'The delay in seconds before the search request is sent, measured from the last character input in the search field.',
    validate: {
      min: 0,
      customMessage: '',
      json: '',
      max: 1,
    },
    delimiter: false,
    requireDecimal: false,
    encrypted: false,
    defaultValue: 0.3,
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'minSearch',
    weight: 17,
    label: 'Minimum Search Length',
    tooltip: 'The minimum amount of characters they must type before a search is made.',
    defaultValue: 0,
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'url'] },
          { '!=': [{ var: 'data.searchField' }, ''] },
        ],
      },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'filter',
    label: 'Filter Query',
    weight: 18,
    description: 'The filter query for results.',
    tooltip: 'Use this to provide additional filtering using query parameters.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'textfield',
    input: true,
    key: 'sort',
    label: 'Sort Query',
    weight: 18,
    description: 'The sort query for results',
    tooltip: 'Use this to provide additional sorting using query parameters',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
          ],
        ],
      },
    },
  },
  {
    type: 'number',
    input: true,
    key: 'limit',
    label: 'Limit',
    weight: 18,
    description: 'Maximum number of items to view per page of results.',
    tooltip: 'Use this to limit the number of items to request or view.',
    clearOnHide: false,
    conditional: {
      json: {
        and: [
          { in: [
            { var: 'data.dataSrc' },
            [
              'url',
              'resource'
            ],
          ] },
          { '!==': [{ var: 'data.disableLimit' }, true] }
        ]
      },
    },
  },
  {
    type: 'textarea',
    input: true,
    key: 'data.custom',
    label: 'Custom Values',
    editor: 'ace',
    rows: 10,
    weight: 14,
    placeholder: "values = data['mykey'] or values = Promise.resolve(['myValue'])",
    tooltip: 'Write custom code to return the value options or a promise with value options. The form data object is available.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'custom'] },
    },
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh Options On',
    weight: 19,
    tooltip: 'Refresh data when another field changes.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values',
            'custom'
          ],
        ],
      },
    },
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOnBlur',
    label: 'Refresh Options On Blur',
    weight: 19,
    tooltip: 'Refresh data when another field is blured.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom(context) {
        var values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values'
          ],
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 20,
    key: 'clearOnRefresh',
    label: 'Clear Value On Refresh Options',
    defaultValue: false,
    tooltip: 'When the Refresh On field is changed, clear this components value.',
    conditional: {
      json: {
        in: [
          { var: 'data.dataSrc' },
          [
            'url',
            'resource',
            'values',
            'custom'
          ],
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 21,
    key: 'searchEnabled',
    label: 'Enable Static Search',
    defaultValue: true,
    tooltip: 'When checked, the select dropdown will allow for searching within the static list of items provided.',
  },
  {
    type: 'checkbox',
    input: true,
    weight: 21,
    key: 'noRefreshOnScroll',
    label: 'Disable Options Refresh When Scrolling',
    defaultValue: false,
    tooltip: 'When checked, the select with search input won\'t perform new api requests when scrolling through the list of options.',
    conditional: {
      json: {
        and: [
          {  in: [
              { var: 'data.dataSrc' },
              [
                'url',
                'resource'
              ],
            ] },
          { '===': [{ var: 'data.searchEnabled' }, true] }
        ]
      },
    },
  },
  {
    label: 'Search Threshold',
    mask: false,
    tableView: true,
    alwaysEnabled: false,
    type: 'number',
    input: true,
    key: 'selectThreshold',
    validate: {
      min: 0,
      customMessage: '',
      json: '',
      max: 1,
    },
    delimiter: false,
    requireDecimal: false,
    encrypted: false,
    defaultValue: 0.3,
    weight: 22,
    tooltip: 'At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.',
  },
  {
    type: 'checkbox',
    input: true,
    weight: 23,
    key: 'addResource',
    label: 'Add Resource',
    tooltip: 'Allows to create a new resource while entering a submission.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'resource'] },
    },
  },
  {
    type: 'textfield',
    label: 'Add Resource Label',
    key: 'addResourceLabel',
    tooltip: 'Set the text of the Add Resource button.',
    placeholder: 'Add Resource',
    weight: 24,
    input: true,
    conditional: {
      json: {
        and: [
          { '===': [{ var: 'data.dataSrc' }, 'resource'] },
          { '!!': { var: 'data.addResource' } },
        ],
      },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 25,
    key: 'reference',
    label: 'Save as reference',
    tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.',
    conditional: {
      json: { '===': [{ var: 'data.dataSrc' }, 'resource'] },
    },
  },
  {
    type: 'checkbox',
    input: true,
    weight: 27,
    key: 'readOnlyValue',
    label: 'Read Only Value',
    tooltip: 'Check this if you would like to show just the value when in Read Only mode.',
  },
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 28,
    input: true,
    key: 'customOptions',
    label: 'Choices.js options',
    tooltip: 'A raw JSON object to use as options for the Select component (Choices JS).',
    defaultValue: {},
  },
  {
    type: 'checkbox',
    input: true,
    weight: 29,
    key: 'useExactSearch',
    label: 'Use exact search',
    tooltip: 'Disables search algorithm threshold.',
  }
];
