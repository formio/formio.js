import { FormioComponents } from '../Components';
export class FieldsetComponent extends FormioComponents {
  build() {
    this.element = this.ce('element', 'fieldset', {
      id: this.id,
      class: this.className + ' form-group'
    });
    if (this.component.legend) {
      let legend = this.ce('legend', 'legend');
      legend.appendChild(this.text(this.component.legend));
      this.element.appendChild(legend);
    }
    this.addComponents(this.element);
  }
}
