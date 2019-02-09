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
      persistent: false,
      hideOnChildrenHidden: false
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

  constructor(component, options, data) {
    super(component, options, data);
    this.rows = [];
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
        component.hideOnChildrenHidden = this.component.hideOnChildrenHidden;
        this.columns[index].push(this.createComponent(component));
      });
    });
    this.rows = this.groupByRow();
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
  }

  get gridSize() {
    return 12;
  }

  /**
   * Group columns in rows.
   * @return {Array.<ColumnComponent[]>}
   */
  groupByRow() {
    const initVal = { stack: [], rows: [] };
    const width = x => x.component.width;
    const result = _.reduce(this.components, (acc, next) => {
      const stack = [...acc.stack, next];
      if (_.sumBy(stack, width) <= this.gridSize) {
        acc.stack = stack;
        return acc;
      }
      else {
        acc.rows = [...acc.rows, acc.stack];
        acc.stack = [next];
        return acc;
      }
    }, initVal);

    return _.concat(result.rows, [result.stack]);
  }

  detach(all) {
    super.detach(all);
  }

  destroy() {
    super.destroy();
    this.columns = [];
  }
}
