import { Operator } from './Operator';
export class IsZeroLengthOperator extends Operator {
    static get name() {
        return 'isZeroLength';
    }
    static get title() {
        return 'Is Zero Length';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'Value',
                key: 'value',
                required: true,
            },
        ];
    }
    execute(args) {
        const { value, } = args;
        return (value === '') || (Array.isArray(value) && value.length === 0);
    }
}
