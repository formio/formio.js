export default {
    label: 'Edit Grid',
    tableView: false,
    rowDrafts: true,
    key: 'editGrid1',
    type: 'editgrid',
    input: true,
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
};
