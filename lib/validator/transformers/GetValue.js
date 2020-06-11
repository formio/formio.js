import { Transformer } from './Transformer';
export class GetValueTransformer extends Transformer {
    static get title() {
        return 'Get Value';
    }
    static get name() {
        return 'getValue';
    }
    transform(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.dataValue) !== null && _a !== void 0 ? _a : null;
    }
}
