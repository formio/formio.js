import WebformEditForm from './webform';

const formEditForms = {
  form: WebformEditForm,
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
