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
var SetSecondTransformer = /** @class */ (function (_super) {
    __extends(SetSecondTransformer, _super);
    function SetSecondTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetSecondTransformer, "title", {
        get: function () {
            return 'Set Second';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetSecondTransformer, "name", {
        get: function () {
            return 'setSecond';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetSecondTransformer, "presetArguments", {
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
    return SetSecondTransformer;
}(SetDateComponentTransformer));
export { SetSecondTransformer };
