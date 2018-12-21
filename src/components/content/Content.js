import BaseComponent from '../base/Base';

export default class ContentComponent extends BaseComponent {
  static schema(...extend) {
    return BaseComponent.schema({
      label: 'Content',
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
      this.editorReady = this.addCKE(editorElement, null, (html) => {
        this.component.html = html;
      }).then((editor) => {
        this.editor = editor;
        this.editor.data.set(this.component.html);
        return editor;
      }).catch(err => console.warn(err));
    }
    else {
      this.setHTML();
      if (this.component.refreshOnChange) {
        this.on('change', () => this.setHTML(), true);
      }
    }

    this.element.appendChild(this.htmlElement);
    this.attachLogic();
  }

  get emptyValue() {
    return '';
  }

  destroy() {
    const state = super.destroy();
    if (this.editor) {
      this.editor.destroy();
    }
    return state;
  }
}
