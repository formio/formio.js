import {BaseComponent} from '../base/Base';
export class ContentComponent extends BaseComponent {
  build() {
    this.element = this.ce('div', {
      class: `form-group ${this.component.customClass}`
    });
    this.element.innerHTML = this.interpolate(this.component.html, {data: this.data});
  }

  get emptyValue() {
    return '';
  }
}
