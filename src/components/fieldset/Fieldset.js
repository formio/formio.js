import NestedComponent from '../NestedComponent';

export default class FieldsetComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Field Set',
      key: 'fieldSet',
      type: 'fieldset',
      legend: '',
      components: [],
      input: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Field Set',
      icon: 'fa fa-th-large',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#fieldset',
      weight: 20,
      schema: FieldsetComponent.schema()
    };
  }

  get defaultSchema() {
    return FieldsetComponent.schema();
  }

  getContainer() {
    return this.body;
  }

  get className() {
    return `form-group ${super.className}`;
  }

  build() {
    this.element = this.ce('fieldset', {
      id: this.id,
      class: this.className
    });
    if (this.component.legend) {
      const legend = this.ce('legend');
      legend.appendChild(this.text(this.component.legend));
      this.createTooltip(legend);
      this.setCollapseHeader(legend);
      this.element.appendChild(legend);
    }
    this.body = this.ce('div', {
      class: 'card-body'
    });
    this.addComponents();
    this.element.appendChild(this.body);
    this.setCollapsed();
  }
}
