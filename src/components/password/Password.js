import {TextFieldComponent} from '../textfield/TextField';
export class PasswordComponent extends TextFieldComponent {
  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'password';
    return info;
  }
}
