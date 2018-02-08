import _ from 'lodash';
import {FormioComponents} from '../Components';

export class TableComponent extends FormioComponents {
  static schema(...extend) {
    return FormioComponents.schema({
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
    const table = this.ce('table', {
      class: tableClass
    });

    // Build the header.
    if (this.component.header && this.component.header.length) {
      const thead = this.ce('thead');
      const thr = this.ce('tr');
      _.each(this.component.header, (header) => {
        const th = this.ce('th');
        th.appendChild(this.text(header));
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      table.appendChild(thead);
    }

    // Build the body.
    const tbody = this.ce('tbody');
    _.each(this.component.rows, (row) => {
      const tr = this.ce('tr');
      _.each(row, (column) => {
        const td = this.ce('td');
        _.each(column.components, (comp) => {
          this.addComponent(comp, td);
        });
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    this.element.appendChild(table);
  }
}
