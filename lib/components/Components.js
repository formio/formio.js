import Component from './_classes/component/Component';
import _ from 'lodash';
var Components = /** @class */ (function () {
    function Components() {
    }
    Object.defineProperty(Components, "components", {
        get: function () {
            if (!Components._components) {
                Components._components = {};
            }
            return Components._components;
        },
        enumerable: false,
        configurable: true
    });
    Components.setComponents = function (comps) {
        // Set the tableView method on BaseComponent.
        if (comps.base) {
            // Implement the tableView method.
            comps.base.tableView = function (value, options) {
                var comp = Components.create(options.component, options.options || {}, options.data || {}, true);
                return comp.getView(value);
            };
        }
        _.assign(Components.components, comps);
    };
    Components.addComponent = function (name, comp) {
        return Components.setComponent(name, comp);
    };
    Components.setComponent = function (name, comp) {
        Components.components[name] = comp;
    };
    Components.create = function (component, options, data) {
        var comp = null;
        if (component.type && Components.components.hasOwnProperty(component.type)) {
            comp = new Components.components[component.type](component, options, data);
        }
        else if (component.arrayTree) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['datagrid'](component, options, data);
        }
        else if (component.tree) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['nesteddata'](component, options, data);
        }
        else if (Array.isArray(component.components)) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['nested'](component, options, data);
        }
        else {
            comp = new Component(component, options, data);
        }
        return comp;
    };
    return Components;
}());
export default Components;
