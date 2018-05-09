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
      icon: 'fa fa-at',
      documentation: 'http://help.form.io/userguide/#email',
      weight: 10,
      schema: EmailComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('email');
  }

  get defaultSchema() {
    return EmailComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'email';
    return info;
  }
}
