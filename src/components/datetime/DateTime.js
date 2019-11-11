import _ from 'lodash';
import moment from 'moment';
import Input from '../_classes/input/Input';
import FormioUtils from '../../utils';
export default class DateTimeComponent extends Input {
  static schema(...extend) {
    return Input.schema({
      type: 'datetime',
      label: 'Date / Time',
      key: 'dateTime',
      format: 'yyyy-MM-dd hh:mm a',
      useLocaleSettings: false,
      allowInput: true,
      enableDate: true,
      enableTime: true,
      defaultValue: '',
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
      icon: 'calendar',
      documentation: 'http://help.form.io/userguide/#datetime',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    const timezone = (this.component.timezone || this.options.timezone);
    const time24hr = !_.get(this.component, 'timePicker.showMeridian', true);

    // Change the format to map to the settings.
    if (!this.component.enableDate) {
      this.component.format = this.component.format.replace(/yyyy-MM-dd /g, '');
    }
    if (!this.component.enableTime) {
      this.component.format = this.component.format.replace(/ hh:mm a$/g, '');
    }
    else if (time24hr) {
      this.component.format = this.component.format.replace(/hh:mm a$/g, 'HH:mm');
    }
    else {
      this.component.format = this.component.format.replace(/HH:mm$/g, 'hh:mm a');
    }

    /* eslint-disable camelcase */
    this.component.widget = {
      type: 'calendar',
      timezone,
      displayInTimezone: _.get(this.component, 'displayInTimezone', 'viewer'),
      submissionTimezone: this.submissionTimezone,
      language: this.options.language,
      useLocaleSettings: _.get(this.component, 'useLocaleSettings', false),
      allowInput: _.get(this.component, 'allowInput', true),
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      format: this.component.format,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      time_24hr: time24hr,
      readOnly: this.options.readOnly,
      minDate: _.get(this.component, 'datePicker.minDate'),
      maxDate: _.get(this.component, 'datePicker.maxDate')
    };
    /* eslint-enable camelcase */

    // Add the validators date.
    this.validators.push('date');
  }

  performInputMapping(input) {
    if (input.widget && input.widget.settings) {
      input.widget.settings.submissionTimezone = this.submissionTimezone;
    }
    return input;
  }

  get defaultSchema() {
    return DateTimeComponent.schema();
  }

  get defaultValue() {
    let defaultValue = super.defaultValue;
    if (!defaultValue && this.component.defaultDate) {
      defaultValue = FormioUtils.getDateSetting(this.component.defaultDate);
      defaultValue = defaultValue ? defaultValue.toISOString() : '';
    }
    return defaultValue;
  }

  get emptyValue() {
    return '';
  }

  isEmpty(value = this.dataValue) {
    if (value && (value.toString() === 'Invalid Date')) {
      return true;
    }
    return super.isEmpty(value);
  }

  formatValue(input) {
    const result = moment.utc(input).toISOString();
    return result === 'Invalid date' ? input : result;
  }

  isEqual(valueA, valueB = this.dataValue) {
    const format = FormioUtils.convertFormatToMoment(this.component.format);
    return (this.isEmpty(valueA) && this.isEmpty(valueB))
      || moment.utc(valueA).format(format) === moment.utc(valueB).format(format);
  }

  createWrapper() {
    return false;
  }

  checkValidity(data, dirty, rowData) {
    if (this.refs.input) {
      this.refs.input.forEach((input) => {
        if (input.widget && input.widget.enteredDate) {
          dirty = true;
        }
      });
    }
    return super.checkValidity(data, dirty, rowData);
  }

  focus() {
    if (this.refs.input && this.refs.input[0]) {
      const sibling = this.refs.input[0].nextSibling;
      if (sibling) {
        sibling.focus();
      }
    }
  }
}
