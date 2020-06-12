import { ThisComponentValueSource } from './ThisComponent';
export class ThisComponentValueValueSource extends ThisComponentValueSource {
    static get name() {
        return 'thisComponentValue';
    }
    static get title() {
        return 'This Component Value';
    }
    static get weight() {
        return 10;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.dataValue) !== null && _b !== void 0 ? _b : null;
    }
}
