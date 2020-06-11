import moment from 'moment';
import { Operator } from './Operator';
export class DateEqualsOperator extends Operator {
    static get name() {
        return 'dateEquals';
    }
    static get title() {
        return 'Date Equals';
    }
    static get hasComplementaryOperator() {
        return true;
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
        return moment(left).isSame(right);
    }
}
