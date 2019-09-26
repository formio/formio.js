"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = require("../../../utils/utils");

var _default = [{
  type: 'select',
  input: true,
  weight: 0,
  tooltip: 'The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.',
  key: 'dataSrc',
  defaultValue: 'values',
  label: 'Data Source Type',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Values',
      value: 'values'
    }, {
      label: 'Raw JSON',
      value: 'json'
    }, {
      label: 'URL',
      value: 'url'
    }, {
      label: 'Resource',
      value: 'resource'
    }, {
      label: 'Custom',
      value: 'custom'
    }]
  }
}, {
  type: 'textarea',
  as: 'json',
  editor: 'ace',
  weight: 10,
  input: true,
  key: 'data.json',
  label: 'Data Source Raw JSON',
  tooltip: 'A raw JSON array to use as a data source.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'json']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'data.url',
  weight: 10,
  label: 'Data Source URL',
  placeholder: 'Data Source URL',
  tooltip: 'A URL that returns a JSON array to use as the data source.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  label: 'Lazy Load URL',
  key: 'lazyLoad',
  tooltip: 'When set, this will not fire off the request to the URL until this control is within focus. This can improve performance if you have many Select dropdowns on your form where the API\'s will only fire when the control is activated.',
  weight: 11,
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'datagrid',
  input: true,
  label: 'Request Headers',
  key: 'data.headers',
  tooltip: 'Set any headers that should be sent along with the request to the url. This is useful for authentication.',
  weight: 11,
  components: [{
    label: 'Key',
    key: 'key',
    input: true,
    type: 'textfield'
  }, {
    label: 'Value',
    key: 'value',
    input: true,
    type: 'textfield'
  }],
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'datagrid',
  input: true,
  label: 'Data Source Values',
  key: 'data.values',
  tooltip: 'Values to use as the data source. Labels are shown in the select field. Values are the corresponding values saved with the submission.',
  weight: 10,
  reorder: true,
  components: [{
    label: 'Label',
    key: 'label',
    input: true,
    type: 'textfield'
  }, {
    label: 'Value',
    key: 'value',
    input: true,
    type: 'textfield',
    allowCalculateOverride: true,
    calculateValue: {
      _camelCase: [{
        var: 'row.label'
      }]
    }
  }],
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'values']
    }
  }
}, {
  type: 'select',
  input: true,
  dataSrc: 'url',
  data: {
    url: '/form?type=resource&limit=4294967295&select=_id,title'
  },
  template: '<span>{{ item.title }}</span>',
  valueProperty: '_id',
  clearOnHide: false,
  label: 'Resource',
  key: 'data.resource',
  weight: 10,
  tooltip: 'The resource to be used with this field.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'resource']
    }
  }
}, {
  type: 'select',
  input: true,
  label: 'Value Property',
  key: 'valueProperty',
  skipMerge: true,
  clearOnHide: false,
  tooltip: 'The field to use as the value.',
  weight: 11,
  refreshOn: 'data.resource',
  template: '<span>{{ item.label }}</span>',
  valueProperty: 'key',
  dataSrc: 'url',
  onSetItems: function onSetItems(component, form) {
    var newItems = [];
    (0, _utils.eachComponent)(form.components, function (component, path) {
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
      and: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }, {
        var: 'data.resource'
      }]
    }
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Data Path',
  key: 'selectValues',
  weight: 12,
  description: 'The object path to the iterable items.',
  tooltip: 'The property within the source data, where iterable items reside. For example: results.items or results[0].items',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Value Property',
  key: 'valueProperty',
  skipMerge: true,
  clearOnHide: false,
  weight: 13,
  description: "The selected item's property to save.",
  tooltip: 'The property of each item in the data source to use as the select value. If not specified, the item itself will be used.',
  conditional: {
    json: {
      and: [{
        '!==': [{
          var: 'data.dataSrc'
        }, 'values']
      }, {
        '!==': [{
          var: 'data.dataSrc'
        }, 'resource']
      }, {
        '!==': [{
          var: 'data.dataSrc'
        }, 'custom']
      }]
    }
  }
}, {
  type: 'textfield',
  input: true,
  label: 'Select Fields',
  key: 'selectFields',
  tooltip: 'The properties on the resource to return as part of the options. Separate property names by commas. If left blank, all properties will be returned.',
  placeholder: 'Comma separated list of fields to select.',
  weight: 14,
  conditional: {
    json: {
      and: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }, {
        '===': [{
          var: 'data.valueProperty'
        }, '']
      }]
    }
  }
}, {
  type: 'checkbox',
  input: true,
  key: 'disableLimit',
  label: 'Disable limiting response',
  tooltip: 'When enabled the request will not include the limit and skip options in the query string',
  weight: 15,
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'searchField',
  label: 'Search Query Name',
  weight: 16,
  description: 'Name of URL query parameter',
  tooltip: 'The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter.',
  conditional: {
    json: {
      or: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'url']
      }, {
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }]
    }
  }
}, {
  type: 'number',
  input: true,
  key: 'minSearch',
  weight: 17,
  label: 'Minimum Search Length',
  tooltip: 'The minimum amount of characters they must type before a search is made.',
  defaultValue: 0,
  conditional: {
    json: {
      and: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'url']
      }, {
        '!=': [{
          var: 'data.searchField'
        }, '']
      }]
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'filter',
  label: 'Filter Query',
  weight: 18,
  description: 'The filter query for results.',
  tooltip: 'Use this to provide additional filtering using query parameters.',
  conditional: {
    json: {
      or: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'url']
      }, {
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }]
    }
  }
}, {
  type: 'textfield',
  input: true,
  key: 'sort',
  label: 'Sort Query',
  weight: 18,
  description: 'The sort query for results',
  tooltip: 'User this to provide additional sorting using query parameters',
  conditional: {
    json: {
      or: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'url']
      }, {
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }]
    }
  }
}, {
  type: 'number',
  input: true,
  key: 'limit',
  label: 'Limit',
  weight: 18,
  defaultValue: 100,
  description: 'Maximum number of items to view per page of results.',
  tooltip: 'Use this to limit the number of items to request or view.',
  conditional: {
    json: {
      or: [{
        '===': [{
          var: 'data.dataSrc'
        }, 'url']
      }, {
        '===': [{
          var: 'data.dataSrc'
        }, 'resource']
      }, {
        '===': [{
          var: 'data.dataSrc'
        }, 'json']
      }]
    }
  }
}, {
  type: 'textarea',
  input: true,
  key: 'data.custom',
  label: 'Custom Values',
  editor: 'ace',
  rows: 10,
  weight: 14,
  placeholder: "values = data['mykey'];",
  tooltip: 'Write custom code to return the value options. The form data object is available.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'custom']
    }
  }
}, {
  type: 'textarea',
  input: true,
  key: 'template',
  label: 'Item Template',
  editor: 'ace',
  as: 'html',
  rows: 3,
  weight: 18,
  tooltip: 'The HTML template for the result data items.'
}, {
  type: 'checkbox',
  input: true,
  weight: 20,
  key: 'searchEnabled',
  label: 'Enable Static Search',
  defaultValue: true,
  tooltip: 'When checked, the select dropdown will allow for searching within the static list of items provided.'
}, {
  type: 'checkbox',
  input: true,
  weight: 21,
  key: 'reference',
  label: 'Save as reference',
  tooltip: 'Using this option will save this field as a reference and link its value to the value of the origin record.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'resource']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  weight: 21,
  key: 'authenticate',
  label: 'Formio Authenticate',
  tooltip: 'Check this if you would like to use Formio Authentication with the request.',
  conditional: {
    json: {
      '===': [{
        var: 'data.dataSrc'
      }, 'url']
    }
  }
}, {
  type: 'checkbox',
  input: true,
  weight: 22,
  key: 'readOnlyValue',
  label: 'Read Only Value',
  tooltip: 'Check this if you would like to show just the value when in Read Only mode.'
}, {
  type: 'textarea',
  as: 'json',
  editor: 'ace',
  weight: 23,
  input: true,
  key: 'customOptions',
  label: 'Custom default options',
  tooltip: 'A raw JSON object to use as default options for the Select component (Choices JS).',
  defaultValue: {}
}, {
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
    max: 1
  },
  delimiter: false,
  requireDecimal: false,
  encrypted: false,
  defaultValue: 0.3,
  weight: 30,
  tooltip: 'At what point does the match algorithm give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.'
}];
exports.default = _default;