import _ from 'lodash';
import { IterateeTransformer } from './Iteratee';
export class MapTransformer extends IterateeTransformer {
    static get title() {
        return 'Map';
    }
    static get name() {
        return 'map';
    }
    transform(value, args) {
        var _a;
        const { iteratee, } = args;
        return (_a = _.map(value, this.getIteratee(iteratee))) !== null && _a !== void 0 ? _a : null;
    }
}
