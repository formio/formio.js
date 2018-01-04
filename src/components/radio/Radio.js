import { BaseComponent } from '../base/Base';
import _each from 'lodash/each';
import _assign from 'lodash/assign';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _toString from 'lodash/toString';
import _find from 'lodash/find';
export class RadioComponent extends BaseComponent {
  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = '';
    return info;
  }

  createInput(container) {
    const inputGroup = this.ce('div', {
      class: 'input-group'
    });
    const inputType = this.component.inputType;
    const labelOnTheTopOrOnTheLeft = this.optionsLabelOnTheTopOrLeft();

    _each(this.component.values, (value) => {
      const wrapperClass = (this.component.inline ? `${inputType}-inline` : inputType);
      const labelWrapper = this.ce('div', {
        class: wrapperClass
      });
      const label = this.ce('label', {
        class: 'control-label'
      });

      this.addShortcut(label, value.shortcut);

      // Create the SPAN around the textNode for better style hooks
      const labelSpan = this.ce('span');

      // Determine the attributes for this input.
      const inputId = `${this.component.key}${this.row}-${value.value}`;
      this.info.attr.id = inputId;
      this.info.attr.value = value.value;
      label.setAttribute('for', this.info.attr.id);

      // Create the input.
      const input = this.ce('input');
      _each(this.info.attr, function(value, key) {
        input.setAttribute(key, value);
      });

      if (labelOnTheTopOrOnTheLeft) {
        label.appendChild(labelSpan);
      }

      this.setInputLabelStyle(label);
      this.setInputStyle(input);

      this.addInput(input, label);

      labelSpan.appendChild(this.text(this.addShortcutToLabel(value.label, value.shortcut)));
      if (!labelOnTheTopOrOnTheLeft) {
        label.appendChild(labelSpan);
      }
      labelWrapper.appendChild(label);

      inputGroup.appendChild(labelWrapper);
    });
    container.appendChild(inputGroup);
    this.errorContainer = container;
  }

  createViewOnlyInput() {
    _each(this.component.values, (value) => {
      const input = super.createViewOnlyInput();
      input.value = value.value;
    });
  }

  optionsLabelOnTheTopOrLeft() {
    return ['top', 'left'].includes(this.component.optionsLabelPosition);
  }

  optionsLabelOnTheTopOrBottom() {
    return ['top', 'bottom'].includes(this.component.optionsLabelPosition);
  }

  setInputLabelStyle(label) {
    if (this.component.optionsLabelPosition === 'left') {
      _assign(label.style, {
        textAlign: 'center',
        paddingLeft: 0,
      });
    }

    if (this.optionsLabelOnTheTopOrBottom()) {
      _assign(label.style, {
        display: 'block',
        textAlign: 'center',
        paddingLeft: 0,
      });
    }
  }

  setInputStyle(input) {
    if (this.component.optionsLabelPosition === 'left') {
      _assign(input.style, {
        position: 'initial',
        marginLeft: '7px'
      });
    }

    if (this.optionsLabelOnTheTopOrBottom()) {
      _assign(input.style, {
        width: '100%',
        position: 'initial',
        marginLeft: 0
      });
    }
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

  get view() {
    const value = this.getValue();

    if (!_isString(value)) {
      return _toString(value);
    }

    const option = _find(this.component.values, (v) => v.value === value);

    return _get(option, 'label');
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

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
  }
}
