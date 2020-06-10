var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import WebformEditForm from './webform';
import WizardEditForm from './wizard';
var formEditForms = {
    form: WebformEditForm,
    wizard: WizardEditForm,
};
var FormEditForms = /** @class */ (function () {
    function FormEditForms() {
    }
    FormEditForms.addFormEditForm = function (type, formEditForm) {
        FormEditForms.formEditForms[type] = formEditForm;
    };
    FormEditForms.addFormEditForms = function (formEditForms) {
        FormEditForms.formEditForms = __assign(__assign({}, FormEditForms.formEditForms), formEditForms);
    };
    FormEditForms.getFormEditForm = function (type) {
        return FormEditForms.formEditForms[type];
    };
    FormEditForms.getFormEditForms = function () {
        return FormEditForms.formEditForms;
    };
    FormEditForms.formEditForms = formEditForms;
    return FormEditForms;
}());
export { FormEditForms };
