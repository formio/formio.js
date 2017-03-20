import _each from 'lodash/each';
import { FormioComponents } from '../Components';
export class TableComponent extends FormioComponents {
  build() {
    this.element = this.ce('element', 'div', {
      class: 'table-responsive'
    });

    let tableClass = 'table ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    let table = this.ce('table', 'table', {
      class: tableClass
    });

    // Build the header.
    if (this.component.header && this.component.header.length) {
      let thead = this.ce('header', 'thead');
      let thr = this.ce('headerRow', 'tr');
      _each(this.component.header, (header) => {
        let th = this.ce('headerColumn', 'th');
        th.appendChild(this.text(header));
        thr.appendChild(th);
      });
      thead.appendChild(thr);
      table.appendChild(thead);
    }

    // Build the body.
    let tbody = this.ce('table', 'tbody');
    _each(this.component.rows, (row) => {
      let tr = this.ce('tableRow', 'tr');
      _each(row, (column) => {
        let td = this.ce('tableColumn', 'td');
        _each(column.components, (comp) => {
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
