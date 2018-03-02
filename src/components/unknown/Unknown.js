import {BaseComponent} from '../base/Base';
export class UnknownComponent extends BaseComponent {
  build() {
    this.element = this.ce('div', {
      id: this.id
    });
    this.element.appendChild(this.text(`Unknown component: ${this.component.type}`));
    return this.element;
  }
}
