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
var GetWeeksInYearTransformer = /** @class */ (function (_super) {
    __extends(GetWeeksInYearTransformer, _super);
    function GetWeeksInYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetWeeksInYearTransformer, "title", {
        get: function () {
            return 'Get Weeks In Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeeksInYearTransformer, "name", {
        get: function () {
            return 'getWeeksInYear';
        },
        enumerable: false,
        configurable: true
    });
    GetWeeksInYearTransformer.prototype.transform = function (value) {
        return moment(value).isoWeeksInYear();
    };
    return GetWeeksInYearTransformer;
}(Transformer));
export { GetWeeksInYearTransformer };
