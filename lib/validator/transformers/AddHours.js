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
import { AddDateComponentTransformer } from './AddDateComponent';
var AddHoursTransformer = /** @class */ (function (_super) {
    __extends(AddHoursTransformer, _super);
    function AddHoursTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddHoursTransformer, "title", {
        get: function () {
            return 'Add Hours';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddHoursTransformer, "name", {
        get: function () {
            return 'addHours';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddHoursTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'hours',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddHoursTransformer;
}(AddDateComponentTransformer));
export { AddHoursTransformer };
