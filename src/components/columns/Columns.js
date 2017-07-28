import _each from 'lodash/each';
import { FormioComponents } from '../Components';
export class ColumnsComponent extends FormioComponents {
  get className() {
    return 'row';
  }
  addComponents() {
    let colWidth = Math.floor(12 / this.component.columns.length);
    _each(this.component.columns, (column) => {
      column.type = 'column';
      this.addComponent(column, this.element, this.data);
    });
  }
}
