import _ from 'lodash';
import { eachComponent, uniqueKey } from './index';
export default {
  /**
   * Appends a number to a component.key to keep it unique
   * @param {import('@formio/core').Component[]} container - The container of components to uniquify against
   * @param {import('@formio/core').Component} component - The Component to uniqify.
   * @returns {boolean} - If the component was changed.
   */
  uniquify(container, component) {
    let changed = false;
    const formKeys = {};
    eachComponent(container, (comp) => {
      formKeys[comp.key] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(comp.type) || comp.tree || comp.arrayTree) {
        return true;
      }
    }, true);

    // Recurse into all child components.
    eachComponent([component], (component) => {
      // Skip key uniquification if this component doesn't have a key.
      if (!component.key) {
        return;
      }

      const newKey = uniqueKey(formKeys, component.key);
      if (newKey !== component.key) {
        component.key = newKey;
        changed = true;
      }

      formKeys[newKey] = true;

      if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
        return true;
      }
    }, true);
    return changed;
  },

  /**
   * Additional shortcuts for the builder.
   */
  additionalShortcuts: {
    button: [
      'Enter',
      'Esc'
    ]
  },

  /**
   * Returns the alpha character shortcuts.
   * @returns {string[]} - An array of shortcuts of alpha characters.
   */
  getAlphaShortcuts() {
    return _.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map((charCode) => String.fromCharCode(charCode));
  },

  getAdditionalShortcuts(type) {
    return this.additionalShortcuts[type] || [];
  },

  getBindedShortcuts(components, input) {
    const result = [];

    eachComponent(components, (component) => {
      if (component === input) {
        return;
      }

      if (component.shortcut) {
        result.push(component.shortcut);
      }
      if (component.values) {
        component.values.forEach((value) => {
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
      this.getBindedShortcuts(form.components, component)),
    ).map((shortcut) => ({
      label: shortcut,
      value: shortcut,
    }));
  }
};
