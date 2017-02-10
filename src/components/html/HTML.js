import BaseComponent from '../base/Base';
import _each from 'lodash/each';
class HTMLComponent extends BaseComponent {
  build() {
    this.element = this.ce('element', this.component.tag, {
      class: this.component.className
    });
    _each(this.component.attrs, (attr) => {
      this.element.setAttribute(attr.attr, attr.value);
    });
    if (this.component.content) {
      this.element.innerHTML = this.component.content;
    }
  }
}
module.exports = HTMLComponent;
