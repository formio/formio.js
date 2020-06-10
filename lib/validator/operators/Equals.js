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
var EqualsOperator = /** @class */ (function (_super) {
    __extends(EqualsOperator, _super);
    function EqualsOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(EqualsOperator, "name", {
        get: function () {
            return 'equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EqualsOperator, "title", {
        get: function () {
            return 'Equals';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EqualsOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EqualsOperator, "arguments", {
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
    EqualsOperator.prototype.execute = function (args) {
        var left = args.left, right = args.right;
        return _.isEqual(left, right);
    };
    return EqualsOperator;
}(Operator));
export { EqualsOperator };
