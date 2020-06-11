import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindLastIndexTransformer extends IterateeTransformer {
    static get title() {
        return 'Find Last Index';
    }
    static get name() {
        return 'findLastIndex';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.findLastIndex(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
