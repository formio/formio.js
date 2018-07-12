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
      icon: 'square-o',
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

  get wellkey() {
    return `well-${this.key}`;
  }

  init() {
    this.addComponents();
  }

  render() {
    return super.render(this.renderTemplate('well', {
      wellkey: this.wellkey,
      children: this.renderComponents(),
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.wellkey]: 'single' });
    super.attach(element);
    if (this.refs[this.wellkey]) {
      this.attachComponents(this.refs[this.wellkey]);
    }
  }
}
