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
var OrConjunction = /** @class */ (function (_super) {
    __extends(OrConjunction, _super);
    function OrConjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(OrConjunction, "name", {
        get: function () {
            return 'or';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrConjunction, "title", {
        get: function () {
            return 'Or';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrConjunction, "weight", {
        get: function () {
            return 10;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(OrConjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    OrConjunction.prototype.execute = function (conditionParts) {
        return conditionParts.reduce(function (result, conditionPart) { return (result || conditionPart()); }, false);
    };
    return OrConjunction;
}(Conjunction));
export { OrConjunction };
