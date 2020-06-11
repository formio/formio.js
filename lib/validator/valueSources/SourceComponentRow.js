import { SourceComponentValueSource } from './SourceComponent';
export class SourceComponentRowValueSource extends SourceComponentValueSource {
    static get name() {
        return 'sourceComponentRow';
    }
    static get title() {
        return 'Source Component Row';
    }
    static get weight() {
        return 220;
    }
    getValue() {
        var _a, _b;
        return (_b = (_a = super.getValue()) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : null;
    }
}
