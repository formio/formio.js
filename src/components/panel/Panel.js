import NestedComponent from '../nested/NestedComponent';

export default class PanelComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Panel',
      type: 'panel',
      key: 'panel',
      title: '',
      theme: 'default',
      breadcrumb: 'default',
      components: [],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Panel',
      icon: 'fa fa-list-alt',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#panels',
      weight: 30,
      schema: PanelComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
  }

  get defaultSchema() {
    return PanelComponent.schema();
  }

  getContainer() {
    return this.panelBody;
  }

  get className() {
    return `panel panel-${this.component.theme} ${super.className}`;
  }

  build() {
    this.component.theme = this.component.theme || 'default';
    let panelClass = `card border-${this.bootstrap4Theme(this.component.theme)} `;
    panelClass += `panel panel-${this.component.theme} `;
    panelClass += this.component.customClass;
    this.element = this.ce('div', {
      id: this.id,
      class: panelClass
    });
    this.element.component = this;
    this.panelBody = this.ce('div', {
      class: 'card-body panel-body'
    });
    if (this.component.title && !this.component.hideLabel) {
      const heading = this.ce('div', {
        class: 'card-header panel-heading'
      });
      const title = this.ce('h4', {
        class: 'mb-0 card-title panel-title'
      });
      title.appendChild(this.text(this.component.title));
      this.createTooltip(title);
      heading.appendChild(title);
      this.setCollapseHeader(heading);
      this.element.appendChild(heading);
    }
    else {
      this.createTooltip(this.panelBody, this.component, `${this.iconClass('question-sign')} text-muted formio-hide-label-panel-tooltip`);
    }

    this.addComponents();
    this.element.appendChild(this.panelBody);
    this.setCollapsed();
  }
}
