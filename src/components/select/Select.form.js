import baseEditForm from '../base/Base.form';
import {eachComponent} from '../../utils/utils';
/* eslint-disable max-len, quotes */
export default function(...extend) {
  return baseEditForm(...extend, [
    {
      label: 'Data',
      key: 'data',
      weight: 10,
      components: [
        {
          type: 'select',
          input: true,
          weight: 0,
          tooltip: 'The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.',
          key: 'dataSrc',
          defaultValue: 'values',
          label: 'Data Source Type',
          dataSrc: 'values',
          data: {
            values: [
              {label: 'Values', value: 'values'},
              {label: 'Raw JSON', value: 'json'},
              {label: 'URL', value: 'url'},
              {label: 'Resource', value: 'resource'},
              {label: 'Custom', value: 'custom'}
            ]
          }
        },
        {
          type: 'textarea',
          as: 'json',
          editor: 'ace',
          weight: 10,
          input: true,
          key: 'data.json',
          label: 'Data Source Raw JSON',
          tooltip: 'A raw JSON array to use as a data source.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'json']}
          }
        },
        {
          type: 'textfield',
          input: true,
          key: 'url',
          weight: 10,
          label: 'Data Source URL',
          placeholder: 'Data Source URL',
          tooltip: 'A URL that returns a JSON array to use as the data source.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'url']}
          }
        },
        {
          type: 'datagrid',
          input: true,
          label: 'Request Headers',
          key: 'data.headers',
          tooltip: 'Set any headers that should be sent along with the request to the url. This is useful for authentication.',
          weight: 11,
          components: [
            {
              label: 'Key',
              key: 'key',
              input: true,
              type: 'textfield'
            },
            {
              label: 'Value',
              key: 'value',
              input: true,
              type: 'textfield'
            }
          ],
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'url']}
          }
        },
        {
          type: 'datagrid',
          input: true,
          label: 'Data Source Values',
          key: 'data.values',
          tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
          weight: 10,
          components: [
            {
              label: 'Label',
              key: 'label',
              input: true,
              type: 'textfield'
            },
            {
              label: 'Value',
              key: 'value',
              input: true,
              type: 'textfield',
              calculateValue: {_camelCase: [{var: 'row.label'}]}
            }
          ],
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'values']}
          }
        },
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
          weight: 10,
          tooltip: 'The resource to be used with this field.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'resource']}
          }
        },
        {
          type: 'select',
          input: true,
          label: 'Value Property',
          key: 'valueProperty',
          tooltip: 'The field to use as the value.',
          weight: 11,
          refreshOn: 'resource',
          template: '<span>{{ item.label }}</span>',
          valueProperty: 'key',
          dataSrc: 'url',
          onSetItems: (component, form) => {
            let newItems = [];
            eachComponent(form.components, (component, path) => {
              newItems.push({
                label: component.label || component.key,
                key: path
              });
            });
            return newItems;
          },
          data: {
            url: '/form/{{ data.resource }}'
          },
          conditional: {
            json: {
              and: [
                {'===': [{var: 'data.dataSrc'}, 'resource']},
                {var: 'data.resource'}
              ]
            }
          }
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
            json: {'===': [{var: 'data.dataSrc'}, 'url']}
          }
        },
        {
          type: 'textfield',
          input: true,
          label: 'Value Property',
          key: 'valueProperty',
          weight: 13,
          description: `The selected item's property to save.`,
          tooltip: 'The property of each item in the data source to use as the select value. If not specified, the item itself will be used.',
          conditional: {
            json: {
              and: [
                {'!==': [{var: 'data.dataSrc'}, 'values']},
                {'!==': [{var: 'data.dataSrc'}, 'resource']},
                {'!==': [{var: 'data.dataSrc'}, 'custom']}
              ]
            }
          }
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
                {'===': [{var: 'data.dataSrc'}, 'resource']},
                {'===': [{var: 'data.valueProperty'}, '']}
              ]
            }
          }
        },
        {
          type: 'checkbox',
          input: true,
          key: 'disableLimit',
          label: 'Disable limiting response',
          tooltip: 'When enabled the request will not include the limit and skip options in the query string',
          weight: 15,
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'url']}
          }
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
              or: [
                {'===': [{var: 'data.dataSrc'}, 'url']},
                {'===': [{var: 'data.dataSrc'}, 'resource']}
              ]
            }
          }
        },
        {
          type: 'textfield',
          input: true,
          key: 'filter',
          label: 'Filter Query',
          weight: 17,
          description: 'The filter query for results.',
          tooltip: 'Use this to provide additional filtering using query parameters.',
          conditional: {
            json: {
              or: [
                {'===': [{var: 'data.dataSrc'}, 'url']},
                {'===': [{var: 'data.dataSrc'}, 'resource']}
              ]
            }
          }
        },
        {
          type: 'number',
          input: true,
          key: 'limit',
          label: 'Limit',
          weight: 17,
          description: 'Maximum number of items to view per page of results.',
          tooltip: 'Use this to limit the number of items to request or view.',
          conditional: {
            json: {
              or: [
                {'===': [{var: 'data.dataSrc'}, 'url']},
                {'===': [{var: 'data.dataSrc'}, 'resource']},
                {'===': [{var: 'data.dataSrc'}, 'json']}
              ]
            }
          }
        },
        {
          type: 'textarea',
          input: true,
          key: 'data.custom',
          label: 'Custom Values',
          editor: 'ace',
          rows: 10,
          weight: 14,
          placeholder: `values = data['mykey'];`,
          tooltip: 'Write custom code to return the value options. The form data object is available.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'custom']}
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
          weight: 18,
          tooltip: 'The HTML template for the result data items.'
        },
        {
          type: 'select',
          input: true,
          key: 'refreshOn',
          label: 'Refresh On',
          weight: 19,
          tooltip: 'Refresh data when another field changes.',
          dataSrc: 'custom',
          data: {
            custom: `
              values.push({label: 'Any Change', key: 'data'});
              utils.eachComponent(instance.root.editForm.components, function(component, path) {
                if (component.key !== data.key) {
                  values.push({
                    label: component.label || component.key,
                    value: path
                  });
                }
              });
            `
          },
          conditional: {
            json: {
              and: [
                {'!==': [{var: 'data.dataSrc'}, 'values']},
                {'!==': [{var: 'data.dataSrc'}, 'json']}
              ]
            }
          }
        },
        {
          type: 'checkbox',
          input: true,
          weight: 20,
          key: 'clearOnRefresh',
          label: 'Clear Value On Refresh',
          tooltip: 'When the Refresh On field is changed, clear the selected value.',
          conditional: {
            json: {
              or: [
                {'===': [{var: 'data.dataSrc'}, 'resource']},
                {'===': [{var: 'data.dataSrc'}, 'url']},
                {'===': [{var: 'data.dataSrc'}, 'custom']}
              ]
            }
          }
        },
        {
          type: 'checkbox',
          input: true,
          weight: 21,
          key: 'reference',
          label: 'Save as reference',
          tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'resource']}
          }
        },
        {
          type: 'checkbox',
          input: true,
          weight: 21,
          key: 'authenticate',
          label: 'Formio Authenticate',
          tooltip: 'Check this if you would like to use Formio Authentication with the request.',
          conditional: {
            json: {'===': [{var: 'data.dataSrc'}, 'url']}
          }
        }
      ]
    },
    {
      label: 'Validation',
      key: 'validation',
      weight: 20,
      components: [
        {
          weight: 50,
          type: 'checkbox',
          label: 'Perform server validation',
          tooltip: 'Check this if you would like for the server to perform a validation check to ensure the selected value is an available option. This requires a Search query to ensure a record is found.',
          key: 'validate.select',
          input: true,
          conditional: {
            json: {var: 'data.searchField'}
          }
        }
      ]
    }
  ]);
}
/* eslint-enable max-len, quotes */
