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
var AddYearsTransformer = /** @class */ (function (_super) {
    __extends(AddYearsTransformer, _super);
    function AddYearsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddYearsTransformer, "title", {
        get: function () {
            return 'Add Years';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddYearsTransformer, "name", {
        get: function () {
            return 'addYears';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddYearsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'years',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddYearsTransformer;
}(AddDateComponentTransformer));
export { AddYearsTransformer };
