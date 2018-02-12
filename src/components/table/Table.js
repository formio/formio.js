import _ from 'lodash';

import {FormioComponents} from '../Components';

export class TableComponent extends FormioComponents {
  build() {
    this.element = this.ce('div', {
      class: 'table-responsive'
    });

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
