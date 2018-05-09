import NestedComponent from '../NestedComponent';
export default class ColumnComponent extends NestedComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.noEdit = true;
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
