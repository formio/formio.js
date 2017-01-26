let BaseComponent = require('./Base');
class ContentComponent extends BaseComponent {
  build() {
    this._element = this.ce('div');
    this._element.setAttribute('class', 'form-group');
    this._element.innerHTML = this._component.html;
  }
}

module.exports = ContentComponent;
