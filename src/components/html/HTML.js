import Component from '../_classes/component/Component';

export default class HTMLComponent extends Component {
  static schema(...extend) {
    return Component.schema({
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

  get content() {
    return this.component.content ? this.interpolate(this.component.content, {data: this.data, row: this.row}) : '';
  }

  get attrs() {
    return this.component.attrs ? this.component.attrs.reduce((text, attr) => `${text} ${attr.attr}="${attr.value}"`, '') : '';
  }

  render() {
    return super.render(this.renderTemplate('html', {
      component: this.component,
      tag: this.component.tag,
      attrs: this.attrs,
      content: this.content,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {html: 'single'});
    if (this.component.refreshOnChange) {
      this.on('change', () => {
        if (this.refs.html) {
          this.refs.html.innerHTML = this.content;
        }
      });
    }
    super.hydrate(element);
  }
}
