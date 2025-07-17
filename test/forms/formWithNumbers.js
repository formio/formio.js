export default {
    title: 'test NAN',
    name: 'checkNAN',
    path: 'checkNAN',
    type: 'form',
    display: 'form',
    components: [
    {
      "label": "Validate",
      "action": "event",
      "showValidations": true,
      "tableView": false,
      "key": "validate",
      "type": "button",
      "input": true
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
        {}
      ],
      "validateWhenHidden": false,
      "key": "dataGrid",
      "type": "datagrid",
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
    },
    {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "disableOnInvalid": true,
      "input": true,
      "tableView": false
    }
  ],
    created: '2022-09-01T09:12:45.581Z',
    modified: '2022-09-05T08:51:16.048Z',
    machineName: 'uubnbosxacwjzbk:testCheckbox',
  };


  