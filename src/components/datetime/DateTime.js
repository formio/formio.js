import _ from 'lodash';
import BaseComponent from '../base/Base';
export default class DateTimeComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'datetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: 'yyyy-MM-dd hh:mm a',
      useLocaleSettings: false,
      allowInput: true,
      enableDate: true,
      enableTime: true,
      defaultDate: '',
      displayInTimezone: 'viewer',
      timezone: '',
      datepickerMode: 'day',
      datePicker: {
        showWeeks: true,
        startingDay: 0,
        initDate: '',
        minMode: 'day',
        maxMode: 'year',
        yearRows: 4,
        yearColumns: 5,
        minDate: null,
        maxDate: null
      },
      timePicker: {
        hourStep: 1,
        minuteStep: 1,
        showMeridian: true,
        readonlyInput: false,
        mousewheel: true,
        arrowkeys: true
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Date / Time',
      group: 'advanced',
      icon: 'fa fa-calendar-plus-o',
      documentation: 'http://help.form.io/userguide/#datetime',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    const timezone = (this.component.timezone || this.options.timezone);
    const submissionTimezone = this.options.submissionTimezone ||  _.get(this.root, 'options.submissionTimezone');

    /* eslint-disable camelcase */
    this.component.widget = {
      type: 'calendar',
      timezone,
      displayInTimezone: _.get(this.component, 'displayInTimezone', 'viewer'),
      submissionTimezone,
      language: this.options.language,
      useLocaleSettings: _.get(this.component, 'useLocaleSettings', false),
      allowInput: _.get(this.component, 'allowInput', true),
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      format: this.component.format,
      defaultDate: this.component.defaultDate,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      time_24hr: !_.get(this.component, 'timePicker.showMeridian', true),
      minDate: _.get(this.component, 'datePicker.minDate'),
      maxDate: _.get(this.component, 'datePicker.maxDate')
    };
    /* eslint-enable camelcase */

    // Add the validators date.
    this.validators.push('date');
  }

  get defaultSchema() {
    return DateTimeComponent.schema();
  }

  get emptyValue() {
    return '';
  }

  isEmpty(value) {
    if (value.toString() === 'Invalid Date') {
      return true;
    }
    return super.isEmpty(value);
  }

  // This select component can handle multiple items on its own.
  createWrapper() {
    return false;
  }
}
