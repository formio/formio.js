import {BaseComponent} from '../base/Base';

export class ContentComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'content',
      key: 'content',
      input: false,
      html: ''
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Content',
      group: 'basic',
      icon: 'fa fa-html5',
      documentation: 'http://help.form.io/userguide/#content-component',
      weight: 100,
      schema: ContentComponent.schema()
    };
  }

  build() {
    this.element = this.ce('div', {
      id: this.id,
      class: `form-group ${this.component.customClass}`
    });
    this.element.component = this;
    this.element.innerHTML = this.interpolate(this.component.html, {data: this.data});
  }
}
