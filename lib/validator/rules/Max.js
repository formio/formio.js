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
import { Rule } from './Rule';
var Max = /** @class */ (function (_super) {
    __extends(Max, _super);
    function Max() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} cannot be greater than {{settings.limit}}.';
        return _this;
    }
    Max.prototype.check = function (value) {
        var max = parseFloat(this.settings.limit);
        if (Number.isNaN(max) || (!_.isNumber(value))) {
            return true;
        }
        return parseFloat(value) <= max;
    };
    return Max;
}(Rule));
export { Max };
