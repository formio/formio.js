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
import { SetDateToStartOfComponentTransformer } from './SetDateToStartOfComponent';
var SetDateToStartOfDayTransformer = /** @class */ (function (_super) {
    __extends(SetDateToStartOfDayTransformer, _super);
    function SetDateToStartOfDayTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateToStartOfDayTransformer, "title", {
        get: function () {
            return 'Set Date To Start of Day';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToStartOfDayTransformer, "name", {
        get: function () {
            return 'setDateToStartOfDay';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToStartOfDayTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'day',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetDateToStartOfDayTransformer;
}(SetDateToStartOfComponentTransformer));
export { SetDateToStartOfDayTransformer };
