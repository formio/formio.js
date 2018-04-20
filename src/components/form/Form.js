import _ from 'lodash';
import { BaseComponent } from '../base/Base';
import Promise from 'native-promise-only';
import FormioUtils from '../../utils';
import Formio from '../../formio';
import formFactory from "../../formFactory";

export class FormComponent extends BaseComponent {
  constructor(component, options, data) {
    super(component, options, data);
    this.submitted = false;
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
      this.subFormReadyResolve(this.subForm);
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

    if (super.checkConditions(data)) {
      this.loadSubForm();
      this.restoreValue();
      return true;
    }

    return false;
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
    if (this.subForm && this.component.submit && !this.submitted) {
      this.submitted = true;
      return this.subForm.submit(true).then(submission => {
        this.dataValue = submission;
        return submission;
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
    // Ensure we submit the form.
    if (this.subForm && this.component.submit && !this.submitted) {
      this.submitted = true;
      return this.subForm.submit(true).then(submission => {
        this.dataValue = this.component.reference ? {
          _id: submission._id,
          form: submission.form
        } : submission;
        return this.dataValue;
      });
    }
    else {
      return super.beforeSubmit();
    }
  }

  build() {
    this.createElement();
  }

  setValue(submission, flags) {
    // Determine if the submission has changed.
    const changed = flags.changed || this.hasChanged(submission, this.dataValue);
    this.dataValue = submission;

    // Update the submission on the form.
    if (submission && (submission._id || !_.isEmpty(submission.data))) {
      this.loadSubForm().then((form) => {
        if (submission._id && !flags.noload) {
          const submissionUrl = `${form.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
          form.setSrc(submissionUrl, this.options);
        }
        else {
          form.setSubmission(submission);
        }
      });
    }

    // Return if the value has changed.
    this.updateOnChange(flags, changed);
    return changed;
  }

  getValue() {
    return this.dataValue;
  }
}
