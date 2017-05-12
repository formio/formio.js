import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
import _each from 'lodash/each';
export class FormComponent extends FormioForm {
  constructor(component, options, data) {
    super(null, options);
    this.component = component;
    this.data = data;

    // Set the src if the property is provided in the JSON.
    if (component.src) {
      this.src = component.src;
    }
  }

  /**
   * Submits the form before the next event occurs.
   *
   * @return {Promise.<TResult>}
   */
  submitBefore() {
    this._submission = this.getRawValue();
    return this.submit(true).then((submission) => {
      this.value = submission;
      return submission;
    });
  }

  /**
   * Submit the form before the next page is triggered.
   */
  beforeNext() {
    // If we wish to submit the form on next page, then do that here.
    if (this.component.submitOnNext) {
      return this.submitBefore();
    }
    else {
      return super.beforeNext();
    }
  }

  /**
   * Submit the form before the whole form is triggered.
   */
  beforeSubmit() {
    if (!this.component.submitOnNext) {
      return this.submitBefore();
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

  get submission() {
    return this._submission;
  }

  setValue(value, noUpdate, noValidate) {
    if (!value || !_isObject(value)) {
      return;
    }
    this.value = value;
    _each(this.components, (component) => {
      if (value.data.hasOwnProperty(component.component.key)) {
        component.setValue(value.data[component.component.key], noUpdate, noValidate);
      }
    });
    if (!noUpdate) {
      this.updateValue(noValidate);
    }
  }

  getValue() {
    let value = this.value || {data: {}};
    _each(this.components, (component) => {
      value.data[component.component.key] = component.getValue();
    });
    return value;
  }
}
