'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var BaseEditConditional = exports.BaseEditConditional = [{
  type: 'panel',
  title: 'Simple',
  key: 'simple-conditional',
  theme: 'default',
  components: [{
    type: 'select',
    input: true,
    label: 'This component should Display:',
    key: 'conditional.show',
    dataSrc: 'values',
    data: {
      values: [{ label: 'True', value: true }, { label: 'False', value: false }]
    }
  }, {
    type: 'select',
    input: true,
    label: 'When the form component:',
    key: 'conditional.when',
    dataSrc: 'custom',
    data: {
      custom: '\n            utils.eachComponent(form.components, function(component, path) {\n              if (component.key !== data.key) {\n                values.push({\n                  label: component.label || component.key,\n                  value: path\n                });\n              }\n            });\n          '
    }
  }, {
    type: 'textfield',
    input: true,
    label: 'Has the value:',
    key: 'conditional.eq'
  }]
}, {
  type: 'panel',
  title: 'Advanced',
  key: 'advanced-conditional',
  theme: 'default',
  collapsible: true,
  collapsed: true,
  components: [{
    type: 'textarea',
    key: 'customConditional',
    rows: 5,
    editor: 'ace',
    input: true,
    placeholder: 'show = (data[\'mykey\'] > 1);'
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: '<small>' + '<p>Enter custom conditional code.</p>' + '<p>You must assign the <strong>show</strong> variable as either <strong>true</strong> or <strong>false</strong>.</p>' + '<p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>' + '<p><strong>Note: Advanced Conditional logic will override the results of the Simple Conditional logic.</strong></p>' + '</small>'
  }]
}, {
  type: 'panel',
  title: 'JSON Conditional',
  key: 'json-conditional',
  theme: 'default',
  collapsible: true,
  collapsed: true,
  components: [{
    type: 'textarea',
    key: 'conditional.json',
    rows: 5,
    editor: 'ace',
    as: 'json',
    input: true,
    placeholder: '{ ... }'
  }, {
    type: 'htmlelement',
    tag: 'div',
    content: '<small>' + '<p>Execute custom validation logic with JSON and <a href="http://jsonlogic.com/">JsonLogic</a>.</p>' + '<p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>' + '<p><a href="http://formio.github.io/formio.js/app/examples/conditions.html" target="_blank">Click here for an example</a></p>' + '</small>'
  }]
}];