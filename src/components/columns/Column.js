import FormioComponents from '../Components';
class ColumnComponent extends FormioComponents {
  get className() {
    return 'col col-sm-' + this.component.colWidth;
  }
}
module.exports = ColumnComponent;
