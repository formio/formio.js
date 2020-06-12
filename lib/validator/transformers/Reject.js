import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class RejectTransformer extends IterateeTransformer {
    static get title() {
        return 'Reject';
    }
    static get name() {
        return 'reject';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.reject(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
