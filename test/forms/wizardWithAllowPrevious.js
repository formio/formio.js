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
                    label: 'A',
                    tableView: false,
                    key: 'a',
                    type: 'checkbox',
                    input: true,
                    defaultValue: false,
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
                    label: 'B',
                    tableView: true,
                    key: 'b',
                    type: 'textfield',
                    input: true,
                },
            ],
            input: false,
            tableView: false,
        },
    ],
    title: 'wizardWithAllowPreviousTest',
    display: 'wizard',
};
