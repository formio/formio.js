import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class MapValuesTransformer extends IterateeTransformer {
    static get title() {
        return 'Map Values';
    }
    static get name() {
        return 'mapValues';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.mapValues(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
