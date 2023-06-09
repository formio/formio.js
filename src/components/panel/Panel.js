import NestedComponent from '../_classes/nested/NestedComponent';
import FormComponent from '../form/Form';

export default class PanelComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: '',
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
      documentation: '/userguide/#panels',
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

  constructor(...args) {
    super(...args);
    this.noField = true;
    this.on('change',()=>{
      if (this.options.flatten && this.collapsed) {
        this.collapsed = false;
      }
    });
    this.on('componentError', () => {

      //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
    });
  }

  getComponent(path, fn, originalPath) {
    if (this.root?.parent instanceof FormComponent) {
      path = path.replace(this._parentPath, '');
    }
    return super.getComponent(path, fn, originalPath);
  }
}
