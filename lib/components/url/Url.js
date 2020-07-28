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
import TextFieldComponent from '../textfield/TextField';
var UrlComponent = /** @class */ (function (_super) {
    __extends(UrlComponent, _super);
    function UrlComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.validators.push('url');
        return _this;
    }
    UrlComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'url',
                label: 'Url',
                key: 'url',
                inputType: 'url'
            }], extend));
    };
    Object.defineProperty(UrlComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Url',
                group: 'advanced',
                icon: 'link',
                documentation: 'http://help.form.io/userguide/#url',
                weight: 20,
                schema: UrlComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UrlComponent.prototype, "defaultSchema", {
        get: function () {
            return UrlComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    UrlComponent.prototype.elementInfo = function () {
        var info = _super.prototype.elementInfo.call(this);
        info.attr.type = this.component.mask ? 'password' : 'url';
        return info;
    };
    return UrlComponent;
}(TextFieldComponent));
export default UrlComponent;
