import _ from 'lodash';
import { Transformer } from './Transformer';
export class LowerFirstTransformer extends Transformer {
    static get title() {
        return 'Lower First';
    }
    static get name() {
        return 'lowerFirst';
    }
    transform(value) {
        return _.lowerFirst(value);
    }
}
