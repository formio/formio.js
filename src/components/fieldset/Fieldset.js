import NestedComponent from '../_classes/nested/NestedComponent';

export default class FieldsetComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Field Set',
      key: 'fieldSet',
      type: 'fieldset',
      legend: '',
      components: [],
      input: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Field Set',
      icon: 'th-large',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#fieldset',
      weight: 20,
      schema: FieldsetComponent.schema()
    };
  }

  get defaultSchema() {
    return FieldsetComponent.schema();
  }

  getContainer() {
    return this.body;
  }

  get className() {
    return `form-group ${super.className}`;
  }

  get fieldsetKey() {
    return `fieldset-${this.key}`;
  }

  init() {
    this.addComponents();
  }

  render() {
    return super.render(this.renderTemplate('fieldset', {
      fieldsetKey: this.fieldsetKey,
      children: this.renderComponents(),
      collapsed: this.collapsed,
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.fieldsetKey]: 'single' });
    super.attach(element);
    if (this.refs[this.fieldsetKey]) {
      super.attachComponents(this.refs[this.fieldsetKey]);
    }
  }
}
