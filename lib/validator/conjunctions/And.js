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
var AndConjunction = /** @class */ (function (_super) {
    __extends(AndConjunction, _super);
    function AndConjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AndConjunction, "name", {
        get: function () {
            return 'and';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AndConjunction, "title", {
        get: function () {
            return 'And';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AndConjunction, "weight", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AndConjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    AndConjunction.prototype.execute = function (conditionParts) {
        return conditionParts.reduce(function (result, conditionPart) { return (result && conditionPart()); }, true);
    };
    return AndConjunction;
}(Conjunction));
export { AndConjunction };
