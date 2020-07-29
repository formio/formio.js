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
var GetYearTransformer = /** @class */ (function (_super) {
    __extends(GetYearTransformer, _super);
    function GetYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetYearTransformer, "title", {
        get: function () {
            return 'Get Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetYearTransformer, "name", {
        get: function () {
            return 'getYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetYearTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'year',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetYearTransformer;
}(GetDateComponentTransformer));
export { GetYearTransformer };
