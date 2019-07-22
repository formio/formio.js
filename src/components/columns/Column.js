import _ from 'lodash';
import NestedComponent from '../nested/NestedComponent';
export default class ColumnComponent extends NestedComponent {
  static schema(...extend) {
    return NestedComponent.schema({
      label: 'Column',
      key: 'column',
      type: 'column',
      input: false,
    }, ...extend);
  }

  constructor(component, options, data) {
    super(component, options, data);
    this.noEdit = true;
  }

  get defaultSchema() {
    return ColumnComponent.schema();
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

  get className() {
    const comp   = this.component;
    const width  = ` col-sm-${comp.width  ? comp.width  : 6}`;
    const offset = ` col-sm-offset-${comp.offset ? comp.offset : 0}`;
    const push   = ` col-sm-push-${comp.push   ? comp.push   : 0}`;
    const pull   = ` col-sm-pull-${comp.pull   ? comp.pull   : 0}`;
    return `col${width}${offset}${push}${pull}`;
  }
}
