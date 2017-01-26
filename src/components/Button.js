let BaseComponent = require('./Base');
class ButtonComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'button';
    info.attr.type = this._component.action;
    info.attr.class = 'btn btn-' + this._component.theme;
    if (this._component.block) {
      info.attr.class += ' btn-block';
    }
    return info;
  }

  build() {
    this._element = this.ce(this._info.type, this._info.attr);
    if (this._component.label) {
      this._label = this.text(this._component.label);
      this._element.appendChild(this._label);
    }
  }
}

module.exports = ButtonComponent;
