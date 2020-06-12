import { Operator } from './Operator';
export class IsTrueOperator extends Operator {
    static get name() {
        return 'isTrue';
    }
    static get title() {
        return 'Is True';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get complementaryOperatorName() {
        return 'isFalse';
    }
    static get complementaryOperatorTitle() {
        return 'Is False';
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
        return Boolean(value);
    }
}
