import _ from 'lodash';
import moment from 'moment';
import compareVersions from 'compare-versions';
import EventEmitter from './EventEmitter';
import i18next from 'i18next';
import i18nDefaults from './i18n';
import Formio from './Formio';
import NativePromise from 'native-promise-only';
import Components from './components/Components';
import NestedDataComponent from './components/_classes/nesteddata/NestedDataComponent';
import {
  fastCloneDeep,
  currentTimezone,
  unescapeHTML,
  getStringFromComponentPath,
  searchComponents,
} from './utils/utils';
import { eachComponent } from './utils/formUtils';

// Initialize the available forms.
Formio.forms = {};

// Allow people to register components.
Formio.registerComponent = Components.setComponent;

function getIconSet(icons) {
  if (icons === 'fontawesome') {
    return 'fa';
  }
  return icons || '';
}

function getOptions(options) {
  options = _.defaults(options, {
    submitOnEnter: false,
    iconset: getIconSet((options && options.icons) ? options.icons : Formio.icons),
    i18next,
    saveDraft: false,
    alwaysDirty: false,
    saveDraftThrottle: 5000
  });
  if (!options.events) {
    options.events = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
  }
  return options;
}

/**
 * Renders a Form.io form within the webpage.
 */
export default class Webform extends NestedDataComponent {
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
  /* eslint-disable max-statements */
  constructor() {
    let element, options;
    if (arguments[0] instanceof HTMLElement || arguments[1]) {
      element = arguments[0];
      options = arguments[1];
    }
    else {
      options = arguments[0];
    }
    super(null, getOptions(options));

    this.element = element;

    // Keep track of all available forms globally.
    Formio.forms[this.id] = this;

    // Set the base url.
    if (this.options.baseUrl) {
      Formio.setBaseUrl(this.options.baseUrl);
    }

    /**
     * The i18n configuration for this component.
     */
    let i18n = i18nDefaults;
    if (options && options.i18n && !options.i18nReady) {
      // Support legacy way of doing translations.
      if (options.i18n.resources) {
        i18n = options.i18n;
      }
      else {
        _.each(options.i18n, (lang, code) => {
          if (code === 'options') {
            _.merge(i18n, lang);
          }
          else if (!i18n.resources[code]) {
            i18n.resources[code] = { translation: lang };
          }
          else {
            _.assign(i18n.resources[code].translation, lang);
          }
        });
      }

      options.i18n = i18n;
      options.i18nReady = true;
    }

    if (options && options.i18n) {
      this.options.i18n = options.i18n;
    }
    else {
      this.options.i18n = i18n;
    }

    // Set the language.
    if (this.options.language) {
      this.options.i18n.lng = this.options.language;
    }

    /**
     * The type of this element.
     * @type {string}
     */
    this.type = 'form';
    this._src = '';
    this._loading = false;
    this._form = {};
    this.draftEnabled = false;
    this.savingDraft = true;
    if (this.options.saveDraftThrottle) {
      this.triggerSaveDraft = _.throttle(this.saveDraft.bind(this), this.options.saveDraftThrottle);
    }
    else {
      this.triggerSaveDraft = this.saveDraft.bind(this);
    }

    this.customErrors = [];

    /**
     * Determines if this form should submit the API on submit.
     * @type {boolean}
     */
    this.nosubmit = false;

    /**
     * Determines if the form has tried to be submitted, error or not.
     *
     * @type {boolean}
     */
    this.submitted = false;

    /**
     * Determines if the form is being submitted at the moment.
     *
     * @type {boolean}
     */
    this.submitting = false;

    /**
     * The Formio instance for this form.
     * @type {Formio}
     */
    this.formio = null;

    /**
     * The loader HTML element.
     * @type {HTMLElement}
     */
    this.loader = null;

    /**
     * The alert HTML element
     * @type {HTMLElement}
     */
    this.alert = null;

    /**
     * Promise that is triggered when the submission is done loading.
     * @type {Promise}
     */
    this.onSubmission = null;

    /**
     * Determines if this submission is explicitly set.
     * @type {boolean}
     */
    this.submissionSet = false;

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
    this.formReady = new NativePromise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.formReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.formReadyReject = reject;
    });

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
    this.submissionReady = new NativePromise((resolve, reject) => {
      /**
       * Called when the formReady state of this form has been resolved.
       *
       * @type {function}
       */
      this.submissionReadyResolve = resolve;

      /**
       * Called when this form could not load and is rejected.
       *
       * @type {function}
       */
      this.submissionReadyReject = reject;
    });

    this.shortcuts = [];

    // Set language after everything is established.
    this.localize().then(() => {
      this.language = this.options.language;
    });

    // See if we need to restore the draft from a user.
    if (this.options.saveDraft && Formio.events) {
      Formio.events.on('formio.user', (user) => {
        this.formReady.then(() => {
          // Only restore a draft if the submission isn't explicitly set.
          if (!this.submissionSet) {
            this.restoreDraft(user._id);
          }
        });
      });
    }

    this.component.clearOnHide = false;

    // Ensure the root is set to this component.
    this.root = this;
  }
  /* eslint-enable max-statements */

  /**
   * Sets the language for this form.
   *
   * @param lang
   * @return {Promise}
   */
  set language(lang) {
    return new NativePromise((resolve, reject) => {
      this.options.language = lang;
      if (this.i18next.language === lang) {
        return resolve();
      }
      try {
        this.i18next.changeLanguage(lang, (err) => {
          if (err) {
            return reject(err);
          }
          this.redraw();
          this.emit('languageChanged');
          resolve();
        });
      }
      catch (err) {
        return reject(err);
      }
    });
  }

  get componentComponents() {
    return this.form.components;
  }

  /**
   * Add a language for translations
   *
   * @param code
   * @param lang
   * @param active
   * @return {*}
   */
  addLanguage(code, lang, active = false) {
    this.i18next.addResourceBundle(code, 'translation', lang, true, true);
    if (active) {
      this.language = code;
    }
  }

  /**
   * Perform the localization initialization.
   * @returns {*}
   */
  localize() {
    if (this.i18next.initialized) {
      return NativePromise.resolve(this.i18next);
    }
    this.i18next.initialized = true;
    return new NativePromise((resolve, reject) => {
      try {
        this.i18next.init(this.options.i18n, (err) => {
          // Get language but remove any ;q=1 that might exist on it.
          this.options.language = this.i18next.language.split(';')[0];
          if (err) {
            return reject(err);
          }
          resolve(this.i18next);
        });
      }
      catch (err) {
        return reject(err);
      }
    });
  }

  keyboardCatchableElement(element) {
    if (element.nodeName === 'TEXTAREA') {
      return false;
    }

    if (element.nodeName === 'INPUT') {
      return [
        'text',
        'email',
        'password'
      ].indexOf(element.type) === -1;
    }

    return true;
  }

  executeShortcuts = (event) => {
    const { target } = event;
    if (!this.keyboardCatchableElement(target)) {
      return;
    }

    const ctrl = event.ctrlKey || event.metaKey;
    const keyCode = event.keyCode;
    let char = '';

    if (65 <= keyCode && keyCode <= 90) {
      char = String.fromCharCode(keyCode);
    }
    else if (keyCode === 13) {
      char = 'Enter';
    }
    else if (keyCode === 27) {
      char = 'Esc';
    }

    _.each(this.shortcuts, (shortcut) => {
      if (shortcut.ctrl && !ctrl) {
        return;
      }

      if (shortcut.shortcut === char) {
        shortcut.element.click();
        event.preventDefault();
      }
    });
  };

  addShortcut(element, shortcut) {
    if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
      return;
    }

    shortcut = _.capitalize(shortcut);

    if (shortcut === 'Enter' || shortcut === 'Esc') {
      // Restrict Enter and Esc only for buttons
      if (element.tagName !== 'BUTTON') {
        return;
      }

      this.shortcuts.push({
        shortcut,
        element
      });
    }
    else {
      this.shortcuts.push({
        ctrl: true,
        shortcut,
        element
      });
    }
  }

  removeShortcut(element, shortcut) {
    if (!shortcut || !/^([A-Z]|Enter|Esc)$/i.test(shortcut)) {
      return;
    }

    _.remove(this.shortcuts, {
      shortcut,
      element
    });
  }

  /**
   * Get the embed source of the form.
   *
   * @returns {string}
   */
  get src() {
    return this._src;
  }

  /**
   * Loads the submission if applicable.
   */
  loadSubmission() {
    this.loadingSubmission = true;
    if (this.formio.submissionId) {
      this.onSubmission = this.formio.loadSubmission().then(
        (submission) => this.setSubmission(submission),
        (err) => this.submissionReadyReject(err)
      ).catch(
        (err) => this.submissionReadyReject(err)
      );
    }
    else {
      this.submissionReadyResolve();
    }
    return this.submissionReady;
  }

  /**
   * Set the src of the form renderer.
   *
   * @param value
   * @param options
   */
  setSrc(value, options) {
    if (this.setUrl(value, options)) {
      this.nosubmit = false;
      return this.formio.loadForm({ params: { live: 1 } }).then(
        (form) => {
          const setForm = this.setForm(form);
          this.loadSubmission();
          return setForm;
        }).catch((err) => {
        console.warn(err);
        this.formReadyReject(err);
      });
    }
    return NativePromise.resolve();
  }

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
  set src(value) {
    this.setSrc(value);
  }

  /**
   * Get the embed source of the form.
   *
   * @returns {string}
   */
  get url() {
    return this._src;
  }

  /**
   * Sets the url of the form renderer.
   *
   * @param value
   * @param options
   */
  setUrl(value, options) {
    if (
      !value ||
      (typeof value !== 'string') ||
      (value === this._src)
    ) {
      return false;
    }
    this._src = value;
    this.nosubmit = true;
    this.formio = this.options.formio = new Formio(value, options);

    if (this.type === 'form') {
      // Set the options source so this can be passed to other components.
      this.options.src = value;
    }
    return true;
  }

  /**
   * Set the form source but don't initialize the form and submission from the url.
   *
   * @param {string} value - The value of the form embed url.
   */
  set url(value) {
    this.setUrl(value);
  }

  /**
   * Called when both the form and submission have been loaded.
   *
   * @returns {Promise} - The promise to trigger when both form and submission have loaded.
   */
  get ready() {
    return this.formReady.then(() => {
      return super.ready.then(() => {
        return this.loadingSubmission ? this.submissionReady : true;
      });
    });
  }

  /**
   * Returns if this form is loading.
   *
   * @returns {boolean} - TRUE means the form is loading, FALSE otherwise.
   */
  get loading() {
    return this._loading;
  }

  /**
   * Set the loading state for this form, and also show the loader spinner.
   *
   * @param {boolean} loading - If this form should be "loading" or not.
   */
  set loading(loading) {
    if (this._loading !== loading) {
      this._loading = loading;
      if (!this.loader && loading) {
        this.loader = this.ce('div', {
          class: 'loader-wrapper'
        });
        const spinner = this.ce('div', {
          class: 'loader text-center'
        });
        this.loader.appendChild(spinner);
      }
      /* eslint-disable max-depth */
      if (this.loader) {
        try {
          if (loading) {
            this.prependTo(this.loader, this.wrapper);
          }
          else {
            this.removeChildFrom(this.loader, this.wrapper);
          }
        }
        catch (err) {
          // ingore
        }
      }
      /* eslint-enable max-depth */
    }
  }

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
  setForm(form, flags) {
    try {
      // Do not set the form again if it has been already set
      if (JSON.stringify(this._form) === JSON.stringify(form)) {
        return NativePromise.resolve();
      }
    }
    catch (err) {
      console.warn(err);
      // If provided form is not a valid JSON object, do not set it too
      return NativePromise.resolve();
    }

    // Create the form.
    this._form = form;

    // Allow the form to provide component overrides.
    if (form && form.settings && form.settings.components) {
      this.options.components = form.settings.components;
    }

    if ('schema' in form && compareVersions(form.schema, '1.x') > 0) {
      this.ready.then(() => {
        this.setAlert('alert alert-danger', 'Form schema is for a newer version, please upgrade your renderer. Some functionality may not work.');
      });
    }

    // See if they pass a module, and evaluate it if so.
    if (form && form.module) {
      let formModule = null;
      if (typeof form.module === 'string') {
        try {
          formModule = this.evaluate(`return ${form.module}`);
        }
        catch (err) {
          console.warn(err);
        }
      }
      else {
        formModule = form.module;
      }
      if (formModule) {
        Formio.use(formModule);

        // Since we got here after instantiation, we need to manually apply form options.
        if (formModule.options && formModule.options.form) {
          this.options = Object.assign(this.options, formModule.options.form);
        }
      }
    }

    this.initialized = false;
    const rebuild = this.rebuild() || NativePromise.resolve();
    return rebuild.then(() => {
      this.emit('formLoad', form);
      this.triggerRecaptcha();
      // Make sure to trigger onChange after a render event occurs to speed up form rendering.
      setTimeout(() => {
        this.onChange(flags);
        this.formReadyResolve();
      }, 0);

      return this.formReady;
    });
  }

  /**
   * Gets the form object.
   *
   * @returns {Object} - The form JSON schema.
   */
  get form() {
    if (!this._form) {
      this._form = {
        components: []
      };
    }
    return this._form;
  }

  /**
   * Sets the form value.
   *
   * @alias setForm
   * @param {Object} form - The form schema object.
   */
  set form(form) {
    this.setForm(form);
  }

  /**
   * Returns the submission object that was set within this form.
   *
   * @returns {Object}
   */
  get submission() {
    return this.getValue();
  }

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
  set submission(submission) {
    this.setSubmission(submission);
  }

  /**
   * Sets a submission and returns the promise when it is ready.
   * @param submission
   * @param flags
   * @return {Promise.<TResult>}
   */
  setSubmission(submission, flags = {}) {
    flags = {
      ...flags,
      fromSubmission: _.has(flags, 'fromSubmission') ? flags.fromSubmission : true,
    };
    return this.onSubmission = this.formReady.then(
      (resolveFlags) => {
        if (resolveFlags) {
          flags = {
            ...flags,
            ...resolveFlags
          };
        }
        this.submissionSet = true;
        this.triggerChange(flags);
        this.setValue(submission, flags);
        return this.submissionReadyResolve(submission);
      },
      (err) => this.submissionReadyReject(err)
    ).catch(
      (err) => this.submissionReadyReject(err)
    );
  }

  /**
   * Saves a submission draft.
   */
  saveDraft() {
    if (!this.draftEnabled) {
      return;
    }
    if (!this.formio) {
      console.warn(this.t('saveDraftInstanceError'));
      return;
    }
    if (!Formio.getUser()) {
      console.warn(this.t('saveDraftAuthError'));
      return;
    }
    const draft = fastCloneDeep(this.submission);
    draft.state = 'draft';

    if (!this.savingDraft) {
      this.emit('saveDraftBegin');
      this.savingDraft = true;
      this.formio.saveSubmission(draft).then((sub) => {
        // Set id to submission to avoid creating new draft submission
        this.submission._id = sub._id;
        this.savingDraft = false;
        this.emit('saveDraft', sub);
      });
    }
  }

  /**
   * Restores a draft submission based on the user who is authenticated.
   *
   * @param {userId} - The user id where we need to restore the draft from.
   */
  restoreDraft(userId) {
    if (!this.formio) {
      console.warn(this.t('restoreDraftInstanceError'));
      return;
    }
    this.savingDraft = true;
    this.formio.loadSubmissions({
      params: {
        state: 'draft',
        owner: userId
      }
    }).then(submissions => {
      if (submissions.length > 0 && !this.options.skipDraftRestore) {
        const draft = fastCloneDeep(submissions[0]);
        return this.setSubmission(draft).then(() => {
          this.draftEnabled = true;
          this.savingDraft = false;
          this.emit('restoreDraft', draft);
        });
      }
      // Enable drafts so that we can keep track of changes.
      this.draftEnabled = true;
      this.savingDraft = false;
      this.emit('restoreDraft', null);
    });
  }

  get schema() {
    const schema = fastCloneDeep(_.omit(this._form, ['components']));
    schema.components = [];
    this.eachComponent((component) => schema.components.push(component.schema));
    return schema;
  }

  mergeData(_this, _that) {
    _.mergeWith(_this, _that, (thisValue, thatValue) => {
      if (Array.isArray(thisValue) && Array.isArray(thatValue) && thisValue.length !== thatValue.length) {
        return thatValue;
      }
    });
  }

  setValue(submission, flags = {}) {
    if (!submission || !submission.data) {
      submission = { data: {} };
    }
    // Metadata needs to be available before setValue
    this._submission.metadata = submission.metadata || {};
    this.editing = !!submission._id;

    // Set the timezone in the options if available.
    if (
      !this.options.submissionTimezone &&
      submission.metadata &&
      submission.metadata.timezone
    ) {
      this.options.submissionTimezone = submission.metadata.timezone;
    }

    const changed = super.setValue(submission.data, flags);
    if (!flags.sanitize) {
      this.mergeData(this.data, submission.data);
    }

    submission.data = this.data;
    this._submission = submission;
    return changed;
  }

  getValue() {
    if (!this._submission.data) {
      this._submission.data = {};
    }
    if (this.viewOnly) {
      return this._submission;
    }
    const submission = this._submission;
    submission.data = this.data;
    return this._submission;
  }

  /**
   * Build the form.
   */
  init() {
    this._submission = this._submission || { data: {} };

    // Remove any existing components.
    if (this.components && this.components.length) {
      this.destroyComponents();
      this.components = [];
    }

    if (this.component) {
      this.component.components = this.form ? this.form.components : [];
    }
    else {
      this.component = this.form;
    }
    this.component.type = 'form';
    this.component.input = false;

    this.addComponents();
    this.on('submitButton', options => {
      this.submit(false, options).catch(e => e !== false && console.log(e));
    }, true);

    this.on('checkValidity', (data) => this.checkValidity(data, true, data), true);
    this.on('requestUrl', (args) => (this.submitUrl(args.url,args.headers)), true);
    this.on('resetForm', () => this.resetValue(), true);
    this.on('deleteSubmission', () => this.deleteSubmission(), true);
    this.on('refreshData', () => this.updateValue(), true);

    this.executeFormController();

    return this.formReady;
  }

  executeFormController() {
    // If no controller value or
    // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
    if (
      !this.form || !this.form.controller
      || ((!this.visible || this.component.hidden) && this.component.clearOnHide && !this.rootPristine)
    ) {
      return false;
    }

    this.formReady.then(() => {
      this.evaluate(this.form.controller, {
        components: this.components,
      });
    });
  }

  destroy(deleteFromGlobal = false) {
    this.off('submitButton');
    this.off('checkValidity');
    this.off('requestUrl');
    this.off('resetForm');
    this.off('deleteSubmission');
    this.off('refreshData');

    if (deleteFromGlobal) {
      delete Formio.forms[this.id];
    }

    return super.destroy();
  }

  build(element) {
    if (element || this.element) {
      return this.ready.then(() => {
        element = element || this.element;
        super.build(element);
      });
    }
    return this.ready;
  }

  getClassName() {
    let classes = 'formio-form';
    if (this.options.readOnly) {
      classes += ' formio-read-only';
    }
    return classes;
  }

  render() {
    return super.render(this.renderTemplate('webform', {
      classes: this.getClassName(),
      children: this.renderComponents(),
    }), this.builderMode ? 'builder' : 'form', true);
  }

  redraw() {
    // Don't bother if we have not built yet.
    if (!this.element) {
      return NativePromise.resolve();
    }
    this.clear();
    this.setContent(this.element, this.render());
    return this.attach(this.element);
  }

  attach(element) {
    this.element = element;
    this.loadRefs(element, { webform: 'single' });
    const childPromise = this.attachComponents(this.refs.webform);
    this.addEventListener(this.element, 'keydown', this.executeShortcuts);
    this.currentForm = this;
    return childPromise.then(() => {
      this.emit('render', this.element);

      return this.setValue(this._submission, {
        noUpdateEvent: true,
      });
    });
  }

  hasRequiredFields() {
    let result = false;

    eachComponent(this.form.components, (component) => {
      if (component.validate.required) {
        result = true;
        return true;
      }
    }, true);

    return result;
  }

  resetValue() {
    _.each(this.getComponents(), (comp) => (comp.resetValue()));
    this.setPristine(true);
    this.redraw();
  }

  /**
   * Sets a new alert to display in the error dialog of the form.
   *
   * @param {string} type - The type of alert to display. "danger", "success", "warning", etc.
   * @param {string} message - The message to show in the alert.
   * @param {string} classes - Styling classes for alert.
   */
  setAlert(type, message, classes) {
    if (!type && this.submitted) {
      if (this.alert) {
        if (this.refs.errorRef && this.refs.errorRef.length) {
          this.refs.errorRef.forEach(el => {
            this.removeEventListener(el, 'click');
            this.removeEventListener(el, 'keypress');
          });
        }
        this.removeChild(this.alert);
        this.alert = null;
      }
      return;
    }
    if (this.options.noAlerts) {
      if (!message) {
        this.emit('error', false);
      }
      return;
    }
    if (this.alert) {
      try {
        if (this.refs.errorRef && this.refs.errorRef.length) {
          this.refs.errorRef.forEach(el => {
            this.removeEventListener(el, 'click');
            this.removeEventListener(el, 'keypress');
          });
        }
        this.removeChild(this.alert);
        this.alert = null;
      }
      catch (err) {
        // ignore
      }
    }
    if (message) {
      this.alert = this.ce('div', {
        class: classes || `alert alert-${type}`,
        id: `error-list-${this.id}`,
      });
      if (message instanceof HTMLElement) {
        this.appendTo(message, this.alert);
      }
      else {
        this.setContent(this.alert, message);
      }
    }
    if (!this.alert) {
      return;
    }

    this.loadRefs(this.alert, { errorRef: 'multiple' });

    if (this.refs.errorRef && this.refs.errorRef.length) {
      this.refs.errorRef.forEach(el => {
        this.addEventListener(el, 'click', (e) => {
          const key = e.currentTarget.dataset.componentKey;
          this.focusOnComponent(key);
        });
        this.addEventListener(el, 'keydown', (e) => {
          if (e.keyCode === 13) {
            e.preventDefault();
            const key = e.currentTarget.dataset.componentKey;
            this.focusOnComponent(key);
          }
        });
      });
    }
    this.prepend(this.alert);
  }

  /**
   * Focus on selected component.
   *
   * @param {string} key - The key of selected component.
   * @returns {*}
   */
  focusOnComponent(key) {
    if (key) {
      const component = this.getComponent(key);
      if (component) {
        component.focus();
      }
    }
  }

  /**
   * Show the errors of this form within the alert dialog.
   *
   * @param {Object} error - An optional additional error to display along with the component errors.
   * @returns {*}
   */
  /* eslint-disable no-unused-vars */
  showErrors(error, triggerEvent, onChange) {
    this.loading = false;
    let errors = this.errors;
    if (error) {
      if (Array.isArray(error)) {
        errors = errors.concat(error);
      }
      else {
        errors.push(error);
      }
    }
    else {
      errors = super.errors;
    }

    errors = errors.concat(this.customErrors);

    if (!errors.length) {
      this.setAlert(false);
      return;
    }

    // Mark any components as invalid if in a custom message.
    errors.forEach((err) => {
      const { components = [] } = err;

      if (err.component) {
        components.push(err.component);
      }

      if (err.path) {
        components.push(err.path);
      }

      components.forEach((path) => {
        const component = this.getComponent(path, _.identity);
        const components = _.compact(Array.isArray(component) ? component : [component]);

        components.forEach((component) => component.setCustomValidity(err.message, true));
      });
    });

    const message = document.createDocumentFragment();
    const p = this.ce('p');
    this.setContent(p, this.t('error'));
    const ul = this.ce('ul');
    errors.forEach(err => {
      if (err) {
        const createListItem = (message, index) => {
          const params = {
            ref: 'errorRef',
            tabIndex: 0,
            'aria-label': `${message}. Click to navigate to the field with following error.`
          };
          const li = this.ce('li', params);
          const span = this.ce('span');
          li.style='cursor:pointer';

          this.setContent(span, unescapeHTML(message));
          this.appendTo(span, li);

          const messageFromIndex = !_.isUndefined(index) && err.messages && err.messages[index];
          const keyOrPath = (messageFromIndex && messageFromIndex.path) || (err.component && err.component.key);
          if (keyOrPath) {
            const formattedKeyOrPath = getStringFromComponentPath(keyOrPath);
            li.dataset.componentKey = formattedKeyOrPath;
          }

          this.appendTo(li, ul);
        };

        if (err.messages && err.messages.length) {
          const { component } = err;
          err.messages.forEach(({ message }, index) => {
            const text = this.t('alertMessage', { label: this.t(component.label), message });
            createListItem(text, index);
          });
        }
        else if (err) {
          const message = _.isObject(err) ? err.message || '' : err;
          createListItem(message);
        }
      }
    });
    p.appendChild(ul);
    message.appendChild(p);
    this.setAlert('danger', message);
    if (triggerEvent) {
      this.emit('error', errors);
    }

    return errors;
  }
  /* eslint-enable no-unused-vars */

  /**
   * Called when the submission has completed, or if the submission needs to be sent to an external library.
   *
   * @param {Object} submission - The submission object.
   * @param {boolean} saved - Whether or not this submission was saved to the server.
   * @returns {object} - The submission object.
   */
  onSubmit(submission, saved) {
    this.loading = false;
    this.submitting = false;
    this.setPristine(true);
    // We want to return the submitted submission and setValue will mutate the submission so cloneDeep it here.
    this.setValue(fastCloneDeep(submission), {
      noValidate: true,
      noCheck: true
    });
    this.setAlert('success', `<p>${this.t('complete')}</p>`);
    this.emit('submit', submission);
    if (saved) {
      this.emit('submitDone', submission);
    }
    return submission;
  }

  /**
   * Called when an error occurs during the submission.
   *
   * @param {Object} error - The error that occured.
   */
  onSubmissionError(error) {
    if (error) {
      // Normalize the error.
      if (typeof error === 'string') {
        error = { message: error };
      }

      if ('details' in error) {
        error = error.details;
      }
    }

    this.submitting = false;
    this.setPristine(false);
    this.emit('submitError', error);

    // Allow for silent cancellations (no error message, no submit button error state)
    if (error && error.silent) {
      this.emit('change', { isValid: true });
      return false;
    }

    return this.showErrors(error, true);
  }

  /**
   * Trigger the change event for this form.
   *
   * @param changed
   * @param flags
   */
  onChange(flags, changed, modified, changes) {
    flags = flags || {};
    let isChangeEventEmitted = false;
    // For any change events, clear any custom errors for that component.
    if (changed && changed.component) {
      this.customErrors = this.customErrors.filter(err => err.component && err.component !== changed.component.key);
    }

    super.onChange(flags, true);
    const value = _.clone(this.submission);
    flags.changed = value.changed = changed;
    flags.changes = changes;

    if (modified && this.pristine) {
      this.pristine = false;
    }

    value.isValid = this.checkData(value.data, flags);
    this.loading = false;
    if (this.submitted) {
      this.showErrors();
    }

    // See if we need to save the draft of the form.
    if (modified && this.options.saveDraft) {
      this.triggerSaveDraft();
    }

    if (!flags || !flags.noEmit) {
      this.emit('change', value, flags);
      isChangeEventEmitted = true;
    }

    // The form is initialized after the first change event occurs.
    if (isChangeEventEmitted && !this.initialized) {
      this.emit('initialized');
      this.initialized = true;
    }
  }

  checkData(data, flags = {}) {
    const valid = super.checkData(data, flags);
    if ((_.isEmpty(flags) || flags.noValidate) && this.submitted) {
      this.showErrors();
    }
    return valid;
  }

  /**
   * Send a delete request to the server.
   */
  deleteSubmission() {
    return this.formio.deleteSubmission()
      .then(() => {
        this.emit('submissionDeleted', this.submission);
        this.resetValue();
      });
  }

  /**
   * Cancels the submission.
   *
   * @alias reset
   */
  cancel(noconfirm) {
    const shouldReset = this.hook('beforeCancel', true);
    if (shouldReset && (noconfirm || confirm(this.t('confirmCancel')))) {
      this.resetValue();
      return true;
    }
    else {
      return false;
    }
  }

  setMetadata(submission) {
    // Add in metadata about client submitting the form
    submission.metadata = submission.metadata || {};
    _.defaults(submission.metadata, {
      timezone: _.get(this, '_submission.metadata.timezone', currentTimezone()),
      offset: parseInt(_.get(this, '_submission.metadata.offset', moment().utcOffset()), 10),
      origin: document.location.origin,
      referrer: document.referrer,
      browserName: navigator.appName,
      userAgent: navigator.userAgent,
      pathName: window.location.pathname,
      onLine: navigator.onLine
    });
  }

  submitForm(options = {}) {
    return new NativePromise((resolve, reject) => {
      // Read-only forms should never submit.
      if (this.options.readOnly) {
        return resolve({
          submission: this.submission,
          saved: false
        });
      }

      const submission = fastCloneDeep(this.submission || {});

      this.setMetadata(submission);

      submission.state = options.state || 'submitted';

      const isDraft = (submission.state === 'draft');
      this.hook('beforeSubmit', { ...submission, component: options.component }, (err) => {
        if (err) {
          return reject(err);
        }

        if (!isDraft && !submission.data) {
          return reject('Invalid Submission');
        }

        if (!isDraft && !this.checkValidity(submission.data, true, submission.data)) {
          return reject();
        }

        this.everyComponent((comp) => {
          const { persistent } = comp.component;
          if (persistent === 'client-only') {
            _.unset(submission.data, comp.path);
          }
        });

        this.hook('customValidation', { ...submission, component: options.component }, (err) => {
          if (err) {
            // If string is returned, cast to object.
            if (typeof err === 'string') {
              err = {
                message: err
              };
            }

            // Ensure err is an array.
            err = Array.isArray(err) ? err : [err];

            // Set as custom errors.
            this.customErrors = err;

            return reject();
          }

          this.loading = true;

          // Use the form action to submit the form if available.
          if (this._form && this._form.action) {
            const method = (submission.data._id && this._form.action.includes(submission.data._id)) ? 'PUT' : 'POST';
            return Formio.makeStaticRequest(this._form.action, method, submission, this.formio ? this.formio.options : {})
              .then((result) => resolve({
                submission: result,
                saved: true,
              }))
              .catch(reject);
          }

          const submitFormio = this.formio;
          if (this.nosubmit || !submitFormio) {
            return resolve({
              submission,
              saved: false,
            });
          }
          // If this is an actionUrl, then make sure to save the action and not the submission.
          const submitMethod = submitFormio.actionUrl ? 'saveAction' : 'saveSubmission';
          submitFormio[submitMethod](submission)
            .then((result) => resolve({
              submission: result,
              saved: true,
            }))
            .catch(reject);
        });
      });
    });
  }

  executeSubmit(options) {
    this.submitted = true;
    this.submitting = true;
    return this.submitForm(options)
      .then(({ submission, saved }) => this.onSubmit(submission, saved))
      .catch((err) => NativePromise.reject(this.onSubmissionError(err)));
  }

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
  submit(before, options) {
    if (!before) {
      return this.beforeSubmit(options).then(() => this.executeSubmit(options));
    }
    else {
      return this.executeSubmit(options);
    }
  }

  submitUrl(URL, headers) {
    if (!URL) {
      return console.warn('Missing URL argument');
    }

    const submission = this.submission || {};
    const API_URL  = URL;
    const settings = {
      method: 'POST',
      headers: {}
    };

    if (headers && headers.length > 0) {
      headers.map((e) => {
        if (e.header !== '' && e.value !== '') {
          settings.headers[e.header] = this.interpolate(e.value, submission);
        }
      });
    }
    if (API_URL && settings) {
        Formio.makeStaticRequest(API_URL,settings.method,submission, { headers: settings.headers }).then(() => {
          this.emit('requestDone');
          this.setAlert('success', '<p> Success </p>');
        }).catch((e) => {
          this.showErrors(`${e.statusText ? e.statusText : ''} ${e.status ? e.status : e}`);
          this.emit('error',`${e.statusText ? e.statusText : ''} ${e.status ? e.status : e}`);
          console.error(`${e.statusText ? e.statusText : ''} ${e.status ? e.status : e}`);
          this.setAlert('danger', `<p> ${e.statusText ? e.statusText : ''} ${e.status ? e.status : e} </p>`);
        });
    }
    else {
      this.emit('error', 'You should add a URL to this button.');
      this.setAlert('warning', 'You should add a URL to this button.');
      return console.warn('You should add a URL to this button.');
    }
  }

  triggerRecaptcha() {
    if (!this || !this.components) {
      return;
    }
    const recaptchaComponent = searchComponents(this.components, {
      'component.type': 'recaptcha',
      'component.eventType': 'formLoad'
    });
    if (recaptchaComponent.length > 0) {
      recaptchaComponent[0].verify(`${this.form.name ? this.form.name : 'form'}Load`);
    }
  }

  set nosubmit(value) {
    this._nosubmit = !!value;
    this.emit('nosubmit', this._nosubmit);
  }

  get nosubmit() {
    return this._nosubmit || false;
  }
}

Webform.setBaseUrl = Formio.setBaseUrl;
Webform.setApiUrl = Formio.setApiUrl;
Webform.setAppUrl = Formio.setAppUrl;
