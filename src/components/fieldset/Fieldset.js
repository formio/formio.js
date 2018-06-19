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
      icon: 'fa fa-th-large',
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

  get fieldsetId() {
    return `fieldset-${this.id}`;
  }

  init() {
    this.addComponents();
  }

  render() {
    return super.render(this.renderTemplate('fieldset', {
      children: super.renderComponents(),
      className: this.className,
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {[this.fieldsetId]: 'single'});
    if (this.refs[this.fieldsetId]) {
      super.hydrateComponents(this.refs[this.fieldsetId]);
    }
    // this.setCollapsed();
    // this.createTooltip(title);
    // this.setCollapseHeader(heading);
  }
}
