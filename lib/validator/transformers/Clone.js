import _ from 'lodash';
import { Transformer } from './Transformer';
export class CloneTransformer extends Transformer {
    static get title() {
        return 'Clone';
    }
    static get name() {
        return 'clone';
    }
    transform(value) {
        return _.clone(value);
    }
}
