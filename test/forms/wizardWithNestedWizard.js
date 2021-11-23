export default {
  '_id': '602f96f83c44983fdb716195',
  'type': 'form',
  'tags': [
  ],
  'owner': '5f0d6449e8072d87fbc559b1',
  'components': [
    {
      'title': 'Parent Page 1',
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
      'label': 'Page 1',
      'components': [
        {
          '_id': '602d249a907df059111efe72',
          'type': 'form',
          'tags': [],
          'owner': '5f0d6449e8072d87fbc559b1',
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
                      'label': 'one',
                      'value': 'one',
                      'shortcut': ''
                    },
                    {
                      'label': 'two',
                      'value': 'two',
                      'shortcut': ''
                    },
                    {
                      'label': 'three',
                      'value': 'three',
                      'shortcut': ''
                    }
                  ],
                  'key': 'radio1',
                  'type': 'radio',
                  'input': true
                }
              ],
              'input': false,
              'tableView': false
            },
            {
              'title': 'Page 2',
              'label': 'Page 2',
              'type': 'panel',
              'key': 'page2',
              'components': [
                {
                  'label': 'One',
                  'tableView': true,
                  'key': 'textField',
                  'conditional': {
                    'show': true,
                    'when': 'radio1',
                    'eq': 'one'
                  },
                  'type': 'textfield',
                  'input': true
                },
                {
                  'label': 'Two',
                  'tableView': true,
                  'key': 'textField1',
                  'conditional': {
                    'show': true,
                    'when': 'radio1',
                    'eq': 'two'
                  },
                  'type': 'textfield',
                  'input': true
                },
                {
                  'label': 'Three',
                  'tableView': true,
                  'key': 'textField2',
                  'conditional': {
                    'show': true,
                    'when': 'radio1',
                    'eq': 'three'
                  },
                  'type': 'textfield',
                  'input': true
                }
              ],
              'input': false,
              'tableView': false
            }
          ],
          'revisions': '',
          '_vid': 0,
          'title': 'Child Wizard Display Test',
          'display': 'wizard',
          'access': [
            {
              'roles': [
                '5cef8c28ed02e550f760a50e',
                '5cef8c28ed02e525c560a50f',
                '5cef8c28ed02e569ec60a510',
                '5f68ca5eaaf6804cdd6124ef'
              ],
              'type': 'read_all'
            }
          ],
          'submissionAccess': [
          ],
          'controller': '',
          'properties': {
          },
          'settings': {
          },
          'name': 'childWizardDisplayTest',
          'path': 'childwizarddisplaytest',
          'project': '5cef8c28ed02e5396860a50d',
          'created': '2021-02-17T14:13:46.163Z',
          'modified': '2021-02-17T14:13:46.168Z',
          'machineName': 'ieroeaewjerkyws:childWizardDisplayTest',
        }
      ],
      'input': false,
      'tableView': false,
    }
  ],
  'revisions': '',
  '_vid': 0,
  'title': 'Nested Wizard Test With Additional components',
  'display': 'wizard',
  'access': [
    {
      'roles': [
      ],
      'type': 'create_own'
    },
    {
      'roles': [
      ],
      'type': 'create_all'
    },
    {
      'roles': [
      ],
      'type': 'read_own'
    },
    {
      'roles': [
        '5cef8c28ed02e550f760a50e',
        '5cef8c28ed02e525c560a50f',
        '5cef8c28ed02e569ec60a510',
        '5f68ca5eaaf6804cdd6124ef'
      ],
      'type': 'read_all'
    },
    {
      'roles': [
      ],
      'type': 'update_own'
    },
    {
      'roles': [
      ],
      'type': 'update_all'
    },
    {
      'roles': [
      ],
      'type': 'delete_own'
    },
    {
      'roles': [
      ],
      'type': 'delete_all'
    },
    {
      'roles': [
      ],
      'type': 'team_read'
    },
    {
      'roles': [
      ],
      'type': 'team_write'
    },
    {
      'roles': [
      ],
      'type': 'team_admin'
    }
  ],
  'submissionAccess': [
    {
      'roles': [
      ],
      'type': 'create_own'
    },
    {
      'roles': [
      ],
      'type': 'create_all'
    },
    {
      'roles': [
      ],
      'type': 'read_own'
    },
    {
      'roles': [
      ],
      'type': 'read_all'
    },
    {
      'roles': [
      ],
      'type': 'update_own'
    },
    {
      'roles': [
      ],
      'type': 'update_all'
    },
    {
      'roles': [
      ],
      'type': 'delete_own'
    },
    {
      'roles': [
      ],
      'type': 'delete_all'
    },
    {
      'roles': [
      ],
      'type': 'team_read'
    },
    {
      'roles': [
      ],
      'type': 'team_write'
    },
    {
      'roles': [
      ],
      'type': 'team_admin'
    }
  ],
  'controller': '',
  'properties': {
  },
  'settings': {
  },
  'name': 'nestedWizardTestWithAdditionalComponents',
  'path': 'nestedwizardtestwithadditionalcomponents',
  'project': '5cef8c28ed02e5396860a50d',
  'created': '2021-02-19T10:46:16.031Z',
  'modified': '2021-02-22T11:14:27.829Z',
  'machineName': 'ieroeaewjerkyws:nestedWizardTestWithAdditionalComponents',
};
