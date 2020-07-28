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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import NestedComponent from '../_classes/nested/NestedComponent';
var WellComponent = /** @class */ (function (_super) {
    __extends(WellComponent, _super);
    function WellComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    WellComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                type: 'well',
                key: 'well',
                input: false,
                persistent: false,
                components: []
            }], extend));
    };
    Object.defineProperty(WellComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Well',
                icon: 'square-o',
                group: 'layout',
                documentation: 'http://help.form.io/userguide/#well',
                weight: 60,
                schema: WellComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WellComponent.prototype, "defaultSchema", {
        get: function () {
            return WellComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WellComponent.prototype, "className", {
        get: function () {
            return "" + this.component.customClass;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WellComponent.prototype, "templateName", {
        get: function () {
            return 'well';
        },
        enumerable: false,
        configurable: true
    });
    return WellComponent;
}(NestedComponent));
export default WellComponent;
