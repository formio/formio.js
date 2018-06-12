import NestedComponent from '../_classes/nested/NestedComponent';

export default class WellComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'well',
      key: 'well',
      input: false,
      persistent: false,
      components: []
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Well',
      icon: 'fa fa-square-o',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#well',
      weight: 60,
      schema: WellComponent.schema()
    };
  }

  get defaultSchema() {
    return WellComponent.schema();
  }

  get className() {
    return `${this.component.customClass}`;
  }

  get wellId() {
    return `well-${this.id}`;
  }

  init() {
    this.addComponents();
  }

  render() {
    return this.renderTemplate('well', {
      children: super.renderComponents(),
      className: this.className,
    });
  }

  hydrate(element) {
    this.loadRefs(element, {[this.wellId]: 'single'});
    super.hydrateComponents(this.refs[this.wellId]);
  }
}
