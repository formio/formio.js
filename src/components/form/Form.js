import _ from 'lodash';
import Component from '../_classes/component/Component';
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
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#form',
      weight: 110,
      schema: FormComponent.schema()
    };
  }

  init() {
    super.init();
    this.subForm = null;
    this.formSrc = '';

    this.subFormReady = new Promise((resolve, reject) => {
      this.subFormReadyResolve = resolve;
      this.subFormReadyReject = reject;
    });
    const srcOptions = this.getSubOptions();

    // Make sure that if reference is provided, the form must submit.
    if (this.component.reference) {
      this.component.submit = true;
    }

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
        srcOptions.project = this.formSrc;
      }
      else {
        this.formSrc = Formio.getProjectUrl();
        srcOptions.project = this.formSrc;
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

    // Ensure components is set.
    this.component.components = this.component.components || [];

    this.subForm = new Form(this.component, srcOptions).instance;
    this.subForm.on('change', () => {
      this.dataValue = this.subForm.getValue();
      this.onChange();
    });
    this.loadSubForm().then(this.redraw.bind(this));
    this.subForm.url = this.formSrc;
    this.subForm.nosubmit = false;
    this.restoreValue();
  }

  get defaultSchema() {
    return FormComponent.schema();
  }

  get emptyValue() {
    return { data: {} };
  }

  get ready() {
    return this.subFormReady;
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
    return options;
  }

  render() {
    const subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
    return super.render(subform);
  }

  attach(element) {
    super.attach(element);
    if (this.subForm) {
      return this.subForm.attach(element);
    }
  }

  detach() {
    if (this.subForm) {
      this.subForm.detach();
    }
    super.detach();
  }

  destroy() {
    if (this.subForm) {
      this.subForm.destroy();
    }
    super.destroy();
  }

  redraw() {
    if (this.subForm) {
      this.subForm.form = this.component;
    }
    super.redraw();
  }

  /**
   * Pass everyComponent to subform.
   * @param args
   * @returns {*|void}
   */
  everyComponent(...args) {
    return this.subForm.everyComponent(...args);
  }

  /**
   * Filter a subform to ensure all submit button components are hidden.
   *
   * @param form
   * @param options
   */
  filterSubForm() {
    // Iterate through every component and hide the submit button.
    eachComponent(this.component.components, (component) => {
      if ((component.type === 'button') && (component.action === 'submit')) {
        component.hidden = true;
      }
    });
  }

  /**
   * Load the subform.
   */
  /* eslint-disable max-statements */
  loadSubForm() {
    // Don't load form in builder mode.
    if (this.options.attachMode === 'builder') {
      return this.subFormReady;
    }

    if (this.subFormLoaded) {
      return this.subFormReady;
    }

    // Determine if we already have a loaded form object.
    if (this.component && this.component.components && Array.isArray(this.component.components) && this.component.components.length) {
      this.filterSubForm();
      this.subFormReadyResolve(this.subForm);
      return this.subFormReady;
    }
    else {
      (new Formio(this.formSrc)).loadForm({ params: { live: 1 } })
        .then((formObj) => {
          this.component.components = formObj.components;
          this.filterSubForm();
          return this.subFormReadyResolve(this.subForm);
        })
        .catch((err) => this.subFormReadyReject(err));
    }
    return this.subFormReady;
  }
  /* eslint-enable max-statements */

  checkValidity(data, dirty) {
    if (this.subForm) {
      return this.subForm.checkValidity(this.dataValue.data, dirty);
    }

    return super.checkValidity(data, dirty);
  }

  checkConditions(data) {
    return (super.checkConditions(data) && this.subForm)
      ? this.subForm.checkConditions(this.dataValue.data)
      : false;
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

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
      return this.loadSubForm().then(() => {
        return this.subForm.submitForm().then(result => {
          this.dataValue = result.submission;
          return this.dataValue;
        }).catch(err => {
          this.subForm.onSubmissionError(err);
          return Promise.reject(err);
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
      this.dataValue = this.component.reference ? {
        _id: submission._id,
        form: submission.form
      } : submission;
      return Promise.resolve(this.dataValue);
    }

    // This submission has not been submitted yet.
    if (this.component.submit) {
      return this.loadSubForm().then(() => {
        return this.subForm.submitForm()
          .then(result => {
            this.subForm.loading = false;
            this.dataValue = this.component.reference ? {
              _id: result.submission._id,
              form: result.submission.form
            } : result.submission;
            return this.dataValue;
          })
          .catch(() => {});
      });
    }
    else {
      return super.beforeSubmit();
    }
  }

  setValue(submission, flags) {
    const changed = super.setValue(submission, flags);

    (this.subForm ? Promise.resolve(this.subForm) : this.loadSubForm())
      .then((form) => {
        if (submission && submission._id && form.formio && !flags.noload && _.isEmpty(submission.data)) {
          const submissionUrl = `${form.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
          form.setUrl(submissionUrl, this.options);
          form.nosubmit = false;
          form.loadSubmission();
        }
        else {
          form.setValue(submission, flags);
        }
      });

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
}
