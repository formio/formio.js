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
var BetweenOperator = /** @class */ (function (_super) {
    __extends(BetweenOperator, _super);
    function BetweenOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(BetweenOperator, "name", {
        get: function () {
            return 'between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenOperator, "title", {
        get: function () {
            return 'Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value',
                    key: 'value',
                    required: true,
                },
                {
                    name: 'From',
                    key: 'from',
                    required: false,
                },
                {
                    name: 'To',
                    key: 'to',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BetweenOperator, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Columns',
                    key: 'optionsColumns',
                    type: 'columns',
                    input: false,
                    columns: [
                        {
                            components: [
                                {
                                    label: 'Exclude "From"',
                                    key: 'excludeFrom',
                                    type: 'checkbox',
                                    input: true,
                                },
                            ],
                            width: 6,
                        },
                        {
                            components: [
                                {
                                    label: 'Exclude "To"',
                                    key: 'excludeTo',
                                    type: 'checkbox',
                                    input: true,
                                },
                            ],
                            width: 6,
                        },
                    ],
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    BetweenOperator.prototype.execute = function (args, opts) {
        if (opts === void 0) { opts = {}; }
        var value = args.value, from = args.from, to = args.to;
        var _a = opts.excludeFrom, excludeFrom = _a === void 0 ? false : _a, _b = opts.excludeTo, excludeTo = _b === void 0 ? false : _b;
        return (excludeFrom ? (from < value) : (from <= value)) && (excludeTo ? (value < to) : (value <= to));
    };
    return BetweenOperator;
}(Operator));
export { BetweenOperator };
