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
var CamelCaseTransformer = /** @class */ (function (_super) {
    __extends(CamelCaseTransformer, _super);
    function CamelCaseTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CamelCaseTransformer, "title", {
        get: function () {
            return 'Camel Case';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CamelCaseTransformer, "name", {
        get: function () {
            return 'camelCase';
        },
        enumerable: false,
        configurable: true
    });
    CamelCaseTransformer.prototype.transform = function (value) {
        return _.camelCase(value);
    };
    return CamelCaseTransformer;
}(Transformer));
export { CamelCaseTransformer };
