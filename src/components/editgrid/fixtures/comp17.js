export default {
  components: [
    {
      "label": "Edit Grid",
      "tableView": false,
      "modalEdit": true,
      "validateWhenHidden": false,
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
          "validate": {
            "required": true
          },
          "validateWhenHidden": false,
          "key": "textField1",
          "type": "textfield",
          "input": true
        },
        {
          "label": "Text Field",
          "applyMaskOn": "change",
          "tableView": true,
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
