import _ from 'lodash';

import {BaseComponent} from '../base/Base';

export class RadioComponent extends BaseComponent {
  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = 'form-check-input';
    return info;
  }

  createInput(container) {
    const inputGroup = this.ce('div', {
      class: 'input-group'
    });
    const labelOnTheTopOrOnTheLeft = this.optionsLabelOnTheTopOrLeft();
    const wrappers = [];

    if (this.component.inputType === 'radio') {
      this.info.attr.name += this.id;
    }

    _.each(this.component.values, (value) => {
      const wrapperClass = `form-check ${this.optionWrapperClass}`;
      const labelWrapper = this.ce('div', {
        class: wrapperClass
      });
      const label = this.ce('label', {
        class: 'control-label form-check-label'
      });

      this.addShortcut(label, value.shortcut);

      // Create the SPAN around the textNode for better style hooks
      const labelSpan = this.ce('span');

      // Determine the attributes for this input.
      const inputId = `${this.id}${this.row}-${value.value}`;
      this.info.attr.id = inputId;
      this.info.attr.value = value.value;
      label.setAttribute('for', this.info.attr.id);

      // Create the input.
      const input = this.ce('input');
      _.each(this.info.attr, (value, key) => {
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
      wrappers.push(labelWrapper);
    });
    this.wrappers = wrappers;
    container.appendChild(inputGroup);
    this.errorContainer = container;
  }

  get optionWrapperClass() {
    const inputType = this.component.inputType;
    const wrapperClass = (this.component.inline ? `form-check-inline ${inputType}-inline` : inputType);
    return wrapperClass;
  }

  optionsLabelOnTheTopOrLeft() {
    return ['top', 'left'].includes(this.component.optionsLabelPosition);
  }

  optionsLabelOnTheTopOrBottom() {
    return ['top', 'bottom'].includes(this.component.optionsLabelPosition);
  }

  setInputLabelStyle(label) {
    if (this.component.optionsLabelPosition === 'left') {
      _.assign(label.style, {
        textAlign: 'center',
        paddingLeft: 0,
      });
    }

    if (this.optionsLabelOnTheTopOrBottom()) {
      _.assign(label.style, {
        display: 'block',
        textAlign: 'center',
        paddingLeft: 0,
      });
    }
  }

  setInputStyle(input) {
    if (this.component.optionsLabelPosition === 'left') {
      _.assign(input.style, {
        position: 'initial',
        marginLeft: '7px'
      });
    }

    if (this.optionsLabelOnTheTopOrBottom()) {
      _.assign(input.style, {
        width: '100%',
        position: 'initial',
        marginLeft: 0
      });
    }
  }

  getValue() {
    if (this.viewOnly) {
      return this.dataValue;
    }
    let value = '';
    _.each(this.inputs, (input) => {
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

  getView(value) {
    if (!value) {
      return '';
    }
    if (!_.isString(value)) {
      return _.toString(value);
    }

    const option = _.find(this.component.values, (v) => v.value === value);

    return _.get(option, 'label');
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

  updateValue(value, flags) {
    const changed = super.updateValue(value, flags);
    if (changed) {
      //add/remove selected option class
      const value = this.dataValue;
      const optionSelectedClass = 'radio-selected';

      _.each(this.wrappers, (wrapper, index) => {
        const input = this.inputs[index];
        if (input.value === value) {
          //add class to container when selected
          this.addClass(wrapper, optionSelectedClass);
        }
        else {
          this.removeClass(wrapper, optionSelectedClass);
        }
      });
    }
    return changed;
  }

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
  }
}
