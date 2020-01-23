import Component from '../_classes/component/Component';
import _ from 'lodash';

export default class ContentComponent extends Component {
  static schema(...extend) {
    return Component.schema({
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
      group: 'layout',
      icon: 'html5',
      preview: false,
      documentation: 'http://help.form.io/userguide/#content-component',
      weight: 5,
      schema: ContentComponent.schema()
    };
  }

  get defaultSchema() {
    return ContentComponent.schema();
  }

  get content() {
    if (this.builderMode) {
      return this.component.html;
    }
    const submission = _.get(this.root, 'submission', {});
    return this.component.html ? this.interpolate(this.component.html, {
      metadata: submission.metadata || {},
      submission: submission,
      data: this.rootValue,
      row: this.data
    }) : '';
  }

  render() {
    return super.render(this.renderTemplate('html', {
      tag: 'div',
      attrs: [],
      content: this.content,
    }));
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    if (this.component.refreshOnChange) {
      this.on('change', () => {
        if (this.refs.html) {
          this.setContent(this.refs.html, this.content);
        }
      }, true);
    }
    return super.attach(element);
  }

  get emptyValue() {
    return '';
  }
}
