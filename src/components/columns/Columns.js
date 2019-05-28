import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';

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
      autoAdjust: false,
      hideOnChildrenHidden: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Columns',
      icon: 'fa fa-columns',
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

  constructor(component, options, data) {
    super(component, options, data);
    this.rows = [];
  }

  get className() {
    return `row ${super.className}`;
  }

  get gridSize() {
    return 12;
  }

  /** @type {number} */
  get nbVisible() {
    return _.filter(this.components, 'visible').length;
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

  justify() {
    _.each(this.rows, this.justifyRow.bind(this));
  }

  addComponents(element, data, options, state) {
    const container = this.getContainer();
    container.noDrop = true;
    _.each(this.component.columns, (column, index) => {
      column.type = 'column';
      //fix input: true issue for existent forms
      column.input = false;
      column.hideOnChildrenHidden = this.component.hideOnChildrenHidden;
      const component = this.addComponent(column, container, this.data, null, null, state);
      component.column = index;
    });
    this.rows = this.groupByRow();
  }

  checkConditions(data) {
    if (this.component.autoAdjust) {
      const result = super.checkConditions(data);

      this.justify();

      return result;
    }
    else {
      return super.checkConditions(data);
    }
  }

  destroy() {
    this.rows = [];
    return super.destroy();
  }
}
