import TextFieldComponent from '../textfield/TextField';
import _ from 'lodash';

export default class PhoneNumberComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'phoneNumber',
      label: 'Phone Number',
      key: 'phoneNumber',
      inputType: 'tel',
      inputMask: '(999) 999-9999',
      inputMode: 'decimal',
      displayMask: '',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Phone Number',
      group: 'advanced',
      icon: 'phone-square',
      weight: 30,
      documentation: '/userguide/form-building/advanced-components#phone-number',
      schema: PhoneNumberComponent.schema()
    };
  }

  get defaultSchema() {
    return PhoneNumberComponent.schema();
  }

  getValueAsString(value, options) {
    if (options?.email && this.visible && !this.skipInEmail && _.isObject(value)) {
      const result = (`
        <table border="1" style="width:100%">
          <tbody>
          <tr>
            <th style="padding: 5px 10px;">${value.maskName}</th>
            <td style="width:100%;padding:5px 10px;">${value.value}</td>
          </tr>
          </tbody>
        </table>
      `);

      return result;
    }

    return super.getValueAsString(value, options);
  }
}
