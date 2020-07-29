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
var AddSecondsTransformer = /** @class */ (function (_super) {
    __extends(AddSecondsTransformer, _super);
    function AddSecondsTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddSecondsTransformer, "title", {
        get: function () {
            return 'Add Seconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddSecondsTransformer, "name", {
        get: function () {
            return 'addSeconds';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddSecondsTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'seconds',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddSecondsTransformer;
}(AddDateComponentTransformer));
export { AddSecondsTransformer };
