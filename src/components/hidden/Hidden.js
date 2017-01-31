import BaseComponent from '../base/Base';
class HiddenComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }
}
module.exports = HiddenComponent;
