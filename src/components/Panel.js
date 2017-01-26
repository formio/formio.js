let FormioComponents = require('./Components');
class PanelComponent extends FormioComponents {
  build() {
    this.element = this.ce('div');
    this.element.setAttribute('class', 'panel panel-' + this.component.theme);
    if (this.component.title) {
      let heading = this.ce('div');
      heading.setAttribute('class', 'panel-heading');
      let title = this.ce('h3');
      title.setAttribute('class', 'panel-title');
      title.appendChild(this.text(this.component.title));
      heading.appendChild(title);
      this.element.appendChild(heading);
    }
    let body = this.ce('div');
    body.setAttribute('class', 'panel-body');
    this.addComponents(body);
    this.element.appendChild(body);
  }
}
module.exports = PanelComponent;
