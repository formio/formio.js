import SelectComponent from '../select/Select';

export default class ResourceComponent extends SelectComponent {
  static schema(...extend) {
    return SelectComponent.schema({
      type: 'resource',
      label: 'Resource',
      key: 'resource',
      dataSrc: 'resource',
      resource: '',
      project: '',
      template: '<span>{{ item.data }}</span>',
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Resource',
      icon: 'files-o',
      weight: 90,
      documentation: '/userguide/form-building/form-components#resource',
      schema: ResourceComponent.schema(),
    };
  }

  init() {
    super.init();
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource,
    };
  }

  get defaultSchema() {
    return ResourceComponent.schema();
  }
}
