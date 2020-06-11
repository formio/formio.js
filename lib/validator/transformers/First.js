import { Transformer } from './Transformer';
export class FirstTransformer extends Transformer {
    static get title() {
        return 'First';
    }
    static get name() {
        return 'first';
    }
    transform(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value[0]) !== null && _a !== void 0 ? _a : null;
    }
}
