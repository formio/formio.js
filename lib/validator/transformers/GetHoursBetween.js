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
var GetHoursBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetHoursBetweenTransformer, _super);
    function GetHoursBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetHoursBetweenTransformer, "title", {
        get: function () {
            return 'Get Hours Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetHoursBetweenTransformer, "name", {
        get: function () {
            return 'getHoursBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetHoursBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'hours',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetHoursBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetHoursBetweenTransformer };
