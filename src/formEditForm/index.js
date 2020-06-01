import WebformEditForm from './webform';
import WizardEditForm from './wizard';

const formEditForms = {
  form: WebformEditForm,
  wizard: WizardEditForm,
};

export class FormEditForms {
  static formEditForms = formEditForms;

  static addFormEditForm(type, formEditForm) {
    FormEditForms.formEditForms[type] = formEditForm;
  }

  static addFormEditForms(formEditForms) {
    FormEditForms.formEditForms = { ...FormEditForms.formEditForms, ...formEditForms };
  }

  static getFormEditForm(type) {
    return FormEditForms.formEditForms[type];
  }

  static getFormEditForms() {
    return FormEditForms.formEditForms;
  }
}
