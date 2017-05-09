import FormioForm from '../../formio.form';
import FormioUtils from '../../utils';
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

    super.build();
  }
}
