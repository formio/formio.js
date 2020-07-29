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
var GetDaysBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetDaysBetweenTransformer, _super);
    function GetDaysBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDaysBetweenTransformer, "title", {
        get: function () {
            return 'Get Days Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDaysBetweenTransformer, "name", {
        get: function () {
            return 'getDaysBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDaysBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'days',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetDaysBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetDaysBetweenTransformer };
