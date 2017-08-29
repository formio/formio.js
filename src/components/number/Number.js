import { BaseComponent } from '../base/Base';
export class NumberComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators = this.validators.concat(['min', 'max']);
  }

  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'number';
    info.changeEvent = 'input';
    if (this.component.validate) {
      if (this.component.validate.min !== '') {
        info.attr.min = this.component.validate.min;
      }
      if (this.component.validate.max !== '') {
        info.attr.max = this.component.validate.max;
      }
      if (this.component.step !== '') {
        info.attr.step = this.component.validate.step;
      }
    }
    return info;
  }

  getValueAt(index) {
    if (!this.inputs.length || !this.inputs[index]) {
      return null;
    }
    let val = this.inputs[index].value;
    if (!val) {
      return null;
    }

    if (this.component.validate && this.component.validate.integer) {
      return parseInt(val, 10);
    }
    else {
      return parseFloat(val);
    }
  }

  setValueAt(index, value) {
    if (this.component.validate && this.component.validate.integer) {
      this.inputs[index].value = parseInt(value, 10);
    }
    else {
      this.inputs[index].value = parseFloat(value);
    }
  }
}
