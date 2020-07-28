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
var GetMonthTransformer = /** @class */ (function (_super) {
    __extends(GetMonthTransformer, _super);
    function GetMonthTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetMonthTransformer, "title", {
        get: function () {
            return 'Get Month';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMonthTransformer, "name", {
        get: function () {
            return 'getMonth';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMonthTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'month',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetMonthTransformer;
}(GetDateComponentTransformer));
export { GetMonthTransformer };
