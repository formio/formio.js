import _ from 'lodash';
import { Transformer } from './Transformer';
export class ToUpperTransformer extends Transformer {
    static get title() {
        return 'To Upper';
    }
    static get name() {
        return 'toUpper';
    }
    transform(value) {
        return _.toUpper(value);
    }
}
