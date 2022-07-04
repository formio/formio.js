const form = {
  'type': 'form',
  'components': [{
    'title': 'Page 1',
    'label': 'Page 1',
    'type': 'panel',
    'key': 'page1',
    'input': false,
    'tableView': false,
    'components': [{
      'label': 'Tags',
      'tableView': false,
      'key': 'tags',
      'type': 'tags',
      'input': true
    }, {
      'breadcrumbClickable': true,
      'buttonSettings': {
        'previous': true,
        'cancel': true,
        'next': true
      },
      'scrollToTop': false,
      'collapsible': false,
      'key': 'panel',
      'type': 'panel',
      'label': 'Panel',
      'input': false,
      'tableView': false,
      'components': [{
        'label': 'Text Field',
        'tableView': true,
        'validate': {
          'required': true
        },
        'key': 'textField',
        'type': 'textfield',
        'input': true
      }]
    }, {
      'label': 'Edit Grid',
      'tableView': false,
      'rowDrafts': false,
      'key': 'editGrid',
      'type': 'editgrid',
      'input': true,
      'components': [{
        'label': 'Select',
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
      }]
    }]
  }, {
    'title': 'Page 2',
    'label': 'Page 2',
    'type': 'panel',
    'key': 'page2',
    'components': [{
      'label': 'Columns',
      'columns': [{
        'components': [{
          'label': 'Checkbox',
          'tableView': false,
          'validate': {
            'required': true
          },
          'key': 'checkbox',
          'type': 'checkbox',
          'input': true,
          'hideOnChildrenHidden': false,
          'defaultValue': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }, {
        'components': [{
          'label': 'Date / Time',
          'displayInTimezone': 'utc',
          'format': 'yyyy-MM-dd',
          'tableView': false,
          'enableMinDateInput': false,
          'datePicker': {
            'disableWeekends': false,
            'disableWeekdays': false
          },
          'enableMaxDateInput': false,
          'enableTime': false,
          'timePicker': {
            'showMeridian': false
          },
          'key': 'dateTime',
          'type': 'datetime',
          'input': true,
          'widget': {
            'type': 'calendar',
            'displayInTimezone': 'utc',
            'locale': 'en',
            'useLocaleSettings': false,
            'allowInput': true,
            'mode': 'single',
            'enableTime': false,
            'noCalendar': false,
            'format': 'yyyy-MM-dd',
            'hourIncrement': 1,
            'minuteIncrement': 1,
            'time_24hr': true,
            'minDate': null,
            'disableWeekends': false,
            'disableWeekdays': false,
            'maxDate': null
          },
          'hideOnChildrenHidden': false
        }],
        'width': 6,
        'offset': 0,
        'push': 0,
        'pull': 0,
        'size': 'md'
      }],
      'key': 'columns',
      'type': 'columns',
      'input': false,
      'tableView': false
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
        'key': 'textField1',
        'type': 'textfield',
        'input': true
      }]
    }],
    'input': false,
    'tableView': false
  }, {
    'title': 'Page 3',
    'label': 'Page 3',
    'type': 'panel',
    'key': 'page3',
    'components': [{
      'label': 'Well',
      'key': 'well1',
      'type': 'well',
      'input': false,
      'tableView': false,
      'components': [{
        'label': 'Email',
        'tableView': true,
        'key': 'email',
        'type': 'email',
        'input': true
      }]
    }, {
      'label': 'Container',
      'tableView': false,
      'key': 'container',
      'type': 'container',
      'input': true,
      'components': [{
        'label': 'Select',
        'tableView': true,
        'data': {
          'values': [{
            'label': 'value1',
            'value': 'value1'
          }, {
            'label': 'value2',
            'value': 'value2'
          }]
        },
        'selectThreshold': 0.3,
        'validate': {
          'required': true,
          'onlyAvailableItems': false
        },
        'key': 'select',
        'type': 'select',
        'indexeddb': {
          'filter': {}
        },
        'input': true
      }]
    }],
    'input': false,
    'tableView': false
  }],
  'revisions': '',
  '_vid': 0,
  'title': 'wizard form for automated tests',
  'display': 'wizard',
  'name': 'wizardFormForAutomatedTests',
  'path': 'wizardformforautomatedtests',
};

const submission = {
  '_id': '6038a77ba21f9daee0ffdb6d',
  'state': 'submitted',
  'data': {
    'tags': 'tag1,tag2',
    'textField': 'text',
    'editGrid': [{
      'select': 'a'
    }, {
      'select': 'b'
    }],
    'checkbox': true,
    'dateTime': '2021-02-16T21:00:00.000',
    'dataGrid': [{
      'textField1': 'text1'
    }, {
      'textField1': 'text2'
    }],
    'email': 'user@example.com',
    'container': {
      'select': 'value1'
    }
  },
};

const htmlModeValues = {
    'tags': 'tag1,tag2',
    'textField': 'text',
    'editGrid': [{
      'select': 'a'
    }, {
      'select': 'b'
    }],
    'checkbox': 'True',
    'dateTime': '2021-02-16T21:00:00.000Z',
    'dataGrid': [{
      'textField1': 'text1'
    }, {
      'textField1': 'text2'
    }],
    'email': 'user@example.com',
    'container': {
      'select': 'value1'
    }
};

export default { form, submission, htmlModeValues };
