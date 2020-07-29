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
import moment from 'moment';
import { Transformer } from './Transformer';
var GetDaysInMonthTransformer = /** @class */ (function (_super) {
    __extends(GetDaysInMonthTransformer, _super);
    function GetDaysInMonthTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDaysInMonthTransformer, "title", {
        get: function () {
            return 'Get Days In Month';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDaysInMonthTransformer, "name", {
        get: function () {
            return 'getDaysInMonth';
        },
        enumerable: false,
        configurable: true
    });
    GetDaysInMonthTransformer.prototype.transform = function (value) {
        return moment(value).daysInMonth();
    };
    return GetDaysInMonthTransformer;
}(Transformer));
export { GetDaysInMonthTransformer };
