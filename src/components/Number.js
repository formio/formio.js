let BaseComponent = require('./Base');
class NumberComponent extends BaseComponent {
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
    if (this.component.validate && this.component.validate.integer) {
      return parseInt(this.inputs[index].value, 10);
    }
    else {
      return parseFloat(this.inputs[index].value);
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
module.exports = NumberComponent;
