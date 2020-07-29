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
import { superGet } from '../../utils/utils';
import NestedComponent from '../_classes/nested/NestedComponent';
var FieldsetComponent = /** @class */ (function (_super) {
    __extends(FieldsetComponent, _super);
    function FieldsetComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.noField = true;
        return _this;
    }
    FieldsetComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent.schema.apply(NestedComponent, __spreadArrays([{
                label: 'Field Set',
                key: 'fieldSet',
                type: 'fieldset',
                legend: '',
                components: [],
                input: false,
                persistent: false
            }], extend));
    };
    Object.defineProperty(FieldsetComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Field Set',
                icon: 'th-large',
                group: 'layout',
                documentation: 'http://help.form.io/userguide/#fieldset',
                weight: 20,
                schema: FieldsetComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldsetComponent.prototype, "defaultSchema", {
        get: function () {
            return FieldsetComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldsetComponent.prototype, "className", {
        get: function () {
            return "form-group " + superGet(NestedComponent, 'className', this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FieldsetComponent.prototype, "templateName", {
        get: function () {
            return 'fieldset';
        },
        enumerable: false,
        configurable: true
    });
    return FieldsetComponent;
}(NestedComponent));
export default FieldsetComponent;
