import _each from 'lodash/each';
import FormioComponents from '../Components';
class TableComponent extends FormioComponents {
  build() {
    this.element = this.ce('div');
    this.element.setAttribute('class', 'table-responsive');
    let table = this.ce('table');
    let tableClass = 'table ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this.component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    table.setAttribute('class', tableClass);

    // Build the header.
    if (this.component.header && this.component.header.length) {
      let thead = this.ce('thead');
      _each(this.component.header, (header) => {
        let th = this.ce('th');
        th.appendChild(this.text(header));
        thead.appendChild(th);
      });
      table.appendChild(thead);
    }

    // Build the body.
    let tbody = this.ce('tbody');
    _each(this.component.rows, (row) => {
      let tr = this.ce('tr');
      _each(row, (column) => {
        let td = this.ce('td');
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
module.exports = TableComponent;
