import RadioComponent from '../radio/Radio';
import _each from 'lodash/each';
class SelectBoxesComponent extends RadioComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.component.inputType = 'checkbox';
  }
  elementInfo() {
    let info = super.elementInfo();
    info.attr.name += '[]';
    info.attr.type = 'checkbox';
    return info;
  }
  getValue() {
    let value = [];
    _each(this.inputs, (input) => {
      if (input.checked) {
        value.push(input.value);
      }
    });
    return value;
  }
  set value(value) {
    _each(this.inputs, (input) => {
      input.checked = (value.indexOf(input.value) !== -1);
    });
  }
}
module.exports = SelectBoxesComponent;
