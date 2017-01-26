let BaseComponent = require('./Base');
let _each = require('lodash/each');
class HTMLComponent extends BaseComponent {
  build() {
    this._element = this.ce(this._component.tag);
    if (this._component.className) {
      this._element.setAttribute('class', this._component.className);
    }
    _each(this._component.attrs, (attr) => {
      this._element.setAttribute(attr.attr, attr.value);
    });
    if (this._component.content) {
      this._element.innerHTML = this._component.content;
    }
  }
}
module.exports = HTMLComponent;
