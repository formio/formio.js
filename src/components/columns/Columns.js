import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class ColumnsComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Columns',
      key: 'columns',
      type: 'columns',
      columns: [
        { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' },
        { components: [], width: 6, offset: 0, push: 0, pull: 0, size: 'md' }
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

  get schema() {
    const schema = _.omit(super.schema, ['components']);
    schema.columns.map((column, colIndex) => {
      column.components.map((comp, compIndex) => {
        const clonedComp = _.clone(comp);
        clonedComp.internal = true;
        const component = this.createComponent(clonedComp);
        delete component.component.internal;
        schema.columns[colIndex].components[compIndex] = component.schema;
      });
    });
    return schema;
  }

  get defaultSchema() {
    return ColumnsComponent.schema();
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
      if (!column.size) {
        column.size = 'md';
      }

      // Ensure there is a components array.
      if (!Array.isArray(column.components)) {
        column.components = [];
      }
      _.each(column.components, (comp) => {
        comp.hideOnChildrenHidden = this.component.hideOnChildrenHidden;
        const component = this.createComponent(comp);
        component.column = index;
        this.columns[index].push(component);
      });
    });
    this.rows = this.groupByRow();
  }

  labelIsHidden() {
    return true;
  }

  render() {
    return super.render(this.renderTemplate('columns', {
      columnKey: this.columnKey,
      columnComponents: this.columns.map(column => this.renderComponents(column))
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.columnKey]: 'multiple' });
    const superAttach = super.attach(element);
    this.refs[this.columnKey].forEach((column, index) =>
      this.attachComponents(column, this.columns[index], this.component.columns[index].components)
    );
    return superAttach;
  }

  get gridSize() {
    return 12;
  }

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
        if (col.element) {
          col.element.setAttribute('class', col.className);
        }
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
    _.each(this.columns, this.justifyRow.bind(this));
  }

  checkComponentConditions(data, flags, row) {
    if (this.component.autoAdjust) {
      const result = super.checkComponentConditions(data, flags, row);
      this.justify();
      return result;
    }
    else {
      return super.checkComponentConditions(data, flags, row);
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
