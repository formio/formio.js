import _ from 'lodash';
import dayjs from 'dayjs';
import FormioUtils from '../../utils';
import { componentValueTypes, fastCloneDeep, getComponentSavedTypes } from '../../utils/utils';
import Input from '../_classes/input/Input';

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
      },
      customOptions: {},
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Date / Time',
      group: 'advanced',
      icon: 'calendar',
      documentation: '/userguide/form-building/advanced-components#date-and-time',
      weight: 40,
      schema: DateTimeComponent.schema()
    };
  }

  static get serverConditionSettings() {
    return DateTimeComponent.conditionOperatorsSettings;
  }

  static get conditionOperatorsSettings() {
    return {
      ...super.conditionOperatorsSettings,
      operators: ['isDateEqual', 'isNotDateEqual', 'isEmpty', 'isNotEmpty','dateLessThan', 'dateGreaterThan', 'dateLessThanOrEqual','dateGreaterThanOrEqual'],
      valueComponent(classComp) {
        return {
          ...classComp,
          type: 'datetime',
        };
      }
    };
  }

  static savedValueTypes(schema) {
    schema = schema || {};

    return  getComponentSavedTypes(schema) || [componentValueTypes.date];
  }

  constructor(component, options, data) {
    super(component, options, data);
    const timezone = (this.component.timezone || this.options.timezone);
    const time24hr = !_.get(this.component, 'timePicker.showMeridian', true);

    // Change the format to map to the settings.
    if (!this.component.enableDate) {
      this.component.format = this.component.format.replace(/yyyy-MM-dd /g, '');
    }
    else if (this.component.enableDate && !/[yMd]/.test(this.component.format) && this.builderMode) {
      this.component.format = `yyyy-MM-dd ${this.component.format}`;
    }

    if (!this.component.enableTime) {
      this.component.format = this.component.format.replace(/ hh:mm a$/g, '');
    }
    else if (this.component.enableTime && !/[mhH]/.test(this.component.format) && this.builderMode) {
      this.component.format = `${this.component.format} hh:mm a`;
    }
    else if (time24hr) {
      this.component.format = this.component.format.replace(/hh:mm a$/g, 'HH:mm');
    }
    else {
      this.component.format = this.component.format.replace(/HH:mm$/g, 'hh:mm a');
    }

    let customOptions = this.component.customOptions || {};

    if (typeof customOptions === 'string') {
      try {
        customOptions = JSON.parse(customOptions);
      }
      catch (err) {
        console.warn(err.message);
        customOptions = {};
      }
    }

    /* eslint-disable camelcase */
    this.component.widget = {
      type: 'calendar',
      timezone,
      displayInTimezone: _.get(this.component, 'displayInTimezone', 'viewer'),
      locale: this.options.language,
      useLocaleSettings: _.get(this.component, 'useLocaleSettings', false),
      allowInput: _.get(this.component, 'allowInput', true),
      mode: 'single',
      enableTime: _.get(this.component, 'enableTime', true),
      noCalendar: !_.get(this.component, 'enableDate', true),
      format: this.component.format,
      hourIncrement: _.get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _.get(this.component, 'timePicker.minuteStep', 5),
      time_24hr: time24hr,
      readOnly: this.options.readOnly,
      minDate: _.get(this.component, 'datePicker.minDate'),
      disabledDates: _.get(this.component, 'datePicker.disable'),
      disableWeekends: _.get(this.component, 'datePicker.disableWeekends'),
      disableWeekdays: _.get(this.component, 'datePicker.disableWeekdays'),
      disableFunction: _.get(this.component, 'datePicker.disableFunction'),
      maxDate: _.get(this.component, 'datePicker.maxDate'),
      ...customOptions,
    };
    // update originalComponent to include widget and other updated settings
    // it is done here since these settings depend on properties present after the component is initialized
    // originalComponent is used to restore the component (and widget) after evaluating field logic
    this.originalComponent = fastCloneDeep(this.component);
    /* eslint-enable camelcase */
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

  get dayjsFormat() {
    return FormioUtils.convertFormatToDayjs(this.component.format);
  }

  isEmpty(value = this.dataValue) {
    if (value && (value.toString() === 'Invalid Date')) {
      return true;
    }
    return super.isEmpty(value);
  }

  formatValue(input) {
    if(dayjs(input).isValid()){
      return dayjs.utc(input).toISOString();
    }
    return input;
  }

  isEqual(valueA, valueB = this.dataValue) {
    return (this.isEmpty(valueA) && this.isEmpty(valueB))
      || dayjs.utc(valueA).format(this.dayjsFormat) === dayjs.utc(valueB).format(this.dayjsFormat);
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

  getValueAsString(value, options) {
    let format = FormioUtils.convertFormatToDayjs(this.component.format);
    const timezone = this.timezone;
    if (value && !this.attached && timezone) {
      format += format.match(/z$/) ? '' : ' z';
      if (Array.isArray(value) && this.component.multiple) {
        return value.map(item => _.trim(FormioUtils.dayjsDate(item, format, timezone, options).format(format))).join(', ');
      }
      return _.trim(FormioUtils.dayjsDate(value, format, timezone, options).format(format));
    }

    if (Array.isArray(value) && this.component.multiple) {
      return value.map(item => _.trim(dayjs(item).format(format))).join(', ');
    }
    return (value ? _.trim(dayjs(value).format(format)) : value) || '';
  }
}
