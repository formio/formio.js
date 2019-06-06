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
      documentation: 'http://help.form.io/userguide/#email',
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
}
