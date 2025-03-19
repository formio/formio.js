export default {
  'label': 'Select',
  'widget': 'choicesjs',
  'tableView': true,
  'dataSrc': 'json',
  'data': {
    'json': [{
      'value': 'a',
      'label': 'A'
    }, {
      'value': 'b',
      'label': 'B'
    }, {
      'value': 'c',
      'label': 'C'
    }, {
      'value': 'd',
      'label': 'D'
    }]
  },
  'selectThreshold': 0.3,
  'key': 'select',
  'type': 'select',
  'indexeddb': {
    'filter': {}
  },
  'input': true
};
