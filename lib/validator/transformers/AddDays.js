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
var AddDaysTransformer = /** @class */ (function (_super) {
    __extends(AddDaysTransformer, _super);
    function AddDaysTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddDaysTransformer, "title", {
        get: function () {
            return 'Add Days';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddDaysTransformer, "name", {
        get: function () {
            return 'addDays';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddDaysTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'days',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddDaysTransformer;
}(AddDateComponentTransformer));
export { AddDaysTransformer };
