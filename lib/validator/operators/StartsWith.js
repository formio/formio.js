import { Operator } from './Operator';
export class StartsWithOperator extends Operator {
    static get name() {
        return 'startsWith';
    }
    static get title() {
        return 'Starts With';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get arguments() {
        return [
            {
                name: 'String',
                key: 'string',
                required: true,
            },
            {
                name: 'Search String',
                key: 'searchString',
                required: true,
            },
        ];
    }
    execute(args) {
        var _a, _b;
        const { searchString, string, } = args;
        return (_b = (_a = string === null || string === void 0 ? void 0 : string.startsWith) === null || _a === void 0 ? void 0 : _a.call(string, searchString)) !== null && _b !== void 0 ? _b : false;
    }
}
