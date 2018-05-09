import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class HTMLComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'htmlelement',
      tag: 'p',
      attrs: [],
      content: '',
      input: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'HTML Element',
      group: 'advanced',
      icon: 'fa fa-code',
      weight: 90,
      documentation: 'http://help.form.io/userguide/#html-element-component',
      schema: HTMLComponent.schema()
    };
  }

  get defaultSchema() {
    return HTMLComponent.schema();
  }

  setHTML() {
    this.element.innerHTML = this.interpolate(this.component.content, {data: this.data, row: this.row});
  }

  build() {
    this.element = this.ce(this.component.tag, {
      id: this.id,
      class: this.component.className
    });
    this.element.component = this;
    _.each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.element.setAttribute(attr.attr, attr.value);
      }
    });
    if (this.component.content) {
      this.setHTML();
    }

    if (this.component.refreshOnChange) {
      this.on('change', () => this.setHTML());
    }
  }
}
