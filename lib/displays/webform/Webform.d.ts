/**
 * Renders a Form.io form within the webpage.
 */
declare class Webform extends NestedDataComponent {
    /**
     * Creates a new Form instance.
     *
     * @param {Object} options - The options to create a new form instance.
     * @param {boolean} options.saveDraft - Set this if you would like to enable the save draft feature.
     * @param {boolean} options.saveDraftThrottle - The throttle for the save draft feature.
     * @param {boolean} options.readOnly - Set this form to readOnly
     * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
     * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
     * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
     */
    constructor(...args: any[]);
    _src: any;
    _loading: any;
    _form: {};
    draftEnabled: boolean;
    savingDraft: boolean;
    triggerSaveDraft: any;
    customErrors: any[];
    set nosubmit(arg: any);
    get nosubmit(): any;
    /**
     * Determines if the form has tried to be submitted, error or not.
     *
     * @type {boolean}
     */
    submitted: boolean;
    /**
     * Determines if the form is being submitted at the moment.
     *
     * @type {boolean}
     */
    submitting: boolean;
    /**
     * The Formio instance for this form.
     * @type {Formio}
     */
    formio: Formio;
    /**
     * The loader HTML element.
     * @type {HTMLElement}
     */
    loader: HTMLElement;
    /**
     * The alert HTML element
     * @type {HTMLElement}
     */
    alert: HTMLElement;
    /**
     * Promise that is triggered when the submission is done loading.
     * @type {Promise}
     */
    onSubmission: Promise<any>;
    /**
     * Determines if this submission is explicitly set.
     * @type {boolean}
     */
    submissionSet: boolean;
    /**
     * Promise that executes when the form is ready and rendered.
     * @type {Promise}
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.formReady.then(() => {
     *   console.log('The form is ready!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    formReady: Promise<any>;
    /**
     * Called when the formReady state of this form has been resolved.
     *
     * @type {function}
     */
    formReadyResolve: Function;
    /**
     * Called when this form could not load and is rejected.
     *
     * @type {function}
     */
    formReadyReject: Function;
    /**
     * Promise that executes when the submission is ready and rendered.
     * @type {Promise}
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.submissionReady.then(() => {
     *   console.log('The submission is ready!');
     * });
     * form.src = 'https://examples.form.io/example/submission/234234234234234243';
     */
    submissionReady: Promise<any>;
    /**
     * Called when the formReady state of this form has been resolved.
     *
     * @type {function}
     */
    submissionReadyResolve: Function;
    /**
     * Called when this form could not load and is rejected.
     *
     * @type {function}
     */
    submissionReadyReject: Function;
    shortcuts: any[];
    /**
     * Sets the language for this form.
     *
     * @param lang
     * @return {Promise}
     */
    set language(arg: any);
    /**
     * Add a language for translations
     *
     * @param code
     * @param lang
     * @param active
     * @return {*}
     */
    addLanguage(code: any, lang: any, active?: boolean): any;
    /**
     * Perform the localization initialization.
     * @returns {*}
     */
    localize(): any;
    keyboardCatchableElement(element: any): boolean;
    executeShortcuts: (event: any) => void;
    /**
     * Set the Form source, which is typically the Form.io embed URL.
     *
     * @param {string} value - The value of the form embed url.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.formReady.then(() => {
     *   console.log('The form is formReady!');
     * });
     * form.src = 'https://examples.form.io/example';
     */
    set src(arg: string);
    /**
     * Get the embed source of the form.
     *
     * @returns {string}
     */
    get src(): string;
    /**
     * Loads the submission if applicable.
     */
    loadSubmission(): Promise<any>;
    loadingSubmission: boolean;
    /**
     * Set the src of the form renderer.
     *
     * @param value
     * @param options
     */
    setSrc(value: any, options: any): any;
    /**
     * Set the form source but don't initialize the form and submission from the url.
     *
     * @param {string} value - The value of the form embed url.
     */
    set url(arg: string);
    /**
     * Get the embed source of the form.
     *
     * @returns {string}
     */
    get url(): string;
    /**
     * Sets the url of the form renderer.
     *
     * @param value
     * @param options
     */
    setUrl(value: any, options: any): boolean;
    /**
     * Set the loading state for this form, and also show the loader spinner.
     *
     * @param {boolean} loading - If this form should be "loading" or not.
     */
    set loading(arg: boolean);
    /**
     * Returns if this form is loading.
     *
     * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
     */
    get loading(): boolean;
    /**
     * Sets the JSON schema for the form to be rendered.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.setForm({
     *   components: [
     *     {
     *       type: 'textfield',
     *       key: 'firstName',
     *       label: 'First Name',
     *       placeholder: 'Enter your first name.',
     *       input: true
     *     },
     *     {
     *       type: 'textfield',
     *       key: 'lastName',
     *       label: 'Last Name',
     *       placeholder: 'Enter your last name',
     *       input: true
     *     },
     *     {
     *       type: 'button',
     *       action: 'submit',
     *       label: 'Submit',
     *       theme: 'primary'
     *     }
     *   ]
     * });
     *
     * @param {Object} form - The JSON schema of the form @see https://examples.form.io/example for an example JSON schema.
     * @returns {*}
     */
    setForm(form: any, flags: any): any;
    initialized: boolean;
    /**
     * Sets the form value.
     *
     * @alias setForm
     * @param {Object} form - The form schema object.
     */
    set form(arg: any);
    /**
     * Gets the form object.
     *
     * @returns {Object} - The form JSON schema.
     */
    get form(): any;
    /**
     * Sets the submission of a form.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.src = 'https://examples.form.io/example';
     * form.submission = {data: {
     *   firstName: 'Joe',
     *   lastName: 'Smith',
     *   email: 'joe@example.com'
     * }};
     *
     * @param {Object} submission - The Form.io submission object.
     */
    set submission(arg: any);
    /**
     * Returns the submission object that was set within this form.
     *
     * @returns {Object}
     */
    get submission(): any;
    /**
     * Sets a submission and returns the promise when it is ready.
     * @param submission
     * @param flags
     * @return {Promise.<TResult>}
     */
    setSubmission(submission: any, flags?: {}): Promise<any>;
    /**
     * Saves a submission draft.
     */
    saveDraft(): void;
    /**
     * Restores a draft submission based on the user who is authenticated.
     *
     * @param {userId} - The user id where we need to restore the draft from.
     */
    restoreDraft(userId: any): void;
    mergeData(_this: any, _that: any): void;
    editing: boolean;
    _submission: any;
    executeFormController(): boolean;
    getClassName(): string;
    hasRequiredFields(): boolean;
    /**
     * Sets a new alert to display in the error dialog of the form.
     *
     * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
     * @param {string} message - The message to show in the alert.
     * @param {string} classes - Styling classes for alert.
     */
    setAlert(type: string, message: string, classes: string): void;
    /**
     * Focus on selected component.
     *
     * @param {string} key - The key of selected component.
     * @returns {*}
     */
    focusOnComponent(key: string): any;
    /**
     * Show the errors of this form within the alert dialog.
     *
     * @param {Object} error - An optional additional error to display along with the component errors.
     * @returns {*}
     */
    showErrors(error: any, triggerEvent: any): any;
    /**
     * Called when the submission has completed, or if the submission needs to be sent to an external library.
     *
     * @param {Object} submission - The submission object.
     * @param {boolean} saved - Whether or not this submission was saved to the server.
     * @returns {object} - The submission object.
     */
    onSubmit(submission: any, saved: boolean): object;
    /**
     * Called when an error occurs during the submission.
     *
     * @param {Object} error - The error that occured.
     */
    onSubmissionError(error: any): any;
    /**
     * Send a delete request to the server.
     */
    deleteSubmission(): any;
    /**
     * Cancels the submission.
     *
     * @alias reset
     */
    cancel(noconfirm: any): boolean;
    setMetadata(submission: any): void;
    submitForm(options?: {}): any;
    executeSubmit(options: any): any;
    /**
     * Submits the form.
     *
     * @example
     * import Webform from 'formiojs/Webform';
     * let form = new Webform(document.getElementById('formio'));
     * form.src = 'https://examples.form.io/example';
     * form.submission = {data: {
     *   firstName: 'Joe',
     *   lastName: 'Smith',
     *   email: 'joe@example.com'
     * }};
     * form.submit().then((submission) => {
     *   console.log(submission);
     * });
     *
     * @param {boolean} before - If this submission occured from the before handlers.
     *
     * @returns {Promise} - A promise when the form is done submitting.
     */
    submit(before: boolean, options: any): Promise<any>;
    submitUrl(URL: any, headers: any): void;
    triggerRecaptcha(): void;
    _nosubmit: any;
}
declare namespace Webform {
    export const setBaseUrl: any;
    export const setApiUrl: any;
    export const setAppUrl: any;
}
export default Webform;
import NestedDataComponent from "../../components/_classes/nesteddata/NestedDataComponent";
declare namespace Formio {
    export const forms: {};
    export const registerComponent: typeof Components.setComponent;
}
import { Formio } from "../../Formio";
import { Components } from "../../components/Components";
