import NestedComponent from '../NestedComponent';

export default class WellComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'well',
      key: 'well',
      input: false,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Well',
      icon: 'fa fa-square-o',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#well',
      weight: 60,
      schema: WellComponent.schema()
    };
  }

  get defaultSchema() {
    return WellComponent.schema();
  }

  get className() {
    return `card card-body bg-faded well formio-component formio-component-well ${this.component.customClass}`;
  }
}
