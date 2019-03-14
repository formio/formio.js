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
      dataGridLabel: false,
      persistent: false,
      lazyLoad: false
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
    this.lazyLoaded = false;
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

  getCollapseIcon() {
    const collapseIcon = this.getIcon(this.collapsed ? 'plus' : 'minus');
    this.addClass(collapseIcon, 'formio-collapse-icon');
    return collapseIcon;
  }

  setCollapsed(element) {
    super.setCollapsed(element);
    if (this.collapseIcon) {
      const newIcon = this.getCollapseIcon();
      this.panelTitle.replaceChild(newIcon, this.collapseIcon);
      this.collapseIcon = newIcon;
    }
  }

  /**
   * Return if this panel is lazy loadable.
   * @return {boolean}
   */
  get lazyLoadable() {
    return !this.options.builder &&
      this.component.lazyLoad &&
      this.component.collapsible &&
      this.collapsed &&
      !this.lazyLoaded;
  }

  checkValidity(data, dirty) {
    // Make sure to toggle the collapsed state before checking validity.
    if (dirty && this.lazyLoadable) {
      this.lazyLoaded = true;
      this.addComponents();
    }

    return super.checkValidity(data, dirty);
  }

  addComponents(element, data, options, state) {
    // If they are lazy loading, then only add the components if they toggle the collapsed state.
    if (this.lazyLoadable) {
      return;
    }
    return super.addComponents(element, data, options, state);
  }

  toggleCollapse() {
    if (this.lazyLoadable) {
      this.lazyLoaded = true;
      this.addComponents();
    }
    super.toggleCollapse();
  }

  build(state) {
    this.component.theme = this.component.theme || 'default';
    let panelClass = 'mb-2 card border ';
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
        class: `card-header bg-${this.component.theme} panel-heading`
      });
      this.panelTitle = this.ce('h4', {
        class: 'mb-0 card-title panel-title'
      });
      if (this.component.collapsible) {
        this.collapseIcon = this.getCollapseIcon();
        this.panelTitle.appendChild(this.collapseIcon);
        this.panelTitle.appendChild(this.text(' '));
      }

      this.panelTitle.appendChild(this.text(this.component.title));
      this.createTooltip(this.panelTitle);
      heading.appendChild(this.panelTitle);
      this.setCollapseHeader(heading);
      this.element.appendChild(heading);
    }
    else {
      this.createTooltip(this.panelBody, this.component, `${this.iconClass('question-sign')} text-muted formio-hide-label-panel-tooltip`);
    }

    this.addComponents(null, null, null, state);
    this.element.appendChild(this.panelBody);
    this.setCollapsed();
    this.attachLogic();
  }
}
