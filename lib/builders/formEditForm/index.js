import WebformEditForm from './webform';
import WizardEditForm from './wizard';
const formEditForms = {
    form: WebformEditForm,
    wizard: WizardEditForm,
};
export class FormEditForms {
    static addFormEditForm(type, formEditForm) {
        FormEditForms.formEditForms[type] = formEditForm;
    }
    static addFormEditForms(formEditForms) {
        FormEditForms.formEditForms = Object.assign(Object.assign({}, FormEditForms.formEditForms), formEditForms);
    }
    static getFormEditForm(type) {
        return FormEditForms.formEditForms[type];
    }
    static getFormEditForms() {
        return FormEditForms.formEditForms;
    }
}
FormEditForms.formEditForms = formEditForms;
