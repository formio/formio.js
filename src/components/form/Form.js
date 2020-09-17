import _ from 'lodash';
import Component from '../_classes/component/Component';
import ComponentModal from '../_classes/componentModal/ComponentModal';
import EventEmitter from 'eventemitter2';
import NativePromise from 'native-promise-only';
import {
  isMongoId,
  eachComponent,
  getStringFromComponentPath,
  getArrayFromComponentPath
} from '../../utils/utils';
import Formio from '../../Formio';
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
      documentation: 'http://help.form.io/userguide/#form',
      weight: 110,
      schema: FormComponent.schema()
    };
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
        this.formSrc += `/form/${this.component.form}`;
      }
      else if (this.component.path) {
        this.formSrc += `/${this.component.path}`;
      }
    }

    // Build the source based on the root src path.
    if (!this.formSrc && this.options.formio) {
      const rootSrc = this.options.formio.formsUrl;
      if (this.component.path) {
        const parts = rootSrc.split('/');
        parts.pop();
        this.formSrc = `${parts.join('/')}/${this.component.path}`;
      }
      if (this.component.form) {
        this.formSrc = `${rootSrc}/${this.component.form}`;
      }
    }

    // Add revision version if set.
    if (this.component.revision || this.component.revision === 0) {
      this.formSrc += `/v/${this.component.revision}`;
    }

    return this.createSubForm().then((subForm) => {
      setTimeout(() => {
        if (this.root && this.root.subWizards && subForm._form.display === 'wizard') {
          this.root.subWizards.push(this);
          this.emit('subWizardsUpdated');
        }
      }, 0);
    });
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
    return options;
  }

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
  getValueAsString(value) {
    if (!value) {
      return 'No data provided';
    }
    if (!value.data && value._id) {
      return value._id;
    }
    if (!value.data || !Object.keys(value.data).length) {
      return 'No data provided';
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
            this.subForm.attach(element);
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

  set currentForm(instance) {
    this._currentForm = instance;
    if (!this.subForm) {
      return;
    }
    this.subForm.getComponents().forEach(component => {
      component.currentForm = this;
    });
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

  /**
   * Create a subform instance.
   *
   * @return {*}
   */
  createSubForm() {
    this.subFormReady = this.loadSubForm().then((form) => {
      if (!form) {
        return;
      }

      // Iterate through every component and hide the submit button.
      eachComponent(form.components, (component) => {
        if (
          (component.type === 'button') &&
          ((component.action === 'submit') || !component.action)
        ) {
          component.hidden = true;
        }
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
        this.restoreValue();
        this.valueChanged = this.hasSetValue;
        return this.subForm;
      });
    });
    return this.subFormReady;
  }

  /**
   * Load the subform.
   */
  loadSubForm() {
    if (this.builderMode || this.isHidden()) {
      return NativePromise.resolve();
    }

    // Determine if we already have a loaded form object.
    if (
      this.formObj &&
      this.formObj.components &&
      Array.isArray(this.formObj.components) &&
      this.formObj.components.length
    ) {
      // Pass config down to sub forms.
      if (this.root && this.root.form && this.root.form.config && !this.formObj.config) {
        this.formObj.config = this.root.form.config;
      }
      return NativePromise.resolve(this.formObj);
    }
    else if (this.formSrc) {
      return (new Formio(this.formSrc)).loadForm({ params: { live: 1 } })
        .then((formObj) => {
          this.formObj = formObj;
          return formObj;
        });
    }
    return NativePromise.resolve();
  }

  checkComponentValidity(data, dirty, row) {
    if (this.subForm) {
      return this.subForm.checkValidity(this.dataValue.data, dirty);
    }

    return super.checkComponentValidity(data, dirty, row);
  }

  checkComponentConditions(data, flags, row) {
    const visible = super.checkComponentConditions(data, flags, row);

    // Return if already hidden
    if (!visible) {
      return visible;
    }

    if (this.subForm) {
      return this.subForm.checkConditions(this.dataValue.data);
    }

    return visible;
  }

  calculateValue(data, flags, row) {
    if (this.subForm) {
      return this.subForm.calculateValue(this.dataValue.data, flags);
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
          this.dataValue = result.submission;
          return this.dataValue;
        }).catch(err => {
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

    // This submission has already been submitted, so just return the reference data.
    if (submission && submission._id && submission.form) {
      this.dataValue = submission;
      return NativePromise.resolve(this.dataValue);
    }
    return this.submitSubForm(false)
      .then(() => {
        return this.dataValue;
      })
      .then(() => super.beforeSubmit());
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
      if (
        submission &&
        submission._id &&
        this.subForm.formio &&
        _.isEmpty(submission.data)
      ) {
        const formUrl = submission.form ? `${this.subForm.formio.formsUrl}/${submission.form}` : this.formSrc;
        const submissionUrl = `${formUrl}/submission/${submission._id}`;
        this.subForm.setUrl(submissionUrl, this.options);
        this.subForm.loadSubmission();
      }
      else {
        this.subForm.setValue(submission, flags);
      }
    }
    return changed;
  }

  isEmpty(value = this.dataValue) {
    return value === null || _.isEqual(value, this.emptyValue) || this.areAllComponentsEmpty(value.data);
  }

  areAllComponentsEmpty(data) {
    let res = true;
    if (this.subForm) {
      this.subForm.everyComponent((comp) => {
        res &= comp.isEmpty(_.get(data, comp.key) || comp.dataValue);
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

  get visible() {
    return super.visible;
  }

  set visible(value) {
    if (this._visible !== value) {
      this._visible = value;
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
    const emitter = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
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
