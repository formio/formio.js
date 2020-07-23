import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class MapKeysTransformer extends IterateeTransformer {
    static get title() {
        return 'Map Keys';
    }
    static get name() {
        return 'mapKeys';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.mapKeys(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
