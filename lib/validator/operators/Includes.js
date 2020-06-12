import { Operator } from './Operator';
export class IncludesOperator extends Operator {
    static get name() {
        return 'includes';
    }
    static get title() {
        return 'Includes';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'Iterable',
                key: 'iterable',
                required: true,
            },
            {
                name: 'Value To Search',
                key: 'valueToSearch',
                required: true,
            },
        ];
    }
    execute(args) {
        var _a, _b;
        const { iterable, valueToSearch, } = args;
        return (_b = (_a = iterable === null || iterable === void 0 ? void 0 : iterable.includes) === null || _a === void 0 ? void 0 : _a.call(iterable, valueToSearch)) !== null && _b !== void 0 ? _b : false;
    }
}
