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
var AddMinutesTransformer = /** @class */ (function (_super) {
    __extends(AddMinutesTransformer, _super);
    function AddMinutesTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddMinutesTransformer, "title", {
        get: function () {
            return 'Add Minutes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMinutesTransformer, "name", {
        get: function () {
            return 'addMinutes';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddMinutesTransformer, "presetArguments", {
        get: function () {
            return {
                unit: {
                    valueSource: 'string',
                    stringInput: 'minutes',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    return AddMinutesTransformer;
}(AddDateComponentTransformer));
export { AddMinutesTransformer };
