import _ from 'lodash';

import {BaseComponent} from '../base/Base';

export class HTMLComponent extends BaseComponent {
  setHTML() {
    this.element.innerHTML = this.interpolate(this.component.content, {data: this.data, row: this.row});
  }

  build() {
    this.element = this.ce(this.component.tag, {
      class: this.component.className
    });
    _.each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.element.setAttribute(attr.attr, attr.value);
      }
    });
    if (this.component.content) {
      this.setHTML();
    }

    if (this.component.refreshOnChange) {
      this.on('change', () => this.setHTML());
    }
  }
}
