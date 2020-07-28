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
var GetDayOfYearTransformer = /** @class */ (function (_super) {
    __extends(GetDayOfYearTransformer, _super);
    function GetDayOfYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDayOfYearTransformer, "title", {
        get: function () {
            return 'Get Day of Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDayOfYearTransformer, "name", {
        get: function () {
            return 'getDayOfYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDayOfYearTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'dayOfYear',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetDayOfYearTransformer;
}(GetDateComponentTransformer));
export { GetDayOfYearTransformer };
