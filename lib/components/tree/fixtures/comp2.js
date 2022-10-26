"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'label': 'Tree',
  'tableView': false,
  'key': 'tree',
  'type': 'tree',
  'input': true,
  'tree': true,
  'components': [{
    'label': 'Text Area',
    'autoExpand': false,
    'tableView': true,
    'key': 'textArea',
    'type': 'textarea',
    'input': true
  }, {
    'label': 'Select',
    'widget': 'choicesjs',
    'tableView': true,
    'data': {
      'values': [{
        'label': 'a',
        'value': 'a'
      }, {
        'label': 'b',
        'value': 'b'
      }, {
        'label': 'c',
        'value': 'c'
      }]
    },
    'selectThreshold': 0.3,
    'validate': {
      'onlyAvailableItems': false
    },
    'key': 'select',
    'type': 'select',
    'indexeddb': {
      'filter': {}
    },
    'input': true
  }, {
    'collapsible': false,
    'key': 'panel',
    'type': 'panel',
    'label': 'Panel',
    'input': false,
    'tableView': false,
    'components': [{
      'label': 'Number',
      'mask': false,
      'spellcheck': true,
      'tableView': false,
      'delimiter': false,
      'requireDecimal': false,
      'inputFormat': 'plain',
      'key': 'number',
      'type': 'number',
      'input': true
    }]
  }, {
    'label': 'Data Grid',
    'reorder': false,
    'addAnotherPosition': 'bottom',
    'layoutFixed': false,
    'enableRowGroups': false,
    'initEmpty': false,
    'tableView': false,
    'defaultValue': [{}],
    'key': 'dataGrid',
    'type': 'datagrid',
    'input': true,
    'components': [{
      'label': 'Text Field',
      'tableView': true,
      'key': 'textField',
      'type': 'textfield',
      'input': true
    }]
  }]
};
exports.default = _default;