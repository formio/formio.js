import {TextFieldComponent} from '../textfield/TextField';
export class EmailComponent extends TextFieldComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('email');
  }
  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = 'email';
    return info;
  }
}
