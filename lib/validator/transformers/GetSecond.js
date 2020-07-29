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
var GetSecondTransformer = /** @class */ (function (_super) {
    __extends(GetSecondTransformer, _super);
    function GetSecondTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetSecondTransformer, "title", {
        get: function () {
            return 'Get Second';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetSecondTransformer, "name", {
        get: function () {
            return 'getSecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetSecondTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'second',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetSecondTransformer;
}(GetDateComponentTransformer));
export { GetSecondTransformer };
