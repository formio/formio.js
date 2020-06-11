import { Operator } from './Operator';
export class EveryOperator extends Operator {
    static get name() {
        return 'every';
    }
    static get title() {
        return 'Every';
    }
    static get hasComplementaryOperator() {
        return false;
    }
    static get lazyArgsEvaluation() {
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
                name: 'Iteratee',
                key: 'iteratee',
                required: true,
            },
        ];
    }
    execute(args) {
        var _a, _b, _c;
        const { iterable, iteratee, } = args;
        return (_c = (_b = (_a = iterable()) === null || _a === void 0 ? void 0 : _a.every) === null || _b === void 0 ? void 0 : _b.call(_a, this.getIteratee(iteratee))) !== null && _c !== void 0 ? _c : false;
    }
}
