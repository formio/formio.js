export default {
  'type': 'form',
  'tags': [],
  'components': [
    {
      'title': 'Page 1',
      'breadcrumb': 'none',
      'buttonSettings': {
        'previous': true,
        'cancel': true,
        'next': true
      },
      'collapsible': false,
      'key': 'page1',
      'type': 'panel',
      'label': 'Page 1',
      'components': [
        {
          'label': 'Text Field',
          'tableView': true,
          'key': 'textField',
          'type': 'textfield',
          'input': true
        }
      ],
      'input': false,
      'tableView': false
    },
    {
      'title': 'Page 2',
      'breadcrumbClickable': true,
      'buttonSettings': {
        'previous': true,
        'cancel': true,
        'next': true
      },
      'collapsible': false,
      'key': 'page2',
      'type': 'panel',
      'label': 'Page 2',
      'input': false,
      'tableView': false,
      'components': [
        {
          'label': 'Text Field 2',
          'tableView': true,
          'key': 'textField2',
          'type': 'textfield',
          'input': true
        }
      ],
    }
  ],
  'title': 'editGridInsideWizardTest',
  'display': 'wizard',
};
