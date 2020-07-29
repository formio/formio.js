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
import _ from 'lodash';
import { Operator } from './Operator';
var IsNilOperator = /** @class */ (function (_super) {
    __extends(IsNilOperator, _super);
    function IsNilOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IsNilOperator, "name", {
        get: function () {
            return 'isNil';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsNilOperator, "title", {
        get: function () {
            return 'Is Nil';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsNilOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IsNilOperator, "arguments", {
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
    IsNilOperator.prototype.execute = function (args) {
        var value = args.value;
        return _.isNil(value) || Number.isNaN(value);
    };
    return IsNilOperator;
}(Operator));
export { IsNilOperator };
