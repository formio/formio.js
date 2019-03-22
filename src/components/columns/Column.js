import NestedComponent from '../_classes/nested/NestedComponent';
import _ from 'lodash';
export default class ColumnComponent extends NestedComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.noEdit = true;
    this.noField = true;
  }

  get className() {
    const comp   = this.component;
    const width  = ` col-sm-${comp.width  ? comp.width  : 6}`;
    const offset = ` col-sm-offset-${comp.offset ? comp.offset : 0}`;
    const push   = ` col-sm-push-${comp.push   ? comp.push   : 0}`;
    const pull   = ` col-sm-pull-${comp.pull   ? comp.pull   : 0}`;
    return `col${width}${offset}${push}${pull}`;
  }

  conditionallyVisible(data) {
    if (!this.component.hideOnChildrenHidden) {
      return super.conditionallyVisible(data);
    }
    // Check children components for visibility.
    if (_.every(this.getComponents(), ['visible', false])) {
      return false;
    }
    return super.conditionallyVisible(data);
  }
}
