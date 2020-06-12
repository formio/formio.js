import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindLastTransformer extends IterateeTransformer {
    static get title() {
        return 'Find Last';
    }
    static get name() {
        return 'findLast';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.findLast(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
