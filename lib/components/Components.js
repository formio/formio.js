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
        _.assign(Components.components, comps);
    };
    Components.addComponent = function (name, comp) {
        return Components.setComponent(name, comp);
    };
    Components.setComponent = function (name, comp) {
        Components.components[name] = comp;
    };
    Components.getComponentConstructor = function (component) {
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
    };
    Components.create = function (component, options, data) {
        var Constructor = Components.getComponentConstructor(component);
        return Constructor ? new Constructor(component, options, data) : null;
    };
    return Components;
}());
export { Components };
