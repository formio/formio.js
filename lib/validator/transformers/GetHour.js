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
var GetHourTransformer = /** @class */ (function (_super) {
    __extends(GetHourTransformer, _super);
    function GetHourTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetHourTransformer, "title", {
        get: function () {
            return 'Get Hour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetHourTransformer, "name", {
        get: function () {
            return 'getHour';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetHourTransformer, "presetArguments", {
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
    return GetHourTransformer;
}(GetDateComponentTransformer));
export { GetHourTransformer };
