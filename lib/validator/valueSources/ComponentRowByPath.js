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
import { ComponentByPathValueSource } from './ComponentByPath';
var ComponentRowByPathValueSource = /** @class */ (function (_super) {
    __extends(ComponentRowByPathValueSource, _super);
    function ComponentRowByPathValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentRowByPathValueSource, "name", {
        get: function () {
            return 'componentRowByPath';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentRowByPathValueSource, "title", {
        get: function () {
            return 'Component Row By Path';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentRowByPathValueSource, "weight", {
        get: function () {
            return 120;
        },
        enumerable: false,
        configurable: true
    });
    ComponentRowByPathValueSource.prototype.getValue = function (input) {
        var _a;
        var component = _super.prototype.getValue.call(this, input);
        return Array.isArray(component)
            ? component.map(function (comp) { var _a; return (_a = comp === null || comp === void 0 ? void 0 : comp.data) !== null && _a !== void 0 ? _a : null; })
            : ((_a = component === null || component === void 0 ? void 0 : component.data) !== null && _a !== void 0 ? _a : null);
    };
    return ComponentRowByPathValueSource;
}(ComponentByPathValueSource));
export { ComponentRowByPathValueSource };
