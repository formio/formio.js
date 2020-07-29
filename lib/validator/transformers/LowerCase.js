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
var LowerCaseTransformer = /** @class */ (function (_super) {
    __extends(LowerCaseTransformer, _super);
    function LowerCaseTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(LowerCaseTransformer, "title", {
        get: function () {
            return 'Lower Case';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LowerCaseTransformer, "name", {
        get: function () {
            return 'lowerCase';
        },
        enumerable: false,
        configurable: true
    });
    LowerCaseTransformer.prototype.transform = function (value) {
        return _.lowerCase(value);
    };
    return LowerCaseTransformer;
}(Transformer));
export { LowerCaseTransformer };
