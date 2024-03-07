export default {
    title: 'test datagrid',
    name: 'testDatagrid',
    path: 'testdatagrid',
    type: 'form',
    display: 'form',
    components: [
        {
            label: 'Data Grid',
            reorder: false,
            addAnotherPosition: 'bottom',
            layoutFixed: false,
            enableRowGroups: false,
            initEmpty: false,
            tableView: false,
            defaultValue: [{}],
            key: 'dataGrid',
            type: 'datagrid',
            input: true,
            components: [
                {
                    label: 'Radio',
                    optionsLabelPosition: 'right',
                    inline: false,
                    tableView: false,
                    values: [
                        {
                            label: 'one',
                            value: 'one',
                            shortcut: '',
                        },
                        {
                            label: 'two',
                            value: 'two',
                            shortcut: '',
                        },
                        {
                            label: 'three',
                            value: 'three',
                            shortcut: '',
                        },
                    ],
                    key: 'radio',
                    type: 'radio',
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
};
