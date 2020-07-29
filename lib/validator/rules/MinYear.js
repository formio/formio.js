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
import { Rule } from './Rule';
var MinYear = /** @class */ (function (_super) {
    __extends(MinYear, _super);
    function MinYear() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain year less than {{minYear}}';
        return _this;
    }
    MinYear.prototype.check = function (value) {
        var minYear = this.settings;
        var year = /\d{4}$/.exec(value);
        year = year ? year[0] : null;
        if (!(+minYear) || !(+year)) {
            return true;
        }
        return +year >= +minYear;
    };
    return MinYear;
}(Rule));
export { MinYear };
