import _ from 'lodash';
import { eachComponent, uniqueKey } from './utils';
export default {
    /**
     * Appends a number to a component.key to keep it unique
     *
     * @param {Object} form
     *   The components parent form.
     * @param {Object} component
     *   The component to uniquify
     */
    uniquify: function (container, component) {
        var changed = false;
        var formKeys = {};
        eachComponent(container, function (comp) {
            formKeys[comp.key] = true;
            if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
                return true;
            }
        }, true);
        // Recurse into all child components.
        eachComponent([component], function (component) {
            // Skip key uniquification if this component doesn't have a key.
            if (!component.key) {
                return;
            }
            var newKey = uniqueKey(formKeys, component.key);
            if (newKey !== component.key) {
                component.key = newKey;
                changed = true;
            }
            formKeys[newKey] = true;
            if (['address', 'container', 'datagrid', 'editgrid', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
                return true;
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
    getAlphaShortcuts: function () {
        return _.range('A'.charCodeAt(), 'Z'.charCodeAt() + 1).map(function (charCode) { return String.fromCharCode(charCode); });
    },
    getAdditionalShortcuts: function (type) {
        return this.additionalShortcuts[type] || [];
    },
    getBindedShortcuts: function (components, input) {
        var result = [];
        eachComponent(components, function (component) {
            if (component === input) {
                return;
            }
            if (component.shortcut) {
                result.push(component.shortcut);
            }
            if (component.values) {
                component.values.forEach(function (value) {
                    if (value.shortcut) {
                        result.push(value.shortcut);
                    }
                });
            }
        }, true);
        return result;
    },
    getAvailableShortcuts: function (form, component) {
        if (!component) {
            return [];
        }
        return [''].concat(_.difference(this.getAlphaShortcuts().concat(this.getAdditionalShortcuts(component.type)), this.getBindedShortcuts(form.components, component))).map(function (shortcut) { return ({
            label: shortcut,
            value: shortcut,
        }); });
    }
};
