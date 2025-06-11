export default {
    "title": "formWithEditGrid",
    "display": "form",
    "type": "form",
    "components": [
      {
        "label": "Data Grid",
        "reorder": false,
        "addAnotherPosition": "bottom",
        "layoutFixed": false,
        "enableRowGroups": false,
        "initEmpty": false,
        "tableView": false,
        "defaultValue": [
          {}
        ],
        "validateWhenHidden": false,
        "key": "dataGrid",
        "type": "datagrid",
        "input": true,
        "components": [
          {
            "collapsible": false,
            "key": "panel",
            "type": "panel",
            "label": "Panel",
            "input": false,
            "tableView": false,
            "components": [
              {
                "label": "Text Field",
                "applyMaskOn": "change",
                "tableView": true,
                "validateWhenHidden": false,
                "key": "textField",
                "type": "textfield",
                "input": true,
                "validate": {
                  "required": true
                }
              }
            ]
          }
        ]
      },
      {
        "label": "Edit Grid",
        "tableView": false,
        "validateWhenHidden": false,
        "rowDrafts": false,
        "key": "editGrid",
        "type": "editgrid",
        "displayAsTable": false,
        "input": true,
        "components": [
          {
            "label": "Number",
            "applyMaskOn": "change",
            "mask": false,
            "tableView": false,
            "delimiter": false,
            "requireDecimal": false,
            "inputFormat": "plain",
            "truncateMultipleSpaces": false,
            "validate": {
              "required": true
            },
            "validateWhenHidden": false,
            "key": "number",
            "type": "number",
            "input": true
          }
        ]
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
    ],
};
