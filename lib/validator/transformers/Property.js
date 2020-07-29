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
var PropertyTransformer = /** @class */ (function (_super) {
    __extends(PropertyTransformer, _super);
    function PropertyTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(PropertyTransformer, "title", {
        get: function () {
            return 'Property';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropertyTransformer, "name", {
        get: function () {
            return 'property';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PropertyTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Path',
                    key: 'path',
                    required: false,
                },
                {
                    name: 'Default Value',
                    key: 'defaultValue',
                    required: false,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    PropertyTransformer.prototype.transform = function (value, args) {
        var path = args.path, defaultValue = args.defaultValue;
        return _.get(value, path, defaultValue !== null && defaultValue !== void 0 ? defaultValue : value);
    };
    return PropertyTransformer;
}(Transformer));
export { PropertyTransformer };
