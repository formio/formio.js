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
import { BaseEntity } from '../BaseEntity';
var Conjunction = /** @class */ (function (_super) {
    __extends(Conjunction, _super);
    function Conjunction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(Conjunction, "weight", {
        get: function () {
            return 0;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Conjunction, "lazyConditionPartsEvaluation", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Conjunction.prototype.execute = function (conditionParts) {
        throw new Error('Method #execute() is abstract.');
    };
    return Conjunction;
}(BaseEntity));
export { Conjunction };
