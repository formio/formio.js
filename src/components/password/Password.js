import TextFieldComponent from '../textfield/TextField';

export default class PasswordComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'password',
      label: 'Password',
      key: 'password'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Password',
      icon: 'fa fa-asterisk',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#password',
      weight: 20,
      schema: PasswordComponent.schema()
    };
  }

  get defaultSchema() {
    return PasswordComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'password';
    return info;
  }
}
