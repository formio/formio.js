export default {
    input: true,
    tree: true,
    components: [
        {
            type: 'editgrid',
            label: 'Edit Grid',
            key: 'children',
            input: true,
            components: [
                {
                    type: 'textfield',
                    key: 'name',
                    label: 'Name',
                    input: true,
                },
            ],
        },
    ],
    tableView: true,
    label: 'User',
    key: 'user',
    protected: false,
    persistent: true,
    type: 'container',
    tags: [],
    conditional: {
        show: '',
        when: null,
        eq: '',
    },
};
