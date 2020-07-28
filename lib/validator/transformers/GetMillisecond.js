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
var GetMillisecondTransformer = /** @class */ (function (_super) {
    __extends(GetMillisecondTransformer, _super);
    function GetMillisecondTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(GetMillisecondTransformer, "title", {
        get: function () {
            return 'Get Millisecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMillisecondTransformer, "name", {
        get: function () {
            return 'getMillisecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GetMillisecondTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'millisecond',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return GetMillisecondTransformer;
}(GetDateComponentTransformer));
export { GetMillisecondTransformer };
