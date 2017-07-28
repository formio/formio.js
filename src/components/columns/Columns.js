import _each from 'lodash/each';
import { FormioComponents } from '../Components';
export class ColumnsComponent extends FormioComponents {
  get className() {
    return 'row';
  }
  addComponents() {
    _each(this.component.columns, (column) => {
      column.type = 'column';
      this.addComponent(column, this.element, this.data);
    });
  }
}
