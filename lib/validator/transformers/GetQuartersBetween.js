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
var GetQuartersBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetQuartersBetweenTransformer, _super);
    function GetQuartersBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetQuartersBetweenTransformer, "title", {
        get: function () {
            return 'Get Quarters Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetQuartersBetweenTransformer, "name", {
        get: function () {
            return 'getQuartersBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetQuartersBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'quarters',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetQuartersBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetQuartersBetweenTransformer };
