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
var GetDateOfMonthTransformer = /** @class */ (function (_super) {
    __extends(GetDateOfMonthTransformer, _super);
    function GetDateOfMonthTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetDateOfMonthTransformer, "title", {
        get: function () {
            return 'Get Date of Month';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateOfMonthTransformer, "name", {
        get: function () {
            return 'getDateOfMonth';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetDateOfMonthTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'date',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetDateOfMonthTransformer;
}(GetDateComponentTransformer));
export { GetDateOfMonthTransformer };
