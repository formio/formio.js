'use strict';
import NestedDataComponent from '../nesteddata/NestedDataComponent';

export default class NestedArrayComponent extends NestedDataComponent {
  componentContext(component) {
    let dataValue = this.dataValue;
    if (!dataValue[component.rowIndex]) {
      this.dataValue[component.rowIndex] = dataValue = this.emptyValue;
    }
    return dataValue[component.rowIndex];
  }
}
