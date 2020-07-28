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
var GetMonthsBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetMonthsBetweenTransformer, _super);
    function GetMonthsBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetMonthsBetweenTransformer, "title", {
        get: function () {
            return 'Get Months Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMonthsBetweenTransformer, "name", {
        get: function () {
            return 'getMonthsBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMonthsBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'months',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetMonthsBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetMonthsBetweenTransformer };
