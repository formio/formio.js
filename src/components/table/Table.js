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
      icon: 'fa fa-table',
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

  get columnKey() {
    return `column-${this.key}`;
  }

  init() {
    super.init();
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
      columnKey: this.columnKey,
      tableComponents: this.table.map(row =>
        row.map(column =>
          this.renderComponents(column)
        )
      )
    }));
  }

  attach(element) {
    this.loadRefs(element, { [this.columnKey]: 'multiple' });
    const rowLength = this.table.length;
    this.refs[this.columnKey].forEach((column, index) => {
      const rowIndex = Math.floor(index / rowLength);
      const columnIndex = index % rowLength;
      this.attachComponents(column, this.table[rowIndex][columnIndex], this.component.rows[rowIndex][columnIndex].components);
    });
  }

  detach(all) {
    super.detach(all);
    delete this.table;
  }

  /**
   *
   * @param element
   * @param data
   */
  // addComponentsOld(element, data) {

    // TODO: Need to figure out another way of doing this.
    //     if (this.options.builder) {
    //       if (!column.components || !column.components.length) {
    //         td.appendChild(this.ce('div', {
    //           id: `${this.id}-${rowIndex}-${colIndex}-placeholder`,
    //           class: 'alert alert-info',
    //           style: 'text-align:center; margin-bottom: 0px;',
    //           role: 'alert'
    //         }, this.text('Drag and Drop a form component')));
    //       }
    //       this.root.addDragContainer(td, this, {
    //         onSave: (component) => {
    //           component.tableRow = rowIndex;
    //           component.tableColumn = colIndex;
    //         }
    //       });
    //     }
  // }
}
