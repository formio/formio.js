import _ from 'lodash';
import { Transformer } from './Transformer';
export class CloneDeepTransformer extends Transformer {
    static get title() {
        return 'Clone Deep';
    }
    static get name() {
        return 'cloneDeep';
    }
    transform(value) {
        return _.cloneDeep(value);
    }
}
