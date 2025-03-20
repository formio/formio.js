export default {
    title: '7595',
    name: '7595',
    path: '7595',
    type: 'form',
    display: 'form',
    components:[
        {
            label: 'Checkbox',
            tableView: false,
            validateWhenHidden: false,
            key: 'checkboxBefore',
            conditional: {
              show: true,
              conjunction: 'all',
              conditions: [
                {
                  component: 'textField',
                  operator: 'isNotEmpty'
                }
              ]
            },
            type: 'checkbox',
            input: true
        },
        {
        label: 'Text Field',
        applyMaskOn: 'change',
        tableView: true,
        key: 'textField',
        type: 'textfield',
        input: true
        },
        {
            label: 'Checkbox',
            tableView: false,
            validateWhenHidden: false,
            key: 'checkboxAfter',
            conditional: {
              show: true,
              conjunction: 'all',
              conditions: [
                {
                  component: 'textField',
                  operator: 'isNotEmpty'
                }
              ]
            },
            type: 'checkbox',
            input: true
        },
    ]
};
