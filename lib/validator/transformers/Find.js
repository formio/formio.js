import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindTransformer extends IterateeTransformer {
    static get title() {
        return 'Find';
    }
    static get name() {
        return 'find';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.find(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
