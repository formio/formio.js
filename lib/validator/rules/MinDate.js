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
import { getDateSetting } from '../../utils/utils';
import moment from 'moment';
import _ from 'lodash';
import { Rule } from './Rule';
var MinDate = /** @class */ (function (_super) {
    __extends(MinDate, _super);
    function MinDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain date before {{settings.dateLimit}}';
        return _this;
    }
    MinDate.prototype.check = function (value) {
        if (!value) {
            return true;
        }
        var date = moment(value);
        var minDate = getDateSetting(this.settings.dateLimit);
        if (_.isNull(minDate)) {
            return true;
        }
        else {
            minDate.setHours(0, 0, 0, 0);
        }
        return date.isAfter(minDate) || date.isSame(minDate);
    };
    return MinDate;
}(Rule));
export { MinDate };
