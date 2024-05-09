import { Formio } from './Formio';
import Builders from './builders';
import Form from './Form';

export default class FormBuilder extends Form {
  /**
   * @typedef FormBuilderOptions
   * @property {string[]} [disabled] - An array of "keys" of components that should be disabled within the form builder. Example: ['firstName', 'lastName']
   * @property {boolean} [noNewEdit] - When set to TRUE no modal is shown when a component is dragged onto the form.
   * @property {boolean} [noDefaultSubmitButton] - Set to TRUE to not include the default submit button in Webforms.
   * @property {boolean} [alwaysConfirmComponentRemoval] - Set to TRUE to always require confirmation before removing a component.
   * @property {Object} [formConfig] - Form configurations to apply to forms being created. These configurations are added to the "config" property of the form object.
   * @property {string} [resourceTag] - The tag to use to query for the "Existing Resource Fields" section of the builder.
   * @property {import('./Form').FormOptions} [editForm] - The options to apply to the Edit Form (the form that shows inside the modal when you edit a component).
   * @property {string} [language] - The language to load into the form builder.
   * @property {Object} [builder] - The builder options to pass to the builder.
   * @property {'form'|'wizard'|'pdf'} [display] - The display mode of the builder.
   * @property {string} [resourceFilter] - Filter applied to the resources that appear in the builder's Existing Resource Fields.
   * @property {boolean} [noSource] - When set to TRUE, the resource ID in the builder's Existing Resource Fields will not be linked.
   * @property {boolean} [showFullJsonSchema] - When set to TRUE, the full JSON schema will be displayed in the JSON edit menu.
   */

  /** @type {FormBuilderOptions} */
  static options = {};

  /** @type {FormBuilderOptions} */
  options;

  /**
   * Creates a new form builder.
   * @param {HTMLElement} element - The HTML element to place the form builder.
   * @param {string|Object} form - The form to pass to the builder
   * @param {FormBuilderOptions} options - The options to create this builder.
   * @return {FormBuilder} - The form builder instance.
   *
   */
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

/**
 * Factory that creates a new form builder based on the form parameter.
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 * @param {...any} args
 * @returns {Promise} - When the form is instance is ready.
 */
Formio.builder = (...args) => {
  return (new FormBuilder(...args)).ready;
};

Formio.FormBuilder = FormBuilder;
