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
var Rule = require('./Rule');
var DateRule = /** @class */ (function (_super) {
    __extends(DateRule, _super);
    function DateRule() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} is not a valid date.';
        return _this;
    }
    DateRule.prototype.check = function (value) {
        if (!value || value instanceof Date) {
            return true;
        }
        if (value === 'Invalid date' || value === 'Invalid Date') {
            return false;
        }
        if (typeof value === 'string') {
            value = new Date(value);
        }
        return value.toString() !== 'Invalid Date';
    };
    return DateRule;
}(Rule));
export { DateRule };
;
