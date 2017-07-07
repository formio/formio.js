import { BaseComponent } from '../base/Base';
import _each from 'lodash/each';
export class HTMLComponent extends BaseComponent {
  build() {
    this.element = this.ce(this.component.tag, {
      class: this.component.className
    });
    _each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.element.setAttribute(attr.attr, attr.value);
      }
    });
    if (this.component.content) {
      this.element.innerHTML = this.component.content;
    }
  }
}
