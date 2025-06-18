export default {
  "title": "Basic",
  "type": "form",
  "name": "basic",
  "path": "basic",
  "display": "form",
  "components": [
    {
      "label": "Text Field - populate",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "textFieldPopulate",
      "type": "textfield",
      "input": true,
      "defaultValue": "12345"
    },
    {
      "label": "Number - populate",
      "applyMaskOn": "change",
      "mask": false,
      "tableView": false,
      "delimiter": false,
      "requireDecimal": false,
      "inputFormat": "plain",
      "truncateMultipleSpaces": false,
      "key": "numberPopulate",
      "type": "number",
      "input": true,
      "defaultValue": 25
    },
    {
      "label": "Text Field",
      "applyMaskOn": "change",
      "tableView": true,
      "customDefaultValue": "value = data.textFieldPopulate + \"new\";",
      "key": "textField",
      "type": "textfield",
      "input": true
    },
    {
      "label": "Text Area",
      "applyMaskOn": "change",
      "autoExpand": false,
      "tableView": true,
      "customDefaultValue": "value = data.textFieldPopulate + \"new1\";",
      "key": "textArea",
      "type": "textarea",
      "input": true
    },
    {
      "label": "Number",
      "applyMaskOn": "change",
      "mask": false,
      "tableView": false,
      "delimiter": false,
      "requireDecimal": false,
      "inputFormat": "plain",
      "truncateMultipleSpaces": false,
      "customDefaultValue": "value = data.numberPopulate + 25",
      "key": "number",
      "type": "number",
      "input": true
    },
    {
      "label": "Checkbox",
      "tableView": false,
      "defaultValue": false,
      "customDefaultValue": "value = true",
      "key": "checkbox",
      "type": "checkbox",
      "input": true
    },
    {
      "label": "Select Boxes",
      "optionsLabelPosition": "right",
      "tableView": false,
      "defaultValue": {
        "1": false,
        "2": false,
        "3": false
      },
      "values": [
        {
          "label": "one",
          "value": "1",
          "shortcut": ""
        },
        {
          "label": "two",
          "value": "2",
          "shortcut": ""
        },
        {
          "label": "three",
          "value": "3",
          "shortcut": ""
        }
      ],
      "customDefaultValue": "value = {\n    \"1\": true,\n    \"2\": false,\n    \"3\": true\n  }",
      "key": "selectBoxes",
      "type": "selectboxes",
      "input": true,
      "inputType": "checkbox"
    },
    {
      "label": "Select",
      "widget": "choicesjs",
      "tableView": true,
      "data": {
        "values": [
          {
            "label": "one",
            "value": "1"
          },
          {
            "label": "two",
            "value": "2"
          },
          {
            "label": "three",
            "value": "3"
          }
        ]
      },
      "customDefaultValue": "value = 1",
      "key": "select",
      "type": "select",
      "input": true
    },
    {
      "label": "Radio",
      "optionsLabelPosition": "right",
      "inline": false,
      "tableView": false,
      "values": [
        {
          "label": "one",
          "value": "1",
          "shortcut": ""
        },
        {
          "label": "two",
          "value": "2",
          "shortcut": ""
        },
        {
          "label": "three",
          "value": "3",
          "shortcut": ""
        }
      ],
      "customDefaultValue": "value = 2",
      "key": "radio",
      "type": "radio",
      "input": true
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
