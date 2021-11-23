export default {
  "type": "form",
  "tags": [],
  "components": [{
    "title": "Page 1",
    "label": "Page 1",
    "type": "panel",
    "key": "page1",
    "components": [{
      "label": "Checkbox",
      "tableView": false,
      "key": "checkbox",
      "type": "checkbox",
      "input": true,
      "defaultValue": false
    }],
    "input": false,
    "tableView": false
  }, {
    "title": "Page 2",
    "breadcrumbClickable": true,
    "buttonSettings": {
      "previous": true,
      "cancel": true,
      "next": true
    },
    "collapsible": false,
    "key": "page2",
    "conditional": {
      "show": true,
      "when": "checkbox",
      "eq": "true"
    },
    "type": "panel",
    "label": "Page 2",
    "components": [{
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
    }],
    "input": false,
    "tableView": false
  }],
  "title": "wizard test",
  "display": "wizard",
  "name": "wizardTest",
  "path": "wizardtest",
  "machineName": "nyisrmnbdpnjfut:wizardTest"
};
