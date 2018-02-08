import {FormioComponents} from '../Components';

export class PanelComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
      label: 'Panel',
      type: 'panel',
      key: 'panel',
      title: '',
      theme: 'default',
      breadcrumb: 'default',
      components: [],
      clearOnHide: false,
      input: false,
      tableView: false
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
    this.collapsed = !!this.component.collapsed;
  }

  getContainer() {
    return this.panelBody;
  }

  get className() {
    return 'panel panel-' + this.component.theme + ' ' + super.className;
  }

  setCollapsed() {
    if (this.collapsed) {
      this.panelBody.setAttribute('hidden', true);
      this.panelBody.style.visibility = 'hidden';
    }
    else {
      this.panelBody.removeAttribute('hidden');
      this.panelBody.style.visibility = 'visible';
    }
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.setCollapsed();
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
    if (this.component.title) {
      const heading = this.ce('div', {
        class: 'card-header panel-heading'
      });
      const title = this.ce('h3', {
        class: 'card-title panel-title'
      });
      title.appendChild(this.text(this.component.title));
      this.createTooltip(title);
      heading.appendChild(title);

      if (this.component.collapsible) {
        this.addClass(heading, 'formio-clickable');
        this.addEventListener(heading, 'click', (event) => this.toggleCollapse());
      }

      this.element.appendChild(heading);
    }

    this.panelBody = this.ce('div', {
      class: 'card-body panel-body'
    });
    this.addComponents();
    this.element.appendChild(this.panelBody);
    this.setCollapsed();
  }
}
