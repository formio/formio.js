export default {
  '_id': '6081766efc88e7048cbe5245',
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
          'label': 'Edit Grid',
          'tableView': false,
          'rowDrafts': false,
          'key': 'editGrid',
          'type': 'editgrid',
          'input': true,
          'components': [
            {
              'label': 'Form',
              'tableView': true,
              // 'form': '60817a3afc88e7048cbe5260',
              'useOriginalRevision': false,
              'key': 'formNested',
              'type': 'form',
              'input': true
            }
          ]
        }
      ],
      'input': false,
      'tableView': false
    }
  ],
  'revisions': '',
  '_vid': 0,
  'title': 'Wizard with Nested Wizard in Edit Grid',
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
  'name': 'wizardWithNestedWizardInEditGrid',
  'path': 'wizardwithnestedwizardineditgrid',
  'project': '6038c83637595d104cfc3593',
  'created': '2021-04-22T13:13:18.336Z',
  'modified': '2021-04-22T14:21:14.725Z',
  'machineName': 'dqroghuntybetsh:11112'
};
