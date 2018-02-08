import _ from 'lodash';

import {FormioComponents} from '../Components';

export class ColumnsComponent extends FormioComponents {
  get className() {
    return `row ${this.component.customClass}`;
  }
  addComponents() {
    _.each(this.component.columns, (column) => {
      column.type = 'column';
      this.addComponent(column, this.element, this.data);
    });
  }
}
