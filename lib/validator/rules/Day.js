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
module.exports = /** @class */ (function (_super) {
    __extends(Day, _super);
    function Day() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} is not a valid day.';
        return _this;
    }
    Day.prototype.check = function (value) {
        if (!value) {
            return true;
        }
        if (typeof value !== 'string') {
            return false;
        }
        var _a = this.component.dayFirst ? [0, 1, 2] : [1, 0, 2], DAY = _a[0], MONTH = _a[1], YEAR = _a[2];
        var values = value.split('/').map(function (x) { return parseInt(x, 10); }), day = values[DAY], month = values[MONTH], year = values[YEAR], maxDay = getDaysInMonthCount(month, year);
        if (isNaN(day) || day < 0 || day > maxDay) {
            return false;
        }
        if (isNaN(month) || month < 0 || month > 12) {
            return false;
        }
        if (isNaN(year) || year < 0 || year > 9999) {
            return false;
        }
        return true;
        function isLeapYear(year) {
            // Year is leap if it is evenly divisible by 400 or evenly divisible by 4 and not evenly divisible by 100.
            return !(year % 400) || (!!(year % 100) && !(year % 4));
        }
        function getDaysInMonthCount(month, year) {
            switch (month) {
                case 1: // January
                case 3: // March
                case 5: // May
                case 7: // July
                case 8: // August
                case 10: // October
                case 12: // December
                    return 31;
                case 4: // April
                case 6: // June
                case 9: // September
                case 11: // November
                    return 30;
                case 2: // February
                    return isLeapYear(year) ? 29 : 28;
                default:
                    return 31;
            }
        }
    };
    return Day;
}(Rule));
