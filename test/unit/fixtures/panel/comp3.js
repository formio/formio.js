export default {
  components: [
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
          "hideLabel": true,
          "dataGridLabel": true,
          "key": "panel",
          "type": "panel",
          "label": "Panel",
          "input": false,
          "tableView": false,
          "components": []
        }
      ]
    }
  ]
}
