import _ from 'lodash';
import Component from '../_classes/component/Component';

export default class CheckBoxComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'checkbox',
      inputType: 'checkbox',
      label: 'Checkbox',
      key: 'checkbox',
      datagridLabel: true,
      labelPosition: 'right',
      value: '',
      name: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Checkbox',
      group: 'basic',
      icon: 'fa fa-check-square',
      documentation: 'http://help.form.io/userguide/#checkbox',
      weight: 50,
      schema: CheckBoxComponent.schema()
    };
  }

  get defaultSchema() {
    return CheckBoxComponent.schema();
  }

  get className() {
    let className = super.className;
    if (this.component.input
      && !this.options.inputsOnly
      && this.component.validate
      && this.component.validate.required) {
      className += ' field-required';
    }
    return `${className} checkbox`;
  }

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.changeEvent = 'click';
    info.attr.type = this.component.inputType || 'checkbox';
    info.attr.class = 'form-check-input';
    if (this.component.name) {
      info.attr.name = `data[${this.component.name}]`;
    }
    info.attr.value = this.component.value ? this.component.value : 0;
    info.label = this.t(this.component.label);
    info.labelClass = this.className;
    return info;
  }

  render() {
    return super.render(this.renderTemplate('checkbox', {
      component: this.component,
      input: this.inputInfo,
      checked: this.dataValue,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {input: 'multiple'});
    this.input = this.refs.input[0];
    this.addEventListener(this.input, this.inputInfo.changeEvent, () => this.updateValue());
    //   this.autofocus();
    //   this.addShortcut();
    //   if (this.shouldDisable) {
    //     this.disabled = true;
    //   }
    super.hydrate(element);
  }
    // build() {
  //   if (this.viewOnly) {
  //     return this.viewOnlyBuild();
  //   }
  // }

  get emptyValue() {
    return false;
  }

  // labelOnTheTopOrLeft() {
  //   return ['top', 'left'].includes(this.component.labelPosition);
  // }
  //
  // labelOnTheTopOrBottom() {
  //   return ['top', 'bottom'].includes(this.component.labelPosition);
  // }
  //
  // setInputLabelStyle(label) {
  //   if (this.component.labelPosition === 'left') {
  //     _.assign(label.style, {
  //       textAlign: 'center',
  //       paddingLeft: 0,
  //     });
  //   }
  //
  //   if (this.labelOnTheTopOrBottom()) {
  //     _.assign(label.style, {
  //       display: 'block',
  //       textAlign: 'center',
  //       paddingLeft: 0,
  //     });
  //   }
  // }
  //
  // setInputStyle(input) {
  //   if (this.component.labelPosition === 'left') {
  //     _.assign(input.style, {
  //       position: 'initial',
  //       marginLeft: '7px'
  //     });
  //   }
  //
  //   if (this.labelOnTheTopOrBottom()) {
  //     _.assign(input.style, {
  //       width: '100%',
  //       position: 'initial',
  //       marginLeft: 0
  //     });
  //   }
  // }

  isEmpty(value) {
    return super.isEmpty(value) || value === false;
  }

  getValueAt(index) {
    return !!this.refs.input[index].checked;
  }

  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!this.input) {
      return;
    }
    if (value === 'on') {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else if (value === 'off') {
      this.input.value = 0;
      this.input.checked = 0;
    }
    else if (value) {
      this.input.value = 1;
      this.input.checked = 1;
    }
    else {
      this.input.value = 0;
      this.input.checked = 0;
    }
    return this.updateValue(flags);
  }

  get dataValue() {
    if (this.component.name) {
      return _.get(this.data, this.component.name, this.emptyValue) === this.component.value;
    }

    return super.dataValue;
  }

  set dataValue(value) {
    if (this.component.name) {
      if (value) {
        _.set(this.data, this.component.name, this.component.value);
      }
      return value;
    }

    super.dataValue = value;
    return value;
  }

  getView(value) {
    return value ? 'Yes' : 'No';
  }

  destroy() {
    super.destroy.apply(this, Array.prototype.slice.apply(arguments));
    this.removeShortcut();
  }
}
