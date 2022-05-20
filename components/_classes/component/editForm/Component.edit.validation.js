"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _utils = _interopRequireDefault(require("./utils"));

var _Evaluator = _interopRequireDefault(require("../../../../utils/Evaluator"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quotes, max-len */
var _default = [{
  weight: 10,
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
  key: 'unique',
  input: true
}, {
  weight: 0,
  type: 'select',
  key: 'validateOn',
  defaultValue: 'change',
  input: true,
  label: 'Validate On',
  tooltip: 'Determines when this component should trigger front-end validation.',
  dataSrc: 'values',
  data: {
    values: [{
      label: 'Change',
      value: 'change'
    }, {
      label: 'Blur',
      value: 'blur'
    }]
  }
}, {
  weight: 190,
  type: 'textfield',
  input: true,
  key: 'errorLabel',
  label: 'Error Label',
  placeholder: 'Error Label',
  tooltip: 'The label for this field when an error occurs.'
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
  style: {
    'margin-bottom': '10px'
  },
  key: 'custom-validation-js',
  weight: 300,
  customConditional: function customConditional() {
    return !_Evaluator.default.noeval || _Evaluator.default.protectedEval;
  },
  components: [_utils.default.logicVariablesTable('<tr><th>input</th><td>The value that was input into this component</td></tr>'), {
    type: 'textarea',
    key: 'validate.custom',
    rows: 5,
    editor: 'ace',
    hideLabel: true,
    as: 'javascript',
    input: true
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: "\n          <small>\n            <p>Enter custom validation code.</p>\n            <p>You must assign the <strong>valid</strong> variable as either <strong>true</strong> or an error message if validation fails.</p>\n            <h5>Example:</h5>\n            <pre>valid = (input === 'Joe') ? true : 'Your name must be \"Joe\"';</pre>\n          </small>"
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

    /* eslint-disable prefer-template */
    content: '<p>Execute custom logic using <a href="http://jsonlogic.com/" target="_blank">JSONLogic</a>.</p>' + '<h5>Example:</h5>' + '<pre>' + JSON.stringify({
      "if": [{
        "===": [{
          "var": "input"
        }, "Bob"]
      }, true, "Your name must be 'Bob'!"]
    }, null, 2) + '</pre>'
    /* eslint-enable prefer-template */

  }, {
    type: 'textarea',
    key: 'validate.json',
    hideLabel: true,
    rows: 5,
    editor: 'ace',
    as: 'json',
    input: true
  }]
}, {
  type: 'panel',
  title: 'Custom Errors',
  collapsible: true,
  collapsed: true,
  key: 'errors',
  weight: 400,
  components: [{
    type: 'textarea',
    key: 'errors',
    hideLabel: true,
    rows: 5,
    editor: 'ace',
    as: 'json',
    input: true
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: "\n          <p>This allows you to set different custom error messages for different errors\n          (in contrast to \u201CCustom Error Message\u201D, which only allows you to set one\n          error message for all errors). E.g.</p>\n\n<pre>{\n  \"required\": \"{<span/>{ field }} is required. Try again.\",\n  \"maxLength\": \"{<span/>{ field }} is too long. Try again.\"\n}</pre>\n\n          <p>You can set the following keys (among others):</p>\n          <ul>\n            <li>r<span/>equired</li>\n            <li>m<span/>in</li>\n            <li>m<span/>ax</li>\n            <li>m<span/>inLength</li>\n            <li>m<span/>axLength</li>\n            <li>m<span/>inWords</li>\n            <li>m<span/>axWords</li>\n            <li>i<span/>nvalid_email</li>\n            <li>i<span/>nvalid_date</li>\n            <li>i<span/>nvalid_day</li>\n            <li>i<span/>nvalid_regex</li>\n            <li>m<span/>ask</li>\n            <li>p<span/>attern</li>\n            <li>c<span/>ustom</li>\n          </ul>\n\n          <p>Depending on the error message some of the following template variables can be used in the script:</p>\n          <ul>\n           <li><code>{<span/>{ f<span/>ield }}</code> is replaced with the label of the field.</li>\n           <li><code>{<span/>{ m<span/>in }}</code></li>\n           <li><code>{<span/>{ m<span/>ax }}</code></li>\n           <li><code>{<span/>{ l<span/>ength }}</code></li>\n           <li><code>{<span/>{ p<span/>attern }}</code></li>\n           <li><code>{<span/>{ m<span/>inDate }}</code></li>\n           <li><code>{<span/>{ m<span/>axDate }}</code></li>\n           <li><code>{<span/>{ m<span/>inYear }}</code></li>\n           <li><code>{<span/>{ m<span/>axYear }}</code></li>\n           <li><code>{<span/>{ r<span/>egex }}</code></li>\n          </ul>\n        "
  }]
}];
/* eslint-enable quotes, max-len */

exports.default = _default;