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
    let tempValue = [];

    _each(this.inputs, (input) => {
      if (_isArray(value))
        input.checked = (value.indexOf(input.value) !== -1);
      else {
        input.checked = value[input.value] == undefined ? false : value[input.value];
        tempValue.push(input.value);
      }
    });

    value = _isArray(value) ? value : tempValue;

    if (!noUpdate) {
      this.updateValue(noValidate);
    }
    
  }
}
