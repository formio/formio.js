import moment from 'moment';
import TextFieldComponent from '../textfield/TextField';

export default class TimeComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'time',
      label: 'Time',
      key: 'time',
      inputType: 'time',
      format: 'HH:mm'
    }, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
    //check if <input type="time" /> is supported to fallback to input with mask (for Safari and IE)
    const input = this.ce('time');
    this.timeInputSupported = (input.type === 'time');
    if (!this.timeInputSupported) {
      this.component.inputMask = '99:99';
    }
  }

  static get builderInfo() {
    return {
      title: 'Time',
      icon: 'clock-o',
      group: 'common',
      documentation: 'http://help.form.io/userguide/#time',
      weight: 55,
      schema: TimeComponent.schema()
    };
  }

  get defaultSchema() {
    return TimeComponent.schema();
  }

  get defaultValue() {
    let value = super.defaultValue;
    if (this.component.multiple && Array.isArray(value)) {
      value = value.map(item => item ? moment(item).format(this.component.format) : item);
    }
    else {
      if (value) {
        value = moment(value).format(this.component.format);
      }
    }
    return value;
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.type = 'time';
    return info;
  }

  getValueAt(index) {
    if (!this.refs.input.length || !this.refs.input[index]) {
      return this.emptyValue;
    }
    const val = this.refs.input[index].value;
    if (!val) {
      return this.emptyValue;
    }

    return moment(val, this.component.format).format('HH:mm:ss');
  }

  setValueAt(index, value) {
    this.refs.input[index].value = value ? moment(value, 'HH:mm:ss').format(this.component.format) : value;
  }
}
