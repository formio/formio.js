import { SourceComponentValueSource } from './SourceComponent';
export class SourceComponentValueValueSource extends SourceComponentValueSource {
    static get name() {
        return 'sourceComponentValue';
    }
    static get title() {
        return 'Source Component Value';
    }
    static get weight() {
        return 210;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.dataValue) !== null && _b !== void 0 ? _b : null;
    }
}
