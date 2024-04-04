import _ from 'lodash';
import Component from '../_classes/component/Component';
import ComponentModal from '../_classes/componentModal/ComponentModal';
import EventEmitter from 'eventemitter3';
import NativePromise from 'native-promise-only';
import {
  isMongoId,
  eachComponent,
  getStringFromComponentPath,
  getArrayFromComponentPath,
  componentValueTypes
} from '../../utils/utils';
import { GlobalFormio as Formio } from '../../Formio';
import Form from '../../Form';

export default class FormComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      label: 'Form',
      type: 'form',
      key: 'form',
      src: '',
      reference: true,
      form: '',
      path: '',
      tableView: true,
    }, ...extend);
  }

  static get builderInfo() {
    return {
      title: 'Nested Form',
      icon: 'wpforms',
      group: 'premium',
      documentation: '/userguide/form-building/premium-components#nested-form',
      weight: 110,
      schema: FormComponent.schema()
    };
  }

  static savedValueTypes() {
    return [componentValueTypes.object];
  }

  init() {
    super.init();
    this.formObj = {
      display: this.component.display,
      settings: this.component.settings,
      components: this.component.components
    };
    this.valueChanged = false;
    this.subForm = null;
    this.formSrc = '';
    if (this.component.src) {
      this.formSrc = this.component.src;
    }

    if (
      !this.component.src &&
      !this.options.formio &&
      (this.component.form || this.component.path)
    ) {
      if (this.component.project) {
        this.formSrc = Formio.getBaseUrl();
        // Check to see if it is a MongoID.
        if (isMongoId(this.component.project)) {
          this.formSrc += '/project';
        }
        this.formSrc += `/${this.component.project}`;
        this.options.project = this.formSrc;
      }
      else {
        this.formSrc = Formio.getProjectUrl();
        this.options.project = this.formSrc;
      }
      if (this.component.form) {
        if (isMongoId(this.component.form)) {
          this.formSrc += `/form/${this.component.form}`;
        }
        else {
          this.formSrc += `/${this.component.form}`;
        }
      }
      else if (this.component.path) {
        this.formSrc += `/${this.component.path}`;
      }
    }

    // Build the source based on the root src path.
    if (!this.formSrc && this.options.formio) {
      const rootSrc = this.options.formio.formsUrl;
      if (this.component.form && isMongoId(this.component.form)) {
        this.formSrc = `${rootSrc}/${this.component.form}`;
      }
      else {
        const formPath = this.component.path || this.component.form;
        this.formSrc = `${rootSrc.replace(/\/form$/, '')}/${formPath}`;
      }
    }

    if (this.builderMode && this.component.hasOwnProperty('formRevision')) {
      this.component.revision = this.component.formRevision;
      delete this.component.formRevision;
    }

    // Add revision version if set.
    if (this.component.revision || this.component.revision === 0 ||
      this.component.formRevision || this.component.formRevision === 0
      || this.component.revisionId
    ) {
      this.setFormRevision(this.component.revisionId || this.component.revision || this.component.formRevision);
    }

    return this.createSubForm();
  }

  get dataReady() {
    return this.subFormReady || NativePromise.resolve();
  }

  get defaultValue() {
    // Not not provide a default value unless the subform is ready so that it will initialize correctly.
    return this.subForm ? super.defaultValue : null;
  }

  get defaultSchema() {
    return FormComponent.schema();
  }

  get emptyValue() {
    return { data: {} };
  }

  get ready() {
    return this.subFormReady || NativePromise.resolve();
  }

  get useOriginalRevision() {
    return this.component?.useOriginalRevision && !!this.formObj?.revisions;
  }

  setFormRevision(rev) {
    // Remove current revisions from src if it is
    this.formSrc = this.formSrc.replace(/\/v\/[0-9a-z]+/, '');
    const revNumber = Number.parseInt(rev);

    if (!isNaN(revNumber)) {
      this.subFormRevision = rev;
      this.formSrc += `/v/${rev}`;
    }
    else {
      this.subFormRevision = undefined;
    }
  }

  getComponent(path, fn) {
    path = getArrayFromComponentPath(path);
    if (path[0] === 'data') {
      path.shift();
    }
    const originalPathStr = `${this.path}.data.${getStringFromComponentPath(path)}`;
    if (this.subForm) {
      return this.subForm.getComponent(path, fn, originalPathStr);
    }
  }

  /* eslint-disable max-statements */
  getSubOptions(options = {}) {
    options.parentPath = `${this.path}.data.`;
    options.events = this.createEmitter();

    // Make sure to not show the submit button in wizards in the nested forms.
    _.set(options, 'buttonSettings.showSubmit', false);

    if (!this.options) {
      return options;
    }
    if (this.options.base) {
      options.base = this.options.base;
    }
    if (this.options.project) {
      options.project = this.options.project;
    }
    if (this.options.readOnly || this.component.disabled) {
      options.readOnly = this.options.readOnly || this.component.disabled;
    }
    if (this.options.breadcrumbSettings) {
      options.breadcrumbSettings = this.options.breadcrumbSettings;
    }
    if (this.options.buttonSettings) {
      options.buttonSettings = _.clone(this.options.buttonSettings);
    }
    if (this.options.viewAsHtml) {
      options.viewAsHtml = this.options.viewAsHtml;
    }
    if (this.options.language) {
      options.language = this.options.language;
    }
    if (this.options.template) {
      options.template = this.options.template;
    }
    if (this.options.templates) {
      options.templates = this.options.templates;
    }
    if (this.options.renderMode) {
      options.renderMode = this.options.renderMode;
    }
    if (this.options.attachMode) {
      options.attachMode = this.options.attachMode;
    }
    if (this.options.iconset) {
      options.iconset = this.options.iconset;
    }
    if (this.options.fileService) {
      options.fileService = this.options.fileService;
    }
    if (this.options.onChange) {
      options.onChange = this.options.onChange;
    }
    if (this.options.preview) {
      options.preview = this.options.preview;
    }
    if (this.options.saveDraft) {
      options.saveDraft = this.options.saveDraft;
      options.formio = new Formio(this.formSrc);
    }
    if (this.options.saveDraftThrottle) {
      options.saveDraftThrottle = this.options.saveDraftThrottle;
    }
    return options;
  }
  /* eslint-enable max-statements */

  render() {
    if (this.builderMode) {
      return super.render(this.component.label || 'Nested form');
    }
    const subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
    return super.render(subform);
  }

  asString(value) {
    return this.getValueAsString(value);
  }

  /**
   * Prints out the value of form components as a datagrid value.
   */

  getValueAsString(value, options) {
    if (!value) {
      return 'No data provided';
    }
    if (!value.data && value._id) {
      return value._id;
    }
    if (!value.data || !Object.keys(value.data).length) {
      return 'No data provided';
    }
    if (options?.email) {
      let result = (`
        <table border="1" style="width:100%">
          <tbody>
      `);

      this.everyComponent((component) => {
        if (component.isInputComponent && component.visible && !component.skipInEmail) {
          result += (`
            <tr>
              <th style="padding: 5px 10px;">${component.label}</th>
              <td style="width:100%;padding:5px 10px;">${component.getView(component.dataValue, options)}</td>
            </tr>
          `);
        }
      }, {
        ...options,
        fromRoot: true,
      });

      result += (`
          </tbody>
        </table>
      `);

      return result;
    }
    if (_.isEmpty(value)) {
      return '';
    }

    return '[Complex Data]';
  }

  attach(element) {
    // Don't attach in builder.
    if (this.builderMode) {
      return super.attach(element);
    }
    return super.attach(element)
      .then(() => {
        if (this.isSubFormLazyLoad() && !this.hasLoadedForm && !this.subFormLoading) {
          this.createSubForm(true);
        }

        return this.subFormReady.then(() => {
          this.empty(element);
          if (this.options.builder) {
            this.setContent(element, this.ce('div', {
              class: 'text-muted text-center p-2'
            }, this.text(this.formObj.title)));
            return;
          }

          this.setContent(element, this.render());
          if (this.subForm) {
            if (this.isNestedWizard) {
              element = this.root.element;
            }
            this.subForm.attach(element);
            this.valueChanged = this.hasSetValue;

            if (!this.valueChanged && this.dataValue.state !== 'submitted') {
              this.setDefaultValue();
            }
            else {
              this.restoreValue();
            }
          }
          if (!this.builderMode && this.component.modalEdit) {
            const modalShouldBeOpened = this.componentModal ? this.componentModal.isOpened : false;
            const currentValue = modalShouldBeOpened ? this.componentModal.currentValue : this.dataValue;
            this.componentModal = new ComponentModal(this, element, modalShouldBeOpened, currentValue);
            this.setOpenModalElement();
          }

          this.calculateValue();
        });
      });
  }

  detach() {
    if (this.subForm) {
      this.subForm.detach();
    }
    super.detach();
  }

  get currentForm() {
    return this._currentForm;
  }

  get hasLoadedForm() {
    return this.formObj
      && this.formObj.components
      && Array.isArray(this.formObj.components)
      && this.formObj.components.length;
  }

  set currentForm(instance) {
    this._currentForm = instance;
    if (!this.subForm) {
      return;
    }
    this.subForm.getComponents().forEach(component => {
      component.currentForm = this;
    });
  }

  get isRevisionChanged() {
    return _.isNumber(this.subFormRevision)
    && _.isNumber(this.formObj._vid)
    && this.formObj._vid !== this.subFormRevision;
  }

  destroy() {
    if (this.subForm) {
      this.subForm.destroy();
      this.subForm = null;
      this.subFormReady = null;
    }
    super.destroy();
  }

  redraw() {
    if (this.subForm) {
      this.subForm.form = this.formObj;
      this.setSubFormDisabled(this.subForm);
    }
    return super.redraw();
  }

  /**
   * Pass everyComponent to subform.
   * @param args
   * @returns {*|void}
   */
  everyComponent(...args) {
    if (this.subForm) {
      this.subForm.everyComponent(...args);
    }
  }

  setSubFormDisabled(subForm) {
    subForm.disabled = this.disabled; // When the Nested Form is disabled make the subForm disabled
  }

  updateSubWizards(subForm) {
    if (this.isNestedWizard && this.root?.subWizards && subForm?._form?.display === 'wizard') {
      const existedForm = this.root.subWizards.findIndex(form => form.component.form === this.component.form);
      if (existedForm !== -1) {
        this.root.subWizards[existedForm] = this;
      }
      else {
        this.root.subWizards.push(this);
      }
      this.emit('subWizardsUpdated', subForm);
    }
  }

  /**
   * Create a subform instance.
   *
   * @return {*}
   */
  createSubForm(fromAttach) {
    this.subFormReady = this.loadSubForm(fromAttach).then((form) => {
      if (!form) {
        return;
      }

      // Iterate through every component and hide the submit button.
      eachComponent(form.components, (component) => {
        this.hideSubmitButton(component);
      });

      // If the subform is already created then destroy the old one.
      if (this.subForm) {
        this.subForm.destroy();
      }

      // Render the form.
      return (new Form(form, this.getSubOptions())).ready.then((instance) => {
        this.subForm = instance;
        this.subForm.currentForm = this;
        this.subForm.parent = this;
        this.subForm.parentVisible = this.visible;
        this.subForm.on('change', () => {
          if (this.subForm) {
            this.dataValue = this.subForm.getValue();
            this.triggerChange({
              noEmit: true
            });
          }
        });
        this.subForm.url = this.formSrc;
        this.subForm.nosubmit = true;
        this.subForm.root = this.root;
        this.subForm.localRoot = this.isNestedWizard ? this.localRoot : this.subForm;
        this.restoreValue();
        this.valueChanged = this.hasSetValue;
        this.onChange();
        return this.subForm;
      });
    }).then((subForm) => {
      this.updateSubWizards(subForm);
      return subForm;
    });
    return this.subFormReady;
  }

  hideSubmitButton(component) {
    const isSubmitButton = (component.type === 'button') &&
      ((component.action === 'submit') || !component.action);

    if (isSubmitButton) {
      component.hidden = true;
    }
  }

  /**
   * Load the subform.
   */
  loadSubForm(fromAttach) {
    if (this.builderMode || this.isHidden() || (this.isSubFormLazyLoad() && !fromAttach)) {
      return NativePromise.resolve();
    }

    if (this.hasLoadedForm && !this.isRevisionChanged &&
      !(this.options.pdf && this.component?.useOriginalRevision && _.isNull(this.subForm) && !this.subFormLoading)
    ) {
      // Pass config down to sub forms.
      if (this.root && this.root.form && this.root.form.config && !this.formObj.config) {
        this.formObj.config = this.root.form.config;
      }
      return NativePromise.resolve(this.formObj);
    }
    else if (this.formSrc) {
      this.subFormLoading = true;
      return (new Formio(this.formSrc)).loadForm({ params: { live: 1 } })
        .then((formObj) => {
          this.formObj = formObj;
          if (this.options.pdf && this.component.useOriginalRevision) {
            this.formObj.display = 'form';
          }
          this.subFormLoading = false;
          return formObj;
        })
        .catch((err) => {
          console.log(err);
          return null;
        });
    }
    return NativePromise.resolve();
  }

  get subFormData() {
    return this.dataValue?.data || {};
  }

  checkComponentValidity(data, dirty, row, options) {
    options = options || {};
    const silentCheck = options.silentCheck || false;

    if (this.subForm) {
      return this.subForm.checkValidity(this.subFormData, dirty, null, silentCheck);
    }

    return super.checkComponentValidity(data, dirty, row, options);
  }

  checkComponentConditions(data, flags, row) {
    const visible = super.checkComponentConditions(data, flags, row);

    // Return if already hidden
    if (!visible) {
      return visible;
    }

    if (this.subForm) {
      return this.subForm.checkConditions(this.subFormData);
    }
    // There are few cases when subForm is not loaded when a change is triggered,
    // so we need to perform checkConditions after it is ready, or some conditional fields might be hidden in View mode
    else if (this.subFormReady) {
      this.subFormReady.then(() => {
        if (this.subForm) {
          return this.subForm.checkConditions(this.subFormData);
        }
      });
    }

    return visible;
  }

  calculateValue(data, flags, row) {
    if (this.subForm) {
      return this.subForm.calculateValue(this.subFormData, flags);
    }

    return super.calculateValue(data, flags, row);
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    if (this.subForm) {
      this.subForm.setPristine(pristine);
    }
  }

  /**
   * Determine if the subform should be submitted.
   * @return {*|boolean}
   */
  get shouldSubmit() {
    return this.subFormReady && (!this.component.hasOwnProperty('reference') || this.component.reference) && !this.isHidden();
  }

  /**
   * Returns the data for the subform.
   *
   * @return {*}
   */
  getSubFormData() {
    if (_.get(this.subForm, 'form.display') === 'pdf') {
      return this.subForm.getSubmission();
    }
    else {
      return NativePromise.resolve(this.dataValue);
    }
  }

  /**
   * Submit the subform if configured to do so.
   *
   * @return {*}
   */
  submitSubForm(rejectOnError) {
    // If we wish to submit the form on next page, then do that here.
    if (this.shouldSubmit) {
      return this.subFormReady.then(() => {
        if (!this.subForm) {
          return this.dataValue;
        }
        this.subForm.nosubmit = false;
        return this.subForm.submitForm().then(result => {
          this.subForm.loading = false;
          this.subForm.showAllErrors = false;
          this.dataValue = result.submission;
          return this.dataValue;
        }).catch(err => {
          this.subForm.showAllErrors = true;
          if (rejectOnError) {
            this.subForm.onSubmissionError(err);
            return NativePromise.reject(err);
          }
          else {
            return {};
          }
        });
      });
    }
    return this.getSubFormData();
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforePage(next) {
    // Should not submit child forms if we are going to the previous page
    if (!next) {
      return super.beforePage(next);
    }
    return this.submitSubForm(true).then(() => super.beforePage(next));
  }

  /**
   * Submit the form before the whole form is triggered.
   */
  beforeSubmit() {
    const submission = this.dataValue;
    // Cancel triggered saveDraft
    if (this.subForm?.draftEnabled && this.subForm.triggerSaveDraft?.cancel) {
      this.subForm.triggerSaveDraft.cancel();
    }

    const isAlreadySubmitted = submission && submission._id && submission.form;

    // This submission has already been submitted, so just return the reference data.
    if (isAlreadySubmitted && !this.subForm?.wizard) {
      this.dataValue = submission;
      return NativePromise.resolve(this.dataValue);
    }
    return this.submitSubForm(false)
      .then(() => {
        return this.dataValue;
      })
      .then(() => super.beforeSubmit());
  }

  isSubFormLazyLoad() {
    return  this.root?._form?.display === 'wizard' && this.component.lazyLoad;
  }

  isHidden() {
    if (!this.visible) {
      return true;
    }

    return !super.checkConditions(this.rootValue);
  }

  setValue(submission, flags = {}) {
    const changed = super.setValue(submission, flags);
    this.valueChanged = true;
    if (this.subForm) {
      const revisionPath = submission._frid ? '_frid' : '_vid';
      const shouldLoadOriginalRevision = this.useOriginalRevision
      && (_.isNumber(submission[revisionPath]) || _.isNumber(submission._fvid))
      && _.isNumber(this.subForm.form?.[revisionPath])
      && submission._fvid !== this.subForm.form[revisionPath];

      if (shouldLoadOriginalRevision) {
        this.setFormRevision( submission._frid || submission._fvid);
        this.createSubForm().then(() => {
          this.attach(this.element);
        });
      }
      else {
        this.setSubFormValue(submission, flags);
      }
    }
    return changed;
  }

  setSubFormValue(submission, flags) {
    const shouldLoadSubmissionById = submission
      && submission._id
      && this.subForm.formio
      && _.isEmpty(submission.data);

    if (shouldLoadSubmissionById) {
      const formId = submission.form || this.formObj.form || this.component.form;
      const submissionUrl = `${this.subForm.formio.formsUrl}/${formId}/submission/${submission._id}`;
      this.subForm.setUrl(submissionUrl, this.options);
      this.subForm.loadSubmission().catch((err) => {
        console.error(`Unable to load subform submission ${submission._id}:`, err);
      });
    }
    else {
      this.subForm.setValue(submission, flags);
    }
  }

  isEmpty(value = this.dataValue) {
    return value === null || _.isEqual(value, this.emptyValue) || (this.areAllComponentsEmpty(value?.data) && !value?._id);
  }

  areAllComponentsEmpty(data) {
    let res = true;
    if (this.subForm) {
      this.subForm.everyComponent((comp) => {
        const componentValue = _.get(data, comp.key);
        res &= comp.isEmpty(componentValue);
      });
    }
    else {
      res = false;
    }
    return res;
  }

  getValue() {
    if (this.subForm) {
      return this.subForm.getValue();
    }
    return this.dataValue;
  }

  get errors() {
    let errors = super.errors;
    if (this.subForm) {
      errors = errors.concat(this.subForm.errors);
    }
    return errors;
  }

  updateSubFormVisibility() {
    if (this.subForm) {
      this.subForm.parentVisible = this.visible;
    }
  }

  /**
   * Determines if this form is a Nested Wizard
   * which means it should be a Wizard itself and should be a direct child of a Wizard's page
   * @returns {boolean}
   */
  get isNestedWizard() {
    return this.subForm?._form?.display === 'wizard' && this.parent?.parent?._form?.display === 'wizard';
  }

  get visible() {
    return super.visible;
  }

  set visible(value) {
    const isNestedWizard = this.isNestedWizard;

    if (this._visible !== value) {
      this._visible = value;
      // Form doesn't load if hidden. If it becomes visible, create the form.
      if (!this.subForm && value) {
        this.createSubForm();
        this.subFormReady.then(() => {
          this.updateSubFormVisibility();
          this.clearOnHide();
        });
        this.redraw();
        return;
      }
      this.updateSubFormVisibility();
      this.clearOnHide();
      isNestedWizard ? this.rebuild() : this.redraw();
    }
    if (!value && isNestedWizard) {
      this.root.redraw();
    }
  }

  get parentVisible() {
    return super.parentVisible;
  }

  set parentVisible(value) {
    if (this._parentVisible !== value) {
      this._parentVisible = value;
      this.clearOnHide();
      // Form doesn't load if hidden. If it becomes visible, create the form.
      if (!this.subForm && value) {
        this.createSubForm();
        this.subFormReady.then(() => {
          this.updateSubFormVisibility();
        });
        this.redraw();
        return;
      }
      this.updateSubFormVisibility();
      this.redraw();
    }
  }

  isInternalEvent(event) {
    switch (event) {
      case 'focus':
      case 'blur':
      case 'componentChange':
      case 'componentError':
      case 'error':
      case 'formLoad':
      case 'languageChanged':
      case 'render':
      case 'checkValidity':
      case 'initialized':
      case 'submit':
      case 'submitButton':
      case 'nosubmit':
      case 'updateComponent':
      case 'submitDone':
      case 'submissionDeleted':
      case 'requestDone':
      case 'nextPage':
      case 'prevPage':
      case 'wizardNavigationClicked':
      case 'updateWizardNav':
      case 'restoreDraft':
      case 'saveDraft':
      case 'saveComponent':
      case 'pdfUploaded':
        return true;
      default:
        return false;
    }
  }

  createEmitter() {
    const emitter = new EventEmitter();
    const nativeEmit = emitter.emit;
    const that = this;
    emitter.emit = function(event, ...args) {
      const eventType = event.replace(`${that.options.namespace}.`, '');
      nativeEmit.call(this, event, ...args);
      if (!that.isInternalEvent(eventType)) {
        that.emit(eventType, ...args);
      }
    };

    return emitter;
  }

  deleteValue() {
    super.setValue(null, {
      noUpdateEvent: true,
      noDefault: true
    });
    this.unset();
  }
}
