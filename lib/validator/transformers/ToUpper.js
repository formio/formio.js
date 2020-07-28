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
var ToUpperTransformer = /** @class */ (function (_super) {
    __extends(ToUpperTransformer, _super);
    function ToUpperTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ToUpperTransformer, "title", {
        get: function () {
            return 'To Upper';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToUpperTransformer, "name", {
        get: function () {
            return 'toUpper';
        },
        enumerable: false,
        configurable: true
    });
    ToUpperTransformer.prototype.transform = function (value) {
        return _.toUpper(value);
    };
    return ToUpperTransformer;
}(Transformer));
export { ToUpperTransformer };
