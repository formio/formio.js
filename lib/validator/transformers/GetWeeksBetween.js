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
var GetWeeksBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetWeeksBetweenTransformer, _super);
    function GetWeeksBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetWeeksBetweenTransformer, "title", {
        get: function () {
            return 'Get Weeks Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeeksBetweenTransformer, "name", {
        get: function () {
            return 'getWeeksBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetWeeksBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'weeks',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetWeeksBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetWeeksBetweenTransformer };
