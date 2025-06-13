export default {
  "title": "Data",
  "type": "form",
  "name": "data",
  "path": "data",
  "display": "form",
  "components": [
    {
      "label": "Hidden",
      "defaultValue": "500",
      "key": "hidden",
      "type": "hidden",
      "input": true,
      "tableView": false
    },
    {
      "label": "Container",
      "tableView": false,
      "customDefaultValue": "value = {\n            \"textField\": \"Officia consequuntur\",\n            \"number\": 1000,\n            \"currency\": 1001\n        }",
      "key": "container",
      "type": "container",
      "input": true,
      "components": [
        {
          "label": "Text Field",
          "applyMaskOn": "change",
          "tableView": true,
          "key": "textField",
          "type": "textfield",
          "input": true
        },
        {
          "label": "Number",
          "applyMaskOn": "change",
          "mask": false,
          "tableView": true,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "number",
          "type": "number",
          "input": true
        },
        {
          "label": "Currency",
          "applyMaskOn": "change",
          "mask": false,
          "spellcheck": true,
          "tableView": true,
          "defaultValue": 200,
          "currency": "USD",
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "currency",
          "type": "currency",
          "input": true,
          "delimiter": true
        }
      ]
    },
    {
      "label": "Data Grid",
      "reorder": false,
      "addAnotherPosition": "bottom",
      "layoutFixed": false,
      "enableRowGroups": false,
      "initEmpty": false,
      "tableView": false,
      "defaultValue": [
        {
          "textField1": ""
        }
      ],
      "customDefaultValue": "value = [\n            {\n                \"textField1\": \"Eaque esse est dele\",\n                \"number1\": 796,\n                \"currency2\": 0\n            },\n            {\n                \"textField1\": \"Default Value \",\n                \"number1\": 100,\n                \"currency2\": 200\n            },\n            {\n                \"textField1\": \"Default Value \",\n                \"number1\": 100,\n                \"currency2\": 200\n            }\n        ]",
      "key": "dataGrid",
      "type": "datagrid",
      "input": true,
      "components": [
        {
          "label": "Text Field",
          "applyMaskOn": "change",
          "tableView": true,
          "key": "textField1",
          "type": "textfield",
          "input": true
        },
        {
          "label": "Number",
          "applyMaskOn": "change",
          "mask": false,
          "tableView": true,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "number1",
          "type": "number",
          "input": true
        },
        {
          "label": "Currency",
          "applyMaskOn": "change",
          "mask": false,
          "spellcheck": true,
          "tableView": true,
          "currency": "USD",
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "currency2",
          "type": "currency",
          "input": true,
          "delimiter": true
        }
      ]
    },
    {
      "label": "Edit Grid",
      "tableView": false,
      "customDefaultValue": "value = [\n            {\n                \"textField2\": \"Default Value \",\n                \"number2\": 100,\n                \"currency1\": 200\n            },\n            {\n                \"textField2\": \"Default Value \",\n                \"number2\": 100,\n                \"currency1\": 200\n            }\n        ]",
      "rowDrafts": false,
      "key": "editGrid",
      "type": "editgrid",
      "displayAsTable": false,
      "input": true,
      "components": [
        {
          "label": "Text Field",
          "applyMaskOn": "change",
          "tableView": true,
          "key": "textField2",
          "type": "textfield",
          "input": true
        },
        {
          "label": "Number",
          "applyMaskOn": "change",
          "mask": false,
          "tableView": true,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "number2",
          "type": "number",
          "input": true
        },
        {
          "label": "Currency",
          "applyMaskOn": "change",
          "mask": false,
          "spellcheck": true,
          "tableView": true,
          "currency": "USD",
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "currency1",
          "type": "currency",
          "input": true,
          "delimiter": true
        }
      ]
    },
    {
      "label": "Reset",
      "action": "reset",
      "showValidations": false,
      "theme": "danger",
      "tableView": false,
      "key": "reset",
      "type": "button",
      "input": true
    },
    {
      "label": "Reset custom",
      "action": "custom",
      "showValidations": false,
      "theme": "secondary",
      "tableView": false,
      "key": "resetCustom",
      "type": "button",
      "custom": "instance.emit('resetForm')",
      "input": true
    },
    {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }
  ]
};
