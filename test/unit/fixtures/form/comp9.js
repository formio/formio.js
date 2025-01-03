export default {
  "name": "parent",
  "path": "parent",
  "type": "form",
  "display": "form",
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
      "validateWhenHidden": false,
      "key": "number",
      "type": "number",
      "input": true
    },
    {
      "label": "Text Area",
      "applyMaskOn": "change",
      "autoExpand": false,
      "tableView": true,
      "validateWhenHidden": false,
      "key": "textArea",
      "conditional": {
        "show": true,
        "conjunction": "all",
        "conditions": [
          {
            "component": "number",
            "operator": "isEqual",
            "value": 5
          }]
      },
      "type": "textarea",
      "input": true
    },
    {
      "label": "Form",
      "tableView": true,
      "form": "676ec7413b531fd4c8986dc5",
      "useOriginalRevision": false,
      "key": "form",
      "type": "form",
      "input": true
    }
  ],
}