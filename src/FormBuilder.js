import { Formio } from './Formio';
import { Builders } from './builders';
import { Form } from './Form';
import { Components } from './components';
import builderComponents from './components/builder';
Components.setComponents(builderComponents);

export class FormBuilder extends Form {
  static options = {};
  constructor(element, form, options) {
    form = form || {};
    options = options || {};
    super(element, form, Object.assign(
      options,
      FormBuilder.options,
      ((Formio.options && Formio.options.builder) ? Formio.options.builder : {})
    ));
  }

  create(display) {
    if (Builders.builders[display]) {
      return new Builders.builders[display](this.element, this.options);
    }
    else {
      // eslint-disable-next-line new-cap
      return new Builders.builders['webform'](this.element, this.options);
    }
  }
}
