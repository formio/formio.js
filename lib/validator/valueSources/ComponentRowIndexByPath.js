import { ComponentByPathValueSource } from './ComponentByPath';
export class ComponentRowIndexByPathValueSource extends ComponentByPathValueSource {
    static get name() {
        return 'componentRowIndexByPath';
    }
    static get title() {
        return 'Component Row Index By Path';
    }
    static get weight() {
        return 130;
    }
    getValue(input) {
        var _a;
        const component = super.getValue(input);
        return Array.isArray(component)
            ? component.map((comp) => { var _a; return (_a = comp === null || comp === void 0 ? void 0 : comp.rowIndex) !== null && _a !== void 0 ? _a : null; })
            : ((_a = component === null || component === void 0 ? void 0 : component.rowIndex) !== null && _a !== void 0 ? _a : null);
    }
}
