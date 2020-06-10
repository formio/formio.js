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
var ComponentRowIndexByPathValueSource = /** @class */ (function (_super) {
    __extends(ComponentRowIndexByPathValueSource, _super);
    function ComponentRowIndexByPathValueSource() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ComponentRowIndexByPathValueSource, "name", {
        get: function () {
            return 'componentRowIndexByPath';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentRowIndexByPathValueSource, "title", {
        get: function () {
            return 'Component Row Index By Path';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ComponentRowIndexByPathValueSource, "weight", {
        get: function () {
            return 130;
        },
        enumerable: false,
        configurable: true
    });
    ComponentRowIndexByPathValueSource.prototype.getValue = function (input) {
        var _a;
        var component = _super.prototype.getValue.call(this, input);
        return Array.isArray(component)
            ? component.map(function (comp) { var _a; return (_a = comp === null || comp === void 0 ? void 0 : comp.rowIndex) !== null && _a !== void 0 ? _a : null; })
            : ((_a = component === null || component === void 0 ? void 0 : component.rowIndex) !== null && _a !== void 0 ? _a : null);
    };
    return ComponentRowIndexByPathValueSource;
}(ComponentByPathValueSource));
export { ComponentRowIndexByPathValueSource };
