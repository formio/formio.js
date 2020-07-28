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
import { GetDateComponentTransformer } from './GetDateComponent';
var GetWeekOfYearTransformer = /** @class */ (function (_super) {
    __extends(GetWeekOfYearTransformer, _super);
    function GetWeekOfYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetWeekOfYearTransformer, "title", {
        get: function () {
            return 'Get Week of Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeekOfYearTransformer, "name", {
        get: function () {
            return 'getWeekOfYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeekOfYearTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'isoWeek',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetWeekOfYearTransformer;
}(GetDateComponentTransformer));
export { GetWeekOfYearTransformer };
