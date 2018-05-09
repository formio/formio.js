import _ from 'lodash';
import {eachComponent} from './utils';
export default {
  /**
   * Iterate the given key to make it unique.
   *
   * @param {String} key
   *   Modify the component key to be unique.
   *
   * @returns {String}
   *   The new component key.
   */
  iterateKey(key) {
    if (!key.match(/(\d+)$/)) {
      return key + '2';
    }

    return key.replace(/(\d+)$/, function(suffix) {
      return Number(suffix) + 1;
    });
  },

  /**
   * Appends a number to a component.key to keep it unique
   *
   * @param {Object} form
   *   The components parent form.
   * @param {Object} component
   *   The component to uniquify
   */
  uniquify(form, component) {
    let changed = false;
    let formKeys = {};
    eachComponent(form.components, function(comp) {
      formKeys[comp.key] = true;
    });

    // Recurse into all child components.
    eachComponent([component], (component) => {
      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      while (formKeys.hasOwnProperty(component.key)) {
        component.key = this.iterateKey(component.key);
        changed = true;
      }
    }, true);
    return changed;
  },

  additionalShortcuts: {
    button: [
      'Enter',
      'Esc'
    ]
  },

  getAlphaShortcuts() {
    return _.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(function(charCode) {
      return String.fromCharCode(charCode);
    });
  },

  getAdditionalShortcuts(type) {
    return this.additionalShortcuts[type] || [];
  },

  getBindedShortcuts(components, input) {
    var result = [];

    eachComponent(components, function(component) {
      if (component === input) {
        return;
      }

      if (component.shortcut) {
        result.push(component.shortcut);
      }
      if (component.values) {
        component.values.forEach(function(value) {
          if (value.shortcut) {
            result.push(value.shortcut);
          }
        });
      }
    }, true);

    return result;
  },

  getAvailableShortcuts(form, component) {
    if (!component) {
      return [];
    }
    return [''].concat(_.difference(
      this.getAlphaShortcuts().concat(this.getAdditionalShortcuts(component.type)),
      this.getBindedShortcuts(form.components, component))
    );
  }
};
