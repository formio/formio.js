import FormioComponents from '../Components';
class PanelComponent extends FormioComponents {
  build() {
    this.element = this.ce('element', 'div', {
      class: 'panel panel-' + this.component.theme
    });
    if (this.component.title) {
      let heading = this.ce('heading', 'div', {
        class: 'panel-heading'
      });
      let title = this.ce('title', 'h3', {
        class: 'panel-title'
      });
      title.appendChild(this.text(this.component.title));
      heading.appendChild(title);
      this.element.appendChild(heading);
    }
    let body = this.ce('body', 'div', {
      class: 'panel-body'
    });
    this.addComponents(body);
    this.element.appendChild(body);
  }
}
module.exports = PanelComponent;
