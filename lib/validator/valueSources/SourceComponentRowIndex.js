import { SourceComponentValueSource } from './SourceComponent';
export class SourceComponentRowIndexValueSource extends SourceComponentValueSource {
    static get name() {
        return 'sourceComponentRowIndex';
    }
    static get title() {
        return 'Source Component Row Index';
    }
    static get weight() {
        return 230;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.rowIndex) !== null && _b !== void 0 ? _b : null;
    }
}
