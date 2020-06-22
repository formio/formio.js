export default [
    {
        type: 'select',
        input: true,
        label: 'Storage Type',
        key: 'dataType',
        clearOnHide: true,
        tooltip: 'The type to store the data. If you select something other than autotype, it will force it to that type.',
        weight: 12,
        template: '<span>{{ item.label }}</span>',
        dataSrc: 'values',
        data: {
            values: [
                { label: 'Autotype', value: '' },
                { label: 'String', value: 'string' },
                { label: 'Date', value: 'date' },
            ],
        },
    },
    {
        type: 'textfield',
        input: true,
        key: 'defaultDate',
        label: 'Default Date',
        placeholder: 'moment()',
        tooltip: 'You can use Moment.js functions to set the default value to a specific date. For example: \n \n moment().subtract(10, \'days\')',
        weight: 6,
    }, {
        type: 'textarea',
        as: 'json',
        editor: 'ace',
        weight: 28,
        input: true,
        key: 'customOptions',
        label: 'Flatpikr options',
        tooltip: 'A raw JSON object to use as options for the Date / Time component (Flatpickr).',
        defaultValue: {},
    },
];
