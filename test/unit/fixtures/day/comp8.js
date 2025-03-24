export default {
  "components": [
    {
      "label": "Day - Table",
      "hideInputLabels": false,
      "inputsLabelPosition": "top",
      "useLocaleSettings": false,
      "alwaysEnabled": false,
      "tableView": false,
      "fields": {
        "day": {
          "hide": false,
          "required": true
        },
        "month": {
          "hide": false,
          "required": true
        },
        "year": {
          "hide": false,
          "required": true
        }
      },
      "key": "dayTable",
      "type": "day",
      "input": true
    },
    {
      "label": "Submit",
      "showValidations": false,
      "alwaysEnabled": false,
      "tableView": false,
      "key": "submit",
      "type": "button",
      "input": true
    }
  ]
}
