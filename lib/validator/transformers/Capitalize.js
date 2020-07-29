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
var CapitalizeTransformer = /** @class */ (function (_super) {
    __extends(CapitalizeTransformer, _super);
    function CapitalizeTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(CapitalizeTransformer, "title", {
        get: function () {
            return 'Capitalize';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CapitalizeTransformer, "name", {
        get: function () {
            return 'capitalize';
        },
        enumerable: false,
        configurable: true
    });
    CapitalizeTransformer.prototype.transform = function (value) {
        return _.capitalize(value);
    };
    return CapitalizeTransformer;
}(Transformer));
export { CapitalizeTransformer };
