import {BaseComponent} from '../base/Base';
export class HiddenComponent extends BaseComponent {
  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  createLabel() {
    return;
  }
}
