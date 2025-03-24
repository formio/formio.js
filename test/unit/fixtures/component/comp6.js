export default {
  "components": [
    {
      "label": "Text Field",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "textField",
      "type": "textfield",
      "input": true,
      "defaultValue": "test"
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
      "key": "number",
      "type": "number",
      "input": true,
      "defaultValue": 123
    },
    {
      "label": "Select",
      "widget": "choicesjs",
      "tableView": true,
      "data": {
        "values": [
          {
            "label": "a",
            "value": "a"
          },
          {
            "label": "b",
            "value": "b"
          }
        ]
      },
      "key": "select",
      "type": "select",
      "input": true,
      "defaultValue": "a"
    },
    {
      "label": "Reset",
      "action": "reset",
      "showValidations": false,
      "tableView": false,
      "key": "reset",
      "type": "button",
      "input": true
    },
  ]
}
