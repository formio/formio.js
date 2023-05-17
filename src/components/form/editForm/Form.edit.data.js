import EditFormUtils from '../../_classes/component/editForm/utils';
/* eslint-disable max-len */
export default [
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 120,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 130,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank" rel="noopener noreferrer">Click here for an example</a></p>'
  ),
  {
    weight: 140,
    type: 'checkbox',
    label: 'Clear Value When Hidden',
    key: 'clearOnHide',
    defaultValue: true,
    tooltip: 'When a field is hidden, clear the value.',
    input: true
  },
];
/* eslint-enable max-len */
