import _ from 'lodash';
import { BaseComponent } from '../base/Base';
import Promise from 'native-promise-only';
import FormioUtils from '../../utils';
import Formio from '../../formio';
import formFactory from "../../formFactory";

export class FormComponent extends BaseComponent {
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
    super(component, options, data);
    this.submitted = false;
    this.subForm = null;
    this.subData = {data: {}};
    this.formSrc = '';
    this.subFormReady = new Promise((resolve, reject) => {
      this.subFormReadyResolve = resolve;
      this.subFormReadyReject = reject;
    });
  }

  get defaultSchema() {
    return FormComponent.schema();
  }

  get emptyValue() {
    return {data: {}};
  }

  /**
   * Load the subform.
   */
  loadSubForm(submission) {
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

    let loadSubmission = false;
    if (
      submission._id &&
      this.component.reference &&
      this.formSrc &&
      !this.formSrc.includes('/submission/')
    ) {
      this.formSrc += `/submission/${submission._id}`;
      loadSubmission = true;
    }

    (new Formio(this.formSrc)).loadForm({params: {live: 1}}).then((formObj) => {
      // Iterate through every component and hide the submit button.
      FormioUtils.eachComponent(formObj.components, (component) => {
        if ((component.type === 'button') && (component.action === 'submit')) {
          component.hidden = true;
        }
      });

      this.subForm = formFactory(this.element, formObj, srcOptions);
      this.dataValue.data = this.subForm.data;

      // Forward along changes to parent form.
      this.subForm.on('change', () => this.onChange());
      this.subForm.url = this.formSrc;
      this.subForm.nosubmit = false;
      if (loadSubmission) {
        this.subForm.loadSubmission();
      }
      else {
        this.subForm.setSubmission(submission);
      }
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
      this.loadSubForm(this.dataValue);
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
    this.restoreValue();
  }

  setValue(submission, flags) {
    if (submission && (submission._id || !_.isEmpty(submission.data))) {
      this.loadSubForm(submission).then((form) => {
        if (submission._id && !flags.noload) {
          const submissionUrl = `${form.formio.formsUrl}/${submission.form}/submission/${submission._id}`;
          form.setSrc(submissionUrl, this.options);
        }
        else {
          form.setSubmission(submission);
        }
      });
    }
    this.subData = submission;
    return super.updateValue(flags);
  }

  getValue() {
    return this.subData;
  }
}
