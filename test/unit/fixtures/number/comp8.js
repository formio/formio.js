export default {
  components: [
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
      "decimalSymbol": "-"
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
