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
    __extends(Pattern, _super);
    function Pattern() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} does not match the pattern {{settings.pattern}}';
        return _this;
    }
    Pattern.prototype.check = function (value) {
        var pattern = this.settings.pattern;
        if (!pattern) {
            return true;
        }
        return (new RegExp("^" + pattern + "$")).test(value);
    };
    return Pattern;
}(Rule));
