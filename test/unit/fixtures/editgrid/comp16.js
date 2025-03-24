export default {
    type: 'form',
    display: 'wizard',
    components: [
        {
            title: 'Page 1',
            breadcrumbClickable: true,
            buttonSettings: {
                previous: true,
                cancel: true,
                next: true
            },
            collapsible: false,
            tableView: false,
            key: 'page3',
            type: 'panel',
            label: 'Page 2',
            input: false,
            components: [
                {
                    label: 'Edit Grid',
                    tableView: true,
                    rowDrafts: false,
                    key: 'editGrid',
                    type: 'editgrid',
                    input: true,
                    components: [
                        {
                            label: 'Text Field',
                            tableView: true,
                            key: 'textField',
                            type: 'textfield',
                            input: true,
                            alwaysEnabled: false
                        }
                    ],
                    alwaysEnabled: false
                }
            ],
            alwaysEnabled: false
        },
        {
            title: 'Page 2',
            breadcrumbClickable: true,
            buttonSettings: {
                previous: true,
                cancel: true,
                next: true
            },
            collapsible: false,
            tableView: false,
            key: 'page2',
            type: 'panel',
            label: 'Page 1',
            input: false,
            alwaysEnabled: false,
            components: []
        },
        {
            label: 'Submit',
            showValidations: false,
            alwaysEnabled: false,
            tableView: false,
            key: 'submit',
            type: 'button',
            input: true
        }
    ]
}
