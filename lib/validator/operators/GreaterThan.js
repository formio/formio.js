import { Operator } from './Operator';
export class GreaterThanOperator extends Operator {
    static get name() {
        return 'greaterThan';
    }
    static get title() {
        return 'Greater Than';
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
        return left > right;
    }
}
