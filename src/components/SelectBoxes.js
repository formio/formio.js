let RadioComponent = require('./Radio');
let _each = require('lodash/each');
class SelectBoxesComponent extends RadioComponent {
  constructor(component, events, data) {
    super(component, events, data);
    this.component.inputType = 'checkbox';
  }
  elementInfo() {
    let info = super.elementInfo();
    info.attr.name += '[]';
    info.attr.type = 'checkbox';
    return info;
  }
  get value() {
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
