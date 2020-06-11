import { ThisComponentValueSource } from './ThisComponent';
export class ThisComponentRowValueSource extends ThisComponentValueSource {
    static get name() {
        return 'thisComponentRow';
    }
    static get title() {
        return 'This Component Row';
    }
    static get weight() {
        return 20;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
    }
}
