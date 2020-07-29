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
import { Operator } from './Operator';
var SomeOperator = /** @class */ (function (_super) {
    __extends(SomeOperator, _super);
    function SomeOperator() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(SomeOperator, "name", {
        get: function () {
            return 'some';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "title", {
        get: function () {
            return 'Some';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "hasComplementaryOperator", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "complementaryOperatorName", {
        get: function () {
            return 'none';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "complementaryOperatorTitle", {
        get: function () {
            return 'None';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "lazyArgsEvaluation", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SomeOperator, "arguments", {
        get: function () {
            return [
                {
                    name: 'Iterable',
                    key: 'iterable',
                    required: true,
                },
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
    SomeOperator.prototype.execute = function (args) {
        var _a, _b, _c;
        var iterable = args.iterable, iteratee = args.iteratee;
        return (_c = (_b = (_a = iterable()) === null || _a === void 0 ? void 0 : _a.some) === null || _b === void 0 ? void 0 : _b.call(_a, this.getIteratee(iteratee))) !== null && _c !== void 0 ? _c : false;
    };
    return SomeOperator;
}(Operator));
export { SomeOperator };
