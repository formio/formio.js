import TextFieldComponent from '../textfield/TextField';
class EmailComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('email');
  }
  elementInfo() {
    let info = super.elementInfo();
    info.attr.type = 'email';
    return info;
  }
}
module.exports = EmailComponent;
