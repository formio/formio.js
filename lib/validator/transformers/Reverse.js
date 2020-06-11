import { Transformer } from './Transformer';
export class ReverseTransformer extends Transformer {
    static get title() {
        return 'Reverse';
    }
    static get name() {
        return 'reverse';
    }
    transform(value) {
        var _a;
        // Revert array in immutable manner.
        return (_a = value === null || value === void 0 ? void 0 : value.slice) === null || _a === void 0 ? void 0 : _a.call(value).reverse;
    }
}
