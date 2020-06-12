import moment from 'moment';
import { Transformer } from './Transformer';
export class GetWeeksInYearTransformer extends Transformer {
    static get title() {
        return 'Get Weeks In Year';
    }
    static get name() {
        return 'getWeeksInYear';
    }
    transform(value) {
        return moment(value).isoWeeksInYear();
    }
}
