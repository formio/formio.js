"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'label': 'Select',
  'labelPosition': 'top',
  'widget': 'choicesjs',
  'tableView': true,
  'modalEdit': false,
  'multiple': false,
  'dataSrc': 'values',
  'data': {
    'values': [{
      'label': 'true',
      'value': 'true'
    }, {
      'label': '1.2',
      'value': '12'
    }, {
      'label': '11',
      'value': '11'
    }, {
      'label': 'test',
      'value': 'test'
    }],
    'resource': '',
    'json': '',
    'url': '',
    'custom': ''
  },
  'valueProperty': '',
  'dataType': 'auto',
  'template': '<span>{{ item.label }}</span>',
  'searchEnabled': true,
  'selectThreshold': 0.3,
  'readOnlyValue': false,
  'customOptions': {},
  'persistent': true,
  'protected': false,
  'dbIndex': false,
  'encrypted': false,
  'clearOnHide': true,
  'customDefaultValue': '',
  'calculateValue': '',
  'calculateServer': false,
  'allowCalculateOverride': false,
  'validateOn': 'change',
  'validate': {
    'required': false,
    'customMessage': '',
    'custom': '',
    'customPrivate': false,
    'json': '',
    'strictDateValidation': false,
    'multiple': false,
    'unique': false
  },
  'unique': false,
  'errorLabel': '',
  'key': 'select1',
  'tags': [],
  'properties': {},
  'conditional': {
    'show': null,
    'when': null,
    'eq': '',
    'json': ''
  },
  'customConditional': '',
  'logic': [],
  'attributes': {},
  'overlay': {
    'style': '',
    'page': '',
    'left': '',
    'top': '',
    'width': '',
    'height': ''
  },
  'type': 'select',
  'indexeddb': {
    'filter': {}
  },
  'selectFields': '',
  'searchField': '',
  'minSearch': 0,
  'filter': '',
  'limit': 100,
  'refreshOn': '',
  'redrawOn': '',
  'input': true,
  'prefix': '',
  'suffix': '',
  'showCharCount': false,
  'showWordCount': false,
  'allowMultipleMasks': false,
  'clearOnRefresh': false,
  'lazyLoad': true,
  'authenticate': false,
  'searchThreshold': 0.3,
  'fuseOptions': {
    'include': 'score',
    'threshold': 0.3
  },
  'id': 'ef6o05a',
  'defaultValue': ''
};
exports.default = _default;