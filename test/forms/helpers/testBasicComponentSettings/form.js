export default {
  "_id": "60228e64f2e20ca84010999a",
  "type": "form",
  "components": [{
      "label": "Form",
      "tableView": true,
      "useOriginalRevision": false,
      "components": [{
        "label": "Text Field Child",
        "tableView": true,
        "key": "textFieldChild",
        "type": "textfield",
        "input": true
      }, {
        "label": "Time Child",
        "inputType": "text",
        "tableView": true,
        "key": "timeChild",
        "type": "time",
        "input": true,
        "inputMask": "99:99"
      }, {
        "title": "Panel Child",
        "collapsible": false,
        "key": "panelChild",
        "type": "panel",
        "label": "Panel",
        "input": false,
        "tableView": false,
        "components": [{
          "label": "Number Inside Child Panel",
          "mask": false,
          "spellcheck": true,
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "key": "numberInsideChildPanel",
          "type": "number",
          "input": true
        }]
      }, {
        "label": "Data Grid Child",
        "reorder": false,
        "addAnotherPosition": "bottom",
        "layoutFixed": false,
        "enableRowGroups": false,
        "initEmpty": false,
        "tableView": false,
        "defaultValue": [{}],
        "key": "dataGridChild",
        "type": "datagrid",
        "input": true,
        "components": [{
          "label": "Text Area Inside Child DataGrid",
          "autoExpand": false,
          "tableView": true,
          "key": "textAreaInsideChildDataGrid",
          "type": "textarea",
          "input": true
        }]
      }],
      "key": "form",
      "type": "form",
      "input": true,
      "form": "6034b4ef914866a81c060533"
    },
    {
      "label": "Text Field",
      "tableView": true,
      "key": "textField",
      "type": "textfield",
      "input": true
    }, {
      "label": "Text Area",
      "autoExpand": false,
      "tableView": true,
      "key": "textArea",
      "type": "textarea",
      "input": true
    }, {
      "label": "Number",
      "mask": false,
      "spellcheck": true,
      "tableView": false,
      "delimiter": false,
      "requireDecimal": false,
      "inputFormat": "plain",
      "key": "number",
      "type": "number",
      "input": true
    }, {
      "label": "Password",
      "tableView": false,
      "key": "password",
      "type": "password",
      "input": true,
      "protected": true
    }, {
      "label": "Checkbox",
      "tableView": false,
      "key": "checkbox",
      "type": "checkbox",
      "input": true
    }, {
      "label": "Select Boxes",
      "optionsLabelPosition": "right",
      "tableView": false,
      "values": [{
        "label": "a",
        "value": "a",
        "shortcut": ""
      }, {
        "label": "b",
        "value": "b",
        "shortcut": ""
      }, {
        "label": "c",
        "value": "c",
        "shortcut": ""
      }],
      "validate": {
        "onlyAvailableItems": false
      },
      "key": "selectBoxes",
      "type": "selectboxes",
      "input": true,
      "inputType": "checkbox",
    }, {
      "label": "Select",
      "widget": "choicesjs",
      "tableView": true,
      "data": {
        "values": [{
          "label": "A",
          "value": "a"
        }, {
          "label": "B",
          "value": "b"
        }, {
          "label": "C",
          "value": "c"
        }]
      },
      "selectThreshold": 0.3,
      "validate": {
        "onlyAvailableItems": false
      },
      "key": "select",
      "type": "select",
      "indexeddb": {
        "filter": {}
      },
      "input": true
    }, {
      "label": "Radio",
      "optionsLabelPosition": "right",
      "inline": false,
      "tableView": false,
      "values": [{
        "label": "a",
        "value": "a",
        "shortcut": ""
      }, {
        "label": "b",
        "value": "b",
        "shortcut": ""
      }, {
        "label": "c",
        "value": "c",
        "shortcut": ""
      }],
      "validate": {
        "onlyAvailableItems": false
      },
      "key": "radio",
      "type": "radio",
      "input": true
    }, {
      "label": "Email",
      "tableView": true,
      "key": "email",
      "type": "email",
      "input": true
    }, {
      "label": "Url",
      "tableView": true,
      "key": "url",
      "type": "url",
      "input": true
    }, {
      "label": "Phone Number",
      "tableView": true,
      "key": "phoneNumber",
      "type": "phoneNumber",
      "input": true
    }, {
      "label": "Tags",
      "tableView": false,
      "key": "tags",
      "type": "tags",
      "input": true
    }, {
      "label": "Address",
      "tableView": false,
      "provider": "nominatim",
      "key": "address",
      "type": "address",
      "providerOptions": {
        "params": {
          "autocompleteOptions": {}
        }
      },
      "input": true,
      "components": [{
        "label": "Address 1",
        "tableView": false,
        "key": "address1",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }, {
        "label": "Address 2",
        "tableView": false,
        "key": "address2",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }, {
        "label": "City",
        "tableView": false,
        "key": "city",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }, {
        "label": "State",
        "tableView": false,
        "key": "state",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }, {
        "label": "Country",
        "tableView": false,
        "key": "country",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }, {
        "label": "Zip Code",
        "tableView": false,
        "key": "zip",
        "type": "textfield",
        "input": true,
        "customConditional": "show = _.get(instance, 'parent.manualMode', false);"
      }]
    }, {
      "label": "Date / Time",
      "tableView": false,
      "enableMinDateInput": false,
      "datePicker": {
        "disableWeekends": false,
        "disableWeekdays": false
      },
      "enableMaxDateInput": false,
      "key": "dateTime",
      "type": "datetime",
      "input": true,
      "widget": {
        "type": "calendar",
        "displayInTimezone": "viewer",
        "locale": "en",
        "useLocaleSettings": false,
        "allowInput": true,
        "mode": "single",
        "enableTime": true,
        "noCalendar": false,
        "format": "yyyy-MM-dd hh:mm a",
        "hourIncrement": 1,
        "minuteIncrement": 1,
        "time_24hr": false,
        "minDate": null,
        "disableWeekends": false,
        "disableWeekdays": false,
        "maxDate": null
      }
    }, {
      "label": "Day",
      "hideInputLabels": false,
      "inputsLabelPosition": "top",
      "useLocaleSettings": false,
      "tableView": false,
      "fields": {
        "day": {
          "hide": false
        },
        "month": {
          "hide": false
        },
        "year": {
          "hide": false
        }
      },
      "key": "day",
      "type": "day",
      "input": true,
      "defaultValue": "00/00/0000"
    }, {
      "label": "Time",
      "tableView": true,
      "key": "time",
      "type": "time",
      "input": true,
      "inputMask": "99:99"
    }, {
      "label": "Currency",
      "mask": false,
      "spellcheck": true,
      "tableView": false,
      "currency": "USD",
      "inputFormat": "plain",
      "key": "currency",
      "type": "currency",
      "input": true,
      "delimiter": true
    }, {
      "label": "Survey",
      "tableView": false,
      "questions": [{
        "label": "Question 1",
        "value": "question1"
      }, {
        "label": "Question 2",
        "value": "question2"
      }],
      "values": [{
        "label": "yes",
        "value": "yes"
      }, {
        "label": "no",
        "value": "no"
      }],
      "key": "survey",
      "type": "survey",
      "input": true
    }, {
      "label": "Signature",
      "tableView": false,
      "key": "signature",
      "type": "signature",
      "input": true
    }, {
      "label": "HTML",
      "attrs": [{
        "attr": "",
        "value": ""
      }],
      "content": "some test HTML content",
      "refreshOnChange": false,
      "key": "html",
      "type": "htmlelement",
      "input": false,
      "tableView": false
    }, {
      "html": "<p>some text content</p>",
      "label": "Content",
      "refreshOnChange": false,
      "key": "content",
      "type": "content",
      "input": false,
      "tableView": false
    }, {
      "label": "Columns",
      "columns": [{
        "components": [{
          "label": "Number Column",
          "mask": false,
          "spellcheck": true,
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "key": "numberColumn",
          "type": "number",
          "input": true,
          "hideOnChildrenHidden": false
        }],
        "width": 6,
        "offset": 0,
        "push": 0,
        "pull": 0,
        "size": "md"
      }, {
        "components": [{
          "label": "Text Field Column",
          "tableView": true,
          "key": "textFieldColumn",
          "type": "textfield",
          "input": true,
          "hideOnChildrenHidden": false
        }],
        "width": 6,
        "offset": 0,
        "push": 0,
        "pull": 0,
        "size": "md"
      }],
      "key": "columns",
      "type": "columns",
      "input": false,
      "tableView": false
    }, {
      "legend": "test legend",
      "key": "fieldset",
      "type": "fieldset",
      "label": "test legend",
      "input": false,
      "tableView": false,
      "components": [{
        "label": "Number Fieldset",
        "mask": false,
        "spellcheck": true,
        "tableView": false,
        "delimiter": false,
        "requireDecimal": false,
        "inputFormat": "plain",
        "key": "numberFieldset",
        "type": "number",
        "input": true
      }]
    }, {
      "collapsible": false,
      "key": "panel",
      "type": "panel",
      "label": "Panel",
      "input": false,
      "tableView": false,
      "components": [{
        "label": "Number Panel",
        "mask": false,
        "spellcheck": true,
        "tableView": false,
        "delimiter": false,
        "requireDecimal": false,
        "inputFormat": "plain",
        "key": "numberPanel",
        "type": "number",
        "input": true
      }]
    }, {
      "label": "Table",
      "cellAlignment": "left",
      "key": "table",
      "type": "table",
      "numRows": 2,
      "numCols": 2,
      "input": false,
      "tableView": false,
      "rows": [
        [{
          "components": [{
            "label": "Select Table",
            "widget": "choicesjs",
            "tableView": true,
            "data": {
              "values": [{
                "label": "one",
                "value": "one"
              }, {
                "label": "two",
                "value": "two"
              }]
            },
            "selectThreshold": 0.3,
            "validate": {
              "onlyAvailableItems": false
            },
            "key": "selectTable",
            "type": "select",
            "indexeddb": {
              "filter": {}
            },
            "input": true
          }]
        }, {
          "components": [{
            "label": "Checkbox Table",
            "tableView": false,
            "key": "checkboxTable",
            "type": "checkbox",
            "input": true,
            "defaultValue": false
          }]
        }],
        [{
          "components": [{
            "label": "Date / Time Table",
            "tableView": false,
            "enableMinDateInput": false,
            "datePicker": {
              "disableWeekends": false,
              "disableWeekdays": false
            },
            "enableMaxDateInput": false,
            "key": "dateTimeTable",
            "type": "datetime",
            "input": true,
            "widget": {
              "type": "calendar",
              "displayInTimezone": "viewer",
              "locale": "en",
              "useLocaleSettings": false,
              "allowInput": true,
              "mode": "single",
              "enableTime": true,
              "noCalendar": false,
              "format": "yyyy-MM-dd hh:mm a",
              "hourIncrement": 1,
              "minuteIncrement": 1,
              "time_24hr": false,
              "minDate": null,
              "disableWeekends": false,
              "disableWeekdays": false,
              "maxDate": null
            }
          }]
        }, {
          "components": [{
            "label": "Currency Table",
            "mask": false,
            "spellcheck": true,
            "tableView": false,
            "currency": "USD",
            "inputFormat": "plain",
            "key": "currencyTable",
            "type": "currency",
            "input": true,
            "delimiter": true
          }]
        }]
      ]
    }, {
      "label": "Tabs",
      "components": [{
        "label": "Tab 1",
        "key": "tab1",
        "components": [{
          "label": "Number Tab",
          "mask": false,
          "spellcheck": true,
          "tableView": false,
          "delimiter": false,
          "requireDecimal": false,
          "inputFormat": "plain",
          "key": "numberTab",
          "type": "number",
          "input": true
        }]
      }, {
        "label": "Tab 2",
        "key": "tab2",
        "components": [{
          "label": "Text Field Tab",
          "tableView": true,
          "key": "textFieldTab",
          "type": "textfield",
          "input": true
        }]
      }],
      "key": "tabs",
      "type": "tabs",
      "input": false,
      "tableView": false
    }, {
      "label": "Well",
      "key": "well",
      "type": "well",
      "input": false,
      "tableView": false,
      "components": [{
        "label": "Text Field Well",
        "tableView": true,
        "key": "textFieldWell",
        "type": "textfield",
        "input": true
      }]
    }, {
      "label": "Hidden",
      "key": "hidden",
      "type": "hidden",
      "input": true,
      "tableView": false
    }, {
      "label": "Container",
      "tableView": false,
      "key": "container",
      "type": "container",
      "hideLabel": false,
      "input": true,
      "components": [{
        "label": "Text Field Container",
        "tableView": true,
        "key": "textFieldContainer",
        "type": "textfield",
        "input": true
      }]
    }, {
      "label": "Data Map",
      "tableView": false,
      "key": "dataMap",
      "type": "datamap",
      "input": true,
      "valueComponent": {
        "type": "textfield",
        "key": "key",
        "label": "Value",
        "input": true,
        "hideLabel": true,
        "tableView": true
      }
    }, {
      "label": "Data Grid",
      "reorder": false,
      "addAnotherPosition": "bottom",
      "layoutFixed": false,
      "enableRowGroups": false,
      "initEmpty": false,
      "tableView": false,
      "defaultValue": [{}],
      "key": "dataGrid",
      "type": "datagrid",
      "input": true,
      "components": [{
        "label": "Text Field DataGrid",
        "tableView": true,
        "key": "textFieldDataGrid",
        "type": "textfield",
        "input": true
      }]
    }, {
      "label": "Edit Grid",
      "tableView": false,
      "rowDrafts": false,
      "key": "editGrid",
      "type": "editgrid",
      "input": true,
      "components": [{
        "label": "Text Field EditGrid",
        "tableView": true,
        "key": "textFieldEditGrid",
        "type": "textfield",
        "input": true
      }]
    }, {
      "label": "Tree",
      "tableView": false,
      "key": "tree",
      "type": "tree",
      "input": true,
      "tree": true,
      "components": [{
        "label": "Text Field Tree",
        "tableView": true,
        "key": "textFieldTree",
        "type": "textfield",
        "input": true
      }]
    }, {
      "label": "Upload",
      "tableView": false,
      "storage": "base64",
      "webcam": false,
      "fileTypes": [{
        "label": "",
        "value": ""
      }],
      "key": "file",
      "type": "file",
      "input": true
    }, {
      "type": "button",
      "label": "Submit",
      "key": "submit",
      "input": true,
      "tableView": false
    }
  ],
  "title": "form for automated tests",
  "display": "form",
  "name": "formForAutomatedTests",
  "path": "formforautomatedtests",
}
