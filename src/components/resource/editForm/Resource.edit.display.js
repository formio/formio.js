"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
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
}, {
  type: 'tags',
  input: true,
  key: 'selectFields',
  label: 'Select Fields',
  tooltip: 'The properties on the resource to return as part of the options. If left blank, all properties will be returned.',
  placeholder: 'Enter the fields to select.',
  weight: 51
}, {
  type: 'textfield',
  input: true,
  key: 'filter',
  label: 'Filter Query',
  description: 'The filter query for results.',
  tooltip: 'Use this to provide additional filtering using query parameters.',
  weight: 51.3
}, {
  type: 'textfield',
  input: true,
  key: 'sort',
  label: 'Sort Query',
  description: 'The sort query for results.',
  tooltip: 'Use this to provide additional sorting using query parameters.',
  weight: 51.6
}, {
  type: 'textarea',
  input: true,
  key: 'template',
  label: 'Item Template',
  editor: 'ace',
  as: 'html',
  rows: 3,
  weight: 53,
  tooltip: 'The HTML template for the result data items.'
}, {
  type: 'checkbox',
  input: true,
  weight: 54,
  key: 'searchEnabled',
  label: 'Enable Search',
  defaultValue: true,
  tooltip: 'When checked, the select dropdown will allow for searching.'
}, {
  type: 'textfield',
  input: true,
  key: 'searchField',
  label: 'Search Field for Query',
  weight: 55,
  description: 'Name of URL query parameter (leave blank for client-side search)',
  tooltip: 'The name of the search querystring parameter used when sending a request to filter results with. The server at the URL must handle this query parameter with \'__regex\' appended. Leave empty to use client-side search within the list of choices.',
  conditional: {
    json: {
      '!=': [{
        var: 'data.searchEnabled'
      }, '']
    }
  }
}, {
  type: 'number',
  input: true,
  key: 'minSearch',
  weight: 56,
  label: 'Server-Side Search: Minimum Input Length',
  tooltip: 'The minimum amount of characters to be typed before a search query is made.',
  defaultValue: 0,
  conditional: {
    json: {
      and: [{
        '!=': [{
          var: 'data.searchEnabled'
        }, '']
      }, {
        '!=': [{
          var: 'data.searchField'
        }, '']
      }]
    }
  }
}, {
  label: 'Client-Side Search Threshold',
  mask: false,
  tableView: true,
  alwaysEnabled: false,
  type: 'number',
  input: true,
  key: 'searchThreshold',
  validate: {
    min: 0,
    customMessage: '',
    json: '',
    max: 1
  },
  delimiter: false,
  requireDecimal: false,
  encrypted: false,
  defaultValue: 0.1,
  weight: 57,
  tooltip: 'At what point does the match algorithm for static search give up. A threshold of 0.0 requires a perfect match, a threshold of 1.0 would match anything.',
  conditional: {
    json: {
      and: [{
        '!=': [{
          var: 'data.searchEnabled'
        }, '']
      }, {
        '==': [{
          var: 'data.searchField'
        }, '']
      }]
    }
  }
}];
exports.default = _default;