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
import { GetDateDifferenceTransformer } from './GetDateDifference';
var GetMinutesBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetMinutesBetweenTransformer, _super);
    function GetMinutesBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetMinutesBetweenTransformer, "title", {
        get: function () {
            return 'Get Minutes Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMinutesBetweenTransformer, "name", {
        get: function () {
            return 'getMinutesBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMinutesBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'minutes',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetMinutesBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetMinutesBetweenTransformer };
