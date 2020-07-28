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
import { Operator } from './Operator';
var IsZeroLengthOperator = /** @class */ (function (_super) {
    __extends(IsZeroLengthOperator, _super);
    function IsZeroLengthOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsZeroLengthOperator, "name", {
        get: function () {
            return 'isZeroLength';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsZeroLengthOperator, "title", {
        get: function () {
            return 'Is Zero Length';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsZeroLengthOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsZeroLengthOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value',
                    key: 'value',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    IsZeroLengthOperator.prototype.execute = function (args) {
        var value = args.value;
        return (value === '') || (Array.isArray(value) && value.length === 0);
    };
    return IsZeroLengthOperator;
}(Operator));
export { IsZeroLengthOperator };
