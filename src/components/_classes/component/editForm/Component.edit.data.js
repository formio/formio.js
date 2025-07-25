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
    tooltip: 'The Default Value will be the value for this field, before user interaction. Having a default value will override the placeholder text.',
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
    label: 'Encrypted',
    tooltip: 'Encrypt this field on the server. This is two way encryption which is not suitable for passwords.',
    key: 'encrypted',
    input: true,
    customConditional: 'show = data.encrypted;',
    logic: [
      {
        name: 'disabled',
        trigger: {
          type: 'javascript',
          javascript: 'result = !instance.root.options.sac;'
        },
        actions: [
          {
            name: 'disabled',
            type: 'property',
            property: {
              label: 'Disabled',
              value: 'disabled',
              type: 'boolean'
            },
            state: true
          }
        ]
      },
      {
        name: 'hide',
        trigger: {
          type: 'javascript',
          javascript: 'result = instance.root.options.editJson === false;'
        },
        actions: [
          {
            name: 'hide',
            type: 'property',
            property: {
              label: 'Hidden',
              value: 'hidden',
              type: 'boolean'
            },
            state: true
          }
        ]
      },
      {
        name: 'disabledToolTip',
        trigger: {
          type: 'javascript',
          javascript: 'result = !instance.root.options.sac;'
        },
        actions: [
          {
            name: 'addDisabledTooltip',
            type: 'property',
            property: {
              label: 'Tooltip',
              value: 'tooltip',
              type: 'string'
            },
            text: 'Only available with Security Module. Contact sales@form.io for more information.'
          }
        ]
      }
    ]
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
    label: 'Omit Value From Submission Data When Conditionally Hidden',
    key: 'clearOnHide',
    defaultValue: true,
    tooltip: 'When a field is conditionally hidden, omit the value from the submission data.',
    input: true
  },
  EditFormUtils.javaScriptValue('Custom Default Value', 'customDefaultValue', 'customDefaultValue', 1000,
    '<p><h4>Example:</h4><pre>value = data.firstName + " " + data.lastName;</pre></p>',
    '<p><h4>Example:</h4><pre>{"cat": [{"var": "data.firstName"}, " ", {"var": "data.lastName"}]}</pre>'
  ),
  EditFormUtils.javaScriptValue('Calculated Value', 'calculateValue', 'calculateValue', 1100,
    '<p><h4>Example:</h4><pre>value = data.a + data.b + data.c;</pre></p>',
    '<p><h4>Example:</h4><pre>{"+": [{"var": "data.a"}, {"var": "data.b"}, {"var": "data.c"}]}</pre><p><a href="https://help.form.io/userguide/form-building/logic-and-conditions#calculated-values" target="_blank" rel="noopener noreferrer">Click here for an example</a></p>',
    EditFormUtils.tokenVariableDescription()
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
  {
    type: 'textarea',
    as: 'json',
    editor: 'ace',
    weight: 1400,
    input: true,
    key: 'serverOverride',
    label: 'Server Override',
    tooltip: 'A JSON object containing the component settings that should be overriden when the form submission is processed on the server side.',
    defaultValue: {},
    description: '<b>Example</b>: { "clearOnHide": true }',
  }
]
