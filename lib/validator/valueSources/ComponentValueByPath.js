import { ComponentByPathValueSource } from './ComponentByPath';
export class ComponentValueByPathValueSource extends ComponentByPathValueSource {
    static get name() {
        return 'componentValueByPath';
    }
    static get title() {
        return 'Component Value By Path';
    }
    static get weight() {
        return 110;
    }
    getValue(input) {
        var _a;
        const component = super.getValue(input);
        return Array.isArray(component)
            ? component.map((comp) => { var _a; return (_a = comp === null || comp === void 0 ? void 0 : comp.dataValue) !== null && _a !== void 0 ? _a : null; })
            : ((_a = component === null || component === void 0 ? void 0 : component.dataValue) !== null && _a !== void 0 ? _a : null);
    }
}
