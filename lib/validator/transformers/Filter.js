import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FilterTransformer extends IterateeTransformer {
    static get title() {
        return 'Filter';
    }
    static get name() {
        return 'filter';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.filter(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
