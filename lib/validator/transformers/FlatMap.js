import { IterateeTransformer } from './Iteratee';
export class FlatMapTransformer extends IterateeTransformer {
    static get title() {
        return 'Flat Map';
    }
    static get name() {
        return 'flatMap';
    }
    transform(value, args) {
        var _a, _b;
        const { iteratee, } = args;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.flatMap) === null || _a === void 0 ? void 0 : _a.call(value, this.getIteratee(iteratee))) !== null && _b !== void 0 ? _b : null;
    }
}
