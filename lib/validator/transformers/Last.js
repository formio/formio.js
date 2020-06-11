import { Transformer } from './Transformer';
export class LastTransformer extends Transformer {
    static get title() {
        return 'Last';
    }
    static get name() {
        return 'last';
    }
    transform(value) {
        var _a;
        return (_a = value === null || value === void 0 ? void 0 : value[value.length - 1]) !== null && _a !== void 0 ? _a : null;
    }
}
