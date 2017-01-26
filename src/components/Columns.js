let _each = require('lodash/each');
let FormioComponents = require('./Components');
class ColumnsComponent extends FormioComponents {
  get className() {
    return 'row';
  }
  addComponents() {
    let colWidth = Math.floor(12 / this._component.columns.length);
    _each(this._component.columns, (column) => {
      column.type = 'column';
      column.colWidth = colWidth;
      this.addComponent(column, this._element);
    });
  }
}
module.exports = ColumnsComponent;
