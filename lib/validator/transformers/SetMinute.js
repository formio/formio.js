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
var SetMinuteTransformer = /** @class */ (function (_super) {
    __extends(SetMinuteTransformer, _super);
    function SetMinuteTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetMinuteTransformer, "title", {
        get: function () {
            return 'Set Minute';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetMinuteTransformer, "name", {
        get: function () {
            return 'setMinute';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetMinuteTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'minute',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetMinuteTransformer;
}(SetDateComponentTransformer));
export { SetMinuteTransformer };
