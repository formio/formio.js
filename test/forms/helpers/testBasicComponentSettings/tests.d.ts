declare const _default: {
  placeholder: {
    'Should show placeholder'(form: any, done: any): void;
  };
  description: {
    'Should show description'(form: any, done: any): void;
  };
  tooltip: {
    'Should render tooltip icon and show tooltip description on click'(form: any, done: any): void;
  };
  prefix: {
    'Should show prefix'(form: any, done: any): void;
  };
  suffix: {
    'Should show suffix'(form: any, done: any): void;
  };
  customClass: {
    'Should set custom css class'(form: any, done: any): void;
  };
  tabindex: {
    'Should set tabindex'(form: any, done: any): void;
  };
  hidden: {
    'Should not render hidden component'(form: any, done: any): void;
  };
  hideLabel: {
    'Should hide component label'(form: any, done: any): void;
  };
  disabled: {
    'Should disable components'(form: any, done: any): void;
  };
  defaultValue: {
    'Should set default value'(form: any, done: any): void;
  };
  customDefaultValue: {
    'Should correctly set custom default value'(form: any, done: any): void;
  };
  redrawOn: {
    'Should redrow on checkbox value change'(form: any, done: any): void;
  };
  multiple: {
    'Should render component in multiple mode and able to add/remove value'(
      form: any,
      done: any,
    ): void;
    'Should set multiple values'(form: any, done: any): void;
  };
  modalEdit: {
    'Should open and close modal window'(form: any, done: any): void;
    'Should delete component changes when closing modal window and clicking "delete it" in confirmation dialog'(
      form: any,
      done: any,
    ): void;
    'Should save component values and close the modal after clicking "save"'(
      form: any,
      done: any,
    ): void;
    'Should highlight modal button if component is invalid'(form: any, done: any, test: any): void;
  };
  calculateValue: {
    'Should caclulate component value'(form: any, done: any, test: any): void;
    'Should not allow overriding component colculated value'(form: any, done: any): void;
    'Should allow overriding component calculated value'(form: any, done: any, test: any): void;
  };
  'validate.required': {
    'Should show required validation error on submit and remove error if component has value'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should show custom validation error if component is invalid'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should show custom validation label if component is invalid'(
      form: any,
      done: any,
      test: any,
    ): void;
  };
  'validate.custom': {
    'Should execute custom validation'(form: any, done: any, test: any): void;
  };
  validate_nested_components: {
    'Should show validation errors for nested components'(form: any, done: any, test: any): void;
  };
  conditional: {
    'Should show component if simple condition is met and hide it if simple condition is not fulfilled'(
      form: any,
      done: any,
      test: any,
    ): void;
  };
  customConditional: {
    'Should show component if custom condition is met and hide it if custom condition is not fulfilled'(
      form: any,
      done: any,
      test: any,
    ): void;
  };
  logic: {
    'Should execute value/property/merge schema/custom actions if simple logic condition is met'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should execute value action if js logic condition is met'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should execute property action if json logic condition is met'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should execute property action if logic event is emitted'(form: any, done: any): void;
  };
  set_get_value: {
    'Should set and get components` value (including string value)'(
      form: any,
      done: any,
      test: any,
    ): void;
    'Should set and get submission'(form: any, done: any, test: any): void;
  };
};
export default _default;
