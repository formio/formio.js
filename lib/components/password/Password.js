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
import { superGet } from '../../utils/utils';
import TextFieldComponent from '../textfield/TextField';
var PasswordComponent = /** @class */ (function (_super) {
    __extends(PasswordComponent, _super);
    function PasswordComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PasswordComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextFieldComponent.schema.apply(TextFieldComponent, __spreadArrays([{
                type: 'password',
                label: 'Password',
                key: 'password',
                protected: true,
                tableView: false,
            }], extend));
    };
    Object.defineProperty(PasswordComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Password',
                icon: 'asterisk',
                group: 'basic',
                documentation: 'http://help.form.io/userguide/#password',
                weight: 40,
                schema: PasswordComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordComponent.prototype, "defaultSchema", {
        get: function () {
            return _.omit(PasswordComponent.schema(), ['protected', 'tableView']);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordComponent.prototype, "inputInfo", {
        get: function () {
            var info = superGet(TextFieldComponent, 'inputInfo', this);
            info.attr.type = 'password';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    return PasswordComponent;
}(TextFieldComponent));
export default PasswordComponent;
