"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'label': 'Data Grid',
  'disableAddingRemovingRows': true,
  'defaultOpen': false,
  'layoutFixed': false,
  'enableRowGroups': true,
  'mask': false,
  'tableView': true,
  'alwaysEnabled': false,
  'type': 'datagrid',
  'input': true,
  'key': 'dataGrid',
  'components': [{
    'label': 'Name',
    'allowMultipleMasks': false,
    'showWordCount': false,
    'showCharCount': false,
    'tableView': true,
    'alwaysEnabled': false,
    'type': 'textfield',
    'input': true,
    'key': 'name',
    'widget': {
      'type': ''
    },
    'row': '0-0'
  }, {
    'label': 'Age',
    'mask': false,
    'tableView': true,
    'alwaysEnabled': false,
    'type': 'number',
    'input': true,
    'key': 'age',
    'row': '0-1'
  }],
  'encrypted': false,
  'defaultValue': [{
    'name': 'Alex',
    'age': 1
  }, {
    'name': 'Bob',
    'age': 2
  }, {
    'name': 'Conny',
    'age': 3
  }],
  'validate': {
    'customMessage': '',
    'json': ''
  },
  'conditional': {
    'show': '',
    'when': '',
    'json': ''
  },
  'rowGroups': [{
    'label': 'Header',
    'numberOfRows': 1
  }, {
    'label': 'Body',
    'numberOfRows': 3
  }, {
    'label': 'Footer',
    'numberOfRows': 1
  }],
  'groupToggle': false
};
exports.default = _default;