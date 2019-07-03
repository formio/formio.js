import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';

export default class PasswordComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'password',
      label: 'Password',
      key: 'password',
      protected: true,
      tableView: false
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
    return _.omit(PasswordComponent.schema(), ['protected', 'tableView']);
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'password';
    return info;
  }
}
