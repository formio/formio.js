let BaseComponent = require('./Base');
class TextFieldComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'text';
    info.changeEvent = 'input';
    return info;
  }
}
module.exports = TextFieldComponent;
