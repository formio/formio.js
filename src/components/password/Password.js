import TextFieldComponent from '../textfield/TextField';

export default class PasswordComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'password',
      label: 'Password',
      key: 'password',
      protected: true,
      tableView: false,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Password',
      icon: 'asterisk',
      group: 'basic',
      documentation: 'http://help.form.io/userguide/#password',
      weight: 40,
      schema: PasswordComponent.schema()
    };
  }

  get defaultSchema() {
    return PasswordComponent.schema();
  }

  get inputInfo() {
    const info = super.inputInfo;
    info.attr.type = 'password';
    return info;
  }
}
