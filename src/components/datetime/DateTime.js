import BaseComponent from '../base/Base';
import Flatpickr from 'flatpickr';
import _get from 'lodash/get';
class DateTimeComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    return info;
  }

  // This date component can handle multiple dates on its own.
  createWrapper() {
    return false;
  }

  convertFormat(format) {
    // Year conversion.
    format = format.replace(/y/g, 'Y');
    format = format.replace('YYYY', 'Y');
    format = format.replace('YY', 'y');

    // Month conversion.
    format = format.replace('MMMM', 'F');
    format = format.replace(/M/g, 'n');
    format = format.replace('nnn', 'M');
    format = format.replace('nn', 'm');

    // Day in month.
    format = format.replace(/d/g, 'j');
    format = format.replace('jj', 'd');

    // Day in week.
    format = format.replace('EEEE', 'l');
    format = format.replace('EEE', 'D');

    // Hours, minutes, seconds
    format = format.replace('HH', 'H');
    format = format.replace('hh', 'h');
    format = format.replace('mm', 'i');
    format = format.replace('ss', 'S');
    format = format.replace(/a/g, 'K');
    return format;
  }

  get config() {
    return {
      altInput: true,
      clickOpens: true,
      enableDate: true,
      mode: this.component.multiple ? 'multiple' : 'single',
      enableTime: _get(this.component, 'enableTime', true),
      noCalendar: !_get(this.component, 'enableDate', true),
      altFormat: this.convertFormat(_get(this.component, 'format', '')),
      dateFormat: 'U',
      defaultDate: _get(this.component, 'defaultDate', ''),
      hourIncrement: _get(this.component, 'timePicker.hourStep', 1),
      minuteIncrement: _get(this.component, 'timePicker.minuteStep', 5),
      onChange: () => this.onChange()
    };
  }

  addSuffix(input, inputGroup) {
    let suffix = this.ce('span');
    suffix.setAttribute('class', 'input-group-addon');
    if (this.component.enableDate) {
      let calendar = this.ce('i');
      calendar.setAttribute('class', 'glyphicon glyphicon-calendar');
      suffix.appendChild(calendar);
    }
    else {
      let time = this.ce('i');
      time.setAttribute('class', 'glyphicon glyphicon-time');
      suffix.appendChild(time);
    }
    inputGroup.appendChild(suffix);
    return suffix;
  }

  addInput(input, container, name) {
    super.addInput(input, container, name);
    input.setAttribute('data-input', '');
    input.calendar = new Flatpickr(input, this.config);
  }

  getValueAt(index) {
    let timestamp = this.inputs[index].value;
    if (!timestamp) {
      // Just default to today.
      return (new Date()).toISOString();
    }
    return (new Date(parseInt(timestamp, 10) * 1000)).toISOString();
  }
}
module.exports = DateTimeComponent;
