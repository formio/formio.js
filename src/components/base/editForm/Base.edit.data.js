import EditFormUtils from './utils';
/* eslint-disable max-len */
export default [
  {
    type: 'textfield',
    label: 'Default Value',
    key: 'defaultValue',
    weight: 100,
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 110,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 120,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"sum": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>'
  ),
  {
    weight: 400,
    type: 'checkbox',
    label: 'Encrypt',
    tooltip: 'Encrypt this field on the server. This is two way encryption which is not be suitable for passwords.',
    key: 'autofocus',
    input: true
  },
  {
    type: 'checkbox',
    input: true,
    weight: 500,
    key: 'dbIndex',
    label: 'Database Index',
    tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
  }
];
/* eslint-enable max-len */
