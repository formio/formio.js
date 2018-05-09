import _ from 'lodash';
import NestedComponent from '../NestedComponent';

export default class TableComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      type: 'table',
      input: false,
      key: 'table',
      numRows: 3,
      numCols: 3,
      rows: [
        [{components: []}, {components: []}, {components: []}],
        [{components: []}, {components: []}, {components: []}],
        [{components: []}, {components: []}, {components: []}]
      ],
      header: [],
      caption: '',
      striped: false,
      bordered: false,
      hover: false,
      condensed: false
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
    let schema = _.omit(super.schema, 'components');
    schema.rows = [];
    this.eachComponent((component) => {
      if (!schema.rows || !schema.rows.length) {
        schema.rows = [
          [{components: []}, {components: []}, {components: []}],
          [{components: []}, {components: []}, {components: []}],
          [{components: []}, {components: []}, {components: []}]
        ];
      }
      if (!schema.rows[component.tableRow]) {
        schema.rows[component.tableRow] = [];
      }
      if (!schema.rows[component.tableRow][component.tableColumn]) {
        schema.rows[component.tableRow][component.column] = {components: []};
      }
      schema.rows[component.tableRow][component.tableColumn].components.push(component.schema);
    });
    if (!schema.rows.length) {
      schema.rows = [
        [{components: []}, {components: []}, {components: []}],
        [{components: []}, {components: []}, {components: []}],
        [{components: []}, {components: []}, {components: []}]
      ];
    }
    return schema;
  }

  /**
   *
   * @param element
   * @param data
   */
  addComponents(element, data) {
    // Build the body.
    this.tbody = this.ce('tbody');
    _.each(this.component.rows, (row, rowIndex) => {
      const tr = this.ce('tr');
      _.each(row, (column, colIndex) => {
        const td = this.ce('td', {
          id: `${this.id}-${rowIndex}-${colIndex}`
        });
        _.each(column.components, (comp) => {
          comp.tableRow = rowIndex;
          comp.tableColumn = colIndex;
          this.addComponent(comp, td, data);
        });

        if (this.options.builder) {
          if (!column.components || !column.components.length) {
            td.appendChild(this.ce('div', {
              id: `${this.id}-${rowIndex}-${colIndex}-placeholder`,
              class: 'alert alert-info',
              style: 'text-align:center; margin-bottom: 0px;',
              role: 'alert'
            }, this.text('Drag and Drop a form component')));
            td.tableRow = rowIndex;
            td.tableColumn = colIndex;
          }
          this.root.addDragContainer(td, this, {
            onDrop: (element, target, source, sibling, component) => {
              component.tableRow = target.tableRow;
              component.tableColumn = target.tableColumn;
            },
            onSave: (component) => {
              component.tableRow = rowIndex;
              component.tableColumn = colIndex;
            }
          });
        }

        tr.appendChild(td);
      });
      this.tbody.appendChild(tr);
    });
  }

  buildHeader() {
    if (this.component.header && this.component.header.length) {
      const thead = this.ce('thead');
      const thr = this.ce('tr');
      _.each(this.component.header, (header) => {
        const th = this.ce('th');
        th.appendChild(this.text(header));
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      this.table.appendChild(thead);
    }
  }

  build() {
    this.element = this.ce('div', {
      id: this.id,
      class: 'table-responsive'
    });
    this.element.component = this;

    let tableClass = 'table ';
    _.each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += `table-${prop} `;
      }
    });
    this.table = this.ce('table', {
      class: tableClass
    });

    this.buildHeader();
    this.addComponents();
    this.table.appendChild(this.tbody);
    this.element.appendChild(this.table);
  }
}
