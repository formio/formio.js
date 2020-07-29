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
var IterateeTransformer = /** @class */ (function (_super) {
    __extends(IterateeTransformer, _super);
    function IterateeTransformer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(IterateeTransformer, "lazyArgsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IterateeTransformer, "arguments", {
        get: function () {
            return [
                {
                    name: 'Iteratee',
                    key: 'iteratee',
                    required: true,
                },
            ];
        },
        enumerable: false,
        configurable: true
    });
    return IterateeTransformer;
}(Transformer));
export { IterateeTransformer };
