import NestedComponent from '../_classes/nested/NestedComponent';
import _ from 'lodash';

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

  get templateName() {
    return 'panel';
  }

  checkValidity(data, dirty, row) {
    data = data || this.rootValue;
    row = row || this.data;
    return this.checkComponentValidity(data, dirty, row);
  }

  everyComponent(fn, hasChildren) {
    const components = this.getComponents();

    this.collapsed = !hasChildren;

    _.each(components, (component, index) => {
      if (fn(component, components, index) === false) {
        return false;
      }

      if (typeof component.everyComponent === 'function') {
        const isPanel = component.component.type === 'panel';
        if (component.everyComponent(fn, isPanel) === false) {
          return false;
        }
      }
    });
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }
}
