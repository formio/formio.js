import BaseComponent from '../base/Base';
class ButtonComponent extends BaseComponent {
  elementInfo() {
    let info = super.elementInfo();
    info.type = 'button';
    info.attr.type = this.component.action;
    info.attr.class = 'btn btn-' + this.component.theme;
    if (this.component.block) {
      info.attr.class += ' btn-block';
    }
    return info;
  }

  build() {
    this.element = this.ce('element', this.info.type, this.info.attr);
    if (this.component.label) {
      this.label = this.text(this.component.label);
      this.element.appendChild(this.label);
    }
  }
}

module.exports = ButtonComponent;
