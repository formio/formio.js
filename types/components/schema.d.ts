import { ConditionalOptions, ValidateOptions } from '../formio';

export interface ComponentSchema<T = any> {
  /**
   * The type of component
   */
  type?: string;

  /**
   * The data key for this component (how the data is stored in the database, referenced as API key in docs).
   */
  key?: string;

  /**
   * The HTML label to give this component.
   */
  label?: string;

  /**
   * The input placeholder for this component.
   */
  placeholder?: string;

  /**
   * Determines if this component provides an input.
   */
  input?: boolean;

  /**
   * If this component should be included as a column within a submission table.
   * Determines if this field will show in the data tables output.
   */
  tableView?: boolean;

  /**
   * If this component should allow an array of values to be captured.
   */
  multiple?: boolean;

  /**
   * If the data of this component should be protected (no GET api requests can see the data)
   */
  protected?: boolean;

  /**
   * The prefix text to put in front of the input
   */
  prefix?: string;

  /**
   * The suffix text to put after the input
   */
  suffix?: string;

  /**
   * The default value of this compoennt.
   */
  defaultValue?: T;

  /**
   * If the value of this field should be cleared when it is conditionally hidden.
   */
  clearOnHide?: boolean;

  /**
   * Validate if the value of this component should be unique within the form.
   */
  unique?: boolean;

  /**
   * If the value of this component should be persisted within the backend api database.
   */
  persistent?: boolean;

  /**
   * Determines if the component should be within the form, but not visible.
   * This can be overridden with the conditionals.
   */
  hidden?: boolean;

  /**
   * The validation criteria for this component.
   */
  validate?: ValidateOptions;

  /**
   * Determines when this component should be added to the form for both processing and input.
   */
  conditional?: ConditionalOptions;

  /**
   * Allows customizable errors to be displayed for each component when an error occurs. This is an object with the following keys:
      required
      min
      max
      minLength
      maxLength
      invalid_email
      invalid_date
      pattern
      custom

    An object (keys listed above), values are the strings you wish to display. Each string has the {{ field }} to use within the string. Example.
    {"required": "{{ field }} is required. Try again."}
   */
  errors?: Object;

  /**
   * Allows changing the component definition in reaction to data entered in a form. For example, changing a field to required, disabled or hidden when a value is entered.
    An array of instances of the Field Logic Schema
    Fyi: https://github.com/formio/formio.js/wiki/Field-Logic-Schema
   */
  logic?: Object[];

  /**
   * The custom CSS class to provide to this component.
   */
  customClass?: string;

  /**
   * If true, will show label when component is in a datagrid.
   */
  dataGridLabel?: boolean;

  labelPosition?: 'top' | 'bottom' | 'left' | 'right';
  labelWidth?: number;
  labelMargin?: number;
  description?: string;
  errorLabel?: string;
  tooltip?: string;
  hideLabel?: boolean;
  tabindex?: string;
  disabled?: boolean;
  autofocus?: boolean;
  dbIndex?: boolean;
  customDefaultValue?: any;
  calculateValue?: any;
  allowCalculateOverride?: boolean;
  widget?: any; // Input widgets i.e. calendar widget

  /**
   * This will refresh this component when this field changes.
   */
  refreshOn?: string;

  /**
   * Determines if we should clear our value when a refresh occurs.
   */
  clearOnRefresh?: boolean;

  /**
   * This will perform the validation on either "change" or "blur" of the input element.
   */
  validateOn?: 'change' | 'blur';
}

export type ExtendedComponentSchema<T = any> = ComponentSchema<T> & { [key: string]: any };

export interface ElementInfo {
  type: string;
  component: ExtendedComponentSchema;
  changeEvent: string;
  attr: any;
  content: string;
}

export interface BuilderInfo {
  title: string;
  group: string;
  icon: string;
  documentation?: string;
  weight?: number;
  schema?: ExtendedComponentSchema;
}
