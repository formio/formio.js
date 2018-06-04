import UnknownComponent from './unknown/Unknown';
import _ from 'lodash';
export default class Components {
  static get components() {
    if (!this._components) {
      this._components = {};
    }
    return this._components;
  }

  static setComponents(comps) {
    _.assign(this.components, comps);
  }

  static addComponent(name, comp) {
    return this.setComponent(name, comp);
  }

  static setComponent(name, comp) {
    this.components[name] = comp;
  }

  static create(component, options, data, nobuild) {
    let comp = null;
    if (component.type && this.components.hasOwnProperty(component.type)) {
      comp = new this.components[component.type](component, options, data);
    }
    else {
      comp = new UnknownComponent(component, options, data);
    }
    if (!nobuild) {
      comp.build();
      comp.isBuilt = true;
    }
    return comp;
  }
}
