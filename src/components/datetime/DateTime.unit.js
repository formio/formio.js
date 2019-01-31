import DateTimeComponent from './DateTime';
import assert from 'assert';
describe('DateTime Unit Tests', () => {
  it('Should create a new DateTime component', () => {
    const dateTime = new DateTimeComponent();
    assert.equal(dateTime.key, 'dateTime');
  });
  it('Checking the default schema of the component', () => {
    const dateTime = new DateTimeComponent();
    assert.equal(dateTime.defaultSchema.label, 'Date / Time');
    assert.equal(dateTime.defaultSchema.format, 'yyyy-MM-dd hh:mm a');
    assert.equal(dateTime.defaultSchema.displayInTimezone, 'viewer');
    assert.equal(dateTime.defaultSchema.datepickerMode, 'day');
  });
  it('Should be able to disable Date component', () => {
    const dateTime = new DateTimeComponent({
        dateTime: [
          {
            components: [
              {
                'label': 'Date / Time',
                'format': 'hh:mm a',
                'mask': false,
                'tableView': true,
                'alwaysEnabled': false,
                'type': 'datetime',
                'input': true,
                'key': 'dateTime2',
                'suffix': true,
                'widget': {
                  'type': 'calendar',
                  'displayInTimezone': 'viewer',
                  'language': 'en',
                  'useLocaleSettings': false,
                  'allowInput': true,
                  'mode': 'single',
                  'enableTime': true,
                  'noCalendar': true,
                  'format': 'hh:mm a',
                  'defaultDate': '',
                  'hourIncrement': 1,
                  'minuteIncrement': 1,
                  'time_24hr': false,
                  'minDate': '',
                  'maxDate': ''
                },
                'enableDate': false,
                'datePicker':
                  {
                    'minDate': '',
                    'maxDate': ''
                  }
              }
            ],
          }]
      },
    );
  });
  it('Should be able to disable Time component', () => {
    const dateTime = new DateTimeComponent({
      dateTime: [
        {
          components: [
            {
              'label': 'Date / Time',
              'format': 'yyyy-MM-dd',
              'mask': false,
              'tableView': true,
              'alwaysEnabled': false,
              'type': 'datetime',
              'input': true,
              'key': 'dateTime3',
              'suffix': true,
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
                'defaultDate': '',
                'hourIncrement': 1,
                'minuteIncrement': 1,
                'time_24hr': false,
                'minDate': null,
                'maxDate': null
              },
              'enableTime': false
            },
            {
              'type': 'button',
              'label': 'Submit',
              'key': 'submit',
              'disableOnInvalid': true,
              'theme': 'primary',
              'input': true,
              'tableView': true
            }
          ],
        },
      ]
    });
  });
  it('Should be able to change to 24 hr time',() => {
    const dateTime = new DateTimeComponent({
      dateTime: [
        {
          components: [
            {
              'label': 'Date / Time',
              'format': 'yyyy-MM-dd',
              'mask': false,
              'tableView': true,
              'alwaysEnabled': false,
              'type': 'datetime',
              'input': true,
              'key': 'dateTime3',
              'suffix': true,
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
                'defaultDate': '',
                'hourIncrement': 1,
                'minuteIncrement': 1,
                'time_24hr': true,
                'minDate': null,
                'maxDate': null
              },
              'enableTime': false
            },
            {
              'type': 'button',
              'label': 'Submit',
              'key': 'submit',
              'disableOnInvalid': true,
              'theme': 'primary',
              'input': true,
              'tableView': true
            }
          ],
        },
      ]
    });
    });
});
