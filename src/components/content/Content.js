import BaseComponent from '../base/Base';
class ContentComponent extends BaseComponent {
  build() {
    this.element = this.ce('div');
    this.element.setAttribute('class', 'form-group');
    this.element.innerHTML = this.component.html;
  }
}

module.exports = ContentComponent;
