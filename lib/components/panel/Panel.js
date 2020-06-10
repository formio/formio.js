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
var PanelComponent = /** @class */ (function (_super) {
    __extends(PanelComponent, _super);
    function PanelComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    PanelComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Panel',
                type: 'panel',
                key: 'panel',
                title: 'Panel',
                theme: 'default',
                breadcrumb: 'default',
                components: [],
                clearOnHide: false,
                input: false,
                tableView: false,
                persistent: false
            }], extend));
    };
    Object.defineProperty(PanelComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Panel',
                icon: 'list-alt',
                group: 'layout',
                documentation: 'http://help.form.io/userguide/#panels',
                weight: 30,
                schema: PanelComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PanelComponent.prototype, "defaultSchema", {
        get: function () {
            return PanelComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    PanelComponent.prototype.checkValidity = function (data, dirty, row) {
        var _this = this;
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        return this.getComponents().reduce(function (check, comp) {
            //change collapsed value only in case when the panel is collapsed to avoid additional redrawing that prevents validation messages
            if (!comp.checkValidity(data, dirty, row) && _this.collapsed) {
                _this.collapsed = false;
            }
            return comp.checkValidity(data, dirty, row) && check;
        }, _super.prototype.checkValidity.call(this, data, dirty, row));
    };
    Object.defineProperty(PanelComponent.prototype, "templateName", {
        get: function () {
            return 'panel';
        },
        enumerable: false,
        configurable: true
    });
    return PanelComponent;
}(NestedComponent));
export default PanelComponent;
