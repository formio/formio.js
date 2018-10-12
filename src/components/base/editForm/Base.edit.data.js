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
  {
    type: 'select',
    input: true,
    key: 'refreshOn',
    label: 'Refresh On',
    weight: 110,
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
    weight: 111,
    key: 'clearOnRefresh',
    label: 'Clear Value On Refresh',
    tooltip: 'When the Refresh On field is changed, clear this components value.'
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 120,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 130,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"sum": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a target="_blank" href="http://formio.github.io/formio.js/app/examples/calculated.html">Click here for an example</a></p>'
  ),
  {
    type: 'checkbox',
    input: true,
    weight: 131,
    key: 'allowCalculateOverride',
    label: 'Allow Manual Override of Calculated Value',
    tooltip: 'When checked, this will allow the user to manually override the calculated value.'
  },
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
