import { BaseComponent } from '../base/Base';
import _each from 'lodash/each';
export class HTMLComponent extends BaseComponent {
  setHTML() {
    this.element.innerHTML = this.interpolate(this.component.content, {data: this.data, row: this.row});
  }

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
      this.setHTML();
    }

    if (this.component.refreshOnChange) {
      this.on('componentChange', () => this.setHTML());
    }
  }
}
