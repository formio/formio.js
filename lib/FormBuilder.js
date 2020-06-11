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
import { Formio } from './Formio';
import { Builders } from './builders';
import { Form } from './Form';
var FormBuilder = /** @class */ (function (_super) {
    __extends(FormBuilder, _super);
    function FormBuilder(element, form, options) {
        var _this = this;
        form = form || {};
        options = options || {};
        _this = _super.call(this, element, form, Object.assign(options, FormBuilder.options, ((Formio.options && Formio.options.builder) ? Formio.options.builder : {}))) || this;
        return _this;
    }
    FormBuilder.prototype.create = function (display) {
        if (Builders.builders[display]) {
            return new Builders.builders[display](this.element, this.options);
        }
        else {
            // eslint-disable-next-line new-cap
            return new Builders.builders['webform'](this.element, this.options);
        }
    };
    FormBuilder.options = {};
    return FormBuilder;
}(Form));
export { FormBuilder };
/**
 * Factory that creates a new form builder based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio.builder = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (new (FormBuilder.bind.apply(FormBuilder, __spreadArrays([void 0], args)))()).ready;
};
Formio.FormBuilder = FormBuilder;
