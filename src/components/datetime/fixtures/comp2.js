export default {
  'label': 'Date / Time',
  'displayInTimezone': 'location',
  'tableView': true,
  'enableMinDateInput': false,
  'datePicker': {
    'disableWeekends': false,
    'disableWeekdays': false
  },
  'enableMaxDateInput': false,
  'key': 'dateTime',
  'type': 'datetime',
  'timezone': 'America/Los_Angeles',
  'input': true,
  'widget': {
    'type': 'calendar',
    'timezone': 'America/Los_Angeles',
    'displayInTimezone': 'location',
    'locale': 'en',
    'useLocaleSettings': false,
    'allowInput': true,
    'mode': 'single',
    'enableTime': true,
    'noCalendar': false,
    'format': 'yyyy-MM-dd hh:mm a',
    'hourIncrement': 1,
    'minuteIncrement': 1,
    'time_24hr': false,
    'minDate': null,
    'disableWeekends': false,
    'disableWeekdays': false,
    'maxDate': null
  }
};
