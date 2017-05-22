import { RadioComponent } from '../radio/Radio';
import _each from 'lodash/each';
import _isArray from 'lodash/isArray';
export class SelectBoxesComponent extends RadioComponent {
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


  /**
   * Set the value of this component.
   * @param value
   */
  setValue(value, noUpdate, noValidate) {
    this.value = value;
    value = _isArray(value) ? value : [value];
    _each(this.inputs, (input) => {
      input.checked = (value.indexOf(input.value) !== -1);
    });
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }
}
