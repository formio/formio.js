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
import Input from '../_classes/input/Input';
var HiddenComponent = /** @class */ (function (_super) {
    __extends(HiddenComponent, _super);
    function HiddenComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HiddenComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input.schema.apply(Input, __spreadArrays([{
                type: 'hidden',
                tableView: false,
                inputType: 'hidden'
            }], extend));
    };
    Object.defineProperty(HiddenComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Hidden',
                group: 'data',
                icon: 'user-secret',
                weight: 0,
                documentation: 'http://help.form.io/userguide/#hidden',
                schema: HiddenComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "defaultSchema", {
        get: function () {
            return HiddenComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'input';
            info.attr.type = 'hidden';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HiddenComponent.prototype, "skipInEmail", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    HiddenComponent.prototype.validateMultiple = function () {
        // Since "arrays" are able to be stored in hidden components, we need to turn off multiple validation.
        return false;
    };
    HiddenComponent.prototype.labelIsHidden = function () {
        return true;
    };
    Object.defineProperty(HiddenComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    HiddenComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        return this.updateValue(value, flags);
    };
    HiddenComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    return HiddenComponent;
}(Input));
export default HiddenComponent;
