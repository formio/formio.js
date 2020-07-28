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
var SetWeekYearTransformer = /** @class */ (function (_super) {
    __extends(SetWeekYearTransformer, _super);
    function SetWeekYearTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SetWeekYearTransformer, "title", {
        get: function () {
            return 'Set Week Year';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetWeekYearTransformer, "name", {
        get: function () {
            return 'setWeekYear';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SetWeekYearTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'isoWeekYear',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return SetWeekYearTransformer;
}(SetDateComponentTransformer));
export { SetWeekYearTransformer };
