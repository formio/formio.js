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
var MaxYear = /** @class */ (function (_super) {
    __extends(MaxYear, _super);
    function MaxYear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain year greater than {{maxYear}}';
        return _this;
    }
    MaxYear.prototype.check = function (value) {
        var maxYear = this.settings;
        var year = /\d{4}$/.exec(value);
        year = year ? year[0] : null;
        if (!(+maxYear) || !(+year)) {
            return true;
        }
        return +year <= +maxYear;
    };
    return MaxYear;
}(Rule));
export { MaxYear };
;
