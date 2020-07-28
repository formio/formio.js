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
import { Formio } from './Formio';
import { Builders } from './builders';
import { Form } from './Form';
import { Components } from './components';
import builderComponents from './components/builder';
Components.setComponents(builderComponents);
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
