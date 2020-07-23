import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindLastKeyTransformer extends IterateeTransformer {
    static get title() {
        return 'Find Last Key';
    }
    static get name() {
        return 'findLastKey';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.findLastKey(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
