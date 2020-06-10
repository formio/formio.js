export class FormEditForms {
    static formEditForms: {
        form: (...extend: any[]) => {
            components: any;
        };
        wizard: (...extend: any[]) => {
            components: any;
        };
    };
    static addFormEditForm(type: any, formEditForm: any): void;
    static addFormEditForms(formEditForms: any): void;
    static getFormEditForm(type: any): any;
    static getFormEditForms(): {
        form: (...extend: any[]) => {
            components: any;
        };
        wizard: (...extend: any[]) => {
            components: any;
        };
    };
}
