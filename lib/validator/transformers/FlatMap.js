import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FlatMapTransformer extends IterateeTransformer {
    static get title() {
        return 'Flat Map';
    }
    static get name() {
        return 'flatMap';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.flatMap(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
