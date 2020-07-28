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
var IsTrueOperator = /** @class */ (function (_super) {
    __extends(IsTrueOperator, _super);
    function IsTrueOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsTrueOperator, "name", {
        get: function () {
            return 'isTrue';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsTrueOperator, "title", {
        get: function () {
            return 'Is True';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsTrueOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsTrueOperator, "complementaryOperatorName", {
        get: function () {
            return 'isFalse';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsTrueOperator, "complementaryOperatorTitle", {
        get: function () {
            return 'Is False';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsTrueOperator, "arguments", {
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
    IsTrueOperator.prototype.execute = function (args) {
        var value = args.value;
        return Boolean(value);
    };
    return IsTrueOperator;
}(Operator));
export { IsTrueOperator };
