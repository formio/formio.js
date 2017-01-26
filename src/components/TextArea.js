let TextFieldComponent = require('./TextField');
class TextAreaComponent extends TextFieldComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'textarea';
    if (this._component.rows) {
      info.attr.rows = this._component.rows;
    }
    return info;
  }
}
module.exports = TextAreaComponent;
