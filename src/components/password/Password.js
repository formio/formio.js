import { TextFieldComponent } from '../textfield/TextField';
export class PasswordComponent extends TextFieldComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.attr.type = 'password';
    return info;
  }
}
