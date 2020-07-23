import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class FindIndexTransformer extends IterateeTransformer {
    static get title() {
        return 'Find Index';
    }
    static get name() {
        return 'findIndex';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.findIndex(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
