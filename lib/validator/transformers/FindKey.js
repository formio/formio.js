import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindKeyTransformer extends IterateeTransformer {
    static get title() {
        return 'Find Key';
    }
    static get name() {
        return 'findKey';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.findKey(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
