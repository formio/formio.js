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
var SetDateToStartOfHourTransformer = /** @class */ (function (_super) {
    __extends(SetDateToStartOfHourTransformer, _super);
    function SetDateToStartOfHourTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetDateToStartOfHourTransformer, "title", {
        get: function () {
            return 'Set Date To Start of Hour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToStartOfHourTransformer, "name", {
        get: function () {
            return 'setDateToStartOfHour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetDateToStartOfHourTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'hour',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetDateToStartOfHourTransformer;
}(SetDateToStartOfComponentTransformer));
export { SetDateToStartOfHourTransformer };
