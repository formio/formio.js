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
    static create(component, options, data) {
        let comp = null;
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
            comp = new Components.components['component'](component, options, data);
        }
        return comp;
    }
}
