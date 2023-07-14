import Rule from './Rule';
import moment from 'moment';

export default class Time extends Rule {
    defaultMessage = '{{field}} must contain valid time';

    check(value) {
        if (this.component.isEmpty(value)) return true;
        return moment(value, this.component.component.format).isValid();
    }
}
