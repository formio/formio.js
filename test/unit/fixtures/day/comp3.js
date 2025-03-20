export default {
  'conditional': {
    'eq': '',
    'when': null,
    'show': ''
  },
  'tags': [

  ],
  'type': 'day',
  'validate': {
    'custom': ''
  },
  'minDate': '2020-03-01',
  'maxDate': '2021-01-03',
  'clearOnHide': true,
  'persistent': true,
  'protected': false,
  'dayFirst': true,
  'fields': {
    'year': {
      'required': false,
      'placeholder': '',
      'type': 'number'
    },
    'month': {
      'required': false,
      'placeholder': '',
      'type': 'select'
    },
    'day': {
      'required': false,
      'placeholder': '',
      'type': 'number'
    }
  },
  'key': 'date',
  'label': 'Date',
  'tableView': true,
  'input': true
};
