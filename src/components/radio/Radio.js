import { BaseComponent } from '../base/Base';
import _each from 'lodash/each';
export class RadioComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = '';
    return info;
  }

  createInput(container) {
    let inputGroup = this.ce('inputGroup', 'div', {
      class: 'input-group'
    });
    let inputType = this.component.inputType;
    _each(this.component.values, (value) => {
      var wrapperClass = (this.component.inline ? inputType + '-inline' : inputType);
      let labelWrapper = this.ce('labelWrapper', 'div', {
        class: wrapperClass
      });
      let label = this.ce('label', 'label', {
        class: 'control-label'
      });

      // Create the SPAN around the textNode for better style hooks
      let labelText = this.ce('span', 'span');

      // Determine the attributes for this input.
      let inputId = this.component.key + this.row + '-' + value.value;
      this.info.attr.id = inputId;
      this.info.attr.value = value.value;
      label.setAttribute('for', this.info.attr.id);

      // Create the input.
      let input = this.ce('input', 'input');
      _each(this.info.attr, function(value, key) {
        input.setAttribute(key, value);
      });
      this.addInput(input, label);
      
      labelText.appendChild(this.text(value.label));
      
      labelWrapper.appendChild(label);
      labelWrapper.appendChild(labelText)
      
      inputGroup.appendChild(labelWrapper);
    });
    container.appendChild(inputGroup);
  }

  getValue() {
    let value = '';
    _each(this.inputs, (input) => {
      if (input.checked) {
        value = input.value;
      }
    });
    return value;
  }

  setValueAt(index, value) {
    if (this.inputs && this.inputs[index]) {
      this.inputs[index].checked = (this.inputs[index].value === value);
    }
  }
}
