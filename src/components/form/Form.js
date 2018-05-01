import {BaseComponent} from '../base/Base';
import Promise from 'native-promise-only';
import FormioUtils from '../../utils';
import Formio from '../../formio';
import formFactory from '../../formFactory';

export class FormComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.subForm = null;
    this.subFormReady = new Promise((resolve, reject) => {
      this.subFormReadyResolve = resolve;
      this.subFormReadyReject = reject;
    });
  }

  get emptyValue() {
    return {data: {}};
  }

  /**
   * Load the subform.
   */
  loadSubForm() {
    // Only load the subform if the subform isn't loaded and the conditions apply.
    if (this.subFormLoaded || !super.checkConditions(this.root ? this.root.data : this.data)) {
      return this.subFormReady;
    }
    this.subFormLoaded = true;
    const srcOptions = {};
    if (this.options && this.options.base) {
      srcOptions.base = this.options.base;
    }
    if (this.options && this.options.project) {
      srcOptions.project = this.options.project;
    }

    // Make sure that if reference is provided, the form must submit.
    if (this.component.reference) {
      this.component.submit = true;
    }

    if (
      !this.component.src &&
      !this.options.formio &&
      this.component.form
    ) {
      this.component.src = Formio.getBaseUrl();
      if (this.component.project) {
        // Check to see if it is a MongoID.
        if (FormioUtils.isMongoId(this.component.project)) {
          this.component.src += '/project';
        }
        this.component.src += `/${this.component.project}`;
        srcOptions.project = this.component.src;
      }
      this.component.src += `/form/${this.component.form}`;
    }

    // Build the source based on the root src path.
    if (!this.component.src && this.options.formio) {
      const rootSrc = this.options.formio.formsUrl;
      if (this.component.path) {
        const parts = rootSrc.split('/');
        parts.pop();
        this.component.src = `${parts.join('/')}/${this.component.path}`;
      }
      if (this.component.form) {
        this.component.src = `${rootSrc}/${this.component.form}`;
      }
    }

    (new Formio(this.component.src)).loadForm({params: {live: 1}}).then((formObj) => {
      // Iterate through every component and hide the submit button.
      FormioUtils.eachComponent(formObj.components, (component) => {
        if ((component.type === 'button') && (component.action === 'submit')) {
          component.hidden = true;
        }
      });

      this.subForm = formFactory(this.element, formObj, srcOptions);
      this.subForm.on('change', () => this.onChange());
      this.subForm.url = this.component.src;
      this.subForm.nosubmit = false;
      this.restoreValue();
      this.subFormReadyResolve(this.subForm);
      return this.subForm;
    }).catch(err => this.subFormReadyReject(err));
    return this.subFormReady;
  }

  checkValidity(data, dirty) {
    if (this.subForm) {
      return this.subForm.checkValidity(this.dataValue.data, dirty);
    }

    return super.checkValidity(data, dirty);
  }

  checkConditions(data) {
    if (this.subForm) {
      return this.subForm.checkConditions(this.dataValue.data);
    }

    return super.checkConditions(data);
  }

  calculateValue(data, flags) {
    if (this.subForm) {
      return this.subForm.calculateValue(this.dataValue.data, flags);
    }

    return super.calculateValue(data, flags);
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
      return this.loadSubForm().then((form) => {
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
      return this.loadSubForm().then((form) => {
        return this.subForm.submitForm().then(result => {
          this.subForm.loading = false;
          this.dataValue = this.component.reference ? {
            _id: result.submission._id,
            form: result.submission.form
          } : result.submission;
          return this.dataValue;
        });
      });
    }
    else {
      return super.beforeSubmit();
    }
  }

  build() {
    this.createElement();

    // Do not restore the value when building before submission.
    if (!this.options.beforeSubmit) {
      this.restoreValue();
    }
  }

  setValue(submission, flags) {
    const changed = super.setValue(submission, flags);
    if (this.subForm) {
      this.subForm.setValue(submission, flags);
    }
    else {
      this.loadSubForm().then((form) => {
        if (submission && submission._id && form.formio && !flags.noload) {
          const submissionUrl = `${form.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
          form.setSrc(submissionUrl, this.options);
        }
        else {
          form.setValue(submission, flags);
        }
      });
    }
    return changed;
  }

  getValue() {
    return this.dataValue;
  }
}
