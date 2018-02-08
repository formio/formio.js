'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BaseEditValidation = exports.BaseEditValidation = [{
  weight: 0,
  type: 'checkbox',
  label: 'Required',
  tooltip: 'A required field must be filled in before the form can be submitted.',
  key: 'validate.required',
  input: true
}, {
  weight: 100,
  type: 'checkbox',
  label: 'Unique',
  tooltip: 'Makes sure the data submitted for this field is unique, and has not been submitted before.',
  key: 'validate.unique',
  input: true
}, {
  weight: 200,
  key: 'validate.customMessage',
  label: 'Custom Error Message',
  placeholder: 'Custom Error Message',
  type: 'textfield',
  tooltip: 'Error message displayed if any error occurred.',
  input: true
}, {
  type: 'panel',
  title: 'Custom Validation',
  collapsible: true,
  collapsed: true,
  style: { 'margin-bottom': '10px' },
  key: 'custom-validation-js',
  weight: 300,
  components: [{
    type: 'textarea',
    key: 'validate.custom',
    rows: 5,
    editor: 'ace',
    input: true
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: '\n          <small>\n            <p>Enter custom validation code.</p>\n            <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>\n            <p>The global variables <strong>input</strong>, <strong>component</strong>, and <strong>valid</strong> are provided.</p>\n          </small>'
  }, {
    type: 'well',
    components: [{
      weight: 100,
      type: 'checkbox',
      label: 'Secret Validation',
      tooltip: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
      description: 'Check this if you wish to perform the validation ONLY on the server side. This keeps your validation logic private and secret.',
      key: 'validate.customPrivate',
      input: true
    }]
  }]
}, {
  type: 'panel',
  title: 'JSONLogic Validation',
  collapsible: true,
  collapsed: true,
  key: 'json-validation-json',
  weight: 400,
  components: [{
    type: 'htmlelement',
    tag: 'div',
    content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' + '<p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' + '<p><a href="http://formio.github.io/formio.js/app/examples/calculated.html" target="_blank">Click here for an example</a></p>'
  }, {
    type: 'textarea',
    key: 'validate.json',
    rows: 5,
    editor: 'ace',
    as: 'json',
    input: true
  }]
}];