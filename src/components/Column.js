let FormioComponents = require('./Components');
class ColumnComponent extends FormioComponents {
  get className() {
    return 'col col-sm-' + this._component.colWidth;
  }
}
module.exports = ColumnComponent;
