export default {
    components: [
        {
            "label": "Text Field",
            "widget": {
                "type": "calendar",
                "altInput": true,
                "allowInput": true,
                "clickOpens": true,
                "enableDate": true,
                "enableTime": true,
                "mode": "single",
                "noCalendar": false,
                "format": "MM/dd/yyyy:HH:mm:ss",
                "dateFormat": "MM/dd/yyyy:HH:mm:ss",
                "useLocaleSettings": false,
                "hourIncrement": 1,
                "minuteIncrement": 5,
                "time_24hr": false,
                "saveAs": "text",
                "displayInTimezone": "viewer",
                "locale": "en"
            },
            "applyMaskOn": "change",
            "tableView": true,
            "validateWhenHidden": false,
            "key": "textField",
            "logic": [
                {
                    "name": "requiredLogic",
                    "trigger": {
                        "type": "javascript",
                        "javascript": "result = true;"
                    },
                    "actions": [
                        {
                            "name": "setRequired",
                            "type": "property",
                            "property": {
                                "label": "Required",
                                "value": "validate.required",
                                "type": "boolean"
                            },
                            "state": true
                        }
                    ]
                }
            ],
            "type": "textfield",
            "input": true
        }
    ]
}
