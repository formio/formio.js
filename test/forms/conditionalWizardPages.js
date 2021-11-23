export default {
  'type': 'form',
  'components': [{
    'title': 'Page 1',
    'label': 'Page 1',
    'type': 'panel',
    'key': 'page1',
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
      'label': 'Form',
      'tableView': true,
      'components': [{
        'type': 'form',
        'components': [{
          'label': 'Text Area',
          'autoExpand': false,
          'tableView': true,
          'key': 'textArea',
          'type': 'textarea',
          'input': true
        }, {
          'type': 'button',
          'label': 'Submit',
          'key': 'submit',
          'disableOnInvalid': true,
          'input': true,
          'tableView': false
        }],
        'title': 'nested for wizard test',
        'display': 'form',
        'name': 'nestedForWizardTest',
        'path': 'nestedforwizardtest'
      }],
      'key': 'form',
      'type': 'form',
      'input': true
    }],
    'input': false,
    'tableView': false
  }, {
    'title': 'Page 2',
    'breadcrumbClickable': true,
    'buttonSettings': {
      'previous': true,
      'cancel': true,
      'next': true
    },
    'collapsible': false,
    'key': 'page2',
    'conditional': {
      'show': true,
      'when': 'number',
      'eq': '5'
    },
    'type': 'panel',
    'label': 'Page 2',
    'components': [{
      'label': 'Text Field',
      'tableView': true,
      'key': 'textField',
      'type': 'textfield',
      'input': true
    }],
    'input': false,
    'tableView': false
  }],
  'title': 'test wizard conditional',
  'display': 'wizard',
  'name': 'testWizardConditional',
  'path': 'testwizardconditional'
};
