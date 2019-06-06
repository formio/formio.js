import TextFieldComponent from '../textfield/TextField';

export default class PhoneNumberComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'phoneNumber',
      label: 'Phone Number',
      key: 'phoneNumber',
      inputType: 'tel',
      inputMask: '(999) 999-9999'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Phone Number',
      group: 'advanced',
      icon: 'phone-square',
      weight: 30,
      documentation: 'http://help.form.io/userguide/#phonenumber',
      schema: PhoneNumberComponent.schema()
    };
  }

  get defaultSchema() {
    return PhoneNumberComponent.schema();
  }
}
