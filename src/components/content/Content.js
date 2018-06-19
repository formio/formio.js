import Component from '../_classes/component/Component';

export default class ContentComponent extends Component {
  static schema(...extend) {
    return Component.schema({
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

  get defaultSchema() {
    return ContentComponent.schema();
  }

  get content() {
    return this.component.html ? this.interpolate(this.component.html, {data: this.data, row: this.row}) : '';
  }

  render() {
    return super.render(this.renderTemplate('html', {
      component: this.component,
      tag: 'div',
      attrs: '',
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

  // TODO: Need to move this to the builder code somewhere. Doesn't belong here.
  // build() {
  //   if (this.options.builder) {
  //     const editorElement = this.ce('div');
  //     this.addQuill(editorElement, this.wysiwygDefault, (element) => {
  //       this.component.html = element.value;
  //     }).then((editor) => {
  //       editor.setContents(editor.clipboard.convert(this.component.html));
  //     });
  //     this.element.appendChild(editorElement);
  //   }
  // }

  get emptyValue() {
    return '';
  }
}
