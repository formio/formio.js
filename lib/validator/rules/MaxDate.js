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
var Rule = require('./Rule');
module.exports = /** @class */ (function (_super) {
    __extends(MaxDate, _super);
    function MaxDate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} should not contain date after {{settings.dateLimit}}';
        return _this;
    }
    MaxDate.prototype.check = function (value) {
        if (!value) {
            return true;
        }
        // If they are the exact same string or object, then return true.
        if (value === this.settings.dateLimit) {
            return true;
        }
        var date = moment(value);
        var maxDate = getDateSetting(this.settings.dateLimit);
        if (_.isNull(maxDate)) {
            return true;
        }
        else {
            maxDate.setHours(0, 0, 0, 0);
        }
        return date.isBefore(maxDate) || date.isSame(maxDate);
    };
    return MaxDate;
}(Rule));
