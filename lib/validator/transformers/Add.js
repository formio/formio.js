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
import { Transformer } from './Transformer';
var AddTransformer = /** @class */ (function (_super) {
    __extends(AddTransformer, _super);
    function AddTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddTransformer, "title", {
        get: function () {
            return 'Add';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddTransformer, "name", {
        get: function () {
            return 'add';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Value To Add',
                    key: 'valueToAdd',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    AddTransformer.prototype.transform = function (value, args) {
        var valueToAdd = args.valueToAdd;
        return value + valueToAdd;
    };
    return AddTransformer;
}(Transformer));
export { AddTransformer };
