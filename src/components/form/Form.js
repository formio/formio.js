import _ from 'lodash';
import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
import Formio from '../../formio';
import { BaseComponent } from '../base/Base';

export class FormComponent extends FormioForm {
  static schema(...extend) {
    return BaseComponent.schema({
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
      icon: 'fa fa-wpforms',
      group: 'advanced',
      documentation: 'http://help.form.io/userguide/#form',
      weight: 110,
      schema: FormComponent.schema()
    };
  }

  constructor(component, options, data) {
    data = data || {};
    super(null, options);

    // Ensure this component does not make it to the global forms array.
    delete Formio.forms[this.id];
    this.type = 'formcomponent';
    this.formSrc = '';
    this.component = component;
    this.submitted = false;
    this.data = data;
    this.readyPromise = new Promise((resolve) => {
      this.readyResolve = resolve;
    });
  }

  get schema() {
    return _.omit(this.component, ['id', 'components']);
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
      return true;
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

    if (this.component.src) {
      this.formSrc = this.component.src;
    }

    if (
      !this.component.src &&
      !this.options.formio &&
      (this.component.form || this.component.path)
    ) {
      this.formSrc = Formio.getBaseUrl();
      if (this.component.project) {
        // Check to see if it is a MongoID.
        if (FormioUtils.isMongoId(this.component.project)) {
          this.formSrc += '/project';
        }
        this.formSrc += `/${this.component.project}`;
        srcOptions.project = this.component.src;
      }
      if (this.component.form) {
        this.formSrc += `/form/${this.component.form}`;
      }
      else if (this.component.path) {
        this.formSrc += `/${this.component.path}`;
      }
    }

    // Build the source based on the root src path.
    if (!this.component.src && this.options.formio) {
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

    // Add the source to this actual submission if the component is a reference.
    let dataValue = _.get(this.data, this.component.key);
    if (
      dataValue &&
      dataValue._id &&
      this.component.reference &&
      this.formSrc &&
      !this.formSrc.includes('/submission/')
    ) {
      this.formSrc += `/submission/${dataValue._id}`;
    }

    // Set the src if the property is provided in the JSON.
    if (this.formSrc) {
      this.setSrc(this.formSrc, srcOptions);
    }

    // Directly set the submission if it isn't a reference.
    if (dataValue && !this.component.reference) {
      this.setSubmission(dataValue);
    }
  }

  get subData() {
    if (!_.has(this.data, this.component.key)) {
      _.set(this.data, this.component.key, this.emptyValue);
    }
    return _.get(this.data, this.component.key).data;
  }

  checkValidity(data, dirty) {
    // Maintain isolated data scope when passing root data for validity checks.
    return super.checkValidity(this.subData, dirty);
  }

  checkConditions() {
    if (this.subFormLoaded) {
      return super.checkConditions(this.subData);
    }

    // Check the conditions against the component if the subform has not loaded.
    if (super.checkConditions(this.root ? this.root.data : this.data)) {
      // Only load the subform if this component is visible.
      this.loadSubForm();
      return true;
    }

    return false;
  }

  calculateValue(data, flags) {
    // Maintain isolated data scope when calculating values.
    return super.calculateValue(this.subData, flags);
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
      this.submitted = true;
      return this.submit(true).then(submission => {
        // Set data to submission.
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
    if (this.component.submit && !this.submitted) {
      return this.submit(true).then(submission => {
        // Before we submit, we need to filter out the references.
        _.set(this.data, this.component.key, this.component.reference ? {
          _id: submission._id,
          form: submission.form
        } : submission);
        return _.get(this.data, this.component.key);
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
    if (!_.has(this.data, this.component.key)) {
      _.set(this.data, this.component.key, this.defaultValue);
    }

    // Add components using the data of the submission.
    this.addComponents(this.getContainer(), this.subData);

    // Restore default values.
    this.restoreValue();

    // Get the submission value.
    const submission = this.getValue();

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

  emit(event, data) {
    switch (event) {
      case 'submit':
        event = 'formComponentSubmit';
        break;
      case 'submitDone':
        event = 'formComponentSubmitDone';
        break;
      case 'formLoad':
        event = 'formComponentLoad';
        break;
      case 'render':
        event = 'formComponentRender';
        break;
    }

    super.emit(event, data);
  }

  setValue(submission, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!submission) {
      this.dataValue = this._submission = this.emptyValue;
      this.readyResolve();
      return;
    }

    // Load the subform if we have data.
    if (submission._id || !_.isEmpty(this.dataValue)) {
      this.loadSubForm();
    }

    // Set the url of this form to the url for a submission if it exists.
    if (submission._id) {
      const submissionUrl = `${this.options.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
      this.setUrl(submissionUrl, this.options);
      this.nosubmit = false;
    }

    if (submission._id && !flags.noload) {
      this.formio.submissionId = submission._id;
      this.formio.submissionUrl = `${this.formio.submissionsUrl}/${submission._id}`;
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
      const superValue = super.setValue(submission, flags);
      this.readyResolve();
      return superValue;
    }
  }

  getValue() {
    return this.dataValue;
  }
}
