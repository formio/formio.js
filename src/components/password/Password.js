import _ from 'lodash';

import { superGet } from '../../utils/utils';

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
    return _.omit(PasswordComponent.schema(), ['protected', 'tableView']);
  }

  get inputInfo() {
    const info = superGet(TextFieldComponent, 'inputInfo', this);
    info.attr.type = 'password';
    return info;
  }
}
