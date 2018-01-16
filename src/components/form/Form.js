import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
import Formio from '../../formio';
import _merge from 'lodash/merge';
import _isEmpty from 'lodash/isEmpty';

export class FormComponent extends FormioForm {
  constructor(component, options, data) {
    data = data || {};

    // We need to reset the language so that it will not try to rebuild the form (by setting the language)
    // before this form component is done rendering. We will set it later.
    let language = '';
    if (options && options.language) {
      language = options.language;
      options.language = '';
    }
    super(null, options);
    if (language && options) {
      options.language = language;
    }

    // Ensure this component does not make it to the global forms array.
    delete Formio.forms[this.id];

    this.type = 'formcomponent';
    this.component = component;
    this.submitted = false;
    this.data = data;
    let srcOptions = {};

    // Make sure that if reference is provided, the form must submit.
    if (this.component.reference) {
      this.component.submit = true;
    }

    if (
      !component.src &&
      !this.options.formio &&
      component.form
    ) {
      component.src = Formio.getBaseUrl();
      if (component.project) {
        // Check to see if it is a MongoID.
        if (FormioUtils.isMongoId(component.project)) {
          component.src += '/project';
        }
        component.src += '/' + component.project;
        srcOptions.project = component.src;
      }
      component.src += '/form/' + component.form;
    }

    // Build the source based on the root src path.
    if (!component.src && this.options.formio) {
      let rootSrc = this.options.formio.formsUrl;
      if (component.path) {
        let parts = rootSrc.split('/');
        parts.pop();
        component.src = parts.join('/') + '/' + component.path;
      }
      if (component.form) {
        component.src = rootSrc + '/' + component.form;
      }
    }

    // Add the source to this actual submission if the component is a reference.
    if (
      data &&
      data[component.key] &&
      data[component.key]._id &&
      this.component.reference &&
      !component.src.includes('/submission/')
    ) {
      component.src += '/submission/' + data[component.key]._id;
    }

    // Set the src if the property is provided in the JSON.
    if (component.src) {
      this.setSrc(component.src, srcOptions);
    }

    // Directly set the submission if it isn't a reference.
    if (data && data[component.key] && !this.component.reference) {
      this.setSubmission(data[component.key]);
    }

    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });

    // Set language after everything is established.
    if (options && options.language) {
      this.language = options.language;
    }
  }

  checkValidity(data) {
    return super.checkValidity(data[this.component.key] ? data[this.component.key].data : {});
  }

  checkConditions(data) {
    return super.checkConditions(data[this.component.key] ? data[this.component.key].data : {});
  }

  calculateValue(data, flags) {
    return super.calculateValue(data[this.component.key] ? data[this.component.key].data : {}, flags);
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
      this.submitted = true;
      return this.submit(true);
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
    if (this.component.submit && !this.submitted) {
      return this.submit(true).then(submission => {
        // Before we submit, we need to filter out the references.
        this.data[this.component.key] = this.component.reference ? {_id: submission._id, form: submission.form} : submission;
        return this.data[this.component.key];
      });
    }
    else {
      return super.beforeSubmit();
    }
  }

  build() {
    if (!this.element) {
      this.createElement();
      this.setElement(this.element);
    }

    // Iterate through every component and hide the submit button.
    FormioUtils.eachComponent(this.component.components, (component) => {
      if ((component.type === 'button') && (component.action === 'submit')) {
        component.hidden = true;
      }
    });

    // Set the data for this form.
    if (!this.data[this.component.key]) {
      this.data[this.component.key] = this.defaultValue;
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = {data: {}};
      }
    }

    // Add components using the data of the submission.
    this.addComponents(this.element, this.data[this.component.key].data);

    // Restore default values.
    this.restoreValue();

    // Get the submission value.
    let submission = this.getValue();

    // Check conditions for this form.
    this.checkConditions(submission);

    // Check the data for default values.
    this.checkData(submission.data, {
      noValidate: true
    });
  }

  whenReady() {
    return this.ready.then(() => this.readyPromise);
  }

  setValue(submission, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!submission) {
      this.data[this.component.key] = this._submission = {data: {}};
      this.readyResolve();
      return;
    }

    // Set the url of this form to the url for a submission if it exists.
    if (submission._id) {
      let submissionUrl = this.options.formio.formsUrl + '/' + submission.form + '/submission/' + submission._id;
      this.setUrl(submissionUrl, this.options);
      this.nosubmit = false;
    }

    if (submission._id && !flags.noload) {
      this.formio.submissionId = submission._id;
      this.formio.submissionUrl = this.formio.submissionsUrl + '/' + submission._id;
      this.formReady.then(() => {
        this._loading = false;
        this.loading = true;
        this.formio.loadSubmission().then((result) => {
          this.loading = false;
          this.setValue(result, {
            noload: true
          });
        });
      });

      // Assume value has changed.
      return true;
    }
    else {
      let superValue = super.setValue(submission, flags, this.data[this.component.key].data);
      this.readyResolve();
      return superValue;
    }
  }

  getValue() {
    return this.data[this.component.key];
  }
}
