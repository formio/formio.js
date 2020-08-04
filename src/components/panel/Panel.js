import NestedComponent from '../_classes/nested/NestedComponent';

export default class PanelComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Panel',
      type: 'panel',
      key: 'panel',
      title: 'Panel',
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
      icon: 'list-alt',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#panels',
      weight: 30,
      schema: PanelComponent.schema()
    };
  }

  get defaultSchema() {
    return PanelComponent.schema();
  }

  checkValidity(data, dirty, row, silentCheck) {
    if (!this.checkCondition(row, data)) {
      this.setCustomValidity('');
      return true;
    }

    return this.getComponents().reduce(
      (check, comp) => {
        return comp.checkValidity(data, dirty, row, silentCheck) && check;
      },
      super.checkValidity(data, dirty, row, silentCheck)
    );
  }

  get templateName() {
    return 'panel';
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
    this.on('componentError', () => {
      //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
      if (this.hasInvalidComponent() && this.collapsed) {
        this.collapsed = false;
      }
    });
  }

  hasInvalidComponent() {
    return this.getComponents().some((comp) => {
      return comp.error;
    });
  }
}
