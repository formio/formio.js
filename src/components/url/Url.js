import TextFieldComponent from '../textfield/TextField';

export default class UrlComponent extends TextFieldComponent {
  static schema(...extend) {
    return TextFieldComponent.schema({
      type: 'url',
      label: 'Url',
      key: 'url',
      inputType: 'url',
      kickbox: {
        enabled: false
      }
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Url',
      group: 'advanced',
      icon: 'fa fa-link',
      documentation: 'http://help.form.io/userguide/#url',
      weight: 10,
      schema: UrlComponent.schema()
    };
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.validators.push('url');
  }

  get defaultSchema() {
    return UrlComponent.schema();
  }

  elementInfo() {
    const info = super.elementInfo();
    info.attr.type = this.component.mask ? 'password' : 'url';
    return info;
  }
}
