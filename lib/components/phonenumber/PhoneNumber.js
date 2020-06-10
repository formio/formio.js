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
var PhoneNumberComponent = /** @class */ (function (_super) {
    __extends(PhoneNumberComponent, _super);
    function PhoneNumberComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PhoneNumberComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'phoneNumber',
                label: 'Phone Number',
                key: 'phoneNumber',
                inputType: 'tel',
                inputMask: '(999) 999-9999'
            }], extend));
    };
    Object.defineProperty(PhoneNumberComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Phone Number',
                group: 'advanced',
                icon: 'phone-square',
                weight: 30,
                documentation: 'http://help.form.io/userguide/#phonenumber',
                schema: PhoneNumberComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PhoneNumberComponent.prototype, "defaultSchema", {
        get: function () {
            return PhoneNumberComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    return PhoneNumberComponent;
}(TextFieldComponent));
export default PhoneNumberComponent;
