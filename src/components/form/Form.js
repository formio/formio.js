import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
export class FormComponent extends FormioForm {
  constructor(component, options, data) {
    super(null, options);
    this.type = 'formcomponent';
    this.component = component;
    this.data = data;

    // Make sure that if reference is provided, the form must submit.
    if (this.component.reference) {
      this.component.submit = true;
    }

    // Build the source based on the root src path.
    if (!component.src && component.path && this.options.src) {
      let parts = this.options.src.split('/');
      parts.pop();
      component.src = parts.join('/') + '/' + component.path;
    }

    // Add the source to this actual submission if the component is a reference.
    if (data[component.key] && this.component.reference && (component.src.indexOf('/submission/') === -1)) {
      component.src += '/submission/' + data[component.key]._id;
    }

    // Set the src if the property is provided in the JSON.
    if (component.src) {
      this.src = component.src;
    }

    // Directly set the submission if it isn't a reference.
    if (data[component.key] && !this.component.reference) {
      this.setSubmission(data[component.key]);
    }
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submit) {
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
    if (this.component.submit) {
      return this.submit(true);
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

    if (!this.data[this.component.key]) {
      this.data[this.component.key] = {data: {}};
    }

    // Add components using the data of the submission.
    this.addComponents(this.element, this.data[this.component.key].data);
  }

  setValue(submission, noUpdate, noValidate) {
    this.data[this.component.key] = submission || {data: {}};
    if (this.component.reference) {
      this.data[this.component.key] = {_id: this.data[this.component.key]._id};
    }
    return super.setValue(submission, noUpdate, noValidate);
  }

  getValue() {
    this._submission = this.data[this.component.key];
    return this.component.reference ? {_id: this._submission._id} : this._submission;
  }
}
