import {FormioComponents} from '../Components';

export class WellComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
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
