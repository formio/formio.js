import _ from 'lodash';

export class Components {
  static get components() {
    if (!Components._components) {
      Components._components = {};
    }
    return Components._components;
  }

  static setComponents(comps) {
    _.assign(Components.components, comps);
  }

  static addComponent(name, comp) {
    return Components.setComponent(name, comp);
  }

  static setComponent(name, comp) {
    Components.components[name] = comp;
  }

  static getComponentConstructor(component) {
    if (component.type && Components.components.hasOwnProperty(component.type)) {
      return Components.components[component.type];
    }

    if (component.arrayTree) {
      return Components.components.datagrid;
    }

    if (component.tree) {
      return Components.components.nesteddata;
    }

    if (Array.isArray(component.components)) {
      return Components.components.nested;
    }

    return Components.components.component;
  }

  static create(component, options, data) {
    const Constructor = Components.getComponentConstructor(component);

    return Constructor ? new Constructor(component, options, data) : null;
  }
}
