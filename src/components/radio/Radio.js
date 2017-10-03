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
    let inputGroup = this.ce('div', {
      class: 'input-group'
    });
    let inputType = this.component.inputType;
    _each(this.component.values, (value) => {
      var wrapperClass = (this.component.inline ? inputType + '-inline' : inputType);
      let labelWrapper = this.ce('div', {
        class: wrapperClass
      });
      let label = this.ce('label', {
        class: 'control-label'
      });

      // Create the SPAN around the textNode for better style hooks
      let labelSpan = this.ce('span');

      // Determine the attributes for this input.
      let inputId = this.component.key + this.row + '-' + value.value;
      this.info.attr.id = inputId;
      this.info.attr.value = value.value;
      label.setAttribute('for', this.info.attr.id);

      // Create the input.
      let input = this.ce('input');
      _each(this.info.attr, function(value, key) {
        input.setAttribute(key, value);
      });
      this.addInput(input, label);

      labelSpan.appendChild(this.text(value.label));
      label.appendChild(labelSpan);
      labelWrapper.appendChild(label);

      inputGroup.appendChild(labelWrapper);
    });
    container.appendChild(inputGroup);
    this.errorContainer = container;
  }

  getValue() {
    let value = '';
    _each(this.inputs, (input) => {
      if (input.checked) {
        value = input.value;
        if (value === 'true') {
          value = true;
        }
        else if (value === 'false') {
          value = false;
        }
        else if (!isNaN(parseInt(value, 10)) && isFinite(value)) {
          value = parseInt(value, 10);
        }
      }
    });
    return value;
  }

  setValueAt(index, value) {
    if (this.inputs && this.inputs[index]) {
      let inputValue = this.inputs[index].value;
      if (inputValue === 'true') {
        inputValue = true;
      }
      else if (inputValue === 'false') {
        inputValue = false;
      }
      else if (!isNaN(parseInt(inputValue, 10)) && isFinite(inputValue)) {
        inputValue = parseInt(inputValue, 10);
      }

      this.inputs[index].checked = (inputValue === value);
    }
  }
}
