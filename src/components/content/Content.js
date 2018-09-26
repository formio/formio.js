import BaseComponent from '../base/Base';

export default class ContentComponent extends BaseComponent {
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

  get defaultSchema() {
    return ContentComponent.schema();
  }

  setHTML() {
    this.htmlElement.innerHTML = this.interpolate(this.component.html);
  }

  build() {
    this.createElement();
    this.htmlElement = this.ce('div', {
      id: this.id,
      class: `form-group ${this.component.className}`
    });

    this.htmlElement.component = this;

    if (this.options.builder) {
      const editorElement = this.ce('div');
      this.element.appendChild(editorElement);
      this.addQuill(editorElement, this.wysiwygDefault, (element) => {
        this.component.html = element.value;
      }).then((editor) => {
        editor.setContents(editor.clipboard.convert(this.component.html));
      }).catch(err => console.warn(err));
    }
    else {
      this.setHTML();
      if (this.component.refreshOnChange) {
        this.on('change', () => this.setHTML());
      }
    }

    this.element.appendChild(this.htmlElement);
    this.attachLogic();
  }

  get emptyValue() {
    return '';
  }
}
