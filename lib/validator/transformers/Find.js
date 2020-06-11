import { IterateeTransformer } from './Iteratee';
export class FindTransformer extends IterateeTransformer {
    static get title() {
        return 'Find';
    }
    static get name() {
        return 'find';
    }
    transform(value, args) {
        var _a, _b;
        const { iteratee, } = args;
        return (_b = (_a = value === null || value === void 0 ? void 0 : value.find) === null || _a === void 0 ? void 0 : _a.call(value, this.getIteratee(iteratee))) !== null && _b !== void 0 ? _b : null;
    }
}
