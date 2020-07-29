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
var GetYearsBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetYearsBetweenTransformer, _super);
    function GetYearsBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetYearsBetweenTransformer, "title", {
        get: function () {
            return 'Get Years Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetYearsBetweenTransformer, "name", {
        get: function () {
            return 'getYearsBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetYearsBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'years',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetYearsBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetYearsBetweenTransformer };
