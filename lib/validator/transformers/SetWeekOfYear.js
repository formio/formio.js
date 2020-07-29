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
import { SetDateComponentTransformer } from './SetDateComponent';
var SetWeekOfYearTransformer = /** @class */ (function (_super) {
    __extends(SetWeekOfYearTransformer, _super);
    function SetWeekOfYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetWeekOfYearTransformer, "title", {
        get: function () {
            return 'Set Week of Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetWeekOfYearTransformer, "name", {
        get: function () {
            return 'setWeekOfYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetWeekOfYearTransformer, "presetArguments", {
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
    return SetWeekOfYearTransformer;
}(SetDateComponentTransformer));
export { SetWeekOfYearTransformer };
