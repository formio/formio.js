import Component from '../_classes/component/Component';
import _ from 'lodash';

export default class HTMLComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'HTML',
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
      group: 'layout',
      icon: 'code',
      weight: 0,
      documentation: '/userguide/form-building/layout-components#html-element',
      showPreview: false,
      schema: HTMLComponent.schema()
    };
  }

  static savedValueTypes() {
    return [];
  }

  get defaultSchema() {
    return HTMLComponent.schema();
  }

  get content() {
    if (this.builderMode) {
      return this.component.content;
    }

    // i18n returns error exactly with word 'select', spaces will be trimmed
    if (this.component.content.replace(/(<(\/?[^>]+)>)/g, '').trim() === 'select') {
      return ` ${this.component.content} `;
    }

    const submission = _.get(this.root, 'submission', {});
    const content = this.component.content ? this.interpolate(this.component.content, {
      metadata: submission.metadata || {},
      submission: submission,
      data: this.rootValue,
      row: this.data
    }) : '';
    return this.sanitize(content, this.shouldSanitizeValue);
  }

  get singleTags() {
    return ['br', 'img', 'hr'];
  }

  checkRefreshOn(changed) {
    super.checkRefreshOn(changed);
    if (!this.builderMode && this.component.refreshOnChange && this.element &&
      !_.isUndefined(changed) && ((_.isBoolean(changed) && changed) || !_.isEmpty(changed)) &&
      this.conditionallyVisible(this.data, this.row)) {
      this.setContent(this.element, this.renderContent());
    }
  }

  renderContent() {
    const submission = _.get(this.root, 'submission', {});
    return this.renderTemplate('html', {
      component: this.component,
      tag: this.component.tag,
      attrs: (this.component.attrs || []).map((attr) => {
        return {
          attr: attr.attr,
          value: this.interpolate(attr.value, {
            metadata: submission.metadata || {},
            submission: submission,
            data: this.rootValue,
            row: this.data
          })
        };
      }),
      content: this.content,
      singleTags: this.singleTags,
    });
  }

  render() {
    return super.render(this.renderContent());
  }

  attach(element) {
    this.loadRefs(element, { html: 'single' });
    return super.attach(element);
  }
}
