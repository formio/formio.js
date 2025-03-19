export default {
    _id: '659fa81f4a40147c0ffb949b',
    title: '7724',
    name: '7724',
    path: '7724',
    type: 'form',
    display: 'form',
    components: [
        {
            label: 'Select',
            widget: 'choicesjs',
            tableView: true,
            multiple: true,
            data:
                {
                    values: [
                        {
                            label: 'Apple',
                            value: 'apple'
                        },
                        {
                            label: 'Orange',
                            value: 'orange'
                        },
                        {
                            label: 'Pear',
                            value: 'pear'
                        }
                    ]
                },
            key: 'select',
            type: 'select',
            input: true
        },
        {
            type: 'button',
            label: 'Submit',
            key: 'submit',
            disableOnInvalid: true,
            input: true,
            tableView: false
        }
    ],
    project: '63cead09be0090345b109e22'
};
