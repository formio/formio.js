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
var Rule = require('./Rule');
var Min = /** @class */ (function (_super) {
    __extends(Min, _super);
    function Min() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} cannot be less than {{settings.limit}}.';
        return _this;
    }
    Min.prototype.check = function (value) {
        var min = parseFloat(this.settings.limit);
        if (Number.isNaN(min) || (!_.isNumber(value))) {
            return true;
        }
        return parseFloat(value) >= min;
    };
    return Min;
}(Rule));
export { Min };
;
