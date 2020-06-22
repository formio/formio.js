export class Form extends Base {
    static embed(embed: any): any;
    /**
     * Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
     *
     * @param {Object} element - The DOM element you wish to render this form within.
     * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
     * @param {Object} options - The options to create a new form instance.
     * @param {boolean} options.readOnly - Set this form to readOnly
     * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
     * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
     * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
     *
     * @example
     * import Form from 'formiojs/Form';
     * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
     * form.build();
     */
    constructor(...args: any[]);
    ready: any;
    readyResolve: any;
    readyReject: any;
    instance: any;
    element: HTMLElement;
    display: string;
    /**
     * Create a new form instance provided the display of the form.
     *
     * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
     * @return {*}
     */
    create(display: string): any;
    /**
     * Sets the form. Either as JSON or a URL to a form JSON schema.
     *
     * @param {string|object} formParam - Either the form JSON or the URL of the form json.
     * @return {*}
     */
    set form(arg: any);
    /**
     * Returns the loaded forms JSON.
     *
     * @return {object} - The loaded form's JSON
     */
    get form(): any;
    errorForm(err: any): {
        components: {
            label: string;
            tag: string;
            className: string;
            attrs: {
                attr: string;
                value: string;
            }[];
            key: string;
            type: string;
            input: boolean;
            content: any;
        }[];
    };
    setForm(formParam: any): any;
    _form: any;
    prepareForm(form: any): any;
    getSubmission(formio: any): any;
    /**
     * Changes the display of the form.
     *
     * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
     * @return {Promise<T>}
     */
    setDisplay(display: string): Promise<any>;
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    sanitize(dirty: any): any;
    setContent(element: any, content: any): boolean;
    /**
     * Build a new form.
     *
     * @return {Promise<T>}
     */
    build(): Promise<any>;
    render(): any;
    attach(element: any): any;
}
import Base from "./components/_classes/base/Base";
