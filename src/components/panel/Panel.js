import NestedComponent from '../_classes/nested/NestedComponent';

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

  init() {
    this.addComponents();
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

  get panelId() {
    return `panel-${this.id}`;
  }

  render() {
    return this.renderTemplate('panel', {
      bootstrap4Theme: this.bootstrap4Theme,
      children: super.renderComponents()
    });
  }

  hydrate(element) {
    this.loadRefs(element, {[this.panelId]: 'single'});
    super.hydrateComponents(this.refs[this.panelId]);
    // this.setCollapsed();
    // this.createTooltip(title);
    // this.setCollapseHeader(heading);
  }
}
