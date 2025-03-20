export default {
  'type': 'datetime',
  'validate': {
    'custom': '',
    'required': false
  },
  'shortcutButtons': [
    {
      'label': 'Today',
      'onClick': 'date = new Date(\'2020-10-10T00:00:00\');'
    }
  ],
  'persistent': true,
  'protected': false,
  'timePicker': {
    'arrowkeys': true,
    'mousewheel': true,
    'readonlyInput': false,
    'showMeridian': true,
    'minuteStep': 1,
    'hourStep': 1
  },
  'datePicker': {
    'datepickerMode': 'day',
    'yearRange': '20',
    'maxMode': 'year',
    'minMode': 'day',
    'initDate': '',
    'startingDay': 0,
    'showWeeks': true
  },
  'datepickerMode': 'day',
  'defaultDate': '',
  'enableTime': true,
  'enableDate': true,
  'format': 'yyyy-MM-dd',
  'key': 'date',
  'label': 'Date',
  'tableView': true,
  'input': true
};
