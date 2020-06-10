var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Conjunction } from './Conjunction';
var NorConjunction = /** @class */ (function (_super) {
    __extends(NorConjunction, _super);
    function NorConjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NorConjunction, "name", {
        get: function () {
            return 'nor';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NorConjunction, "title", {
        get: function () {
            return 'Nor';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NorConjunction, "weight", {
        get: function () {
            return 40;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NorConjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    NorConjunction.prototype.execute = function (conditionParts) {
        return conditionParts.reduce(function (result, conditionPart) { return (result && !conditionPart()); }, true);
    };
    return NorConjunction;
}(Conjunction));
export { NorConjunction };
