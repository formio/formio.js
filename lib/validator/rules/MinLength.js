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
    __extends(MinLength, _super);
    function MinLength() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} must have no more than {{- settings.length}} characters.';
        return _this;
    }
    MinLength.prototype.check = function (value) {
        var minLength = parseInt(this.settings.length, 10);
        if (!minLength || !value || !value.hasOwnProperty('length') || this.component.isEmpty(value)) {
            return true;
        }
        return (value.length >= minLength);
    };
    return MinLength;
}(Rule));
