let FormioComponents = require('./Components');
class PanelComponent extends FormioComponents {
  build() {
    this._element = this.ce('div');
    this._element.setAttribute('class', 'panel panel-' + this._component.theme);
    if (this._component.title) {
      let heading = this.ce('div');
      heading.setAttribute('class', 'panel-heading');
      let title = this.ce('h3');
      title.setAttribute('class', 'panel-title');
      title.appendChild(this.text(this._component.title));
      heading.appendChild(title);
      this._element.appendChild(heading);
    }
    let body = this.ce('div');
    body.setAttribute('class', 'panel-body');
    this.addComponents(body);
    this._element.appendChild(body);
  }
}
module.exports = PanelComponent;
