import _ from 'lodash';
import Component from '../_classes/component/Component';
import EventEmitter from 'eventemitter2';
import NativePromise from 'native-promise-only';
import { isMongoId, eachComponent } from '../../utils/utils';
import Formio from '../../Formio';
import Form from '../../Form';

export default class FormComponent extends Component {
  static schema(...extend) {
    return Component.schema({
      type: 'form',
      key: 'form',
      src: '',
      reference: true,
      form: '',
      path: ''
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
    if (this.component.formRevision || this.component.formRevision === 0) {
      this.formSrc += `/v/${this.component.formRevision}`;
    }
  }

  get dataReady() {
    return this.subFormReady || NativePromise.resolve();
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

  getSubOptions(options = {}) {
    if (!this.options) {
      return options;
    }
    if (this.options.base) {
      options.base = this.options.base;
    }
    if (this.options.project) {
      options.project = this.options.project;
    }
    if (this.options.readOnly) {
      options.readOnly = this.options.readOnly;
    }
    if (this.options.breadcrumbSettings) {
      options.breadcrumbSettings = this.options.breadcrumbSettings;
    }
    if (this.options.buttonSettings) {
      options.buttonSettings = this.options.buttonSettings;
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
    options.events = this.createEmitter();
    return options;
  }

  render() {
    if (this.builderMode) {
      return super.render(this.component.label || 'Nested form');
    }
    const subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
    return super.render(subform);
  }

  attach(element) {
    super.attach(element);
    // Don't attach in builder.
    if (this.builderMode) {
      return NativePromise.resolve();
    }
    return this.loadSubForm().then(() => this.subForm.attach(element));
  }

  detach() {
    if (this.subForm) {
      this.subForm.detach();
    }
    super.detach();
  }

  set root(inst) {
    if (!inst) {
      return;
    }
    this._root = inst;
    this.nosubmit = inst.nosubmit;
  }

  get root() {
    return this._root;
  }

  set nosubmit(value) {
    this._nosubmit = !!value;
    if (this.subForm) {
      this.subForm.nosubmit = this._nosubmit;
    }
  }

  get nosubmit() {
    return this._nosubmit || false;
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
      this.subForm.form = this.component;
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
   * Render a subform.
   *
   * @param form
   * @param options
   */
  renderSubForm(form) {
    if (this.options.builder) {
      this.element.appendChild(this.ce('div', {
        class: 'text-muted text-center p-2'
      }, this.text(form.title)));
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
      this.subForm.nosubmit = this.nosubmit;
      this.redraw();
      this.restoreValue();
      this.subForm.root = this.root;
      return this.subForm;
    });
  }

  /**
   * Load the subform.
   */
  loadSubForm() {
    if (this.builderMode || this.isHidden()) {
      return NativePromise.resolve();
    }

    if (this.subFormReady) {
      return this.subFormReady;
    }

    // Determine if we already have a loaded form object.
    if (this.component && this.component.components && Array.isArray(this.component.components) && this.component.components.length) {
      this.subFormReady = this.renderSubForm(this.component);
    }
    else if (this.formSrc) {
      this.subFormReady = (new Formio(this.formSrc)).loadForm({ params: { live: 1 } }).then((formObj) => {
        this.component.components = formObj.components;
        return this.renderSubForm(formObj);
      });
    }
    return this.subFormReady;
  }

  checkValidity(data, dirty) {
    if (this.subForm) {
      return this.subForm.checkValidity(this.dataValue.data, dirty);
    }

    return super.checkValidity(data, dirty);
  }

  checkConditions(data) {
    const visible = super.checkConditions(data);

    // Return if already hidden
    if (!visible) {
      return visible;
    }

    if (this.subForm && this.subForm.hasCondition()) {
      return this.subForm.checkConditions(this.dataValue.data);
    }

    return visible;
  }

  calculateValue(data, flags) {
    if (this.subForm) {
      return this.subForm.calculateValue(this.dataValue.data, flags);
    }

    return super.calculateValue(data, flags);
  }

  setPristine(pristine) {
    super.setPristine(pristine);
    if (this.subForm) {
      this.subForm.setPristine(pristine);
    }
  }

  get shouldSubmit() {
    return this.subFormReady && (!this.component.hasOwnProperty('reference') || this.component.reference);
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.shouldSubmit) {
      return this.subFormReady.then(() => {
        return this.subForm.submitForm().then(result => {
          this.dataValue = result.submission;
          return this.dataValue;
        }).catch(err => {
          this.subForm.onSubmissionError(err);
          return NativePromise.reject(err);
        });
      });
    }
    else {
      return super.beforeNext();
    }
  }

  /**
   * Submit the form before the whole form is triggered.
   */
  beforeSubmit() {
    const submission = this.dataValue;

    // This submission has already been submitted, so just return the reference data.
    if (submission && submission._id && submission.form) {
      this.dataValue = this.shouldSubmit ? {
        _id: submission._id,
        form: submission.form
      } : submission;
      return NativePromise.resolve(this.dataValue);
    }

    // This submission has not been submitted yet.
    if (this.shouldSubmit) {
      return this.subFormReady.then(() => {
        return this.subForm.submitForm()
          .then(result => {
            this.subForm.loading = false;
            this.dataValue = {
              _id: result.submission._id,
              form: result.submission.form
            };
            return this.dataValue;
          })
          .catch(() => {});
      });
    }
    else {
      return super.beforeSubmit();
    }
  }

  isHidden() {
    if (!this.visible) {
      return true;
    }

    return !super.checkConditions(this.rootValue);
  }

  setValue(submission, flags) {
    const changed = super.setValue(submission, flags);
    if (this.subFormReady) {
      this.subFormReady.then((form) => {
        if (
          submission &&
          submission._id &&
          form.formio &&
          !flags.noload &&
          (_.isEmpty(submission.data) || this.shouldSubmit)
        ) {
          const submissionUrl = `${form.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
          form.setUrl(submissionUrl, this.options);
          form.nosubmit = false;
          form.loadSubmission();
        }
        else {
          form.setValue(submission, flags);
        }
      });
    }
    return changed;
  }

  getValue() {
    if (this.subForm) {
      return this.subForm.getValue();
    }
    return this.dataValue;
  }

  getAllComponents() {
    if (!this.subForm) {
      return [];
    }
    return this.subForm.getAllComponents();
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
    super.visible = value;
    this.updateSubFormVisibility();
  }

  get parentVisible() {
    return super.parentVisible;
  }

  set parentVisible(value) {
    super.parentVisible = value;
    this.updateSubFormVisibility();
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
        return true;
      default:
        return false;
    }
  }

  createEmitter() {
    const emiter = new EventEmitter({
      wildcard: false,
      maxListeners: 0
    });
    const nativeEmit = emiter.emit;
    const that = this;
    emiter.emit = function(event, ...args) {
      const eventType = event.replace(`${that.options.namespace}.`, '');
      nativeEmit.call(this, event, ...args);
      if (!that.isInternalEvent(eventType)) {
        that.emit(eventType, ...args);
      }
    };

    return emiter;
  }

  deleteValue() {
    super.setValue(null, {
      noUpdateEvent: true,
      noDefault: true
    });
    _.unset(this.data, this.key);
  }
}
