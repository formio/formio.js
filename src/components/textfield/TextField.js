import { BaseComponent } from '../base/Base';
export class TextFieldComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    return info;
  }
}
