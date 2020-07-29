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
var GetWeekYearTransformer = /** @class */ (function (_super) {
    __extends(GetWeekYearTransformer, _super);
    function GetWeekYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetWeekYearTransformer, "title", {
        get: function () {
            return 'Get Week Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeekYearTransformer, "name", {
        get: function () {
            return 'getWeekYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeekYearTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'isoWeekYear',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetWeekYearTransformer;
}(GetDateComponentTransformer));
export { GetWeekYearTransformer };
