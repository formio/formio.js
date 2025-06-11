export default {
  components: [
    {
      "label": "Text Field calendar",
      "widget": {
        "type": "calendar",
        "altInput": true,
        "allowInput": true,
        "clickOpens": true,
        "enableDate": true,
        "enableTime": true,
        "mode": "single",
        "noCalendar": false,
        "format": "yyyy-MM-dd hh:mm",
        "dateFormat": "yyyy-MM-ddTHH:mm:ssZ",
        "useLocaleSettings": false,
        "hourIncrement": 1,
        "minuteIncrement": 5,
        "time_24hr": false,
        "saveAs": "text",
        "displayInTimezone": "submission",
        "locale": "en"
      },
      "applyMaskOn": "change",
      "tableView": true,
      "validateWhenHidden": false,
      "key": "textFieldCalendar",
      "type": "textfield",
      "input": true
    }
  ]
}
