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
var UpperCaseTransformer = /** @class */ (function (_super) {
    __extends(UpperCaseTransformer, _super);
    function UpperCaseTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(UpperCaseTransformer, "title", {
        get: function () {
            return 'Upper Case';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UpperCaseTransformer, "name", {
        get: function () {
            return 'upperCase';
        },
        enumerable: false,
        configurable: true
    });
    UpperCaseTransformer.prototype.transform = function (value) {
        return _.upperCase(value);
    };
    return UpperCaseTransformer;
}(Transformer));
export { UpperCaseTransformer };
