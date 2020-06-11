import { Transformer } from './Transformer';
export class LengthTransformer extends Transformer {
    static get title() {
        return 'Length';
    }
    static get name() {
        return 'length';
    }
    transform(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value.length) !== null && _a !== void 0 ? _a : null;
    }
}
