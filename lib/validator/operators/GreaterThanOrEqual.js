import { Operator } from './Operator';
export class GreaterThanOrEqualOperator extends Operator {
    static get name() {
        return 'greaterThanOrEqual';
    }
    static get title() {
        return 'Greater Than Or Equal';
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
        return left >= right;
    }
}
