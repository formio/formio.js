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
var ToLowerTransformer = /** @class */ (function (_super) {
    __extends(ToLowerTransformer, _super);
    function ToLowerTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ToLowerTransformer, "title", {
        get: function () {
            return 'To Lower';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ToLowerTransformer, "name", {
        get: function () {
            return 'toLower';
        },
        enumerable: false,
        configurable: true
    });
    ToLowerTransformer.prototype.transform = function (value) {
        return _.toLower(value);
    };
    return ToLowerTransformer;
}(Transformer));
export { ToLowerTransformer };
