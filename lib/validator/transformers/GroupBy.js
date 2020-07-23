import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class GroupByTransformer extends IterateeTransformer {
    static get title() {
        return 'Group By';
    }
    static get name() {
        return 'groupBy';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.groupBy(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
