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
var Required = /** @class */ (function (_super) {
    __extends(Required, _super);
    function Required() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} is required';
        return _this;
    }
    Required.prototype.check = function (value) {
        // TODO: Day, Survey overrides.
        return !this.component.isValueHidden() && !this.component.isEmpty(value);
    };
    return Required;
}(Rule));
export { Required };
;
