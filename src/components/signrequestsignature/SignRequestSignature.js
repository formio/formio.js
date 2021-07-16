import Field from '../_classes/field/Field';

export default class SignRequestSignatureComponent extends Field {
  static schema(...extend) {
    return Field.schema({
      type: 'signrequestsignature',
      label: 'SignRequest Signature',
      key: 'signrequestsignature',
      input: false,
      hideLabel: true,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'SignRequest Signature',
      icon: 'edit',
      group: 'signrequest',
      documentation: '/userguide/#signrequestsignature',
      weight: 0,
      schema: SignRequestSignatureComponent.schema()
    };
  }

  constructor(...args) {
    super(...args);
  }

  init() {
    super.init();

    if (!this.options.building && this.component.email) {
      const { email, name, order } = this.component;
      this.dataValue = {
        email,
        'first_name': name || '',
        order: +order
      };

      if (+order === 0 && !this.hasEventHandler('submitDone')) {
        this.once('submitDone', (submission) => {
          const { signrequest } = submission.data;

          if (signrequest && signrequest.embedUrl) {
            window.open(signrequest.embedUrl);
          }
        });
      }
    }
  }

  get defaultSchema() {
    return SignRequestSignatureComponent.schema();
  }

  get defaultValue() {
    return super.defaultValue;
  }

  get emptyValue() {
    return '';
  }

  setValue(value, flags = {}) {
    const changed = super.setValue(value, flags);

    return changed;
  }

  hasValue() {
    return !!this.component.email;
  }

  get allowData() {
    return true;
  }

  get styles() {
    const { height } = this.component.overlay;
    const { building, pdf } = this.options;
    const defaultHeight = building ? 40 : 50;
    let fontSize = building ? 24 : 50;

    if (height && building) {
      fontSize = height * 0.5;
    }
    else if (height && pdf) {
      fontSize = height;
    }

    return `
      height: ${height || defaultHeight}px;
      font-size: ${fontSize}px;
      line-height: ${height || defaultHeight}px;
      width: max-content;
    `;
  }

  render() {
    return super.render(this.renderTemplate('signrequestsignature', {
      isPDF: this.options.pdf,
      isBuilder: this.options.building,
      styles: this.styles
    }));
  }
}
