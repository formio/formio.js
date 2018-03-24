import assert from 'power-assert';
import _cloneDeep from 'lodash/cloneDeep';

module.exports = {
  title: 'Clear on hide Form Test',
  form: {
    "components": [{
      "input": true,
      "inputType": "checkbox",
      "tableView": true,
      "label": "Hide",
      "datagridLabel": true,
      "key": "hide",
      "defaultValue": false,
      "protected": false,
      "persistent": true,
      "hidden": false,
      "name": "",
      "value": "",
      "clearOnHide": true,
      "validate": {
        "required": false
      },
      "type": "checkbox",
      "labelPosition": "right",
      "hideLabel": false,
      "tags": [],
      "conditional": {
        "show": "",
        "when": null,
        "eq": ""
      },
      "properties": {}
    }, {
      "clearOnHide": false,
      "key": "panel",
      "input": false,
      "title": "Components",
      "theme": "default",
      "tableView": false,
      "components": [{
        "type": "textfield",
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "validate": {
          "customPrivate": false,
          "custom": "",
          "pattern": "",
          "maxLength": "",
          "minLength": "",
          "required": false
        },
        "persistent": true,
        "unique": false,
        "protected": false,
        "defaultValue": "",
        "multiple": false,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "textField",
        "label": "Text Field",
        "inputMask": "",
        "inputType": "text",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": ""
        },
        "type": "number",
        "validate": {
          "custom": "",
          "multiple": "",
          "integer": "",
          "step": "any",
          "max": "",
          "min": "",
          "required": false
        },
        "persistent": true,
        "protected": false,
        "defaultValue": "",
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "number",
        "label": "Number",
        "inputType": "number",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "tags": [],
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "password",
        "persistent": true,
        "protected": true,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "password",
        "label": "Password",
        "inputType": "password",
        "tableView": false,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "textarea",
        "validate": {
          "custom": "",
          "pattern": "",
          "maxLength": "",
          "minLength": "",
          "required": false
        },
        "wysiwyg": false,
        "persistent": true,
        "protected": false,
        "defaultValue": "",
        "multiple": false,
        "rows": 3,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "textArea",
        "label": "Text Area",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "checkbox",
        "validate": {
          "required": false
        },
        "persistent": true,
        "protected": false,
        "defaultValue": false,
        "key": "checkbox",
        "label": "Checkbox",
        "hideLabel": false,
        "tableView": true,
        "inputType": "checkbox",
        "input": true,
        "datagridLabel": true,
        "clearOnHide": true,
        "hidden": false,
        "name": "",
        "value": ""
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "selectboxes",
        "validate": {
          "required": false
        },
        "persistent": true,
        "protected": false,
        "inline": false,
        "values": [{
          "label": "One",
          "value": "one"
        }, {
          "label": "Two",
          "value": "two"
        }, {
          "label": "Three",
          "value": "three"
        }],
        "key": "selectBoxes",
        "label": "SelectBoxes",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "select",
        "validate": {
          "required": false
        },
        "persistent": true,
        "unique": false,
        "protected": false,
        "multiple": false,
        "template": "<span>{{ item.label }}</span>",
        "authenticate": false,
        "filter": "",
        "refreshOn": "",
        "defaultValue": "",
        "valueProperty": "",
        "dataSrc": "values",
        "data": {
          "resource": "",
          "url": "",
          "json": "",
          "values": [{
            "label": "One",
            "value": "one"
          }, {
            "label": "Two",
            "value": "two"
          }, {
            "label": "Three",
            "value": "three"
          }]
        },
        "placeholder": "",
        "key": "select",
        "label": "Select",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "radio",
        "validate": {
          "customPrivate": false,
          "custom": "",
          "required": false
        },
        "persistent": true,
        "protected": false,
        "defaultValue": "",
        "values": [{
          "label": "One",
          "value": "one"
        }, {
          "label": "Two",
          "value": "two"
        }, {
          "label": "Three",
          "value": "three"
        }],
        "key": "radio",
        "label": "Radio",
        "inputType": "radio",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "fieldSet": false,
        "hidden": false,
        "hideLabel": false
      }, {
        "input": false,
        "tag": "h2",
        "attrs": [{
          "attr": "",
          "value": ""
        }],
        "className": "myclass",
        "content": "HTML Element",
        "type": "htmlelement",
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "hideLabel": false
      }, {
        "lockKey": true,
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "content",
        "html": "<p>Content</p>\n",
        "input": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "email",
        "persistent": true,
        "unique": false,
        "protected": false,
        "defaultValue": "",
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "email",
        "label": "Email",
        "inputType": "email",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "kickbox": {
          "enabled": false
        },
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "phoneNumber",
        "validate": {
          "required": false
        },
        "defaultValue": "",
        "persistent": true,
        "unique": false,
        "protected": false,
        "multiple": false,
        "suffix": "",
        "prefix": "",
        "placeholder": "",
        "key": "phoneNumber",
        "label": "Phone Number",
        "inputMask": "(999) 999-9999",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "inputType": "tel",
        "hidden": false,
        "hideLabel": false
      }, {
        "input": true,
        "tableView": true,
        "label": "Address",
        "key": "address",
        "placeholder": "",
        "multiple": false,
        "protected": false,
        "unique": false,
        "persistent": true,
        "validate": {
          "required": false
        },
        "type": "address",
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "clearOnHide": true,
        "map": {
          "region": "",
          "key": ""
        },
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "datetime",
        "validate": {
          "custom": "",
          "required": false
        },
        "persistent": true,
        "protected": false,
        "timePicker": {
          "arrowkeys": true,
          "mousewheel": true,
          "readonlyInput": false,
          "showMeridian": true,
          "minuteStep": 1,
          "hourStep": 1
        },
        "datePicker": {
          "datepickerMode": "day",
          "yearRange": "20",
          "maxMode": "year",
          "minMode": "day",
          "initDate": "",
          "startingDay": 0,
          "showWeeks": true,
          "minDate": null,
          "maxDate": null
        },
        "datepickerMode": "day",
        "enableTime": true,
        "enableDate": true,
        "format": "yyyy-MM-dd HH:mm a",
        "placeholder": "",
        "key": "dateTime",
        "label": "Date / Time",
        "tableView": true,
        "input": true,
        "defaultDate": "",
        "minDate": null,
        "maxDate": null,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "input": true,
        "tableView": true,
        "inputType": "text",
        "inputMask": "",
        "label": "Currency",
        "key": "currency",
        "placeholder": "",
        "prefix": "",
        "suffix": "",
        "defaultValue": "",
        "protected": false,
        "persistent": true,
        "validate": {
          "required": false,
          "multiple": "",
          "custom": ""
        },
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "type": "currency",
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "hidden",
        "persistent": true,
        "unique": false,
        "protected": false,
        "label": "Hidden",
        "key": "hidden",
        "tableView": true,
        "input": true,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "resource",
        "defaultPermission": "",
        "validate": {
          "required": false
        },
        "persistent": true,
        "protected": false,
        "multiple": false,
        "searchFields": "",
        "selectFields": "",
        "template": "<span>{{ item.data }}</span>",
        "defaultValue": "",
        "project": "5692b91fd1028f01000407e3",
        "resource": "5692b920d1028f01000407e7",
        "placeholder": "",
        "key": "resource",
        "label": "Resource",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "input": true,
        "tableView": true,
        "label": "File",
        "key": "file",
        "placeholder": "",
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "type": "file",
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "image": false,
        "imageSize": "200",
        "persistent": true,
        "clearOnHide": true,
        "hidden": false,
        "filePattern": "*",
        "fileMinSize": "0KB",
        "fileMaxSize": "1GB",
        "hideLabel": false
      }, {
        "input": true,
        "tableView": true,
        "label": "Signature",
        "key": "signature",
        "placeholder": "",
        "footer": "Sign above",
        "width": "100%",
        "height": "150px",
        "penColor": "black",
        "backgroundColor": "rgb(245,245,235)",
        "minWidth": "0.5",
        "maxWidth": "2.5",
        "protected": false,
        "persistent": true,
        "validate": {
          "required": false
        },
        "type": "signature",
        "hideLabel": true,
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "clearOnHide": true,
        "hidden": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "columns",
        "columns": [{
          "components": [{
            "type": "textfield",
            "conditional": {
              "eq": "",
              "when": null,
              "show": null
            },
            "validate": {
              "customPrivate": false,
              "custom": "",
              "pattern": "",
              "maxLength": "",
              "minLength": "",
              "required": false
            },
            "persistent": true,
            "unique": false,
            "protected": false,
            "defaultValue": "",
            "multiple": false,
            "suffix": "",
            "prefix": "",
            "placeholder": "",
            "key": "textField2",
            "label": "",
            "inputMask": "",
            "inputType": "text",
            "tableView": true,
            "input": true,
            "clearOnHide": true,
            "hidden": false,
            "hideLabel": false
          }],
          "width": 6,
          "offset": 0,
          "push": 0,
          "pull": 0
        }, {
          "components": [{
            "type": "textfield",
            "conditional": {
              "eq": "",
              "when": null,
              "show": null
            },
            "validate": {
              "customPrivate": false,
              "custom": "",
              "pattern": "",
              "maxLength": "",
              "minLength": "",
              "required": false
            },
            "persistent": true,
            "unique": false,
            "protected": false,
            "defaultValue": "",
            "multiple": false,
            "suffix": "",
            "prefix": "",
            "placeholder": "",
            "key": "textField3",
            "label": "",
            "inputMask": "",
            "inputType": "text",
            "tableView": true,
            "input": true,
            "clearOnHide": true,
            "hidden": false,
            "hideLabel": false
          }],
          "width": 6,
          "offset": 0,
          "push": 0,
          "pull": 0
        }],
        "input": false,
        "clearOnHide": false,
        "tableView": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "fieldset",
        "components": [{
          "type": "textfield",
          "conditional": {
            "eq": "",
            "when": null,
            "show": null
          },
          "validate": {
            "customPrivate": false,
            "custom": "",
            "pattern": "",
            "maxLength": "",
            "minLength": "",
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": false,
          "suffix": "",
          "prefix": "",
          "placeholder": "",
          "key": "textField4",
          "label": "",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true,
          "clearOnHide": true,
          "hidden": false,
          "hideLabel": false
        }],
        "legend": "Fieldset",
        "tableView": true,
        "input": false,
        "clearOnHide": false,
        "hideLabel": false
      }, {
        "input": false,
        "numRows": 3,
        "numCols": 3,
        "rows": [
          [{
            "components": [{
              "input": true,
              "tableView": true,
              "inputType": "text",
              "inputMask": "",
              "label": "",
              "key": "textField7",
              "placeholder": "",
              "prefix": "",
              "suffix": "",
              "multiple": false,
              "defaultValue": "",
              "protected": false,
              "unique": false,
              "persistent": true,
              "validate": {
                "required": false,
                "minLength": "",
                "maxLength": "",
                "pattern": "",
                "custom": "",
                "customPrivate": false
              },
              "conditional": {
                "show": null,
                "when": null,
                "eq": ""
              },
              "type": "textfield",
              "clearOnHide": true,
              "hidden": false,
              "hideLabel": false
            }, {
              "input": true,
              "tableView": true,
              "inputType": "text",
              "inputMask": "",
              "label": "",
              "key": "textField8",
              "placeholder": "",
              "prefix": "",
              "suffix": "",
              "multiple": false,
              "defaultValue": "",
              "protected": false,
              "unique": false,
              "persistent": true,
              "validate": {
                "required": false,
                "minLength": "",
                "maxLength": "",
                "pattern": "",
                "custom": "",
                "customPrivate": false
              },
              "conditional": {
                "show": null,
                "when": null,
                "eq": ""
              },
              "type": "textfield",
              "clearOnHide": true,
              "hidden": false,
              "hideLabel": false
            }]
          }, {
            "components": []
          }, {
            "components": []
          }],
          [{
            "components": []
          }, {
            "components": [{
              "input": true,
              "tableView": true,
              "inputType": "text",
              "inputMask": "",
              "label": "",
              "key": "textField9",
              "placeholder": "",
              "prefix": "",
              "suffix": "",
              "multiple": false,
              "defaultValue": "",
              "protected": false,
              "unique": false,
              "persistent": true,
              "validate": {
                "required": false,
                "minLength": "",
                "maxLength": "",
                "pattern": "",
                "custom": "",
                "customPrivate": false
              },
              "conditional": {
                "show": null,
                "when": null,
                "eq": ""
              },
              "type": "textfield",
              "clearOnHide": true,
              "hidden": false,
              "hideLabel": false
            }]
          }, {
            "components": []
          }],
          [{
            "components": []
          }, {
            "components": []
          }, {
            "components": []
          }]
        ],
        "header": [],
        "caption": "",
        "striped": true,
        "bordered": true,
        "hover": false,
        "condensed": false,
        "type": "table",
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "clearOnHide": false,
        "tableView": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "panel",
        "components": [{
          "type": "textfield",
          "conditional": {
            "eq": "",
            "when": null,
            "show": null
          },
          "validate": {
            "customPrivate": false,
            "custom": "",
            "pattern": "",
            "maxLength": "",
            "minLength": "",
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": false,
          "suffix": "",
          "prefix": "",
          "placeholder": "",
          "key": "textField5",
          "label": "",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true,
          "clearOnHide": true,
          "hidden": false,
          "hideLabel": false
        }],
        "theme": "default",
        "title": "Panel",
        "input": false,
        "clearOnHide": false,
        "tableView": false,
        "hideLabel": false
      }, {
        "lockKey": true,
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "well",
        "components": [{
          "type": "textfield",
          "conditional": {
            "eq": "",
            "when": null,
            "show": null
          },
          "validate": {
            "customPrivate": false,
            "custom": "",
            "pattern": "",
            "maxLength": "",
            "minLength": "",
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": false,
          "suffix": "",
          "prefix": "",
          "placeholder": "",
          "key": "textField6",
          "label": "",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true,
          "clearOnHide": true,
          "hidden": false,
          "hideLabel": false
        }],
        "input": false,
        "clearOnHide": false,
        "tableView": false,
        "hideLabel": false
      }, {
        "input": true,
        "tree": true,
        "components": [{
          "input": true,
          "tableView": true,
          "inputType": "text",
          "inputMask": "",
          "label": "Two",
          "key": "two",
          "placeholder": "",
          "prefix": "",
          "suffix": "",
          "multiple": false,
          "defaultValue": "",
          "protected": false,
          "unique": false,
          "persistent": true,
          "validate": {
            "required": false,
            "minLength": "",
            "maxLength": "",
            "pattern": "",
            "custom": "",
            "customPrivate": false
          },
          "conditional": {
            "show": null,
            "when": null,
            "eq": ""
          },
          "type": "textfield",
          "hideLabel": true,
          "clearOnHide": true,
          "hidden": false
        }, {
          "input": true,
          "tableView": true,
          "inputType": "text",
          "inputMask": "",
          "label": "ONe",
          "key": "oNe",
          "placeholder": "",
          "prefix": "",
          "suffix": "",
          "multiple": false,
          "defaultValue": "",
          "protected": false,
          "unique": false,
          "persistent": true,
          "validate": {
            "required": false,
            "minLength": "",
            "maxLength": "",
            "pattern": "",
            "custom": "",
            "customPrivate": false
          },
          "conditional": {
            "show": null,
            "when": null,
            "eq": ""
          },
          "type": "textfield",
          "hideLabel": true,
          "clearOnHide": true,
          "hidden": false
        }],
        "tableView": true,
        "label": "Datagrid",
        "key": "datagrid",
        "protected": false,
        "persistent": true,
        "type": "datagrid",
        "conditional": {
          "show": null,
          "when": null,
          "eq": ""
        },
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "survey",
        "validate": {
          "customPrivate": false,
          "custom": "",
          "required": false
        },
        "persistent": true,
        "protected": false,
        "defaultValue": "",
        "values": [{
          "label": "Alpha",
          "value": "alpha"
        }, {
          "label": "Bet",
          "value": "bet"
        }],
        "questions": [{
          "label": "One",
          "value": "one"
        }, {
          "label": "Two",
          "value": "two"
        }],
        "key": "survey",
        "label": "Survey",
        "tableView": true,
        "input": true,
        "clearOnHide": true,
        "hidden": false,
        "hideLabel": false
      }, {
        "conditional": {
          "eq": "",
          "when": null,
          "show": null
        },
        "type": "container",
        "persistent": true,
        "protected": false,
        "key": "container",
        "label": "Container",
        "tableView": true,
        "components": [{
          "type": "textfield",
          "conditional": {
            "eq": "",
            "when": null,
            "show": null
          },
          "validate": {
            "customPrivate": false,
            "custom": "",
            "pattern": "",
            "maxLength": "",
            "minLength": "",
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": false,
          "suffix": "",
          "prefix": "",
          "placeholder": "",
          "key": "one",
          "label": "One",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true,
          "clearOnHide": true,
          "hidden": false,
          "hideLabel": false
        }, {
          "type": "textfield",
          "conditional": {
            "eq": "",
            "when": null,
            "show": null
          },
          "validate": {
            "customPrivate": false,
            "custom": "",
            "pattern": "",
            "maxLength": "",
            "minLength": "",
            "required": false
          },
          "persistent": true,
          "unique": false,
          "protected": false,
          "defaultValue": "",
          "multiple": false,
          "suffix": "",
          "prefix": "",
          "placeholder": "",
          "key": "two2",
          "label": "Two",
          "inputMask": "",
          "inputType": "text",
          "tableView": true,
          "input": true,
          "clearOnHide": true,
          "hidden": false,
          "hideLabel": false
        }],
        "tree": true,
        "input": true,
        "clearOnHide": true,
        "hideLabel": false
      }, {
        "input": true,
        "tree": true,
        "components": [{
          "input": true,
          "tableView": true,
          "inputType": "text",
          "inputMask": "",
          "label": "One",
          "key": "editGridOne",
          "placeholder": "",
          "prefix": "",
          "suffix": "",
          "multiple": false,
          "defaultValue": "",
          "protected": false,
          "unique": false,
          "persistent": true,
          "hidden": false,
          "clearOnHide": true,
          "validate": {
            "required": false,
            "minLength": "",
            "maxLength": "",
            "pattern": "",
            "custom": "",
            "customPrivate": false
          },
          "conditional": {
            "show": "",
            "when": null,
            "eq": ""
          },
          "type": "textfield",
          "hideLabel": false,
          "labelPosition": "top",
          "tags": [],
          "properties": {}
        }],
        "multiple": false,
        "tableView": true,
        "label": "Edit Grid",
        "key": "editGrid",
        "protected": false,
        "persistent": true,
        "hidden": false,
        "clearOnHide": true,
        "templates": {
          "header": "<div class=\"row\"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class=\"col-sm-2\"> \n      {{ component.label }} \n    </div> \n  {% }) %} \n</div>",
          "row": "<div class=\"row\"> \n  {%util.eachComponent(components, function(component) { %} \n    <div class=\"col-sm-2\"> \n      {{ row[component.key] }} \n    </div> \n  {% }) %} \n  <div class=\"col-sm-2\"> \n    <div class=\"btn-group pull-right\"> \n      <div class=\"btn btn-default editRow\">Edit</div> \n      <div class=\"btn btn-danger removeRow\">Delete</div> \n    </div> \n  </div> \n</div>",
          "footer": ""
        },
        "type": "editgrid",
        "hideLabel": false,
        "tags": [],
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "properties": {}
      }],
      "type": "panel",
      "breadcrumb": "default",
      "hideLabel": false,
      "tags": [],
      "conditional": {
        "show": "false",
        "when": "hide",
        "eq": "true"
      },
      "properties": {}
    }, {
      "input": false,
      "label": "Submit",
      "tableView": false,
      "key": "submit",
      "size": "md",
      "leftIcon": "",
      "rightIcon": "",
      "block": false,
      "action": "submit",
      "disableOnInvalid": false,
      "theme": "primary",
      "type": "button",
      "hideLabel": false
    }]
  },
  tests: {
    'Test hiding and showing components': (form, done) => {
      const fullData = _cloneDeep(form.getValue());
      form.getComponent('hide', component => {
        component.setValue(true);
        form.checkConditions(form.getValue());
        assert.deepEqual(form.getValue(), {data: { hide: true}});
        component.setValue(false);
        form.checkConditions(form.getValue());
        assert.deepEqual(form.getValue(), fullData);
        done();
      });
    }
  }
};

