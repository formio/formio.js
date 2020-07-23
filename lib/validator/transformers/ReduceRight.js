import _ from 'lodash';
import { BaseReduceTransformer } from './BaseReduce';
export class ReduceRightTransformer extends BaseReduceTransformer {
    static get title() {
        return 'Reduce Right';
    }
    static get name() {
        return 'reduceRight';
    }
    transform(value, args) {
        var _a;
        const { iteratee, initialValue, } = args;
        return (_a = _.reduceRight(value, this.getReduceIteratee(iteratee), initialValue())) !== null && _a !== void 0 ? _a : null;
    }
}
