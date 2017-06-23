import { BaseComponent } from '../base/Base';
import Flatpickr from 'flatpickr';
import _get from 'lodash/get';
import _each from 'lodash/each';
const momentModule = require('moment');
export class DateTimeComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('date');
  }

  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    this.component.suffix = true;
    return info;
  }

  build() {
    super.build();

    // See if a default date is set.
    if (this.component.defaultDate) {
      var defaultDate = new Date(this.component.defaultDate);
      if (!defaultDate || isNaN(defaultDate.getDate())) {
        try {
          let moment = momentModule;
          defaultDate = new Date(eval(this.component.defaultDate));
        }
        catch (e) {
          defaultDate = '';
        }
      }

      if (defaultDate && !isNaN(defaultDate.getDate())) {
        this.setValue(defaultDate);
      }
    }
  }

  // This select component can handle multiple items on its own.
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

  set disabled(disabled) {
    super.disabled = disabled;
    _each(this.inputs, (input) => {
      if (input.calendar) {
        input.calendar.redraw();
      }
    });
  }

  addSuffix(input, inputGroup) {
    let suffix = this.ce('suffix', 'span', {
      class: 'input-group-addon'
    });
    suffix.appendChild(this.getIcon(this.component.enableDate ? 'calendar' : 'time'));
    inputGroup.appendChild(suffix);
    return suffix;
  }

  addInput(input, container, name) {
    super.addInput(input, container, name);
    input.calendar = new Flatpickr(input, this.config);
  }

  getDate(value) {
    let timestamp = parseInt(value, 10);
    if (!timestamp) {
      // Just default to today.
      return (new Date());
    }
    return (new Date(timestamp * 1000));
  }

  getRawValue() {
    let values = [];
    for (let i in this.inputs) {
      if (!this.component.multiple) {
        return this.getDate(this.inputs[i].value);
      }
      values.push(this.getDate(this.inputs[i].value));
    }
    return values;
  }

  getValueAt(index) {
    return this.getDate(this.inputs[index].value).toISOString();
  }

  setValueAt(index, value) {
    if (this.inputs[index].calendar) {
      let date = value ? new Date(value) : new Date();
      this.inputs[index].calendar.setDate(date);
    }
  }
}
