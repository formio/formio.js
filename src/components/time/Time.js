import moment from 'moment';
import TextFieldComponent from '../textfield/TextField';

const defaultDataFormat = 'HH:mm:ss';

export default class TimeComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'time',
      label: 'Time',
      key: 'time',
      inputType: 'time',
      format: 'HH:mm',
      dataFormat: defaultDataFormat,
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
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#time',
      weight: 55,
      schema: TimeComponent.schema(),
    };
  }

  get dataFormat() {
    return this.component.dataFormat || defaultDataFormat;
  }

  get defaultSchema() {
    return TimeComponent.schema();
  }

  get defaultValue() {
    let value = super.defaultValue;
    if (this.component.multiple && Array.isArray(value)) {
      value = value.map(item => item ? this.getValueFromView(item) : item);
    }
    else {
      if (value) {
        value = this.getValueFromView(value);
      }
    }
    return value;
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.type = 'time';
    return info;
  }

  get skipMaskValidation() {
    return true;
  }

  getValueAt(index) {
    if (!this.refs.input.length || !this.refs.input[index]) {
      return this.emptyValue;
    }
    const { value } = this.refs.input[index];
    if (!value) {
      return this.emptyValue;
    }

    return this.getValueFromView(value);
  }

  setValueAt(index, value) {
    this.refs.input[index].value = value ? this.getView(value) : value;
  }

  getValueFromView(view) {
    return moment(view, this.component.format).format(this.dataFormat);
  }

  getView(value) {
    return moment(value, this.dataFormat).format(this.component.format);
  }
}
