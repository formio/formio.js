const form = {
  'type': 'form',
  'components': [{
    'label': 'Data Grid',
    'reorder': false,
    'addAnotherPosition': 'bottom',
    'defaultOpen': false,
    'layoutFixed': false,
    'enableRowGroups': false,
    'initEmpty': true,
    'tableView': false,
    'defaultValue': [{
      'textField': ''
    }],
    'key': 'dataGrid',
    'type': 'datagrid',
    'input': true,
    'components': [{
      'collapsible': false,
      'key': 'panel',
      'type': 'panel',
      'label': 'Panel',
      'input': false,
      'tableView': false,
      'components': [{
        'label': 'Text Field',
        'tableView': true,
        'key': 'textField',
        'type': 'textfield',
        'input': true
      }]
    }]
  }, {
    'label': 'Data Grid',
    'reorder': false,
    'addAnotherPosition': 'bottom',
    'defaultOpen': false,
    'layoutFixed': false,
    'enableRowGroups': false,
    'initEmpty': true,
    'tableView': false,
    'defaultValue': [{
      'textArea': '',
      'number': 1
    }, {
      'textArea': '',
      'number': 2
    }, {
      'textArea': '',
      'number': 3
    }],
    'key': 'dataGrid1',
    'type': 'datagrid',
    'input': true,
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
    }, {
      'label': 'Text Area',
      'autoExpand': false,
      'tableView': true,
      'key': 'textArea',
      'type': 'textarea',
      'input': true
    }]
  }, {
    'type': 'button',
    'label': 'Submit',
    'key': 'submit',
    'disableOnInvalid': true,
    'input': true,
    'tableView': false
  }],
  'title': '3242',
  'display': 'form',
  'name': '3242',
  'path': '3242',
  'machineName': 'lkjqkdpewpfvste:3242'
};

const submission1 = {
  data: {
    dataGrid: [],
    dataGrid1: [],
    submit: true
  }
};

const submission2 = {
  data: {
    dataGrid: [{
      textField: ''
    }],
    dataGrid1: [{
      textArea: '',
      number: 1
    }],
    submit: true
  }
};

const submission3 = {
  'data': {
    'dataGrid': [{
        'textField': 'test1'
      },
      {
        'textField': 'test2'
      }
    ],
    'dataGrid1': [{
        'textArea': 'test3',
        'number': 111
      },
      {
        'textArea': 'test4',
        'number': 222
      }
    ],
    'submit': true
  }
}

export default {
  form: form,
  submission1: submission1,
  submission2: submission2,
  submission3: submission3,
};
