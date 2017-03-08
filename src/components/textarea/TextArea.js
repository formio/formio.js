import { TextFieldComponent } from '../textfield/TextField';
export class TextAreaComponent extends TextFieldComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'textarea';
    if (this.component.rows) {
      info.attr.rows = this.component.rows;
    }
    return info;
  }
}
