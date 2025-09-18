export default {
  components: [
    {
      "label": "Show",
      "action": "event",
      "showValidations": false,
      "tableView": false,
      "key": "show",
      "type": "button",
      "event": "show",
      "input": true
    },
    {
      "label": "Hide",
      "action": "event",
      "showValidations": false,
      "theme": "danger",
      "tableView": false,
      "key": "hide",
      "type": "button",
      "event": "hide",
      "input": true
    },
    {
      "collapsible": true,
      "hidden": true,
      "key": "panel",
      "logic": [
        {
          "name": "ShowPanel",
          "trigger": {
            "type": "event",
            "event": "show"
          },
          "actions": [
            {
              "name": "Show",
              "type": "property",
              "property": {
                "label": "Hidden",
                "value": "hidden",
                "type": "boolean"
              },
              "state": false
            }
          ]
        },
        {
          "name": "HidePanel",
          "trigger": {
            "type": "event",
            "event": "hide"
          },
          "actions": [
            {
              "name": "Hide",
              "type": "property",
              "property": {
                "label": "Hidden",
                "value": "hidden",
                "type": "boolean"
              },
              "state": true
            }
          ]
        }
      ],
      "type": "panel",
      "label": "Panel",
      "collapsed": false,
      "input": false,
      "tableView": false,
      "components": []
    },
    {
      "label": "Text Field",
      "applyMaskOn": "change",
      "tableView": true,
      "key": "textField1",
      "type": "textfield",
      "input": true
    }
  ]
}
