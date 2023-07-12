import NestedComponent from '../_classes/nested/NestedComponent';
import { hasInvalidComponent } from '../../utils/utils';
import FormComponent from '../form/Form';

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
    this.on('componentError', () => {
      //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
      if (hasInvalidComponent(this) && this.collapsed) {
        this.collapsed = false;
      }
    });
  }

  getComponent(path, fn, originalPath) {
    if (this.root?.parent instanceof FormComponent) {
      path = path.replace(this._parentPath, '');
    }
    return super.getComponent(path, fn, originalPath);
  }
}
