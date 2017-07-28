import { FormioComponents } from '../Components';
export class ColumnComponent extends FormioComponents {
  get className() {
      var comp   = this.component;
      var width  = ' col-sm-'        + (comp.width  ? comp.width  : comp.colWidth);
      var offset = ' col-sm-offset-' + (comp.offset ? comp.offset : 0);  
      var push   = ' col-sm-push-'   + (comp.push   ? comp.push   : 0);  
      var pull   = ' col-sm-pull-'   + (comp.pull   ? comp.pull   : 0);  
      return 'col' + width + offset + push + pull;
  }
}
