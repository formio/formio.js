import _ from 'lodash';
import { Transformer } from './Transformer';
export class StartCaseTransformer extends Transformer {
    static get title() {
        return 'Start Case';
    }
    static get name() {
        return 'startCase';
    }
    transform(value) {
        return _.startCase(value);
    }
}
