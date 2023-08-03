import NestedComponent from '../_classes/nested/NestedComponent';

export default class WellComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'well',
      key: 'well',
      input: false,
      persistent: false,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Well',
      icon: 'square-o',
      group: 'layout',
      documentation: '/userguide/form-building/layout-components#well',
      showPreview: false,
      weight: 60,
      schema: WellComponent.schema()
    };
  }

  static savedValueTypes() {
    return [];
  }

  get defaultSchema() {
    return WellComponent.schema();
  }

  get className() {
    return `${this.component.customClass}`;
  }

  get templateName() {
    return 'well';
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }
}
