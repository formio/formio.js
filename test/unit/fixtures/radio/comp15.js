export default {
  type: "form",
  name: "selectr",
  path: "selectr",
  components: [
    {
      "label": "Edit Grid",
      "tableView": false,
      "customDefaultValue": "value=[{radio:'one'}]",
      "validateWhenHidden": false,
      "rowDrafts": false,
      "key": "editGrid",
      "type": "editgrid",
      "displayAsTable": false,
      "input": true,
      "components": [
        {
          "label": "Radio",
          "optionsLabelPosition": "right",
          "inline": false,
          "tableView": false,
          "values": [
            {
              "label": "One",
              "value": "one",
              "shortcut": ""
            },
            {
              "label": "Two",
              "value": "two",
              "shortcut": ""
            }
          ],
          "validateWhenHidden": false,
          "key": "radio",
          "type": "radio",
          "input": true
        }
      ]
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
}