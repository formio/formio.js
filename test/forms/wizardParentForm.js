export default {
  '_id': '605aefc88363cd1d20e40bee',
  'type': 'form',
  'tags': [],
  'owner': '6038bed737595d104cfc358a',
  'components': [
    {
      'title': 'Page 1',
      'label': 'Page 1',
      'type': 'panel',
      'key': 'page1',
      'components': [
        {
          'label': 'Radio',
          'optionsLabelPosition': 'right',
          'inline': false,
          'tableView': false,
          'values': [
            {
              'label': 'yes',
              'value': 'yes',
              'shortcut': ''
            },
            {
              'label': 'no',
              'value': 'no',
              'shortcut': ''
            }
          ],
          'validate': {
            'onlyAvailableItems': false
          },
          'key': 'radio1',
          'type': 'radio',
          'input': true
        },
        {
          'label': 'Checkbox',
          'tableView': false,
          'key': 'checkbox',
          'type': 'checkbox',
          'input': true,
          'defaultValue': false
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
      'scrollToTop': false,
      'collapsible': false,
      'key': 'page2',
      'conditional': {
        'show': true,
        'when': 'radio1',
        'eq': 'yes'
      },
      'type': 'panel',
      'label': 'Page 2',
      'components': [
        {
          'label': 'Text Field',
          'tableView': true,
          'key': 'textFieldNearForm',
          'conditional': {
            'show': true,
            'when': 'checkbox',
            'eq': 'true'
          },
          'type': 'textfield',
          'input': true
        },
        {
          'label': 'Form',
          'tableView': true,
          // 'form': '605aef5b8363cd1d20e40be7',
          'useOriginalRevision': false,
          'key': 'formNested',
          'type': 'form',
          'input': true
        }
      ],
      'input': false,
      'tableView': false
    },
    {
      'title': 'Page 3',
      'label': 'Page 3',
      'type': 'panel',
      'key': 'page3',
      'components': [
        {
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
        }
      ],
      'input': false,
      'tableView': false
    }
  ],
  'revisions': '',
  '_vid': 0,
  'title': 'Parent-Wizard',
  'display': 'wizard',
  'access': [
    {
      'roles': [],
      'type': 'create_own'
    },
    {
      'roles': [],
      'type': 'create_all'
    },
    {
      'roles': [],
      'type': 'read_own'
    },
    {
      'roles': [
        '6038c83637595d104cfc3594',
        '6038c83637595d104cfc3595',
        '6038c83637595d104cfc3596'
      ],
      'type': 'read_all'
    },
    {
      'roles': [],
      'type': 'update_own'
    },
    {
      'roles': [],
      'type': 'update_all'
    },
    {
      'roles': [],
      'type': 'delete_own'
    },
    {
      'roles': [],
      'type': 'delete_all'
    },
    {
      'roles': [],
      'type': 'team_read'
    },
    {
      'roles': [],
      'type': 'team_write'
    },
    {
      'roles': [],
      'type': 'team_admin'
    }
  ],
  'submissionAccess': [
    {
      'roles': [],
      'type': 'create_own'
    },
    {
      'roles': [],
      'type': 'create_all'
    },
    {
      'roles': [],
      'type': 'read_own'
    },
    {
      'roles': [],
      'type': 'read_all'
    },
    {
      'roles': [],
      'type': 'update_own'
    },
    {
      'roles': [],
      'type': 'update_all'
    },
    {
      'roles': [],
      'type': 'delete_own'
    },
    {
      'roles': [],
      'type': 'delete_all'
    },
    {
      'roles': [],
      'type': 'team_read'
    },
    {
      'roles': [],
      'type': 'team_write'
    },
    {
      'roles': [],
      'type': 'team_admin'
    }
  ],
  'controller': '',
  'properties': {},
  'settings': {},
  'name': 'parentWizard',
  'path': 'parentwizard',
  'project': '6038c83637595d104cfc3593',
  'created': '2021-03-24T07:52:40.971Z',
  'modified': '2021-03-25T07:50:31.265Z',
  'machineName': 'dqroghuntybetsh:parentWizard'
};
