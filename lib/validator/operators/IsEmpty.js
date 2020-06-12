import { Operator } from './Operator';
export class IsEmptyOperator extends Operator {
    static get name() {
        return 'isEmpty';
    }
    static get title() {
        return 'Is Empty';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'Component',
                key: 'component',
                required: true,
            },
            {
                name: 'Value',
                key: 'value',
                required: false,
            },
        ];
    }
    execute(args) {
        var _a;
        const { component, value, } = args;
        return (_a = component === null || component === void 0 ? void 0 : component.isEmpty) === null || _a === void 0 ? void 0 : _a.call(component, value !== null && value !== void 0 ? value : component.dataValue);
    }
}
