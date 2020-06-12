import _ from 'lodash';
import { Transformer } from './Transformer';
export class KebabCaseTransformer extends Transformer {
    static get title() {
        return 'Kebab Case';
    }
    static get name() {
        return 'kebabCase';
    }
    transform(value) {
        return _.kebabCase(value);
    }
}
