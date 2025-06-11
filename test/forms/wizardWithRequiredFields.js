export default {
    'type': 'form',
    'components': [
        {
        'title': 'Page With Required Field',
        'label': 'Page With Required Field',
        'type': 'panel',
        'key': 'pageWithRequiredField',
        'components': [
            {
            'label': 'Text Field',
            'applyMaskOn': 'change',
            'tableView': true,
            'validate': {
                'required': true
            },
            'validateWhenHidden': false,
            'key': 'textField',
            'type': 'textfield',
            'input': true
            },
            {
                'label': 'Data Grid',
                'reorder': false,
                'addAnotherPosition': 'bottom',
                'layoutFixed': false,
                'enableRowGroups': false,
                'initEmpty': false,
                'tableView': false,
                'validateWhenHidden': false,
                'key': 'dataGrid',
                'type': 'datagrid',
                'input': true,
                'components': [
                  {
                    'label': 'Text Field',
                    'applyMaskOn': 'change',
                    'tableView': true,
                    'validate': {
                      'required': true
                    },
                    'validateWhenHidden': false,
                    'key': 'textField',
                    'type': 'textfield',
                    'input': true
                  }
                ]
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
        'input': false,
        'tableView': false,
        'components': []
        }
    ],
    'revisions': '',
    '_vid': 0,
    'title': 'nested wizard with required fields',
    'display': 'wizard',
    'name': 'nestedWizard',
    'path': 'nestedwizard'
}