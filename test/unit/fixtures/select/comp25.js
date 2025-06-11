export default {
  "components": [
    {
      "label": "Edit Grid",
      "tableView": false,
      "modal": true,
      "rowDrafts": true,
      "key": "editGrid",
      "type": "editgrid",
      "displayAsTable": false,
      "input": true,
      "components": [
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
              },
              {
                "label": "c",
                "value": "c"
              }
            ]
          },
          "validate": {
            "required": true
          },
          "key": "select",
          "type": "select",
          "input": true
        },
        {
          "label": "Text Field",
          "applyMaskOn": "change",
          "tableView": true,
          "validate": {
            "required": true
          },
          "validateWhenHidden": false,
          "key": "textField",
          "type": "textfield",
          "input": true
        }
      ]
    },
    {
      "label": "Submit",
      "showValidations": false,
      "tableView": false,
      "key": "submit",
      "type": "button",
      "input": true,
      "saveOnEnter": false
    }
  ]
}
