export default {
  'title': 'test11',
  'name': 'test11',
  'path': 'test11',
  'type': 'form',
  'display': 'form',
  'components': [{
    'label': 'Date / Time',
    'format': 'yyyy-MM-dd',
    'tableView': false,
    'enableMinDateInput': false,
    'datePicker': {
      'disableWeekends': false,
      'disableWeekdays': false
    },
    'enableMaxDateInput': false,
    'multiple': true,
    'validate': {
      'required': true
    },
    'key': 'dateTime',
    'type': 'datetime',
    'input': true,
    'widget': {
      'type': 'calendar',
      'displayInTimezone': 'viewer',
      'locale': 'en',
      'useLocaleSettings': false,
      'allowInput': true,
      'mode': 'single',
      'enableTime': true,
      'noCalendar': false,
      'format': 'yyyy-MM-dd',
      'hourIncrement': 1,
      'minuteIncrement': 1,
      'time_24hr': false,
      'minDate': null,
      'disableWeekends': false,
      'disableWeekdays': false,
      'maxDate': null
    }
  }, {
    'type': 'button',
    'label': 'Submit',
    'key': 'submit',
    'disableOnInvalid': true,
    'input': true,
    'tableView': false
  }],
};
