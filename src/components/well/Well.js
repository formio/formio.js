import {FormioComponents} from '../Components';
export class WellComponent extends FormioComponents {
  get className() {
    return `card card-body bg-faded well formio-component formio-component-well ${this.component.customClass}`;
  }
}
