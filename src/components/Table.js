let _each = require('lodash/each');
let FormioComponents = require('./Components');
class TableComponent extends FormioComponents {
  build() {
    this._element = this.ce('div');
    this._element.setAttribute('class', 'table-responsive');
    let table = this.ce('table');
    let tableClass = 'table ';
    _each(['striped', 'bordered', 'hover', 'condensed'], (prop) => {
      if (this._component[prop]) {
        tableClass += 'table-' + prop + ' ';
      }
    });
    table.setAttribute('class', tableClass);

    // Build the header.
    if (this._component.header && this._component.header.length) {
      let thead = this.ce('thead');
      _each(this._component.header, (header) => {
        let th = this.ce('th');
        th.appendChild(this.text(header));
        thead.appendChild(th);
      });
      table.appendChild(thead);
    }

    // Build the body.
    let tbody = this.ce('tbody');
    _each(this._component.rows, (row) => {
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
    this._element.appendChild(table);
  }
}
module.exports = TableComponent;
