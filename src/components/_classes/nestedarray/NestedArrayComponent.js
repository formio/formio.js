'use strict';
import NestedInputComponent from '../nestedinput/NestedInputComponent';

export default class NestedArrayComponent extends NestedInputComponent {
  componentContext(component) {
    let dataValue = this.dataValue;
    if (!dataValue[component.rowIndex]) {
      this.dataValue[component.rowIndex] = dataValue = this.emptyValue;
    }
    return dataValue[component.rowIndex];
  }
}
