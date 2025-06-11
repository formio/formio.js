export default {
  components: [
    {
      "label": "Date / Time",
      "tableView": false,
      "datePicker": {
        "disableWeekends": false,
        "disableWeekdays": false
      },
      "enableMinDateInput": false,
      "enableMaxDateInput": false,
      "validateWhenHidden": false,
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
    }
  ]
}
