import moment from 'moment';
import { Operator } from './Operator';
export class DateLessThanOrEqualOperator extends Operator {
    static get name() {
        return 'dateLessThanOrEqual';
    }
    static get title() {
        return 'Date Less Than Or Equal';
    }
    static get arguments() {
        return [
            {
                name: 'Left Side',
                key: 'left',
                required: true,
            },
            {
                name: 'Right Side',
                key: 'right',
                required: true,
            },
        ];
    }
    execute(args) {
        const { left, right, } = args;
        return moment(left).isSameOrBefore(right);
    }
}
