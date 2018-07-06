import {FormioComponents} from '../Components';
export class FieldsetComponent extends FormioComponents {
  build() {
    this.element = this.ce('fieldset', {
      id: this.id,
      class: `${this.className} form-group ${this.component.customClass}`
    });
    if (this.component.legend) {
      const legend = this.ce('legend');
      legend.appendChild(this.text(this.component.legend));
      this.createTooltip(legend);
      this.element.appendChild(legend);
    }
    this.addComponents(this.element);
  }
}
