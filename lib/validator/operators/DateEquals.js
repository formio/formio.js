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
            {
                name: 'Granularity',
                key: 'granularity',
                required: false,
            },
        ];
    }
    execute(args) {
        const { left, right, granularity = 'millisecond', } = args;
        return moment(left).isSame(right, granularity);
    }
}
