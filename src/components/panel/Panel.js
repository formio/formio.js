import NestedComponent from '../_classes/nested/NestedComponent';
import { isChildOf } from '../../utils';

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
      documentation: '/userguide/form-building/layout-components#panel',
      showPreview: false,
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

  static savedValueTypes() {
    return [];
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
    this.on('componentError', (err) => {
      //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
      if (isChildOf(err.instance, this) && this.collapsed) {
        this.collapsed = false;
      }
    });
  }
}
