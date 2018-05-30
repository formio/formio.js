import _ from 'lodash';
import Field from '../_classes/field/Field';

export default class RadioComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'radio',
      inputType: 'radio',
      label: 'Radio',
      key: 'radio',
      values: [{label: '', value: ''}],
      fieldSet: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Radio',
      group: 'basic',
      icon: 'fa fa-dot-circle-o',
      weight: 80,
      documentation: 'http://help.form.io/userguide/#radio',
      schema: RadioComponent.schema()
    };
  }

  get defaultSchema() {
    return RadioComponent.schema();
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.class = 'form-check-input';
    return info;
  }

  render(value, index) {
    return super.render(this.renderTemplate('radio', {
      component: this.component,
      input: this.inputInfo,
      inline: this.component.inline,
      values: this.component.values,
      value,
      id: this.id,
      row: this.row,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {input: 'multiple', wrapper: 'multiple'});
    this.refs.input.forEach(input => {
      this.addEventListener(input, this.inputInfo.changeEvent, () => this.updateValue());
    });
    // this.addShortcut(label, value.shortcut);
    super.hydrate(element);
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
    if (!this.refs.input) {
      return value;
    }
    this.refs.input.forEach((input) => {
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
    if (this.refs.input && this.refs.input[index]) {
      let inputValue = this.refs.input[index].value;
      if (inputValue === 'true') {
        inputValue = true;
      }
      else if (inputValue === 'false') {
        inputValue = false;
      }
      else if (!isNaN(parseInt(inputValue, 10)) && isFinite(inputValue)) {
        inputValue = parseInt(inputValue, 10);
      }

      this.refs.input[index].checked = (inputValue === value);
    }
  }

  updateValue(flags, value) {
    const changed = super.updateValue(flags, value);
    if (changed && this.refs.wrapper) {
      //add/remove selected option class
      const value = this.dataValue;
      const optionSelectedClass = 'radio-selected';

      this.refs.wrapper.forEach((wrapper, index) => {
        const input = this.refs.input[index];
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
