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
var MatchPatternOperator = /** @class */ (function (_super) {
    __extends(MatchPatternOperator, _super);
    function MatchPatternOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MatchPatternOperator, "name", {
        get: function () {
            return 'matchPattern';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatchPatternOperator, "title", {
        get: function () {
            return 'Match Pattern';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatchPatternOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatchPatternOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value',
                    key: 'value',
                    required: true,
                },
                {
                    name: 'Pattern',
                    key: 'pattern',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MatchPatternOperator, "optionsEditForm", {
        get: function () {
            return [
                {
                    label: 'Case-insensitive',
                    key: 'caseInsensitive',
                    type: 'checkbox',
                    input: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    MatchPatternOperator.prototype.execute = function (args, opts) {
        if (opts === void 0) { opts = {}; }
        var pattern = args.pattern, value = args.value;
        var _a = opts.caseInsensitive, caseInsensitive = _a === void 0 ? false : _a;
        var flags = '';
        if (caseInsensitive) {
            flags += 'i';
        }
        return new RegExp(pattern, flags).test(value);
    };
    return MatchPatternOperator;
}(Operator));
export { MatchPatternOperator };
