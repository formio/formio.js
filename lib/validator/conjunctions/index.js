var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { AndConjunction } from './And';
import { NandConjunction } from './Nand';
import { NorConjunction } from './Nor';
import { OrConjunction } from './Or';
import { XorConjunction } from './Xor';
var conjunctions = [
    AndConjunction,
    NandConjunction,
    NorConjunction,
    OrConjunction,
    XorConjunction,
].reduce(function (result, valueSource) {
    var _a;
    return (__assign(__assign({}, result), (_a = {}, _a[valueSource.name] = valueSource, _a)));
}, {});
var Conjunctions = /** @class */ (function () {
    function Conjunctions() {
    }
    Conjunctions.addConjunction = function (name, conjunction) {
        Conjunctions.conjunctions[name] = conjunction;
    };
    Conjunctions.addConjunctions = function (conjunctions) {
        Conjunctions.conjunctions = __assign(__assign({}, Conjunctions.conjunctions), conjunctions);
    };
    Conjunctions.getConjunction = function (name) {
        return Conjunctions.conjunctions[name];
    };
    Conjunctions.getConjunctions = function () {
        return Conjunctions.conjunctions;
    };
    Conjunctions.conjunctions = conjunctions;
    return Conjunctions;
}());
export { Conjunctions };
