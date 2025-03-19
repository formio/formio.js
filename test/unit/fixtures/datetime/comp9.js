export default {
  _id: '625e8bb06c97f942effd7b8b',
  title: 'Date Time',
  name: 'dateTime',
  path: 'datetime',
  type: 'form',
  display: 'form',
  components: [
    {
      label: 'Date / Time',
      displayInTimezone: 'location',
      format: 'yyyy-MM-dd',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false
      },
      enableTime: false,
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'dateTime',
      type: 'datetime',
      timezone: 'America/Chicago',
      input: true,
      widget: {
        type: 'calendar',
        timezone: 'America/Chicago',
        displayInTimezone: 'location',
        locale: 'en',
        useLocaleSettings: false,
        allowInput: true,
        mode: 'single',
        enableTime: false,
        noCalendar: false,
        format: 'yyyy-MM-dd',
        hourIncrement: 1,
        minuteIncrement: 1,
        'time_24hr': false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null
      }
    },
    {
      label: 'Date / Time',
      displayInTimezone: 'location',
      format: 'yyyy-MM-dd',
      tableView: false,
      datePicker: {
        disableWeekends: false,
        disableWeekdays: false
      },
      enableTime: false,
      enableMinDateInput: false,
      enableMaxDateInput: false,
      key: 'dateTime1',
      type: 'datetime',
      timezone: 'Asia/Seoul',
      input: true,
      widget: {
        type: 'calendar',
        timezone: 'Asia/Seoul',
        displayInTimezone: 'location',
        locale: 'en',
        useLocaleSettings: false,
        allowInput: true,
        mode: 'single',
        enableTime: false,
        noCalendar: false,
        format: 'yyyy-MM-dd',
        hourIncrement: 1,
        minuteIncrement: 1,
        'time_24hr': false,
        minDate: null,
        disableWeekends: false,
        disableWeekdays: false,
        maxDate: null
      }
    },
    {
      type: 'button',
      label: 'Submit',
      key: 'submit',
      disableOnInvalid: true,
      input: true,
      tableView: false
    }
  ],
  settings: {},
  properties: {},
  project: '61c101d0792d8ffc9be99694',
};
