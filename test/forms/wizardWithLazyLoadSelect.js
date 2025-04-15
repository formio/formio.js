export default {
  "_id": "67ee5e61071452be4a3b483c",
  "title": "retest",
  "name": "retest",
  "path": "retest",
  "type": "form",
  "display": "wizard",
  "tags": [],
  "components": [
    {
      "title": "Select Resource",
      "breadcrumbClickable": true,
      "buttonSettings": {
        "previous": true,
        "cancel": true,
        "next": true
      },
      "navigateOnEnter": false,
      "saveOnEnter": false,
      "scrollToTop": false,
      "collapsible": false,
      "key": "page2",
      "type": "panel",
      "label": "Page 1",
      "components": [
        {
          "label": "Select",
          "widget": "choicesjs",
          "tableView": true,
          "dataSrc": "url",
          "data": {
            "resource": "selectResource",
            "url": "https://mocki.io/v1/bb5821e3-36e3-47af-bd92-4e0ff6c97431",
            "headers": [
              {
                "key": "",
                "value": ""
              }
            ]
          },
          "valueProperty": "propertyValue",
          "dataType": "number",
          "validate": {
            "select": false
          },
          "validateWhenHidden": false,
          "key": "select1",
          "lazyLoad": true,
          "disableLimit": false,
          "searchField": "data.valueProperty__regex",
          "noRefreshOnScroll": false,
          "type": "select",
          "input": true
        }
      ],
      "input": false,
      "tableView": false
    },
    {
      "title": "Select URL",
      "breadcrumbClickable": true,
      "buttonSettings": {
        "previous": true,
        "cancel": true,
        "next": true
      },
      "navigateOnEnter": false,
      "saveOnEnter": false,
      "scrollToTop": false,
      "collapsible": false,
      "key": "page3",
      "type": "panel",
      "label": "Page 1",
      "components": [
        {
          "label": "Select",
          "widget": "choicesjs",
          "tableView": true,
          "dataSrc": "url",
          "data": {
            "resource": "selectResource",
            "url": "https://mocki.io/v1/bb5821e3-36e3-47af-bd92-4e0ff6c97431",
            "headers": [
              {
                "key": "",
                "value": ""
              }
            ]
          },
          "valueProperty": "propertyValue",
          "dataType": "number",
          "validate": {
            "select": false
          },
          "validateWhenHidden": false,
          "key": "select2",
          "lazyLoad": true,
          "disableLimit": false,
          "searchField": "data.valueProperty__regex",
          "noRefreshOnScroll": false,
          "type": "select",
          "input": true
        }
      ],
      "input": false,
      "tableView": false
    }
  ]
}
