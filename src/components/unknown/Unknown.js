import Component from '../_classes/component/Component';

export default class UnknownComponent extends Component {
  build() {
    this.createElement();
    this.element.appendChild(this.text(`Unknown component: ${this.component.type}`));
    return this.element;
  }
}
