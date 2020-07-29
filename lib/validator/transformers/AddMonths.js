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
var AddMonthsTransformer = /** @class */ (function (_super) {
    __extends(AddMonthsTransformer, _super);
    function AddMonthsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddMonthsTransformer, "title", {
        get: function () {
            return 'Add Months';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMonthsTransformer, "name", {
        get: function () {
            return 'addMonths';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMonthsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'months',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddMonthsTransformer;
}(AddDateComponentTransformer));
export { AddMonthsTransformer };
