import TextFieldComponent from '../textfield/TextField';

export default class EmailComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'email',
      label: 'Email',
      key: 'email',
      inputType: 'email',
      kickbox: {
        enabled: false
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Email',
      group: 'advanced',
      icon: 'at',
      documentation: '/userguide/form-building/advanced-components#email',
      weight: 10,
      schema: EmailComponent.schema()
    };
  }

  init() {
    super.init();
    this.validators.push('email');
  }

  get defaultSchema() {
    return EmailComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.type = this.component.mask ? 'password' : 'email';
    return info;
  }

  normalizeValue(value, flags = {}) {
    value = super.normalizeValue(value, flags);
    if (this.options.server && !!value) {
      if (Array.isArray(value)) {
        value = value.map(val => val.toLowerCase());
      }
      else {
        value = value.toLowerCase();
      }
    }
    return value;
  }
}
