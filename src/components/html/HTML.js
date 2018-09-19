import _ from 'lodash';
import BaseComponent from '../base/Base';

export default class HTMLComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      type: 'htmlelement',
      tag: 'p',
      attrs: [],
      content: '',
      input: false,
      persistent: false
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
    this.htmlElement.innerHTML = this.interpolate(this.component.content);
  }

  build() {
    this.createElement();
    this.htmlElement = this.ce(this.component.tag, {
      id: this.id,
      class: this.component.className
    });
    _.each(this.component.attrs, (attr) => {
      if (attr.attr) {
        this.htmlElement.setAttribute(attr.attr, attr.value);
      }
    });
    if (this.component.content) {
      this.setHTML();
    }
    if (this.component.refreshOnChange) {
      this.on('change', () => this.setHTML());
    }
    this.element.appendChild(this.htmlElement);
  }
}
