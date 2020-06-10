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
var NandConjunction = /** @class */ (function (_super) {
    __extends(NandConjunction, _super);
    function NandConjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NandConjunction, "name", {
        get: function () {
            return 'nand';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NandConjunction, "title", {
        get: function () {
            return 'Nand';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NandConjunction, "weight", {
        get: function () {
            return 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NandConjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    NandConjunction.prototype.execute = function (conditionParts) {
        return conditionParts.reduce(function (result, conditionPart) { return (result || !conditionPart()); }, false);
    };
    return NandConjunction;
}(Conjunction));
export { NandConjunction };
