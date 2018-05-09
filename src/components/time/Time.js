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

  static get builderInfo() {
    return {
      title: 'Time',
      icon: 'fa fa-clock-o',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#time',
      weight: 60,
      schema: TimeComponent.schema()
    };
  }

  get defaultSchema() {
    return TimeComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'time';
    return info;
  }
  getValueAt(index) {
    if (!this.inputs.length || !this.inputs[index]) {
      return null;
    }
    const val = this.inputs[index].value;
    if (!val) {
      return null;
    }

    return moment(val, this.component.format).format('HH:mm:ss');
  }
  setValueAt(index, value) {
    this.inputs[index].value = moment(value, 'HH:mm:ss').format(this.component.format);
  }

  static get builderInfo() {
    return false;
  }
}
