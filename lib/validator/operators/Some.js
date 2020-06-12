import { Operator } from './Operator';
export class SomeOperator extends Operator {
    static get name() {
        return 'some';
    }
    static get title() {
        return 'Some';
    }
    static get hasComplementaryOperator() {
        return true;
    }
    static get complementaryOperatorName() {
        return 'none';
    }
    static get complementaryOperatorTitle() {
        return 'None';
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
        return (_c = (_b = (_a = iterable()) === null || _a === void 0 ? void 0 : _a.some) === null || _b === void 0 ? void 0 : _b.call(_a, this.getIteratee(iteratee))) !== null && _c !== void 0 ? _c : false;
    }
}
