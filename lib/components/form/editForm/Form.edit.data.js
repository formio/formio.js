import EditFormUtils from '../../_classes/component/editForm/utils';
export default [
    EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 120, [
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
            property: 'customDefaultValueConstant',
        },
    ]),
    EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 130, [
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
            property: 'calculateValueConstant',
        },
    ], '<tr><th>token</th><td>The decoded JWT token for the authenticated user.</td></tr>'),
];
