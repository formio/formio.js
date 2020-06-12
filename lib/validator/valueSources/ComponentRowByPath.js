import { ComponentByPathValueSource } from './ComponentByPath';
export class ComponentRowByPathValueSource extends ComponentByPathValueSource {
    static get name() {
        return 'componentRowByPath';
    }
    static get title() {
        return 'Component Row By Path';
    }
    static get weight() {
        return 120;
    }
    getValue(input) {
        var _a;
        const component = super.getValue(input);
        return Array.isArray(component)
            ? component.map((comp) => { var _a; return (_a = comp === null || comp === void 0 ? void 0 : comp.data) !== null && _a !== void 0 ? _a : null; })
            : ((_a = component === null || component === void 0 ? void 0 : component.data) !== null && _a !== void 0 ? _a : null);
    }
}
