import BaseComponent from '../base/Base';

export default class UnknownComponent extends BaseComponent {
  build() {
    this.createElement();
    this.element.appendChild(this.text(`Unknown component: ${this.component.type}`));
    return this.element;
  }
}
