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
import { SetDateComponentTransformer } from './SetDateComponent';
var SetMillisecondTransformer = /** @class */ (function (_super) {
    __extends(SetMillisecondTransformer, _super);
    function SetMillisecondTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetMillisecondTransformer, "title", {
        get: function () {
            return 'Set Millisecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetMillisecondTransformer, "name", {
        get: function () {
            return 'setMillisecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetMillisecondTransformer, "presetArguments", {
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
    return SetMillisecondTransformer;
}(SetDateComponentTransformer));
export { SetMillisecondTransformer };
