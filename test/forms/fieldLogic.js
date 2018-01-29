import {Harness} from "../harness";

module.exports = {
  title: "Field Logic Tests",
  form: {
    components: [
      {
        "properties": {},
        "tags": [],
        "labelPosition": "top",
        "hideLabel": false,
        "type": "textfield",
        "conditional": {
          "eq": "",
          "when": null,
          "show": ""
        },
        "validate": {
          "customPrivate": false,
          "custom": "",
          "pattern": "",
          "maxLength": "",
          "minLength": "",
          "required": false
        },
        "clearOnHide": true,
        "hidden": false,
        "persistent": true,
        "unique": false,
        "protected": false,
        "defaultValue": "",
        "multiple": false,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "test",
        "label": "Test",
        "inputMask": "",
        "inputType": "text",
        "tableView": true,
        "input": true
      },
      {
        "properties": {},
        "tags": [],
        "labelPosition": "top",
        "hideLabel": false,
        "type": "textfield",
        "conditional": {
          "eq": "",
          "when": null,
          "show": ""
        },
        "validate": {
          "customPrivate": false,
          "custom": "",
          "pattern": "",
          "maxLength": "",
          "minLength": "",
          "required": false
        },
        "clearOnHide": true,
        "hidden": false,
        "persistent": true,
        "unique": false,
        "protected": false,
        "defaultValue": "",
        "multiple": false,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "changeme",
        "label": "Change me",
        "inputMask": "",
        "inputType": "text",
        "tableView": true,
        "input": true,
        "logic": [
          {
            "name": "Test 1",
            "trigger": {
              "javascript": "result = data.test === '1';",
              "type": "javascript"
            },
            "actions": [
              {
                "name": "Set Title to One",
                "text": "One",
                "property": {
                  "type": "string",
                  "value": "label",
                  "label": "Title"
                },
                "type": "property"
              },
              {
                "name": "Set Description",
                "type": "property",
                "property": {
                  "label": "Description",
                  "value": "description",
                  "type": "string"
                },
                "text": "You have selected One"
              },
              {
                "name": "Set Disabled",
                "type": "property",
                "property": {
                  "label": "Disabled",
                  "value": "disabled",
                  "type": "boolean"
                },
                "state": true
              }
            ]
          },
          {
            "name": "Test 2",
            "trigger": {
              "javascript": "result = data.test === '2';",
              "type": "javascript"
            },
            "actions": [
              {
                "name": "Set Required",
                "type": "property",
                "property": {
                  "label": "Required",
                  "value": "validate.required",
                  "type": "boolean"
                },
                "state": true
              }
            ]
          },
          {
            "name": "Test 3",
            "trigger": {
              "javascript": "result = data.test === '3';",
              "type": "javascript"
            },
            "actions": [
              {
                "name": "Set Required",
                "type": "value",
                "value": "return 'foo';"
              }
            ]
          }
        ]
      }
    ],
  },
  tests: {
    'Test Title, Description and Disabled': (form, done) => {
      Harness.setInputValue(form, 'data[test]', '1');
      form.onChange({}, true);
      Harness.testInnerHtml(form, '.formio-component-changeme .control-label', 'One');
      Harness.testInnerHtml(form, '.formio-component-changeme .help-block', 'You have selected One');
      Harness.testAttribute(form, '.formio-component-changeme .form-control', 'disabled', 'disabled');
      done();
    },
    'Test Required': (form, done) => {
      Harness.setInputValue(form, 'data[test]', '2');
      form.onChange({}, true);
      Harness.testHasClass(form, '.formio-component-changeme .control-label', 'field-required');
      done();
    },
    'Test Set Value': (form, done) => {
      Harness.setInputValue(form, 'data[test]', '3');
      form.onChange({}, true);
      Harness.getInputValue(form, 'data[changeme]', 'foo');
      done();
    }
  }
};