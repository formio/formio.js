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
var EmailComponent = /** @class */ (function (_super) {
    __extends(EmailComponent, _super);
    function EmailComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmailComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'email',
                label: 'Email',
                key: 'email',
                inputType: 'email',
                kickbox: {
                    enabled: false
                }
            }], extend));
    };
    Object.defineProperty(EmailComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Email',
                group: 'advanced',
                icon: 'at',
                documentation: 'http://help.form.io/userguide/#email',
                weight: 10,
                schema: EmailComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    EmailComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.validators.push('email');
    };
    Object.defineProperty(EmailComponent.prototype, "defaultSchema", {
        get: function () {
            return EmailComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmailComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.attr.type = this.component.mask ? 'password' : 'email';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    return EmailComponent;
}(TextFieldComponent));
export default EmailComponent;
