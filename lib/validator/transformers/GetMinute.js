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
var GetMinuteTransformer = /** @class */ (function (_super) {
    __extends(GetMinuteTransformer, _super);
    function GetMinuteTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetMinuteTransformer, "title", {
        get: function () {
            return 'Get Minute';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMinuteTransformer, "name", {
        get: function () {
            return 'getMinute';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMinuteTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'minute',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetMinuteTransformer;
}(GetDateComponentTransformer));
export { GetMinuteTransformer };
