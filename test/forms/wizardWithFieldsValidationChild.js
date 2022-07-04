export default {
  '_id': '60b0aa39b332da2f881e34d7',
  'type': 'form',
  'tags': [],
  'owner': '6038bed737595d104cfc358a',
  'components': [
    {
      'title': 'Page 1',
      'breadcrumbClickable': true,
      'buttonSettings': {
        'previous': true,
        'cancel': true,
        'next': true
      },
      'scrollToTop': false,
      'collapsible': false,
      'key': 'page1',
      'type': 'panel',
      'label': 'Page 2',
      'input': false,
      'tableView': false,
      'components': [
        {
          'label': "One when 'one'",
          'tableView': true,
          'validate': {
            'required': true
          },
          'key': 'textField',
          'type': 'textfield',
          'input': true
        },
        {
          'label': 'Test Validation',
          'tableView': true,
          'validate': {
            'required': true,
            'custom': "valid = ( input === data.textField ) ? true : 'These do not match'"
          },
          'key': 'testValidation',
          'type': 'textfield',
          'input': true
        }
      ]
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
      'type': 'panel',
      'label': 'Page 2',
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
  'title': 'tr-test',
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
  'name': 'trTest',
  'path': 'trtest',
  'project': '6038c83637595d104cfc3593',
  'created': '2021-05-28T08:30:49.627Z',
  'modified': '2021-05-28T10:22:08.797Z',
  'machineName': 'dqroghuntybetsh:trTest'
};
