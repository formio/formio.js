import TextFieldComponent from '../textfield/TextField';
class EmailComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('email');
  }
}
module.exports = EmailComponent;
