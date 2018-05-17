import Component from '../_classes/component/Component';

export default class HiddenComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'hidden',
      inputType: 'hidden'
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Hidden',
      group: 'data',
      icon: 'fa fa-user-secret',
      weight: 0,
      documentation: 'http://help.form.io/userguide/#hidden',
      schema: HiddenComponent.schema()
    };
  }

  get defaultSchema() {
    return HiddenComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  build() {
    super.build();
    if (this.options.builder) {
      // We need to see it in builder mode.
      this.append(this.text(this.name));
    }
  }

  createLabel() {
    return;
  }
}
