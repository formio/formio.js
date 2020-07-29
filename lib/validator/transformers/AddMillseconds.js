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
var AddMillsecondsTransformer = /** @class */ (function (_super) {
    __extends(AddMillsecondsTransformer, _super);
    function AddMillsecondsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddMillsecondsTransformer, "title", {
        get: function () {
            return 'Add Millseconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMillsecondsTransformer, "name", {
        get: function () {
            return 'addMillseconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMillsecondsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'milliseconds',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddMillsecondsTransformer;
}(AddDateComponentTransformer));
export { AddMillsecondsTransformer };
