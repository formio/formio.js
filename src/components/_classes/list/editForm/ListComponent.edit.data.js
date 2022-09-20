export default [
    {
        type: 'select',
        input: true,
        weight: 0,
        tooltip: 'The source to use for the select data. Values lets you provide your own values and labels. JSON lets you provide raw JSON data. URL lets you provide a URL to retrieve the JSON data from.',
        key: 'dataSrc',
        defaultValue: 'values',
        label: 'Data Source Type',
        dataSrc: 'values',
    },
    {
        type: 'textfield',
        input: true,
        key: 'data.url',
        weight: 10,
        label: 'Data Source URL',
        placeholder: 'Data Source URL',
        tooltip: 'A URL that returns a JSON array to use as the data source.',
        conditional: {
            json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
    },
    {
        type: 'datagrid',
        input: true,
        label: 'Request Headers',
        key: 'data.headers',
        tooltip: 'Set any headers that should be sent along with the request to the url. This is useful for authentication.',
        weight: 11,
        components: [
          {
            label: 'Key',
            key: 'key',
            input: true,
            type: 'textfield',
          },
          {
            label: 'Value',
            key: 'value',
            input: true,
            type: 'textfield',
          },
        ],
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
    },
    {
        type: 'textfield',
        input: true,
        label: 'Value Property',
        key: 'valueProperty',
        skipMerge: true,
        clearOnHide: false,
        weight: 13,
        description: "The selected item's property to save.",
        tooltip: 'The property of each item in the data source to use as the select value. If not specified, the item itself will be used.',
        conditional: {
            json: {
                in: [
                    { var: 'data.dataSrc' },
                    [
                        'json',
                        'url',
                        'custom'
                    ],
                ],
            },
        },
    },
    {
        type: 'textarea',
        input: true,
        key: 'template',
        label: 'Item Template',
        editor: 'ace',
        as: 'html',
        rows: 3,
        weight: 18,
        tooltip: 'The HTML template for the result data items.',
        allowCalculateOverride: true,
        calculateValue:(context) => {
            if (!context.data.template) {
                if (context.instance && context.instance._currentForm.options.editComponent) {
                    return context.instance._currentForm.options.editComponent.template;
                }
            }
            return context.data.template;
        },
    },
    {
        type: 'checkbox',
        input: true,
        weight: 26,
        key: 'authenticate',
        label: 'Formio Authenticate',
        tooltip: 'Check this if you would like to use Formio Authentication with the request.',
        conditional: {
          json: { '===': [{ var: 'data.dataSrc' }, 'url'] },
        },
    },
    {
        type: 'checkbox',
        input: true,
        weight: 29,
        key: 'ignoreCache',
        label: 'Disables Storing Request Result in the Cache',
        tooltip: 'Check it if you don\'t want the requests and its results to be stored in the cache. By default, it is stored and if the Select tries to make the request to the same URL with the same paremetrs, the cached data will be returned. It allows to increase performance, but if the remote source\'s data is changing quite often and you always need to keep it up-to-date, uncheck this option.',
        conditional: {
          json: { 'or': [
            { '===': [{ var: 'data.dataSrc' }, 'url'] },
            { '===': [{ var: 'data.dataSrc' }, 'resource'] },
          ] },
        },
    },
];
