import { SelectComponent } from '../select/Select';
export class ResourceComponent extends SelectComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.component.dataSrc = 'resource';
    this.component.data = {
      resource: this.component.resource
    };
  }
}
