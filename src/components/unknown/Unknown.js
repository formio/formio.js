import BaseComponent from '../base/Base';

export default class UnknownComponent extends BaseComponent {
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
      icon: 'fa fa-cubes',
      group: 'advanced',
      documentation: 'https://help.form.io/userguide/form-components/#custom',
      weight: 120,
      schema: UnknownComponent.schema()
    };
  }

  build() {
    this.createElement();
    if (this.options.builder) {
      const builderElement = this.ce('div', {
        class: 'panel panel-default'
      }, [
        this.ce('div', {
          class: 'panel-body text-muted text-center'
        }, [
          document.createTextNode(`${this.t('Custom Component')} (${this.t(this.component.type)})`)
        ])
      ]);
      this.append(builderElement);
    }
    else {
      this.element.appendChild(this.text(`Unknown component: ${this.component.type}`));
    }
    return this.element;
  }

  get defaultSchema() {
    return UnknownComponent.schema();
  }
}
