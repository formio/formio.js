export default {
    type: 'form',
    tags: [],
    components: [
        {
            title: 'Page 1',
            label: 'Page 1',
            type: 'panel',
            key: 'page1',
            components: [
                {
                    label: 'Number',
                    mask: false,
                    spellcheck: true,
                    tableView: false,
                    delimiter: false,
                    requireDecimal: false,
                    inputFormat: 'plain',
                    key: 'number',
                    type: 'number',
                    input: true,
                },
            ],
            input: false,
            tableView: false,
        },
        {
            title: 'Page 2',
            label: 'Page 2',
            type: 'panel',
            key: 'page2',
            components: [
                {
                    label: 'Edit Grid',
                    tableView: false,
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
                        },
                    ],
                },
            ],
            input: false,
            tableView: false,
            disabled: true,
        },
    ],
    title: 'editGridInsideWizardTest',
    display: 'wizard',
};
