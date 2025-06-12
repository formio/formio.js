export default {
    components: [
        {
            "label": "dateTime",
            "displayInTimezone": "submission",
            "format": "MM/dd/yyyy:HH:mm:ss",
            "tableView": false,
            "datePicker": {
                "disableWeekends": false,
                "disableWeekdays": false
            },
            "timePicker": {
                "showMeridian": false
            },
            "enableMinDateInput": false,
            "enableMaxDateInput": false,
            "validateWhenHidden": false,
            "key": "dateTime",
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
            "type": "datetime",
            "input": true,
            "widget": {
                "type": "calendar",
                "displayInTimezone": "submission",
                "locale": "en",
                "useLocaleSettings": false,
                "allowInput": true,
                "mode": "single",
                "enableTime": true,
                "noCalendar": false,
                "format": "MM/dd/yyyy:HH:mm:ss",
                "hourIncrement": 1,
                "minuteIncrement": 1,
                "time_24hr": true,
                "minDate": null,
                "disableWeekends": false,
                "disableWeekdays": false,
                "maxDate": null
            }
        }
    ]
}
