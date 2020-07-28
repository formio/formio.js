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
import _ from 'lodash';
import { Transformer } from './Transformer';
var AddPropertyTransformer = /** @class */ (function (_super) {
    __extends(AddPropertyTransformer, _super);
    function AddPropertyTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AddPropertyTransformer, "title", {
        get: function () {
            return 'Add Property';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddPropertyTransformer, "name", {
        get: function () {
            return 'addProperty';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AddPropertyTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Name',
                    key: 'name',
                    required: true,
                },
                {
                    name: 'Value',
                    key: 'value',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    AddPropertyTransformer.prototype.transform = function (value, args) {
        var _a;
        var name = args.name, propValue = args.value;
        return _.assign({}, value, (_a = {},
            _a[name] = propValue,
            _a));
    };
    return AddPropertyTransformer;
}(Transformer));
export { AddPropertyTransformer };
