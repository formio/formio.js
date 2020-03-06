import assert from 'power-assert';

import Harness from '../harness';

export default {
  title: 'Date Fields Test',
  form: {
    components: [
      {
        'label': 'Date / Time',
        'labelPosition': 'top',
        'displayInTimezone': 'viewer',
        'useLocaleSettings': false,
        'allowInput': true,
        'format': 'yyyy-MM-dd',
        'placeholder': '',
        'description': '',
        'tooltip': '',
        'customClass': '',
        'tabindex': '',
        'hidden': false,
        'hideLabel': false,
        'autofocus': false,
        'disabled': false,
        'alwaysEnabled': false,
        'tableView': false,
        'enableDate': true,
        'datePicker': {
          'minDate': null,
          'maxDate': null,
          'showWeeks': true,
          'startingDay': 0,
          'initDate': '',
          'minMode': 'day',
          'maxMode': 'year',
          'yearRows': 4,
          'yearColumns': 5
        },
        'enableTime': false,
        'timePicker': {
          'showMeridian': true,
          'hourStep': 1,
          'minuteStep': 1,
          'readonlyInput': false,
          'mousewheel': true,
          'arrowkeys': true
        },
        'multiple': false,
        'defaultValue': '',
        'persistent': true,
        'protected': false,
        'dbIndex': false,
        'encrypted': false,
        'redrawOn': '',
        'clearOnHide': true,
        'customDefaultValue': 'value = moment()',
        'calculateValue': '',
        'allowCalculateOverride': false,
        'validate': {
          'required': false,
          'customMessage': '',
          'custom': '',
          'customPrivate': false,
          'json': '',
          'strictDateValidation': false
        },
        'unique': false,
        'validateOn': 'change',
        'errorLabel': '',
        'key': 'dateTime',
        'type': 'datetime',
        'input': true,
        'prefix': '',
        'suffix': '<i ref=\'icon\' class=\'fa fa-calendar\' style=\'\'></i>',
        'refreshOn': '',
        'widget': {
          'type': 'calendar',
          'displayInTimezone': 'viewer',
          'language': 'en',
          'useLocaleSettings': false,
          'allowInput': true,
          'mode': 'single',
          'enableTime': false,
          'noCalendar': false,
          'format': 'yyyy-MM-dd',
          'defaultValue': '',
          'hourIncrement': 1,
          'minuteIncrement': 1,
          'time_24hr': false,
          'minDate': null,
          'maxDate': null
        },
        'showCharCount': false,
        'showWordCount': false,
        'allowMultipleMasks': false,
        'timezone': '',
        'datepickerMode': 'day',
        'id': 'eqi7zv7'
      },
      {
        'label': 'DD/MM/YYYY',
        'labelPosition': 'top',
        'displayInTimezone': 'viewer',
        'useLocaleSettings': false,
        'allowInput': true,
        'format': 'dd/MM/yyyy',
        'placeholder': '',
        'description': '',
        'tooltip': '',
        'customClass': '',
        'tabindex': '',
        'hidden': false,
        'hideLabel': false,
        'autofocus': false,
        'disabled': false,
        'alwaysEnabled': false,
        'tableView': false,
        'enableDate': true,
        'datePicker': {
          'minDate': null,
          'maxDate': null,
          'showWeeks': true,
          'startingDay': 0,
          'initDate': '',
          'minMode': 'day',
          'maxMode': 'year',
          'yearRows': 4,
          'yearColumns': 5
        },
        'enableTime': false,
        'timePicker': {
          'showMeridian': true,
          'hourStep': 1,
          'minuteStep': 1,
          'readonlyInput': false,
          'mousewheel': true,
          'arrowkeys': true
        },
        'multiple': false,
        'defaultValue': '',
        'persistent': true,
        'protected': false,
        'dbIndex': false,
        'encrypted': false,
        'clearOnHide': true,
        'customDefaultValue': 'value = moment();',
        'validate': {
          'required': false,
          'customMessage': '',
          'custom': '',
          'customPrivate': false,
          'json': '',
          'strictDateValidation': false
        },
        'unique': false,
        'validateOn': 'change',
        'errorLabel': '',
        'key': 'ddMmYyyy',
        'type': 'datetime',
        'input': true,
        'prefix': '',
        'suffix': '<i ref=\'icon\' class=\'fa fa-calendar\' style=\'\'></i>',
        'refreshOn': '',
        'widget': {
          'type': 'calendar',
          'displayInTimezone': 'viewer',
          'language': 'en',
          'useLocaleSettings': false,
          'allowInput': true,
          'mode': 'single',
          'enableTime': false,
          'noCalendar': false,
          'format': 'dd/MM/yyyy',
          'defaultValue': '',
          'hourIncrement': 1,
          'minuteIncrement': 1,
          'time_24hr': false,
          'minDate': null,
          'maxDate': null
        },
        'timezone': '',
        'datepickerMode': 'day',
      }

    ]
  },
  tests: {
    'Test date only fields format yyyy-mm-dd'(form, done) {
      form.getComponent('dateTime', (component) => {
        const m = new Date();
        assert.equal(component.refs.input[0].widget.calendar.altInput.value, `${m.getFullYear()}-${(m.getMonth() + 1).toString().padStart(2, '0')}-${m.getDate().toString().padStart(2, '0')}`);
        done();
      });
    },
    'Test date only fields format dd/mm/yyyy'(form, done) {
      form.getComponent('ddMmYyyy', (component) => {
        const m = new Date();
        assert.equal(component.refs.input[0].widget.calendar.altInput.value, `${m.getDate().toString().padStart(2, '0')}/${(m.getMonth() + 1).toString().padStart(2, '0')}/${m.getFullYear()}`);
        done();
      });
    }
  }
};
