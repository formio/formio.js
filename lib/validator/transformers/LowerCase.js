import _ from 'lodash';
import { Transformer } from './Transformer';
export class LowerCaseTransformer extends Transformer {
    static get title() {
        return 'Lower Case';
    }
    static get name() {
        return 'lowerCase';
    }
    transform(value) {
        return _.lowerCase(value);
    }
}
