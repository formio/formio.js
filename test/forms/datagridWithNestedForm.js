export const myForm = {
  "_id": "687a3d82319f0b6faeb3573c",
  "title": "Grid example",
  "name": "gridExample",
  "path": "gridexample",
  "type": "form",
  "display": "form",
  "owner": "687a41b467725b837394b584",
  "components": [
    {
      "label": "EVGEN GRID",
      "reorder": false,
      "addAnotherPosition": "bottom",
      "layoutFixed": false,
      "enableRowGroups": false,
      "initEmpty": false,
      "tableView": false,
      "defaultValue": [
        {
          "form": {
            "data": { }
          }
        }
      ],
      "validateWhenHidden": false,
      "key": "dataGridEvgen",
      "type": "datagrid",
      "input": true,
      "components": [
        {
          "label": "Form",
          "tableView": true,
          "form": "687a3d82319f0b6faeb35735",
          "useOriginalRevision": false,
          "key": "form",
          "type": "form",
          "input": true
}
      ]
    },
    {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "input": true,
      "tableView": false,
      "saveOnEnter": false
    }
  ],
  "pdfComponents": [],
  "settings": {
    "logs": "true"
  },
  "properties": { },
  "machineName": "dsdd:gridExample",
  "project": "6835b7eb902ec6104ee76d8c",
  "controller": "",
  "revisions": "",
  "submissionRevisions": "",
  "_vid": 0,
  "esign": { },
  "created": "2025-07-18T12:26:42.494Z",
  "modified": "2025-07-21T13:08:05.817Z",
  "config": {
    "maxAttachmentSize": "1MB"
  }
};

export const nestedForm = {
  "_id": "687a3d82319f0b6faeb35735",
  "title": "Child required",
  "name": "childRequired",
  "path": "childrequired",
  "type": "form",
  "display": "form",
 
  "components": [
    {
      "label": "Text Field",
      "applyMaskOn": "change",
      "tableView": true,
      "validate": {
        "required": true
      },
      "validateWhenHidden": false,
      "key": "textfielda",
      "type": "textfield",
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
  "pdfComponents": [],
  "settings": {
    "logs": "true"
  },
  "created": "2025-07-18T12:26:42.479Z",
  "modified": "2025-07-21T08:24:52.674Z",
  "config": {
    "maxAttachmentSize": "1MB"
  }
}