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
var XorConjunction = /** @class */ (function (_super) {
    __extends(XorConjunction, _super);
    function XorConjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(XorConjunction, "name", {
        get: function () {
            return 'xor';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XorConjunction, "title", {
        get: function () {
            return 'Xor';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XorConjunction, "weight", {
        get: function () {
            return 20;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(XorConjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    XorConjunction.prototype.execute = function (conditionParts) {
        var amount = 0;
        for (var _i = 0, conditionParts_1 = conditionParts; _i < conditionParts_1.length; _i++) {
            var conditionPart = conditionParts_1[_i];
            var result = conditionPart();
            if (result) {
                amount += 1;
                if (amount > 1) {
                    return false;
                }
            }
        }
        return true;
    };
    return XorConjunction;
}(Conjunction));
export { XorConjunction };
