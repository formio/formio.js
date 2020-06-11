import { BaseReduceTransformer } from './BaseReduce';
export class ReduceRightTransformer extends BaseReduceTransformer {
    static get title() {
        return 'Reduce Right';
    }
    static get name() {
        return 'reduceRight';
    }
    transform(value, args) {
        var _a, _b;
        const { iteratee, initialValue, } = args;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.reduceRight) === null || _a === void 0 ? void 0 : _a.call(value, this.getReduceIteratee(iteratee), initialValue())) !== null && _b !== void 0 ? _b : null;
    }
}
