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
    return super.render(this.renderTemplate('well', {
      children: this.renderComponents(),
    }));
  }

  hydrate(element) {
    this.loadRefs(element, {[this.wellId]: 'single'});
    if (this.refs[this.wellId]) {
      this.hydrateComponents(this.refs[this.wellId]);
    }
  }
}
