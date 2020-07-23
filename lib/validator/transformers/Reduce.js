import _ from 'lodash';
import { BaseReduceTransformer } from './BaseReduce';
export class ReduceTransformer extends BaseReduceTransformer {
    static get title() {
        return 'Reduce';
    }
    static get name() {
        return 'reduce';
    }
    transform(value, args) {
        var _a;
        const { iteratee, initialValue, } = args;
        return (_a = _.reduce(value, this.getReduceIteratee(iteratee), initialValue())) !== null && _a !== void 0 ? _a : null;
    }
}
