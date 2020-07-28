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
var SetDayOfWeekTransformer = /** @class */ (function (_super) {
    __extends(SetDayOfWeekTransformer, _super);
    function SetDayOfWeekTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDayOfWeekTransformer, "title", {
        get: function () {
            return 'Set Day of Week';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDayOfWeekTransformer, "name", {
        get: function () {
            return 'setDayOfWeek';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDayOfWeekTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'isoWeekday',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetDayOfWeekTransformer;
}(SetDateComponentTransformer));
export { SetDayOfWeekTransformer };
