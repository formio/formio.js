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
var SetHourTransformer = /** @class */ (function (_super) {
    __extends(SetHourTransformer, _super);
    function SetHourTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetHourTransformer, "title", {
        get: function () {
            return 'Set Hour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetHourTransformer, "name", {
        get: function () {
            return 'setHour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetHourTransformer, "presetArguments", {
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
    return SetHourTransformer;
}(SetDateComponentTransformer));
export { SetHourTransformer };
