import Component from '../_classes/component/Component';

export default class UnknownComponent extends Component {
  static schema() {
    return {
      type: 'custom',
      key: 'custom',
      protected: false,
      persistent: true
    };
  }

  static get builderInfo() {
    return {
      title: 'Custom',
      icon: 'cubes',
      group: 'premium',
      documentation: '/userguide/form-building/premium-components#custom',
      weight: 120,
      schema: UnknownComponent.schema()
    };
  }

  get defaultSchema() {
    return UnknownComponent.schema();
  }
}
