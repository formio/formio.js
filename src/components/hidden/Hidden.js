import Input from '../_classes/input/Input';

export default class HiddenComponent extends Input {
  static schema(...extend) {
    return Input.schema({
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

  get inputInfo() {
    const info = super.elementInfo();
    info.type = 'input';
    info.attr.type = 'hidden';
    info.changeEvent = 'change';
    return info;
  }

  labelIsHidden() {
    return true;
  }

  // build() {
  //   super.build();
  //   if (this.options.builder) {
  //     // We need to see it in builder mode.
  //     this.append(this.text(this.name));
  //   }
  // }
}
