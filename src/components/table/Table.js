import _ from 'lodash';
import NestedComponent from '../_classes/nested/NestedComponent';

export default class TableComponent extends NestedComponent {
  static emptyTable(numRows, numCols) {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const cols = [];
      for (let j = 0; j < numCols; j++) {
        cols.push({ components: [] });
      }
      rows.push(cols);
    }
    return rows;
  }

  static schema(...extend) {
    return NestedComponent.schema({
      type: 'table',
      input: false,
      key: 'table',
      numRows: 3,
      numCols: 3,
      rows: TableComponent.emptyTable(3, 3),
      header: [],
      caption: '',
      striped: false,
      bordered: false,
      hover: false,
      condensed: false,
      persistent: false
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Table',
      group: 'layout',
      icon: 'table',
      weight: 40,
      documentation: 'http://help.form.io/userguide/#table',
      schema: TableComponent.schema()
    };
  }

  get defaultSchema() {
    return TableComponent.schema();
  }

  get schema() {
    const schema = _.omit(super.schema, 'components');
    schema.rows = [];
    this.eachComponent((component) => {
      if (!schema.rows || !schema.rows.length) {
        schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
      }
      if (!schema.rows[component.tableRow]) {
        schema.rows[component.tableRow] = [];
      }
      if (!schema.rows[component.tableRow][component.tableColumn]) {
        schema.rows[component.tableRow][component.column] = { components: [] };
      }
      schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
    });
    if (!schema.rows.length) {
      schema.rows = TableComponent.emptyTable(this.component.numRows, this.component.numCols);
    }
    return schema;
  }

  get className() {
    return `table-responsive ${super.className}`;
  }

  get tableKey() {
    return `table-${this.key}`;
  }

  constructor(...args) {
    super(...args);
    this.noField = true;
  }

  init() {
    super.init();
    // Ensure component.rows has the correct number of rows and columns.
    for (let rowIndex = 0; rowIndex < this.component.numRows; rowIndex++) {
      this.component.rows[rowIndex] = this.component.rows[rowIndex] || [];
      for (let colIndex = 0; colIndex < this.component.numCols; colIndex++) {
        this.component.rows[rowIndex][colIndex] = this.component.rows[rowIndex][colIndex] || { components: [] };
      }
      this.component.rows[rowIndex] = this.component.rows[rowIndex].slice(0, this.component.numCols);
    }
    this.component.rows = this.component.rows.slice(0, this.component.numRows);

      this.table = [];
    _.each(this.component.rows, (row, rowIndex) => {
      this.table[rowIndex] = [];
      _.each(row, (column, colIndex) => {
        this.table[rowIndex][colIndex] = [];
        _.each(column.components, (comp) => {
          const component = this.createComponent(comp);
          component.tableRow = rowIndex;
          component.tableColumn = colIndex;
          this.table[rowIndex][colIndex].push(component);
        });
      });
    });
  }

  render() {
    return super.render(this.renderTemplate('table', {
      tableKey: this.tableKey,
      tableComponents: this.table.map(row =>
        row.map(column =>
          this.renderComponents(column)
        )
      )
    }));
  }

  attach(element) {
    const keys = this.table.reduce((prev, row, rowIndex) => {
      prev[`${this.tableKey}-${rowIndex}`] = 'multiple';
      return prev;
    }, {});
    this.loadRefs(element, keys);
    super.attach(element);
    this.table.forEach((row, rowIndex) => {
      row.forEach((column, columnIndex) => {
        this.attachComponents(this.refs[`${this.tableKey}-${rowIndex}`][columnIndex], this.table[rowIndex][columnIndex], this.component.rows[rowIndex][columnIndex].components);
      });
    });
  }

  destroy(all) {
    super.destroy(all);
    delete this.table;
  }
}
