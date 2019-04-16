import UnknownComponent from './unknown/Unknown';
import _ from 'lodash';

export default class Components {
  static get components() {
    if (!Components._components) {
      Components._components = {};
    }
    return Components._components;
  }

  static setComponents(comps) {
    // Set the tableView method on BaseComponent.
    if (comps.base) {
      // Implement the tableView method.
      comps.base.tableView = function(value, options) {
        const comp = Components.create(options.component, options.options || {}, options.data || {}, true);
        return comp.getView(value);
      };
    }
    _.assign(Components.components, comps);
  }

  static addComponent(name, comp) {
    return Components.setComponent(name, comp);
  }

  static setComponent(name, comp) {
    Components.components[name] = comp;
  }

  /**
   * Ensure that all components have a key that is not used else-where in the form.
   * @param component
   * @param options
   */
  /* eslint-disable max-depth */
  static ensureKey(component, options) {
    options = options || {};
    if (!options.unknown) {
      options.unknown = { __keys: {} };
    }
    if (!options.keys) {
      options.keys = {};
    }
    // Ensure all components have a key, even if it is dynamically determined.
    if (component) {
      if (!component.key) {
        if (!options.unknown[component.type]) {
          options.unknown[component.type] = { count: 0 };
        }
        do {
          options.unknown[component.type].count++;
          component.key = component.type + options.unknown[component.type].count;
        }
        while (!options.keys.hasOwnProperty(component.key));
        options.unknown.__keys[component.key] = true;
      }
      // Alter previously defined dynamic keys if a conflict exists.
      else if (
        options.keys.hasOwnProperty(component.key) &&
        options.unknown.__keys.hasOwnProperty(component.key)
      ) {
        const nextCount = component.key.match(/([0-9]+)$/g);
        if (nextCount) {
          options.unknown[component.type].count = parseInt(nextCount.pop(), 10);
          const prevComponent = options.keys[component.key];
          do {
            options.unknown[component.type].count++;
            prevComponent.key = component.type + options.unknown[component.type].count;
          }
          while (!options.keys.hasOwnProperty(prevComponent.key));
          options.keys[prevComponent.key] = prevComponent;
          options.unknown.__keys[prevComponent.key] = true;
          delete options.unknown.__keys[component.key];
        }
      }

      // Save this component in the keys object.
      options.keys[component.key] = component;
    }
  }
  /* eslint-enable max-depth */

  static create(component, options, data, nobuild) {
    let comp = null;
    if (component.type && Components.components.hasOwnProperty(component.type)) {
      comp = new Components.components[component.type](component, options, data);
      Components.ensureKey(component, options);
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
