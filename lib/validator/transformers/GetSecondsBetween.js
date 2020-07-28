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
var GetSecondsBetweenTransformer = /** @class */ (function (_super) {
    __extends(GetSecondsBetweenTransformer, _super);
    function GetSecondsBetweenTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetSecondsBetweenTransformer, "title", {
        get: function () {
            return 'Get Seconds Between';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetSecondsBetweenTransformer, "name", {
        get: function () {
            return 'getSecondsBetween';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetSecondsBetweenTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'seconds',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetSecondsBetweenTransformer;
}(GetDateDifferenceTransformer));
export { GetSecondsBetweenTransformer };
