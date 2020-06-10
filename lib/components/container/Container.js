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
import _ from 'lodash';
import Component from '../_classes/component/Component';
import NestedDataComponent from '../_classes/nesteddata/NestedDataComponent';
var ContainerComponent = /** @class */ (function (_super) {
    __extends(ContainerComponent, _super);
    function ContainerComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'container';
        return _this;
    }
    ContainerComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedDataComponent.schema.apply(NestedDataComponent, __spreadArrays([{
                label: 'Container',
                type: 'container',
                key: 'container',
                clearOnHide: true,
                input: true,
                tree: true,
                hideLabel: true,
                components: []
            }], extend));
    };
    Object.defineProperty(ContainerComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Container',
                icon: 'folder-open',
                group: 'data',
                documentation: 'http://help.form.io/userguide/#container',
                weight: 10,
                schema: ContainerComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ContainerComponent.prototype.addComponents = function (data, options) {
        return _super.prototype.addComponents.call(this, this.dataValue, options);
    };
    Object.defineProperty(ContainerComponent.prototype, "defaultSchema", {
        get: function () {
            return ContainerComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "emptyValue", {
        get: function () {
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContainerComponent.prototype, "templateName", {
        get: function () {
            return 'container';
        },
        enumerable: false,
        configurable: true
    });
    ContainerComponent.prototype.componentContext = function () {
        return this.dataValue;
    };
    ContainerComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = false;
        var hasValue = this.hasValue();
        if (hasValue && _.isEmpty(this.dataValue)) {
            flags.noValidate = true;
        }
        if (!value || !_.isObject(value) || !hasValue) {
            changed = true;
            this.dataValue = this.defaultValue;
        }
        changed = _super.prototype.setValue.call(this, value, flags) || changed;
        this.updateOnChange(flags, changed);
        return changed;
    };
    ContainerComponent.prototype.checkData = function (data, flags, row, components) {
        var _this = this;
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        components = components || this.getComponents();
        return components.reduce(function (valid, comp) {
            return comp.checkData(data, flags, _this.dataValue) && valid;
        }, Component.prototype.checkData.call(this, data, flags, row));
    };
    return ContainerComponent;
}(NestedDataComponent));
export default ContainerComponent;
