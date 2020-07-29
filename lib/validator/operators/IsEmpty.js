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
var IsEmptyOperator = /** @class */ (function (_super) {
    __extends(IsEmptyOperator, _super);
    function IsEmptyOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsEmptyOperator, "name", {
        get: function () {
            return 'isEmpty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEmptyOperator, "title", {
        get: function () {
            return 'Is Empty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEmptyOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsEmptyOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Component',
                    key: 'component',
                    required: true,
                },
                {
                    name: 'Value',
                    key: 'value',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    IsEmptyOperator.prototype.execute = function (args) {
        var _a;
        var component = args.component, value = args.value;
        return (_a = component === null || component === void 0 ? void 0 : component.isEmpty) === null || _a === void 0 ? void 0 : _a.call(component, value !== null && value !== void 0 ? value : component.dataValue);
    };
    return IsEmptyOperator;
}(Operator));
export { IsEmptyOperator };
