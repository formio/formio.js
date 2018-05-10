import EditFormUtils from './utils';
/* eslint-disable quotes, max-len */
export default [
  {
    weight: 0,
    type: 'checkbox',
    label: 'Required',
    tooltip: 'A required field must be filled in before the form can be submitted.',
    key: 'validate.required',
    input: true
  },
  {
    weight: 100,
    type: 'checkbox',
    label: 'Unique',
    tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.',
    key: 'validate.unique',
    input: true
  },
  {
    weight: 200,
    key: 'validate.customMessage',
    label: 'Custom Error Message',
    placeholder: 'Custom Error Message',
    type: 'textfield',
    tooltip: 'Error message displayed if any error occurred.',
    input: true
  },
  {
    type: 'panel',
    title: 'Custom Validation',
    collapsible: true,
    collapsed: true,
    style: {'margin-bottom': '10px'},
    key: 'custom-validation-js',
    weight: 300,
    components: [
      EditFormUtils.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'),
      {
        type: 'textarea',
        key: 'validate.custom',
        rows: 5,
        editor: 'ace',
        hideLabel: true,
        input: true
      },
      {
        type: 'htmlelement',
        tag: 'div',
        content: `
          <small>
            <p>Enter custom validation code.</p>
            <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>
            <h5>Example:</h5>
            <pre>valid = (input === 'Joe') ? true : 'Your name must be "Joe"';</pre>
          </small>`
      },
      {
        type: 'well',
        components: [
          {
            weight: 100,
            type: 'checkbox',
            label: 'Secret Validation',
            tooltip: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
            description: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
            key: 'validate.customPrivate',
            input: true
          }
        ]
      }
    ]
  },
  {
    type: 'panel',
    title: 'JSONLogic Validation',
    collapsible: true,
    collapsed: true,
    key: 'json-validation-json',
    weight: 400,
    components: [
      {
        type: 'htmlelement',
        tag: 'div',
        content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' +
          '<h5>Example:</h5>' +
          '<pre>' + JSON.stringify({
            "if": [
              {"===": [{"var": "input"}, "Bob"]},
              true,
              "Your name must be 'Bob'!"
            ]
          }, null, 2) + '</pre>'
      },
      {
        type: 'textarea',
        key: 'validate.json',
        hideLabel: true,
        rows: 5,
        editor: 'ace',
        as: 'json',
        input: true
      }
    ]
  }
];
/* eslint-enable quotes, max-len */
