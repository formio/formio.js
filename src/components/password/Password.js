import TextFieldComponent from '../textfield/TextField';
class PasswordComponent extends TextFieldComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.attr.type = 'password';
    return info;
  }
}
module.exports = PasswordComponent;
