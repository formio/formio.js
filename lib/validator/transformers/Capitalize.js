import _ from 'lodash';
import { Transformer } from './Transformer';
export class CapitalizeTransformer extends Transformer {
    static get title() {
        return 'Capitalize';
    }
    static get name() {
        return 'capitalize';
    }
    transform(value) {
        return _.capitalize(value);
    }
}
