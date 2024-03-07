export default {
    _id: '5ece2d11b8c2fe102c726057',
    type: 'form',
    tags: [],
    owner: '5e05a6b7549cdc2ece30c6b0',
    components: [
        {
            label: 'Edit Grid',
            tableView: false,
            modal: true,
            validate: {
                required: true,
            },
            key: 'editGrid',
            type: 'editgrid',
            input: true,
            components: [
                {
                    label: 'Form',
                    tableView: true,
                    components: [
                        {
                            label: 'Tabs',
                            components: [
                                {
                                    label: 'Tab 1',
                                    key: 'tab1',
                                    components: [
                                        {
                                            label: 'Text Field',
                                            tableView: true,
                                            validate: {
                                                required: true,
                                            },
                                            key: 'textField',
                                            type: 'textfield',
                                            input: true,
                                        },
                                    ],
                                },
                                {
                                    label: 'Tab 2',
                                    key: 'tab2',
                                    components: [
                                        {
                                            label: 'Text Field 2',
                                            tableView: true,
                                            validate: {
                                                required: true,
                                            },
                                            key: 'textField2',
                                            type: 'textfield',
                                            input: true,
                                        },
                                    ],
                                },
                            ],
                            tableView: false,
                            key: 'tabs',
                            type: 'tabs',
                            input: false,
                        },
                        {
                            label: 'Submit',
                            showValidations: false,
                            tableView: false,
                            key: 'submit',
                            type: 'button',
                            input: true,
                        },
                    ],
                    key: 'form',
                    type: 'form',
                    input: true,
                },
            ],
        },
        {
            label: 'Submit',
            showValidations: false,
            tableView: false,
            key: 'submit',
            type: 'button',
            input: true,
        },
    ],
    controller: '',
    revisions: '',
    _vid: 0,
    title: 'modalEditGridValidation',
    display: 'form',
    access: [
        {
            roles: [
                '5e96e79ee1c3ad3178454100',
                '5e96e79ee1c3ad3178454101',
                '5e96e79ee1c3ad3178454102',
            ],
            type: 'read_all',
        },
    ],
    submissionAccess: [],
    settings: {},
    properties: {},
    name: 'modalEditGridValidation',
    path: 'modaleditgridvalidation',
};
