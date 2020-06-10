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
import moment from 'moment';
import { Operator } from './Operator';
var DateEqualsOperator = /** @class */ (function (_super) {
    __extends(DateEqualsOperator, _super);
    function DateEqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DateEqualsOperator, "name", {
        get: function () {
            return 'dateEquals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateEqualsOperator, "title", {
        get: function () {
            return 'Date Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateEqualsOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DateEqualsOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Left Side',
                    key: 'left',
                    required: true,
                },
                {
                    name: 'Right Side',
                    key: 'right',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    DateEqualsOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right;
        return moment(left).isSame(right);
    };
    return DateEqualsOperator;
}(Operator));
export { DateEqualsOperator };
