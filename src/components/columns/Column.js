import { FormioComponents } from '../Components';
export class ColumnComponent extends FormioComponents {
  get className() {
    return 'col col-sm-' + this.component.colWidth;
  }
}
