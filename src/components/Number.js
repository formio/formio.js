let BaseComponent = require('./Base');
class NumberComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'number';
    info.changeEvent = 'input';
    if (this._component.validate) {
      if (this._component.validate.min !== '') {
        info.attr.min = this._component.validate.min;
      }
      if (this._component.validate.max !== '') {
        info.attr.max = this._component.validate.max;
      }
      if (this._component.step !== '') {
        info.attr.step = this._component.validate.step;
      }
    }
    return info;
  }

  getValueAt(index) {
    if (this._component.validate && this._component.validate.integer) {
      return parseInt(this._inputs[index].value, 10);
    }
    else {
      return parseFloat(this._inputs[index].value);
    }
  }

  setValueAt(index, value) {
    if (this._component.validate && this._component.validate.integer) {
      this._inputs[index].value = parseInt(value, 10);
    }
    else {
      this._inputs[index].value = parseFloat(value);
    }
  }
}
module.exports = NumberComponent;
