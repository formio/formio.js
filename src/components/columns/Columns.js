import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class ColumnsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Columns',
      key: 'columns',
      type: 'columns',
      columns: [
        { components: [], width: 6, offset: 0, push: 0, pull: 0 },
        { components: [], width: 6, offset: 0, push: 0, pull: 0 }
      ],
      clearOnHide: false,
      input: false,
      tableView: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Columns',
      icon: 'columns',
      group: 'layout',
      documentation: 'http://help.form.io/userguide/#columns',
      weight: 10,
      schema: ColumnsComponent.schema()
    };
  }

  get defaultSchema() {
    return ColumnsComponent.schema();
  }

  get schema() {
    const schema = _.omit(super.schema, 'components');
    schema.columns = [];
    this.eachComponent((component, index) => {
      _.merge(component.component, _.omit(this.component.columns[index], 'components'));
      schema.columns.push(component.schema);
    });
    for (let i = this.components.length; i < this.component.columns.length; i++) {
      schema.columns.push(this.component.columns[i]);
    }
    return schema;
  }

  get className() {
    return `row ${super.className}`;
  }

  get columnKey() {
    return `column-${this.id}`;
  }

  init() {
    super.init();
    this.columns = [];
    _.each(this.component.columns, (column, index) => {
      this.columns[index] = [];
      // Ensure there is a components array.
      if (!Array.isArray(column.components)) {
        column.components = [];
      }
      _.each(column.components, (component) => {
        this.columns[index].push(this.createComponent(component));
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('columns', {
      columnKey: this.columnKey,
      columnComponents: this.columns.map(column => this.renderComponents(column))
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.columnKey]: 'multiple' });
    super.attach(element);
    this.refs[this.columnKey].forEach((column, index) =>
      this.attachComponents(column, this.columns[index], this.component.columns[index].components)
    );
    this.on('change', () => this.justifyColumns(this.components));
  }

  /**
   * Justify columns width according to `this.gridSize`.
   * @param {ColumnComponent[]} columns
   * @return {*}
   */
  justifyRow(columns) {
    const visible = _.filter(columns, 'visible');
    const nbColumns = columns.length;
    const nbVisible = visible.length;

    if (nbColumns > 0 && nbVisible > 0) {
      const w = Math.floor(this.gridSize / nbVisible);
      const totalWidth = w * nbVisible;
      const span = this.gridSize - totalWidth;

      _.each(visible, column => {
        column.component.width = w;
      });

      // In case when row is not fully filled,
      // extending last col to fill empty space.
      _.last(visible).component.width += span;

      _.each(visible, col => {
        col.element.setAttribute('class', col.className);
      });
    }
  }

  detach(all) {
    super.detach(all);
  }

  destroy() {
    super.destroy();
    this.columns = [];
  }
}
