import EditFormUtils from './utils';
/* eslint-disable max-len */
export default [
  {
    weight: 0,
    type: 'checkbox',
    label: 'Multiple Values',
    tooltip: 'Allows multiple values to be entered for this field.',
    key: 'multiple',
    input: true
  },
  {
    type: 'textfield',
    label: 'Default Value',
    key: 'defaultValue',
    weight: 5,
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true
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
    ]
  },
  {
    weight: 150,
    type: 'checkbox',
    label: 'Protected',
    tooltip: 'A protected field will not be returned when queried via API.',
    key: 'protected',
    input: true
  },
  {
    type: 'checkbox',
    input: true,
    weight: 200,
    key: 'dbIndex',
    label: 'Database Index',
    tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
  },
  {
    weight: 400,
    type: 'checkbox',
    label: 'Encrypted (Enterprise Only)',
    tooltip: 'Encrypt this field on the server. This is two way encryption which is not suitable for passwords.',
    key: 'encrypted',
    input: true
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
      custom(context) {
        var values = [];
        values.push({ label: 'Any Change', value: 'data' });
        context.utils.eachComponent(context.instance.options.editForm.components, function(component, path) {
          if (component.key !== context.data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
        return values;
      }
    },
    conditional: {
      json: { '!' : [{ var: 'data.dataSrc' }] },
    },
  },
  {
    weight: 700,
    type: 'checkbox',
    label: 'Clear Value When Hidden',
    key: 'clearOnHide',
    defaultValue: true,
    tooltip: 'When a field is hidden, clear the value.',
    input: true
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 1000,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 1100,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>',
'<tr><th>token</th><td>The decoded JWT token for the authenticated user.</td></tr>'
  ),
  {
    type: 'checkbox',
    input: true,
    weight: 1100,
    key: 'calculateServer',
    label: 'Calculate Value on server',
    tooltip: 'Checking this will run the calculation on the server. This is useful if you wish to override the values submitted with the calculations performed on the server.'
  },
  {
    type: 'checkbox',
    input: true,
    weight: 1200,
    key: 'allowCalculateOverride',
    label: 'Allow Manual Override of Calculated Value',
    tooltip: 'When checked, this will allow the user to manually override the calculated value.'
  },
];
/* eslint-enable max-len */
