export default {
  "components": [
    {
      "label": "Data Grid",
      "reorder": true,
      "addAnotherPosition": "bottom",
      "layoutFixed": false,
      "enableRowGroups": false,
      "initEmpty": false,
      "tableView": false,
      "defaultValue": [
        {}
      ],
      "key": "dataGrid",
      "type": "datagrid",
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
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "truncateMultipleSpaces": false,
          "key": "number",
          "type": "number",
          "input": true
        }
      ]
    }
  ]
}
