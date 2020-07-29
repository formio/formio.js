import EditFormUtils from './utils';
export default [
    {
        weight: 0,
        type: 'checkbox',
        label: 'Multiple Values',
        tooltip: 'Allows multiple values to be entered for this field.',
        key: 'multiple',
        input: true,
    },
    {
        type: 'textfield',
        label: 'Default Value',
        key: 'defaultValue',
        weight: 5,
        placeholder: 'Default Value',
        tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
        input: true,
    },
    {
        weight: 30,
        type: 'radio',
        label: 'Persistent',
        tooltip: 'A persistent field will be stored in database when the form is submitted.',
        key: 'persistent',
        input: true,
        inline: true,
        defaultValue: true,
        values: [
            { label: 'None', value: false },
            { label: 'Server', value: true },
            { label: 'Client', value: 'client-only' },
        ],
    },
    {
        weight: 150,
        type: 'checkbox',
        label: 'Protected',
        tooltip: 'A protected field will not be returned when queried via API.',
        key: 'protected',
        input: true,
    },
    {
        type: 'checkbox',
        input: true,
        weight: 200,
        key: 'dbIndex',
        label: 'Database Index',
        tooltip: 'Set this field as an index within the database. Increases performance for submission queries.',
    },
    {
        weight: 400,
        type: 'checkbox',
        label: 'Encrypted (Enterprise Only)',
        tooltip: 'Encrypt this field on the server. This is two way encryption which is not suitable for passwords.',
        key: 'encrypted',
        input: true,
    },
    {
        type: 'select',
        input: true,
        key: 'redrawOn',
        label: 'Redraw On',
        weight: 600,
        tooltip: 'Redraw this component if another component changes. This is useful if interpolating parts of the component like the label.',
        dataSrc: 'custom',
        valueProperty: 'value',
        data: {
            custom: function (context) {
                var values = [];
                values.push({ label: 'Any Change', value: 'data' });
                context.utils.eachComponent(context.instance.options.editForm.components, function (component, path) {
                    if (component.key !== context.data.key) {
                        values.push({
                            label: component.label || component.key,
                            value: path
                        });
                    }
                });
                return values;
            },
        },
        conditional: {
            json: { '!': [{ var: 'data.dataSrc' }] },
        },
    },
    {
        weight: 700,
        type: 'checkbox',
        label: 'Clear Value When Hidden',
        key: 'clearOnHide',
        defaultValue: true,
        tooltip: 'When a field is hidden, clear the value.',
        input: true,
    },
    EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 1000, [
        {
            type: 'js',
            property: 'customDefaultValue',
            example: '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
        },
        {
            type: 'json',
            property: 'customDefaultValue',
            example: '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>',
        },
        {
            type: 'variable',
            property: 'customDefaultValueVariable',
        },
    ]),
    EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 1100, [
        {
            type: 'js',
            property: 'calculateValue',
            example: '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
        },
        {
            type: 'json',
            property: 'calculateValue',
            example: '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>',
        },
        {
            type: 'variable',
            property: 'calculateValueVariable',
        },
    ], '<tr><th>token</th><td>The decoded JWT token for the authenticated user.</td></tr>'),
    {
        type: 'checkbox',
        input: true,
        weight: 1100,
        key: 'calculateServer',
        label: 'Calculate Value on server',
        tooltip: 'Checking this will run the calculation on the server. This is useful if you wish to override the values submitted with the calculations performed on the server.',
    },
    {
        type: 'checkbox',
        input: true,
        weight: 1200,
        key: 'allowCalculateOverride',
        label: 'Allow Manual Override of Calculated Value',
        tooltip: 'When checked, this will allow the user to manually override the calculated value.',
    },
    {
        key: 'apiInfoHeading',
        type: 'htmlelement',
        input: false,
        weight: 1299,
        tag: 'h4',
        content: 'API Info',
    },
    {
        weight: 1300,
        type: 'textfield',
        input: true,
        key: 'key',
        label: 'Property Name',
        tooltip: 'The name of this field in the API endpoint.',
        validate: {
            pattern: '(\\w|\\w[\\w-.]*\\w)',
            patternMessage: 'The property name must only contain alphanumeric characters, underscores, dots and dashes and should not be ended by dash or dot.',
        },
    },
    {
        weight: 1400,
        type: 'tags',
        input: true,
        label: 'Field Tags',
        storeas: 'array',
        tooltip: 'Tag the field for use in custom logic.',
        key: 'tags',
    },
    {
        weight: 1500,
        type: 'datamap',
        label: 'Custom Properties',
        tooltip: 'This allows you to configure any custom properties for this component.',
        key: 'properties',
        valueComponent: {
            type: 'textfield',
            key: 'value',
            label: 'Value',
            placeholder: 'Value',
            input: true,
        },
    },
];
