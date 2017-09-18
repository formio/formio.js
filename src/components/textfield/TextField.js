import { BaseComponent } from '../base/Base';
export class TextFieldComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';

    if (this.component.mask) {
      info.attr.type = 'password';
    }
    else {
      info.attr.type = 'text';
    }
    info.changeEvent = 'input';
    return info;
  }
}
