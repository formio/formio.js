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
var KebabCaseTransformer = /** @class */ (function (_super) {
    __extends(KebabCaseTransformer, _super);
    function KebabCaseTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(KebabCaseTransformer, "title", {
        get: function () {
            return 'Kebab Case';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(KebabCaseTransformer, "name", {
        get: function () {
            return 'kebabCase';
        },
        enumerable: false,
        configurable: true
    });
    KebabCaseTransformer.prototype.transform = function (value) {
        return _.kebabCase(value);
    };
    return KebabCaseTransformer;
}(Transformer));
export { KebabCaseTransformer };
