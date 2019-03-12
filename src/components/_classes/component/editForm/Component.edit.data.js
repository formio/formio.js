import EditFormUtils from './utils';
/* eslint-disable max-len */
export default [
  {
    weight: 20,
    type: 'radio',
    label: 'Persistent',
    tooltip: 'A persistent field will be stored in database when the form is submitted.',
    key: 'persistent',
    input: true,
    inline: true,
    values: [
      { label: 'None', value: false },
      { label: 'Server', value: true },
      { label: 'Client', value: 'client-only' },
    ]
  },
  {
    weight: 30,
    type: 'checkbox',
    label: 'Protected',
    tooltip: 'A protected field will not be returned when queried via API.',
    key: 'protected',
    input: true
  },
  {
    weight: 40,
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
    weight: 50,
    placeholder: 'Default Value',
    tooltip: 'The will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
    input: true
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
    type: 'checkbox',
    input: true,
    weight: 200,
    key: 'dbIndex',
    label: 'Database Index',
    tooltip: 'Set this field as an index within the database. Increases performance for submission queries.'
  },
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh On',
    weight: 600,
    tooltip: 'Refresh data when another field changes.',
    dataSrc: 'custom',
    valueProperty: 'value',
    data: {
      custom: `
        values.push({label: 'Any Change', value: 'data'});
        utils.eachComponent(instance.root.editForm.components, function(component, path) {
          if (component.key !== data.key) {
            values.push({
              label: component.label || component.key,
              value: path
            });
          }
        });
      `
    }
  },
  {
    type: 'checkbox',
    input: true,
    weight: 601,
    key: 'clearOnRefresh',
    label: 'Clear Value On Refresh',
    tooltip: 'When the Refresh On field is changed, clear this components value.'
  },
  {
    weight: 700,
    type: 'checkbox',
    label: 'Clear Value When Hidden',
    key: 'clearOnHide',
    tooltip: 'When a field is hidden, clear the value.',
    input: true
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 1000,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 1100,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"sum": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>'
  ),
];
/* eslint-enable max-len */
