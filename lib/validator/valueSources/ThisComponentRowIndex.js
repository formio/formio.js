import { ThisComponentValueSource } from './ThisComponent';
export class ThisComponentRowIndexValueSource extends ThisComponentValueSource {
    static get name() {
        return 'thisComponentRowIndex';
    }
    static get title() {
        return 'This Component Row Index';
    }
    static get weight() {
        return 30;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.rowIndex) !== null && _b !== void 0 ? _b : null;
    }
}
