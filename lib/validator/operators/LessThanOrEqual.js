import { Operator } from './Operator';
export class LessThanOrEqualOperator extends Operator {
    static get name() {
        return 'lessThanOrEqual';
    }
    static get title() {
        return 'Less Than Or Equal';
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
        return left <= right;
    }
}
