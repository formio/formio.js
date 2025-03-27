/* globals Quill, ClassicEditor, CKEDITOR */
import { conformToMask } from '@formio/vanilla-text-mask';
import tippy from 'tippy.js';
import _ from 'lodash';
import isMobile from 'ismobilejs';
import { processOne, processOneSync, validateProcessInfo } from '@formio/core/process';

import { Formio } from '../../../Formio';
import * as FormioUtils from '../../../utils/utils';
import {
  fastCloneDeep, boolValue, currentTimezone, getScriptPlugin, getContextualRowData
} from '../../../utils/utils';
import Element from '../../../Element';
import ComponentModal from '../componentModal/ComponentModal';
import Widgets from '../../../widgets';
import Addons from '../../../addons';
import { getFormioUploadAdapterPlugin } from '../../../providers/storage/uploadAdapter';
import enTranslation from '../../../translations/en';
import Templates from '../../../templates/Templates';

const isIEBrowser = FormioUtils.getBrowserInfo().ie;

/**
 * This is the Component class
 which all elements within the FormioForm derive from.
 */
export default class Component extends Element {
  static schema(...sources) {
    return _.merge({
      /**
       * Determines if this component provides an input.
       */
      input: true,

      /**
       * The data key for this component (how the data is stored in the database).
       */
      key: '',

      /**
       * The input placeholder for this component.
       */
      placeholder: '',

      /**
       * The input prefix
       */
      prefix: '',

      /**
       * The custom CSS class to provide to this component.
       */
      customClass: '',

      /**
       * The input suffix.
       */
      suffix: '',

      /**
       * If this component should allow an array of values to be captured.
       */
      multiple: false,

      /**
       * The default value of this component.
       */
      defaultValue: null,

      /**
       * If the data of this component should be protected (no GET api requests can see the data)
       */
      protected: false,

      /**
       * Validate if the value of this component should be unique within the form.
       */
      unique: false,

      /**
       * If the value of this component should be persisted within the backend api database.
       */
      persistent: true,

      /**
       * Determines if the component should be within the form, but not visible.
       */
      hidden: false,

      /**
       * If the component should be cleared when hidden.
       */
      clearOnHide: true,

      /**
       * This will refresh this component options when this field changes.
       */
      refreshOn: '',

      /**
       * This will redraw the component when this field changes.
       */
      redrawOn: '',

      /**
       * If this component should be included as a column within a submission table.
       */
      tableView: false,

      /**
       * If this component should be rendering in modal.
       */
      modalEdit: false,

      /**
       * The input label provided to this component.
       */
      label: '',
      dataGridLabel: false,
      labelPosition: 'top',
      description: '',
      errorLabel: '',
      tooltip: '',
      hideLabel: false,
      tabindex: '',
      disabled: false,
      autofocus: false,
      dbIndex: false,
      customDefaultValue: '',
      calculateValue: '',
      calculateServer: false,
      widget: null,

      /**
       * Attributes that will be assigned to the input elements of this component.
       */
      attributes: {},

      /**
       * This will perform the validation on either "change" or "blur" of the input element.
       */
      validateOn: 'change',

      /**
       * The validation criteria for this component.
       */
      validate: {
        /**
         * If this component is required.
         */
        required: false,

        /**
         * Custom JavaScript validation.
         */
        custom: '',

        /**
         * If the custom validation should remain private (only the backend will see it and execute it).
         */
        customPrivate: false,

        /**
         * If this component should implement a strict date validation if the Calendar widget is implemented.
         */
        strictDateValidation: false,
        multiple: false,
        unique: false
      },

      /**
       * The simple conditional settings for a component.
       */
      conditional: {
        show: null,
        when: null,
        eq: ''
      },
      overlay: {
        style: '',
        left: '',
        top: '',
        width: '',
        height: '',
      },
      allowCalculateOverride: false,
      encrypted: false,
      showCharCount: false,
      showWordCount: false,
      properties: {},
      allowMultipleMasks: false,
      addons: [],
    }, ...sources);
  }
  /**
   * Return the simple condition settings as part of the component.
   * @returns {object} - The simple conditional settings.
   */
  static get conditionOperatorsSettings() {
    return {
      operators: ['isEqual', 'isNotEqual', 'isEmpty', 'isNotEmpty'],
      valueComponent() {
        return {
          type: 'textfield',
          widget: {
            type: 'input'
          }
        };
      }
    };
  }
  /**
   * Return the array of possible types of component value absed on its schema.
   * @param schema
   * @returns {Array}
   */

  static savedValueTypes(schema) {
    schema = schema || {};

    return FormioUtils.getComponentSavedTypes(schema) || [FormioUtils.componentValueTypes.any];
  }
  /**
   * Provides a table view for this component. Override if you wish to do something different than using getView
   * method of your instance.
   * @param value
   * @param options
   */
  /* eslint-disable no-unused-vars */
  static tableView(value, options) {}
  /* eslint-enable no-unused-vars */

  /**
   * Initialize a new Component.
   * @param {object} component - The component JSON you wish to initialize.
   * @param {object} options - The options for this component.
   * @param {object} data - The global data submission object this component will belong.
   */
  /* eslint-disable max-statements */
  constructor(component, options, data) {
    super(Object.assign({
      renderMode: 'form',
      attachMode: 'full',
      noDefaults: false
    }, options || {}));

    // Restore the component id.
    if (component && component.id) {
      this.id = component.id;
    }

    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */
    this._hasCondition = null;

    /**
     * The row index for this component.
     */
    this._rowIndex = undefined;

    /**
     * References to dom elements
     */
    this.refs = {};

    // Allow global override for any component JSON.
    if (
      component &&
      this.options.components &&
      this.options.components[component.type]
    ) {
      _.merge(component, this.options.components[component.type]);
    }

    /**
     * An array of all the children components errors.
     */
    this.childErrors = [];

    /**
     * Last validation errors that have occured.
     */
    this._errors = [];
    this._visibleErrors = [];

    /**
     * The Form.io component JSON schema.
     * @type {*}
     */
    this.component = this.mergeSchema(component || {});

    // Add the id to the component.
    this.component.id = this.id;

    this.afterComponentAssign();

    // Save off the original component to be used in logic.
    this.originalComponent = fastCloneDeep(this.component);

    /**
     * If the component has been attached
     */
    this.attached = false;

    /**
     * If the component has been rendered
     */
    this.rendered = false;

    /**
     * The data object in which this component resides.
     * @type {*}
     */
    this._data = data || {};

    /**
     * Tool tip text after processing
     * @type {string}
     */
    this.tooltip = '';

    /**
     * The row path of this component.
     * @type {number}
     */
    this.row = this.options.row;

    /**
     * Points to a flat map of child components (if applicable).
     * @type {object}
     */
    this.childComponentsMap = {};

    /**
     * Determines if this component is disabled, or not.
     * @type {boolean}
     */
    this._disabled = boolValue(this.component.disabled) ? this.component.disabled : false;

    /**
     * Points to the root component, usually the FormComponent.
     * @type {Component}
     */
    this.root = this.options.root || this;
    this.localRoot = this.options.localRoot || this;

    /**
     * If this input has been input and provided value.
     * @type {boolean}
     */
    this.pristine = true;

    /**
     * Points to the parent component.
     * @type {Component}
     */
    this.parent = this.options.parent;

    /**
     * The component paths for this component.
     * @type {import('@formio/core').ComponentPaths} - The component paths.
     */
    this.paths = FormioUtils.getComponentPaths(this.component, this.parent?.component, {
      ...this.parent?.paths,
      dataIndex: this.options.rowIndex === undefined ? this.parent?.paths?.dataIndex : this.options.rowIndex
    });
    this.options.name = this.options.name || 'data';

    this._path = '';

    // Needs for Nextgen Rules Engine
    this.resetCaches();

    /**
     * Determines if this component is visible, or not.
     */
    this._parentVisible = this.options.hasOwnProperty('parentVisible') ? this.options.parentVisible : true;
    this._visible = this._parentVisible && (this.hasCondition() ? !this.conditionallyHidden() : !this.component.hidden);
    this._parentDisabled = false;

    /**
     * The reference attribute name for this component
     */
    this._referenceAttributeName = 'ref';

    /**
     * Used to trigger a new change in this component.
     * @type {Function} - Call to trigger a change in this component.
     */
    let changes = [];
    let lastChanged = null;
    let triggerArgs = [];
    const _triggerChange = _.debounce((...args) => {
      if (this.root) {
        this.root.changing = false;
      }
      triggerArgs = [];
      if (!args[1] && lastChanged) {
        // Set the changed component if one isn't provided.
        args[1] = lastChanged;
      }
      if (_.isEmpty(args[0]) && lastChanged) {
        // Set the flags if it is empty and lastChanged exists.
        args[0] = lastChanged.flags;
      }
      lastChanged = null;
      args[3] = changes;
      const retVal = this.onChange(...args);
      changes = [];
      return retVal;
    }, 100);
    this.triggerChange = (...args) => {
      if (args[1]) {
        // Make sure that during the debounce that we always track lastChanged component, even if they
        // don't provide one later.
        lastChanged = args[1];
        changes.push(lastChanged);
      }
      if (this.root) {
        this.root.changing = true;
      }
      if (args.length) {
        triggerArgs = args;
      }
      return _triggerChange(...triggerArgs);
    };

    /**
     * Used to trigger a redraw event within this component.
     * @type {Function}
     */
    this.triggerRedraw = _.debounce(this.redraw.bind(this), 100);

    /**
     * list of attached tooltips
     * @type {Array}
     */
    this.tooltips = [];

    /**
     * List of attached addons
     * @type {Array}
     */
    this.addons = [];

    // To force this component to be invalid.
    this.invalid = false;

    if (this.component) {
      this.type = this.component.type;
      if (this.allowData && this.key) {
        this.options.name += `[${this.key}]`;
        // If component is visible or not set to clear on hide, set the default value.
        if (!this.shouldConditionallyClear()) {
          if (!this.hasValue()) {
            if (this.shouldAddDefaultValue) {
              this.dataValue = this.defaultValue;
            }
          }
          else {
            // Ensure the dataValue is set.
            /* eslint-disable  no-self-assign */
            this.dataValue = this.dataValue;
            /* eslint-enable  no-self-assign */
          }
        }
      }

      /**
       * The element information for creating the input element.
       * @type {*}
       */
      this.info = this.elementInfo();
    }

    // Allow anyone to hook into the component creation.
    this.hook('component');

    if (!this.options.skipInit) {
      this.init();
    }
  }
  /* eslint-enable max-statements */

  get componentsMap() {
    return this.root?.childComponentsMap || {};
  }

  parentShouldConditionallyClear() {
    let currentParent = this.parent;
    while (currentParent) {
      if (currentParent.shouldConditionallyClear(true)) {
        return true;
      }
      currentParent = currentParent.parent;
    }
    return false;
  }

  parentConditionallyHidden() {
    let currentParent = this.parent;
    while (currentParent) {
      if (currentParent.conditionallyHidden(true)) {
        return true;
      }
      currentParent = currentParent.parent;
    }
    return false;
  }

  get data() {
    return this._data;
  }

  set data(value) {
    this._data = value;
  }

  mergeSchema(component = {}) {
    return _.defaultsDeep(component, this.defaultSchema);
  }

  // Allow componets to notify when ready.
  get ready() {
    return Promise.resolve(this);
  }

  get isPDFReadOnlyMode() {
    return this.parent &&
      this.parent.form &&
      (this.parent.form.display === 'pdf') &&
      this.options.readOnly;
  }

  get labelInfo() {
    const label = {};
    label.hidden = this.labelIsHidden();

    label.className = '';
    label.labelPosition = this.component.labelPosition;
    label.tooltipClass = `${this.iconClass('question-sign')} text-muted`;

    const isPDFReadOnlyMode = this.isPDFReadOnlyMode;

    if (this.hasInput && this.component.validate && boolValue(this.component.validate.required) && !isPDFReadOnlyMode) {
      label.className += ' field-required';
    }
    if (label.hidden) {
      label.className += ' control-label--hidden';
    }
    if (this.info.attr.id) {
      label.for = this.info.attr.id;
    }
    return label;
  }

  init() {
    this.disabled = this.shouldDisabled;
    this._visible = (this.hasCondition() ? !this.conditionallyHidden() : !this.component.hidden);
    if (this.component.addons?.length) {
      this.component.addons.forEach((addon) => this.createAddon(addon));
    }
  }

  /**
   * Get Row Index.
   * @returns {number} - The row index.
   */
  get rowIndex() {
    return this._rowIndex;
  }
  
  /**
   * Set Row Index to row and update each component.
   * @param {number} value - The row index.
   * @returns {void}
   */
  set rowIndex(value) {
    this.paths = FormioUtils.getComponentPaths(this.component, this.parent?.component, {
      ...(this.parent?.paths || {}),
      ...{ dataIndex: value }
    });
    this._rowIndex = value;
  }

  afterComponentAssign() {
    //implement in extended classes
  }

  createAddon(addonConfiguration) {
    const name = addonConfiguration.name;
    if (!name) {
      return;
    }

    const settings = addonConfiguration.settings?.data || {};
    const Addon = Addons[name.value];

    let addon = null;

    if (Addon) {
      const supportedComponents = Addon.info.supportedComponents;
      const supportsThisComponentType = !supportedComponents?.length ||
        supportedComponents.indexOf(this.component.type) !== -1;
      if (supportsThisComponentType) {
        addon = new Addon(settings, this);
        this.addons.push(addon);
      }
      else {
        console.warn(`Addon ${name.label} does not support component of type ${this.component.type}.`);
      }
    }

    return addon;
  }

  teardown() {
    if (this.element) {
      delete this.element.component;
      delete this.element;
    }
    delete this._currentForm;
    delete this.parent;
    delete this.root;
    delete this.triggerChange;
    delete this.triggerRedraw;
    if (this.options) {
      delete this.options.root;
      delete this.options.parent;
      delete this.options.i18next;
    }
    super.teardown();
  }

  destroy(all = false) {
    super.destroy(all);
    this.detach();
    this.addons.forEach((addon) => addon.destroy());
    if (all) {
      this.teardown();
    }
  }

  get shouldDisabled() {
    return this.options.readOnly || this.component.disabled || (this.options.hasOwnProperty('disabled') && this.options.disabled[this.key]);
  }

  get isInputComponent() {
    return !this.component.hasOwnProperty('input') || this.component.input;
  }

  get allowData() {
    return this.hasInput;
  }

  get hasInput() {
    return this.isInputComponent || (this.refs.input && this.refs.input.length);
  }

  get defaultSchema() {
    return Component.schema();
  }

  get key() {
    return _.get(this.component, 'key', '');
  }

  get path() {
    return this.paths.dataPath;
  }

  set path(path) {
    throw new Error('Should not be setting the path of a component.');
  }

  set parentVisible(value) {
    this._parentVisible = value;
  }

  get parentVisible() {
    return this._parentVisible;
  }

  set parentDisabled(value) {
    this._parentDisabled = value;
  }

  get parentDisabled() {
    return this._parentDisabled;
  }

  shouldForceVisibility(component, visibility) {
    if (!this.options[visibility]) {
      return false;
    }
    if (!component) {
      component = this.component;
    }
    if (_.isArray(this.options[visibility])) {
      return this.options[visibility].includes(component.key);
    }
    return this.options[visibility][component.key];
  }

  shouldForceHide(component) {
    return this.shouldForceVisibility(component, 'hide');
  }

  shouldForceShow(component) {
    return this.shouldForceVisibility(component, 'show');
  }

  /**
   * Sets the component visibility.
   * @param {boolean} value - Whether the component should be visible or not.
   */
  set visible(value) {
    if (this._visible !== value) {
      // Skip if this component is set to visible and is supposed to be hidden.
      if (value && this.shouldForceHide()) {
        return;
      }
      // Skip if this component is set to hidden and is supposed to be shown.
      if (!value && this.shouldForceShow()) {
        return;
      }
      this._visible = value;
      this.redraw();
    }
  }

  /**
   * Returns the component visibility
   * @returns {boolean} - Whether the component is visible or not.
   */
  get visible() {
    // Show only if visibility changes or if we are in builder mode or if hidden fields should be shown.
    if (this.builderMode || this.previewMode || this.options.showHiddenFields) {
      return true;
    }
    if (this.shouldForceHide()) {
      return false;
    }
    if (this.shouldForceShow()) {
      return true;
    }
    return this._visible && this._parentVisible;
  }

  get logicallyHidden() {
    if (this._logicallyHidden && !this.component.hidden) {
      this._logicallyHidden = false;
    }
    return this._logicallyHidden;
  }

  shouldConditionallyClear(skipParent = false) {
    // Skip if this component has clearOnHide set to false.
    if (this.component.clearOnHide === false) {
      return false;
    }

    // If the component is logically hidden, then it is conditionally hidden and should clear.
    if (this.logicallyHidden) {
      return true;
    }

    // If we have a condition and it is not conditionally visible, the it should conditionally clear.
    if (this.hasCondition() && !this.conditionallyVisible()) {
      return true;
    }

    if (skipParent) {
      // Stop recurrsion for the parent checks.
      return false;
    }

    // If this component has a set value, then it should ONLY clear if a parent is hidden
    // and has the clearOnHide set to true.
    if (this.hasSetValue) {
      return this.parentShouldConditionallyClear();
    }

    // Clear the value if the parent is conditionally hidden.
    return this.parentConditionallyHidden();
  }

  conditionallyHidden(skipParent = false) {
    if (this.logicallyHidden) {
      return true;
    }
    if (!this.hasCondition() && !skipParent) {
      return this.parentConditionallyHidden();
    }
    // Return if we are not conditionally visible (conditionallyHidden)
    if (!this.conditionallyVisible()) {
      return true;
    }
    if (skipParent) {
      // Stop recurrsion for the parent checks.
      return false;
    }
    // Check the parent.
    return this.parentConditionallyHidden();
  }

  get currentForm() {
    return this._currentForm;
  }

  set currentForm(instance) {
    this._currentForm = instance;
  }

  get fullMode() {
    return this.options.attachMode === 'full';
  }

  get builderMode() {
    return this.options.attachMode === 'builder';
  }

  get calculatedPath() {
    console.error('component.calculatedPath was deprecated, use component.path instead.');
    return this.path;
  }

  get labelPosition() {
    return this.component.labelPosition;
  }

  get labelWidth() {
    const width = this.component.labelWidth;
    return width >= 0 ? width : 30;
  }

  get labelMargin() {
    const margin = this.component.labelMargin;
    return margin >= 0 ? margin : 3;
  }

  get isAdvancedLabel() {
    return [
      'left-left',
      'left-right',
      'right-left',
      'right-right'
    ].includes(this.labelPosition);
  }

  get labelPositions() {
    return this.labelPosition.split('-');
  }

  get skipInEmail() {
    return false;
  }

  rightDirection(direction) {
    if (this.options.condensedMode) {
      return false;
    }
    return direction === 'right';
  }

  getLabelInfo(isCondensed = false) {
    const isRightPosition = this.rightDirection(this.labelPositions[0]);
    const isLeftPosition = this.labelPositions[0] === 'left' || isCondensed;
    const isRightAlign = this.rightDirection(this.labelPositions[1]);

    let contentMargin = '';
    if (this.component.hideLabel) {
      const margin = isCondensed ? 0 : this.labelWidth + this.labelMargin;
      contentMargin = isRightPosition ? `margin-right: ${margin}%` : '';
      contentMargin = isLeftPosition ? `margin-left: ${margin}%` : '';
    }

    const labelStyles = `
      flex: ${this.labelWidth};
      ${isRightPosition ? 'margin-left' : 'margin-right'}: ${this.labelMargin}%;
    `;
    const contentStyles = `
      flex: ${100 - this.labelWidth - this.labelMargin};
      ${contentMargin};
      ${this.component.hideLabel ? `max-width: ${100 - this.labelWidth - this.labelMargin}` : ''};
    `;

    return {
      isRightPosition,
      isRightAlign,
      labelStyles,
      contentStyles
    };
  }

  /**
   * Returns only the schema that is different from the default.
   * @param {object} schema - The "full" json schema for the component.
   * @param {object} defaultSchema - The "default" json schema for the component.
   * @param {boolean} recursion - If we are currently in a recursive loop.
   * @returns {object} - The minified json schema for this component.
   */
  getModifiedSchema(schema, defaultSchema, recursion) {
    const modified = {};
    if (!defaultSchema) {
      return schema;
    }
    _.each(schema, (val, key) => {
      if (!_.isArray(val) && _.isObject(val) && defaultSchema.hasOwnProperty(key)) {
        const subModified = this.getModifiedSchema(val, defaultSchema[key], true);
        if (!_.isEmpty(subModified)) {
          modified[key] = subModified;
        }
      }
      else if (_.isArray(val)) {
        if (val.length !== 0 && !_.isEqual(val, defaultSchema[key])) {
          modified[key] = val;
        }
      }
      else if (
        (!recursion && (key === 'type')) ||
        (!recursion && (key === 'key')) ||
        (!recursion && (key === 'label')) ||
        (!recursion && (key === 'input')) ||
        (!recursion && (key === 'tableView')) ||
        (val !== '' && !defaultSchema.hasOwnProperty(key)) ||
        (val !== '' && val !== defaultSchema[key]) ||
        (defaultSchema[key] && val !== defaultSchema[key])
      ) {
        modified[key] = val;
      }
    });
    return modified;
  }

  /**
   * Returns the JSON schema for this component.
   * @returns {object} - The JSON schema for this component.
   */
  get schema() {
    return fastCloneDeep(this.getModifiedSchema(_.omit(this.component, 'id'), this.defaultSchema));
  }

  /**
   * Returns true if component is inside DataGrid
   * @returns {boolean} - True if component is inside DataGrid
   */
  get isInDataGrid() {
    return this.inDataGrid;
  }

  /**
   * Translate a text using the i18n system.
   * @param {string} text - The i18n identifier.
   * @param {object} params - The i18n parameters to use for translation.
   * @param {...any} args - Additional arguments to pass to the translation library.
   * @returns {string} - The translated text.
   */
  t(text, params = {}, ...args) {
    if (!text) {
      return '';
    }
    // Use _userInput: true to ignore translations from defaults
    if (text in enTranslation && params._userInput) {
      return text;
    }
    params.data = params.data || this.rootValue;
    params.row = params.row || this.data;
    params.component = params.component || this.component;
    return super.t(text, params, ...args);
  }

  labelIsHidden() {
    return !this.component.label ||
      ((!this.isInDataGrid && this.component.hideLabel) ||
      (this.isInDataGrid && !this.component.dataGridLabel) ||
      this.options.floatingLabels ||
      this.options.inputsOnly) && !this.builderMode;
  }

  transform(type, value) {
    const frameworkTemplates = this.options.template ? Templates.templates[this.options.template] : Templates.current;
    return frameworkTemplates.hasOwnProperty('transform')
      ? frameworkTemplates.transform(type, value, this)
      : (type, value) => value;
  }

  getTemplate(names, modes) {
    modes = Array.isArray(modes) ? modes : [modes];
    names = Array.isArray(names) ? names : [names];
    if (!modes.includes('form')) {
      modes.push('form');
    }

    let result = null;

    if (this.options.templates) {
      result = this.checkTemplate(this.options.templates, names, modes);
      if (result) {
        return result;
      }
    }

    const frameworkTemplates = this.options.template ? Templates.templates[this.options.template] : Templates.current;
    result = this.checkTemplate(frameworkTemplates, names, modes);
    if (result) {
      return result;
    }

    // Default back to bootstrap if not defined.
    const name = names[names.length - 1];
    const templatesByName = Templates.defaultTemplates[name];

    if (!templatesByName) {
      return { template: `Unknown template: ${name}` };
    }

    const templateByMode = this.checkTemplateMode(templatesByName, modes);
    if (templateByMode) {
      return { template: templateByMode };
    }

    return { template: templatesByName.form };
  }

  checkTemplate(templates, names, modes) {
    for (const name of names) {
      const templatesByName = templates[name];

      if (templatesByName) {
        const { referenceAttributeName } = templatesByName;
        const templateByMode = this.checkTemplateMode(templatesByName, modes);
        if (templateByMode) {
          return { template: templateByMode, referenceAttributeName };
        }
      }
    }

    return null;
  }

  checkTemplateMode(templatesByName, modes) {
    for (const mode of modes) {
      const templateByMode = templatesByName[mode];

      if (templateByMode) {
        return templateByMode;
      }
    }

    return null;
  }

  getFormattedAttribute(attr) {
    return attr ? this.t(attr, { _userInput: true }).replace(/"/g, '&quot;') : '';
  }

  getFormattedTooltip(tooltipValue) {
    const tooltip = this.interpolate(tooltipValue || '').replace(/(?:\r\n|\r|\n)/g, '<br />');
    return this.getFormattedAttribute(tooltip);
  }

  isHtmlRenderMode() {
    return this.options.renderMode === 'html';
  }

  renderTemplate(name, data = {}, modeOption = '') {
    // Need to make this fall back to form if renderMode is not found similar to how we search templates.
    const mode = modeOption || this.options.renderMode || 'form';
    data.component = this.component;
    data.self = this;
    data.options = this.options;
    data.readOnly = this.options.readOnly;
    data.iconClass = this.iconClass.bind(this);
    data.size = this.size.bind(this);
    data.t = this.t.bind(this);
    data.transform = this.transform.bind(this);
    data.id = data.id || this.id;
    data.key = data.key || this.key;
    data.value = data.value || this.dataValue;
    data.disabled = this.disabled;
    data.builder = this.builderMode;
    data.render = (...args) => {
      console.warn(`Form.io 'render' template function is deprecated.
      If you need to render template (template A) inside of another template (template B),
      pass pre-compiled template A (use this.renderTemplate('template_A_name') as template context variable for template B`);
      return this.renderTemplate(...args);
    };
    data.label = data.labelInfo || this.labelInfo;
    data.tooltip = this.getFormattedTooltip(this.component.tooltip);

    // Allow more specific template names
    const names = [
      `${name}-${this.component.type}-${this.key}`,
      `${name}-${this.component.type}`,
      `${name}-${this.key}`,
      `${name}`,
    ];

    // Allow template alters.
    const { referenceAttributeName, template } = this.getTemplate(names, mode);
    if (referenceAttributeName) {
      this._referenceAttributeName = referenceAttributeName;
    }
    return this.hook(
      `render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`,
      this.interpolate(template, data),
      data,
      mode
    );
  }

  /**
   * Sanitize an html string.
   * @param {string} dirty - The dirty html string to sanitize.
   * @param {boolean} forceSanitize - If we should force the sanitize to occur.
   * @param {object} options - The options for the sanitize.
   * @returns {*} - The sanitized html string.
   */
  sanitize(dirty, forceSanitize = false, options = {}) {
    if (!this.shouldSanitizeValue && !forceSanitize) {
      return dirty;
    }
    return FormioUtils.sanitize(
      dirty,
      {
        sanitizeConfig: _.merge(this.options?.sanitizeConfig || {}, options || {}),
      });
  }

  /**
   * Render a template string into html.
   * @param {string} template - The template to render.
   * @param {object} data - The data to provide to the template.
   * @returns {HTMLElement | string} - The created element or an empty string if template is not specified.
   */
  renderString(template, data) {
    if (!template) {
      return '';
    }
    // Interpolate the template and populate
    return this.interpolate(template, data);
  }

  /**
   * Allows for modification of the component value prior to submission.
   * @param {*} input - The input to be modified.
   * @returns {*} - The modified input mapping for the extended component.
   */
  performInputMapping(input) {
    return input;
  }

  /**
   * Returns the component "widget" if one is available.
   * @returns {Widget|null} - The widget instance. null if not available.
   */
  get widget() {
    const settings = this.component.widget;

    if (settings && this.root?.shadowRoot) {
      settings.shadowRoot = this.root.shadowRoot;
    }

    const widget = settings && Widgets[settings.type] ? new Widgets[settings.type](settings, this.component, this): null;
    return widget;
  }

  /**
   * Returns the native supported browser language.
   * @returns {string|null} - The native browser language that is supported.
   */
  getBrowserLanguage() {
    const nav = window.navigator;
    const browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
    let language;

    // support for HTML 5.1 "navigator.languages"
    if (Array.isArray(nav.languages)) {
      for (let i = 0; i < nav.languages.length; i++) {
        language = nav.languages[i];
        if (language && language.length) {
          return language.split(';')[0];
        }
      }
    }

    // support for other well known properties in browsers
    for (let i = 0; i < browserLanguagePropertyKeys.length; i++) {
      language = nav[browserLanguagePropertyKeys[i]];
      if (language && language.length) {
        return language.split(';')[0];
      }
    }

    return null;
  }

  /**
   * Called before a next and previous page is triggered allowing the components to perform special functions.
   * @returns {Promise<boolean>} - A promise to resolve when the component is no longer blocking the next/previous page navigation.
   */
  beforePage() {
    return Promise.resolve(true);
  }

  /**
   * Called before the next page is triggered allowing the components to hook into the page navigation and perform tasks.
   * @returns {Promise<boolean>} - A promise to resolve when the component is no longer blocking the next page navigation.
   */
  beforeNext() {
    return this.beforePage(true);
  }

  /**
   * Called before a submission is triggered allowing the components to perform special async functions.
   * @returns {Promise<boolean>} - A promise to resolve when the component is no longer blocking the submission.
   */
  beforeSubmit() {
    return Promise.resolve(true);
  }

  /**
   * Return the submission timezone.
   * @returns {string} - The submission timezone.
   */
  get submissionTimezone() {
    this.options.submissionTimezone = this.options.submissionTimezone || _.get(this.root, 'options.submissionTimezone');
    return this.options.submissionTimezone;
  }

  /**
   * Return the current timezone.
   * @returns {string} - The current timezone.
   */
  get timezone() {
    return this.getTimezone(this.component);
  }

  /**
   * Return the current timezone.
   * @param {object} settings - Settings to control how the timezone should be returned.
   * @returns {string} - The current timezone.
   */
  getTimezone(settings) {
    if (settings.timezone) {
      return settings.timezone;
    }
    if (settings.displayInTimezone === 'utc') {
      return 'UTC';
    }
    const submissionTimezone = this.submissionTimezone;
    if (
      submissionTimezone &&
      (
        (settings.displayInTimezone === 'submission') ||
        ((this.options.pdf || this.options.server) && (settings.displayInTimezone === 'viewer'))
      )
    ) {
      return submissionTimezone;
    }

    // Return current timezone if none are provided.
    return currentTimezone();
  }

  /**
   *
   * @param {HTMLElement} element - The containing DOM element to query for the ref value.
   * @param {object} refs - The references to load.
   * @param {string} [referenceAttributeName] - The attribute name to use for the reference.
   */
  loadRefs(element, refs, referenceAttributeName) {
    if (!element) {
      return;
    }
    for (const ref in refs) {
      const refType = refs[ref];
      const isString = typeof refType === 'string';

      const selector = isString && refType.includes('scope')
        ? `:scope > [${referenceAttributeName || this._referenceAttributeName || 'ref'}="${ref}"]`
        : `[${referenceAttributeName || this._referenceAttributeName || 'ref'}="${ref}"]`;

      if (isString && refType.startsWith('single')) {
        this.refs[ref] = element.querySelector(selector);
      }
      else {
        this.refs[ref] = element.querySelectorAll(selector);
      }
    }
  }

  /**
   * Opens the modal element.
   * @param {string} template - The template to use for the modal dialog.
   */
  setOpenModalElement(template = null) {
    this.componentModal.setOpenModalElement(template || this.getModalPreviewTemplate());
  }

  /**
   * Renders a modal preview template and returns the markup as a string
   * @param {object|null|undefined} ctx - The rendering context
   * @returns {string} - The modal preview markup
   */
  renderModalPreview(ctx) {
    return this.renderTemplate('modalPreview', ctx || {});
  }

  /**
   * Returns the modal preview template.
   * @returns {string} - The modal preview template.
   */
  getModalPreviewTemplate() {
    const dataValue = this.component.type === 'password' ? this.dataValue.replace(/./g, '•') : this.dataValue;
    let modalLabel;

    if (this.hasInput && this.component.validate?.required && !this.isPDFReadOnlyMode) {
      modalLabel = { className: 'field-required' };
    }

    return this.renderModalPreview({
      previewText: this.getValueAsString(dataValue, { modalPreview: true }) || this.t('Click to set value'),
      messages: '',
      labelInfo: modalLabel,
    });
  }

  /**
   * Performs a complete build of a component, which empties, renders, sets the content in the DOM, and then finally attaches events.
   * @param {HTMLElement} element - The element to attach this component to.
   * @returns {Promise<void>} - A promise that resolves when the component has been built.
   */
  build(element) {
    element = element || this.element;
    this.empty(element);
    this.setContent(element, this.render());
    return this.attach(element);
  }

  get hasModalSaveButton() {
    return true;
  }

  /**
   * Renders a component as an HTML string.
   * @param {string} children - The contents of all the children HTML as a string.
   * @param {boolean} topLevel - If this is the topmost component that is being rendered.
   * @returns {string} - The rendered HTML string of a component.
   */
  render(children = `Unknown component: ${this.component.type}`, topLevel = false) {
    const isVisible = this.visible;
    this.rendered = true;

    if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
      return ComponentModal.render(this, {
        visible: isVisible,
        showSaveButton: this.hasModalSaveButton,
        id: this.id,
        classes: this.className,
        styles: this.customStyle,
        children
      }, topLevel);
    }
    else {
      return this.renderTemplate('component', {
        visible: isVisible,
        id: this.id,
        classes: this.className,
        styles: this.customStyle,
        children
      }, topLevel);
    }
  }

  /**
   * Creates the tooltip instance using tippy.js and returns it
   * @param {HTMLElement} tooltipEl - HTML element to attach the tooltip
   * @param {object|null|undefined} settings - tippy.js options
   * @returns {import('tippy.js').Tippy} - tippy.js instance
   */
  createTooltip(tooltipEl, settings = {}) {
    const tooltipAttribute = tooltipEl.getAttribute('data-tooltip');
    const tooltipDataTitle = tooltipEl.getAttribute('data-title');
    const tooltipText = this.interpolate(tooltipDataTitle || tooltipAttribute)
                            .replace(/(?:\r\n|\r|\n)/g, '<br />');

    return tippy(tooltipEl, {
      allowHTML: true,
      trigger: 'mouseenter click focus',
      placement: 'right',
      zIndex: 10000,
      interactive: true,
      ...settings,
      content: this.t(this.sanitize(tooltipText), { _userInput: true }),
    });
  }

  /**
   * Attaches all the tooltips provided the refs object.
   * @param {object} toolTipsRefs - The refs for the tooltips within your template.
   * @returns {void}
   */
  attachTooltips(toolTipsRefs) {
    toolTipsRefs?.forEach((tooltip, index) => {
      if (tooltip) {
        this.tooltips[index] = this.createTooltip(tooltip);
      }
    });
  }

  /**
   * Create a new component modal for this component.
   * @param {HTMLElement} element - The element to attach the modal to.
   * @param {boolean} modalShouldBeOpened - TRUE if the modal should open immediately.
   * @param {any} currentValue - The current value of the component.
   * @returns {ComponentModal} - The created component modal.
   */
  createComponentModal(element, modalShouldBeOpened, currentValue) {
    return new ComponentModal(this, element, modalShouldBeOpened, currentValue, this._referenceAttributeName);
  }

  /**
   * Attaches all event listensers for this component to the DOM elements that were rendered.
   * @param {HTMLElement} element - The element to attach the listeners to.
   * @returns {Promise<void>} - Resolves when the component is done attaching to the DOM.
   */
  attach(element) {
    if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
      const modalShouldBeOpened = this.componentModal ? this.componentModal.isOpened : false;
      const currentValue = modalShouldBeOpened ? this.componentModal.currentValue : this.dataValue;
      const openModalTemplate = this.componentModal && modalShouldBeOpened
        ? this.componentModal.openModalTemplate
        : null;
      this.componentModal = this.createComponentModal(element, modalShouldBeOpened, currentValue);
      this.setOpenModalElement(openModalTemplate);
    }

    this.attached = true;
    this.setElement(element);
    element.component = this;

    // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.
    if (this.element.id) {
      this.id = this.element.id;
      this.component.id = this.id;
    }

    this.loadRefs(element, {
      messageContainer: 'single',
      tooltip: 'multiple'
    });

    this.attachTooltips(this.refs.tooltip);

    // Attach logic.
    this.attachLogic();
    this.autofocus();

    // Allow global attach.
    this.hook('attachComponent', element, this);
    // Allow attach per component type.
    const type = this.component.type;
    if (type) {
      this.hook(`attach${type.charAt(0).toUpperCase() + type.substring(1, type.length)}`, element, this);
    }

    this.restoreFocus();

    this.addons.forEach((addon) => addon.attach(element));

    return Promise.resolve();
  }

  /**
   * Restors the "focus" on a component after a redraw event has occured.
   */
  restoreFocus() {
    const isFocused = this.root?.focusedComponent?.path === this.path;
    if (isFocused) {
      this.loadRefs(this.element, { input: 'multiple' });
      this.focus(this.root.currentSelection?.index);
      this.restoreCaretPosition();
    }
  }

  /**
   * Adds a keyboard shortcut to this component.
   * @param {HTMLElement} element - The element to attach the keyboard shortcut to.
   * @param {string} shortcut - The keyboard shortcut to add.
   * @returns {void}
   */
  addShortcut(element, shortcut) {
    // Avoid infinite recursion.
    if (!element || !this.root || (this.root === this)) {
      return;
    }

    if (!shortcut) {
      shortcut = this.component.shortcut;
    }

    this.root.addShortcut(element, shortcut);
  }

  /**
   * Removes a keyboard shortcut from this component.
   * @param {HTMLElement} element - The element to remove the keyboard shortcut from.
   * @param {string} shortcut - The keyboard shortcut to remove.
   * @returns {void}
   */
  removeShortcut(element, shortcut) {
    // Avoid infinite recursion.
    if (!element || (this.root === this)) {
      return;
    }

    if (!shortcut) {
      shortcut = this.component.shortcut;
    }

    this.root.removeShortcut(element, shortcut);
  }

  /**
   * Remove all event handlers.
   */
  detach() {
    // First iterate through each ref and delete the component so there are no dangling component references.
    _.each(this.refs, (ref) => {
      if (ref instanceof NodeList) {
        ref.forEach((elem) => {
          delete elem.component;
        });
      }
      else if (ref) {
        delete ref.component;
      }
    });
    this.refs = {};
    this.removeEventListeners();
    this.detachLogic();
    if (this.tooltip) {
      this.tooltip.destroy();
    }
  }

  /**
   * Determines if the component should be refreshed based on the path of another component that changed.
   * @param {string} refreshData - The path of the data that needs to trigger a refresh.
   * @param {boolean} changed - Flag that is true if the data has been changed.
   * @param {any} flags - The flags for the checkData procedure.
   * @returns {void}
   */
  checkRefresh(refreshData, changed, flags) {
    const changePath = _.get(changed, 'instance.path', false);
    // Don't let components change themselves.
    if (changePath && this.path === changePath) {
      return;
    }
    if (refreshData === 'data') {
      this.refresh(this.data, changed, flags);
    }
    else if (
      (changePath && (changed.instance?.paths?.localPath === refreshData)) && changed && changed.instance &&
      // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
      // in fields inside EditGrids could alter their state from other rows (which is bad).
      this.inContext(changed.instance)
    ) {
      this.refresh(changed.value, changed, flags);
    }
  }

  /**
   * Iterates over a list of changes, and determines if the component should be refreshed if it is configured to refresh on any of those components.
   * @param {Array<any>} changes - The list of components that have changed.
   * @param {any} flags - The checkData flags.
   * @returns {void}
   */
  checkRefreshOn(changes, flags = {}) {
    changes = changes || [];
    if (flags.noRefresh) {
      return;
    }
    if (!changes.length && flags.changed) {
      changes = [flags.changed];
    }
    const refreshOn = flags.fromBlur ? this.component.refreshOnBlur : this.component.refreshOn || this.component.redrawOn;
    // If they wish to refresh on a value, then add that here.
    if (refreshOn) {
      if (Array.isArray(refreshOn)) {
        refreshOn.forEach(refreshData => changes.forEach(changed => this.checkRefresh(refreshData, changed, flags)));
      }
      else {
        changes.forEach(changed => this.checkRefresh(refreshOn, changed, flags));
      }
    }
  }

  /**
   * Refreshes the component with a new value.
   * @param {any} value - The latest value of the component to check if it needs to be refreshed.
   * @returns {void}
   */
  refresh(value) {
    if (this.hasOwnProperty('refreshOnValue')) {
      this.refreshOnChanged = !_.isEqual(value, this.refreshOnValue);
    }
    else {
      this.refreshOnChanged = true;
    }
    this.refreshOnValue = fastCloneDeep(value);
    if (this.refreshOnChanged) {
      if (this.component.clearOnRefresh) {
        this.setValue(null);
      }
      this.triggerRedraw();
    }
  }

  /**
   * Checks to see if a separate component is in the "context" of this component. This is determined by first checking
   * if they share the same "data" object. It will then walk up the parent tree and compare its parents data objects
   * with the components data and returns true if they are in the same context.
   *
   * Different rows of the same EditGrid, for example, are in different contexts.
   * @param {any} component - The component to check if it is in the same context as this component.
   * @returns {boolean} - TRUE if the component is in the same context as this component.
   */
  inContext(component) {
    if (component.data === this.data) {
      return true;
    }
    let parent = this.parent;
    while (parent) {
      if (parent.data === component.data) {
        return true;
      }
      parent = parent.parent;
    }

    return false;
  }

  /**
   * Determines if we are in "view" only mode.
   * @returns {boolean} - TRUE if we are in "view" only mode.
   */
  get viewOnly() {
    return this.options.readOnly && this.options.viewAsHtml;
  }

  /**
   * Sets the HTMLElement for this component.
   * @param {HTMLElement} element - The element that is attached to this component.
   * @returns {void}
   */
  setElement(element) {
    if (this.element) {
      delete this.element.component;
      delete this.element;
    }
    this.element = element;
  }

  /**
   * Creates an element to hold the "view only" version of this component.
   * @returns {HTMLElement} - The element for this component.
   */
  createViewOnlyElement() {
    this.setElement(this.ce('dl', {
      id: this.id
    }));

    if (this.element) {
      // Ensure you can get the component info from the element.
      this.element.component = this;
    }

    return this.element;
  }

  /**
   * The default value for the "view only" mode of a component if the value is not provided.
   * @returns {string} - The default value for this component.
   */
  get defaultViewOnlyValue() {
    return '-';
  }

  /**
   * Uses the widget to determine the output string.
   * @param {any} value - The current value of the component.
   * @param {any} options - The options for getValueAsString.
   * @returns {any|Array<any>} - The value as a string.
   */
  getWidgetValueAsString(value, options) {
    const noInputWidget = !this.refs.input || !this.refs.input[0] || !this.refs.input[0].widget;
    if (!value || noInputWidget) {
      if (!this.widget || !value) {
        return value;
      }
      else {
        return this.widget.getValueAsString(value);
      }
    }
    if (Array.isArray(value)) {
      const values = [];
      value.forEach((val, index) => {
        const widget = this.refs.input[index] && this.refs.input[index].widget;
        if (widget) {
          values.push(widget.getValueAsString(val, options));
        }
      });
      return values;
    }

    const widget = this.refs.input[0].widget;
    return widget.getValueAsString(value, options);
  }

  /**
   * Returns the value of the component as a string.
   * @param {any} value - The value for this component.
   * @param {any} options - The options for this component.
   * @returns {string} - The string representation of the value of this component.
   */
  getValueAsString(value, options) {
    if (!value) {
      return '';
    }
    value = this.getWidgetValueAsString(value, options);
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (_.isPlainObject(value)) {
      return JSON.stringify(value);
    }
    if (value === null || value === undefined) {
      return '';
    }
    const stringValue = value.toString();
    return this.sanitize(stringValue);
  }

  /**
   * Returns the string representation "view" of the component value.
   * @param {any} value - The value of the component.
   * @param {any} options - The options for this component.
   * @returns {string} - The string representation of the value of this component.
   */
  getView(value, options) {
    if (this.component.protected) {
      return '--- PROTECTED ---';
    }
    return this.getValueAsString(value, options);
  }

  /**
   * Updates the items list for this component. Useful for Select and other List component types.
   * @param {...any} args - The arguments to pass to the onChange event.
   * @returns {void}
   */
  updateItems(...args) {
    this.restoreValue();
    this.onChange(...args);
  }

  /**
   * Returns the value for a specific item in a List type component.
   * @param {any} data - The data for this component.
   * @param {boolean} [forceUseValue] - if true, return 'value' property of the data
   * @returns {any} - The value of the item.
   */
  itemValue(data, forceUseValue = false) {
    if (_.isObject(data) && !_.isArray(data)) {
      if (this.valueProperty) {
        return _.get(data, this.valueProperty);
      }

      if (forceUseValue) {
        return data.value;
      }
    }

    return data;
  }

  /**
   * Returns the item value for html mode.
   * @param {any} value - The value for this component.
   * @returns {any} - The value of the item for html mode.
   */
  itemValueForHTMLMode(value) {
    if (Array.isArray(value)) {
      const values = value.map(item => Array.isArray(item) ? this.itemValueForHTMLMode(item) : this.itemValue(item));

      return values.join(', ');
    }

    return this.itemValue(value);
  }

  /**
   * Creates a modal to input the value of this component.
   * @param {HTMLElement} element - The element to attach the modal to.
   * @param {any} attr - A list of attributes to add to the modal.
   * @param {boolean} confirm - If we should add a confirmation to the modal that keeps it from closing unless confirmed.
   * @returns {HTMLElement} - The created modal element.
   */
  createModal(element, attr, confirm) {
    const dialog = this.ce('div', attr || {});
    this.setContent(dialog, this.renderTemplate('dialog'));

    // Add refs to dialog, not "this".
    dialog.refs = {};
    this.loadRefs.call(dialog, dialog, {
      dialogOverlay: 'single',
      dialogContents: 'single',
      dialogClose: 'single',
    });

    dialog.refs.dialogContents.appendChild(element);
    document.body.appendChild(dialog);
    document.body.classList.add('modal-open');

    dialog.close = () => {
      document.body.classList.remove('modal-open');
      dialog.dispatchEvent(new CustomEvent('close'));
    };
    this.addEventListener(dialog, 'close', () => this.removeChildFrom(dialog, document.body));

    const close = (event) => {
      event.preventDefault();
      dialog.close();
    };

    const handleCloseClick = (e) => {
      if (confirm) {
        confirm().then(() => close(e))
        .catch(() => {});
      }
      else {
        close(e);
      }
    };

    this.addEventListener(dialog.refs.dialogOverlay, 'click', handleCloseClick);
    this.addEventListener(dialog.refs.dialogClose, 'click', handleCloseClick);

    return dialog;
  }

  /**
   * Uses CSS classes to show or hide an element.
   * @returns {boolean} - TRUE if the element has been css removed.
   */
  get optimizeRedraw() {
    if (this.options.optimizeRedraw && this.element && !this.visible) {
      this.addClass(this.element, 'formio-removed');
      return true;
    }
    return false;
  }

  /**
   * Retrieves the CSS class name of this component.
   * @returns {string} - The class name of this component.
   */
  get className() {
    let className = this.hasInput ? `${this.transform('class', 'form-group')} has-feedback `: '';
    className += `formio-component formio-component-${this.component.type} `;
    // TODO: find proper way to avoid overriding of default type-based component styles
    if (this.key && this.key !== 'form') {
      className += `formio-component-${this.key} `;
    }
    if (this.component.multiple) {
      className += 'formio-component-multiple ';
    }
    if (this.component.customClass) {
      className += this.component.customClass;
    }
    if (this.hasInput && this.component.validate && boolValue(this.component.validate.required)) {
      className += ' required';
    }
    if (this.labelIsHidden()) {
      className += ' formio-component-label-hidden';
    }
    if (!this.visible) {
      className += ' formio-hidden';
    }
    return className;
  }

  /**
   * Build the custom style from the layout values
   * @returns {string} - The custom style
   */
  get customStyle() {
    let customCSS = '';
    _.each(this.component.style, (value, key) => {
      if (value !== '') {
        customCSS += `${key}:${value};`;
      }
    });
    return customCSS;
  }

  /**
   * Returns the component condition operator settings if available.
   * @returns {object} - The component condition operator settings.
   */
  static get serverConditionSettings() {
    return Component.conditionOperatorsSettings;
  }

  /**
   * Returns if the application is on a mobile device.
   * @returns {boolean} - TRUE if the application is on a mobile device.
   */
  get isMobile() {
    return isMobile();
  }

  /**
   * Returns the outside wrapping element of this component.
   * @returns {HTMLElement} - The wrapping element of this component.
   */
  getElement() {
    return this.element;
  }

  /**
   * Create an evaluation context for all script executions and interpolations.
   * @param {any} additional - Additional context to provide.
   * @returns {any} - The evaluation context.
   */
  evalContext(additional) {
    return super.evalContext(Object.assign({
      component: this.component,
      row: this.data,
      rowIndex: this.rowIndex,
      data: this.rootValue,
      iconClass: this.iconClass.bind(this),
      // Bind the translate function to the data context of any interpolated string.
      // It is useful to translate strings in different scenarions (eg: custom edit grid templates, custom error messages etc.)
      // and desirable to be publicly available rather than calling the internal {instance.t} function in the template string.
      t: this.t.bind(this),
      submission: (this.root ? this.root._submission : {
        data: this.rootValue
      }),
      form: this.root ? this.root._form : {},
      options: this.options,
    }, additional));
  }

  /**
   * Sets the pristine flag for this component.
   * @param {boolean} pristine - TRUE to make pristine, FALSE not pristine.
   */
  setPristine(pristine) {
    this.pristine = pristine;
  }

  /**
   * Returns if the component is pristine.
   * @returns {boolean} - TRUE if the component is pristine.
   */
  get isPristine() {
    return this.pristine;
  }

  /**
   * Sets the dirty flag for this component.
   * @param {boolean} dirty - TRUE to make dirty, FALSE not dirty.
   */
  setDirty(dirty) {
    this.dirty = dirty;
  }

  /**
   * Returns if the component is dirty.
   * @returns {boolean} - TRUE if the component is dirty.
   */
  get isDirty() {
    return this.dirty;
  }

  /**
   * Removes a value out of the data array and rebuild the rows.
   * @param {number} index - The index of the data element to remove.
   */
  removeValue(index) {
    this.splice(index);
    this.redraw();
    this.restoreValue();
    this.triggerRootChange();
  }

  /**
   * Returns the icon class for a given icon name.
   * @param {string} name - The name of the icon you wish to fetch provided the icon class. This is the "font awesome" version of the name of the icon.
   * @param {boolean} spinning - If the component should be spinning.
   * @returns {string} - The icon class for the equivalent icon in the iconset we are using.
   */
  iconClass(name, spinning) {
    const iconset = this.options.iconset || Templates.current.defaultIconset || 'fa';
    return Templates.current.hasOwnProperty('iconClass')
      ? Templates.current.iconClass(iconset, name, spinning)
      : this.options.iconset === 'fa' ? Templates.defaultTemplates.iconClass(iconset, name, spinning) : name;
  }

  /**
   * Returns the size css class names for our current template.
   * @param {string} size - The size class name for the default iconset.
   * @returns {string} - The size class for our component.
   */
  size(size) {
    return Templates.current.hasOwnProperty('size')
      ? Templates.current.size(size)
      : size;
  }

  /**
   * The readible name for this component.
   * @returns {string} - The name of the component.
   */
  get name() {
    return this.t(this.component.label || this.component.placeholder || this.key, { _userInput: true });
  }

  /**
   * Returns the visible errors for this component.
   * @returns {Array<object>} - The visible errors for this component.
   */
  get visibleErrors() {
    return this._visibleErrors;
  }

  /**
   * Returns all the errors for this component, visible or not.
   * @returns {Array<object>} - All the errors for this component.
   */
  get errors() {
    return this._errors;
  }

  /**
   * Returns the error label for this component.
   * @returns {string} - The error label for this component.
   */
  get errorLabel() {
    return this.t(this.component.errorLabel
      || this.component.label
      || this.component.placeholder
      || this.key);
  }

  /**
   * Get the error message provided a certain type of error.
   * @param {string} type - The type of error to fetch the message for.
   * @returns {string} - The error message configured for this component.
   */
  errorMessage(type) {
    return (this.component.errors && this.component.errors[type]) ? this.component.errors[type] :  type;
  }

  /**
   * Sets the content, innerHTML, of an element to the sanitized content.
   * @param {HTMLElement} element - The element to set the innerHTML to.
   * @param {string} content - The HTML string content that we wish to set.
   * @param {boolean} forceSanitize - If we should force the content to be sanitized.
   * @param {any} sanitizeOptions - The options for the sanitize function.
   * @returns {boolean} - TRUE if the content was sanitized and set.
   */
  setContent(element, content, forceSanitize, sanitizeOptions) {
    if (element instanceof HTMLElement) {
      element.innerHTML = this.sanitize(content, forceSanitize, sanitizeOptions);
      return true;
    }
    return false;
  }

  /**
   * Restores the caret position in the input element after a refresh occurs.
   */
  restoreCaretPosition() {
    if (this.root?.currentSelection) {
      if (this.refs.input?.length) {
        const { index } = this.root.currentSelection;
        let input = this.refs.input[index];
        const isInputRangeSelectable = (i) => /text|search|password|tel|url/i.test(i?.type || '');
        if (input) {
          if (isInputRangeSelectable(input)) {
            input.setSelectionRange(input.value.length, input.value.length);
          }
        }
        else {
          input = this.refs.input[this.refs.input.length];
          const lastCharacter = input.value?.length || 0;
          if (isInputRangeSelectable(input)) {
            input.setSelectionRange(lastCharacter, lastCharacter);
          }
        }
      }
    }
  }

  /**
   * Redraw the component.
   * @returns {Promise<void>} - A promise that resolves when the component is done redrawing.
   */
  redraw() {
    // Don't bother if we have not built yet.
    if (!this.element || !this.element.parentNode || this.optimizeRedraw) {
      // Return a non-resolving promise.
      return Promise.resolve();
    }
    this.detach();
    this.emit('redraw');
    // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.
    const parent = this.element.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, this.element);
    this.element.outerHTML = this.sanitize(this.render());
    this.setElement(parent.children[index]);
    return this.attach(this.element);
  }

  /**
   * Rebuild and redraw a component.
   * @returns {Promise<void>} - A promise that resolves when the component is done rebuilding and redrawing.
   */
  rebuild() {
    this.destroy();
    this.init();
    this.visible = this.hasCondition() ? !this.conditionallyHidden() : !this.component.hidden;
    return this.redraw();
  }

  /**
   * Removes all event listeners attached to this component.
   */
  removeEventListeners() {
    super.removeEventListeners();
    this.tooltips.forEach(tooltip => tooltip.destroy());
    this.tooltips = [];
  }

  /**
   * Returns if the dom node has the classes provided.
   * @param {HTMLElement} element - The element to check for the class.
   * @param {string} className - The name of the class to check.
   * @returns {boolean|void} - TRUE if the element has the class.
   */
  hasClass(element, className) {
    if (!element) {
      return;
    }

    return super.hasClass(element, this.transform('class', className));
  }

  /**
   * Adds a class to an HTML element.
   * @param {HTMLElement} element - The dom element to add the class to.
   * @param {string} className - The class name you wish to add.
   * @returns {this|void} - The component instance.
   */
  addClass(element, className) {
    if (!element) {
      return;
    }

    return super.addClass(element, this.transform('class', className));
  }

  /**
   * Removes a class from an element.
   * @param {HTMLElement} element - The element to remove the class from.
   * @param {string} className - The class name to remove.
   * @returns {this|void} - The component instance.
   */
  removeClass(element, className) {
    if (!element) {
      return;
    }

    return super.removeClass(element, this.transform('class', className));
  }

  /**
   * Determines if this component has a condition defined.
   * @returns {boolean} - TRUE if the component has a condition defined.
   */
  hasCondition() {
    if (this._hasCondition !== null) {
      return this._hasCondition;
    }

    this._hasCondition = FormioUtils.hasCondition(this.component);
    return this._hasCondition;
  }

  /**
   * Check if this component is conditionally visible.
   * @param {any} data - The data to check against.
   * @param {any} row - The row data to check against.
   * @returns {boolean} - TRUE if the component is conditionally visible.
   */
  conditionallyVisible(data, row) {
    data = data || this.rootValue;
    row = row || this.data;
    if (this.builderMode || this.previewMode) {
      return true;
    }
    data = data || (this.root ? this.root.data : {});
    return this.checkCondition(row, data);
  }

  /**
   * Checks the condition of this component.
   *
   * TODO: Switch row and data parameters to be consistent with other methods.
   * @param {any} row - The row contextual data.
   * @param {any} data - The global data object.
   * @returns {boolean} - True if the condition applies to this component.
   */
  checkCondition(row, data) {
    return FormioUtils.checkCondition(
      this.component,
      row || this.data,
      data || this.rootValue,
      this.root ? this.root._form : {},
      this
    );
  }

  /**
   * Check for conditionals and hide/show the element based on those conditions.
   * @param {any} data - The data to check against.
   * @param {any} flags - The flags passed to checkData function.
   * @param {any} row - The row data to check against.
   * @returns {boolean} - TRUE if the component is visible.
   */
  checkComponentConditions(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;

    if (!this.builderMode & !this.previewMode && this.fieldLogic(data, row)) {
      this.redraw();
    }

    // Check visibility
    const visible = (this.hasCondition() ? !this.conditionallyHidden() : !this.component.hidden);

    if (this.visible !== visible) {
      this.visible = visible;
    }

    this.clearComponentOnHide();
    return visible;
  }

  /**
   * Checks conditions for this component and any sub components.
   * @param {any} data - The data to check against.
   * @param {any} flags - The flags passed to checkData function.
   * @param {any} row - The row data to check against.
   * @returns {boolean} - TRUE if the component is visible.
   */
  checkConditions(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    return this.checkComponentConditions(data, flags, row);
  }

  /**
   * Returns the component logic if applicable.
   * @returns {Array<object>} - The component logic.
   */
  get logic() {
    return this.component.logic || [];
  }

  /**
   * Check all triggers and apply necessary actions.
   * @param {any} data - The data to check against.
   * @param {any} row - The row data to check against.
   * @returns {boolean|void} - TRUE if the component was altered.
   */
  fieldLogic(data = this.rootValue, row = this.data) {
    const logics = this.logic;

    // If there aren't logic, don't go further.
    if (logics.length === 0) {
      return;
    }

    const newComponent = fastCloneDeep(this.originalComponent);

    let changed = logics.reduce((changed, logic) => {
      const result = FormioUtils.checkTrigger(
        newComponent,
        logic.trigger,
        row,
        data,
        this.root ? this.root._form : {},
        this,
      );

      return (result ? this.applyActions(newComponent, logic.actions, result, row, data) : false) || changed;
    }, false);

    // If component definition changed, replace and mark as changed.
    if (!_.isEqual(this.component, newComponent)) {
      this.component = newComponent;
      changed = true;
      const disabled = this.shouldDisabled;
      // Change disabled state if it has changed
      if (this.disabled !== disabled) {
        this.disabled = disabled;
      }
    }

    return changed;
  }

  /**
   * Retuns if the browser is Internet Explorer.
   * @returns {boolean} - TRUE if the browser is IE.
   */
  isIE() {
    if (typeof window === 'undefined') {
      return false;
    }

    const userAgent = window.navigator.userAgent;

    const msie = userAgent.indexOf('MSIE ');
    if (msie > 0) {
      // IE 10 or older => return version number
      return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
    }

    const trident = userAgent.indexOf('Trident/');
    if (trident > 0) {
      // IE 11 => return version number
      const rv = userAgent.indexOf('rv:');
      return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
    }

    const edge = userAgent.indexOf('Edge/');
    if (edge > 0) {
      // IE 12 (aka Edge) => return version number
      return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
    }

    // other browser
    return false;
  }

  /**
   * Defines the logic action value through evaluation.
   * @param {object} action - The action within the Logic system to perform.
   * @param {object} argsObject - The arguments to pass to the evaluation.
   * @returns {any} - The result of the evaluation.
   */
  defineActionValue(action, argsObject) {
    return this.evaluate(
      action.value,
      argsObject,
      'value',
    );
  }

  /**
   * Apply the actions of Logic for a component once the conditions have been met.
   * @param {object} newComponent - The new component to apply the actions to.
   * @param {Array<object>} actions - An array of actions
   * @param {any} result - The result of the conditional check in order to evaluate the actions.
   * @param {any} row - The contextual row data for this component.
   * @param {any} data - The global data object for the submission.
   * @returns {boolean} - TRUE if the component was altered.
   */
  applyActions(newComponent, actions, result, row, data) {
    data = data || this.rootValue;
    row = row || this.data;

    return actions.reduce((changed, action) => {
      switch (action.type) {
        case 'property': {
          FormioUtils.setActionProperty(newComponent, action, result, row, data, this);

          const property = action.property.value;
          if (!_.isEqual(_.get(this.component, property), _.get(newComponent, property))) {
            // Advanced Logic can modify the component's hidden property; because we track conditionally hidden state
            // separately from the component's hidden property, and technically this Advanced Logic conditionally hides
            // a component, we need to set a temporary variable to the new value
            if (property === 'hidden') {
              this._logicallyHidden = newComponent.hidden;
            }
            changed = true;
          }

          break;
        }
        case 'value': {
          const oldValue = this.getValue();
          const newValue = this.defineActionValue(
            action,
            {
              value: _.clone(oldValue),
              data,
              row,
              component: newComponent,
              result,
            }
          );

          if (!_.isEqual(oldValue, newValue) && !this.shouldConditionallyClear()) {
            this.setValue(newValue);

            if (this.viewOnly) {
              this.dataValue = newValue;
            }

            changed = true;
          }

          break;
        }
        case 'mergeComponentSchema': {
          const schema = this.evaluate(
            action.schemaDefinition,
            {
              value: _.clone(this.getValue()),
              data,
              row,
              component: newComponent,
              result,
            },
            'schema',
          );

          _.assign(newComponent, schema);

          if (!_.isEqual(this.component, newComponent)) {
            changed = true;
          }

          break;
        }
        case 'customAction': {
          const oldValue = this.getValue();
          const newValue = this.evaluate(action.customAction, {
            value: _.clone(oldValue),
            data,
            row,
			input: oldValue,
            component: newComponent,
            result,
          },
          'value');

          if (!_.isEqual(oldValue, newValue) && !this.shouldConditionallyClear()) {
            this.setValue(newValue);

            if (this.viewOnly) {
              this.dataValue = newValue;
            }

            changed = true;
          }

          break;
        }
      }

      return changed;
    }, false);
  }

  // Deprecated
  addInputError(message, dirty, elements) {
    this.addMessages(message);
    this.setErrorClasses(elements, dirty, !!message);
  }

  // Deprecated
  removeInputError(elements) {
    this.setErrorClasses(elements, true, false);
  }

  /**
   * Add a new input error to this element.
   * @param {Array<object>|string} messages - An array of messages to add to the element.
   * @returns {void}
   */
  addMessages(messages) {
    if (!messages) {
      return;
    }

    // Standardize on array of objects for message.
    if (typeof messages === 'string') {
      messages = {
        messages,
        level: 'error',
      };
    }

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    messages = _.uniqBy(messages, message => message.message);

    if (this.refs.messageContainer) {
      this.setContent(this.refs.messageContainer, messages.map((message) => {
        return this.renderTemplate('message', { ...message });
      }
      ).join(''));
    }
  }

  /**
   * Sets the form input widget error classes.
   * @param {Array<HTMLElement>} elements - An array of DOM elements to set the error classes on.
   * @param {boolean} dirty - If the input is dirty.
   * @param {boolean} hasErrors - If the input has errors.
   * @param {boolean} hasMessages - If the input has messages.
   * @param {HTMLElement} element - The wrapper element for all the other elements passed in first argument.
   * @returns {void}
   */
  setErrorClasses(elements, dirty, hasErrors, hasMessages, element = this.element) {
    this.clearErrorClasses();
    elements.forEach((element) => {
      this.setElementInvalid(this.performInputMapping(element), false);
    });
    this.setInputWidgetErrorClasses(elements, hasErrors);
    // do not set error classes for hidden components
    if (!this.visible) {
      return;
    }

    if (hasErrors) {
      // Add error classes
      elements.forEach((input) => {
        this.setElementInvalid(this.performInputMapping(input), true);
      });

      if (dirty && this.options.highlightErrors) {
        this.addClass(element, this.options.componentErrorClass);
      }
      else {
        this.addClass(element, 'has-error');
      }
    }
    if (hasMessages) {
      this.addClass(element, 'has-message');
    }
  }

  /**
   * Adds the classes necessary to mark an element as invalid.
   * @param {HTMLElement} element - The element you wish to add the invalid classes to.
   * @param {boolean} invalid - TRUE if the component is invalid, FALSE otherwise.
   * @returns {void}
   */
  setElementInvalid(element, invalid) {
    if (!element) return;

    if (invalid) {
      this.addClass(element, 'is-invalid');
    }
    else {
      this.removeClass(element, 'is-invalid');
    }
    element.setAttribute('aria-invalid', invalid ? 'true' : 'false');
  }

  /**
   * Clear any conditionally hidden components for this component only.
   */
  clearComponentOnHide() {
    // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
    if (this.component.clearOnHide !== false && !this.options.readOnly && !this.options.showHiddenFields) {
      if (this.shouldConditionallyClear()) {
        this.deleteValue();
      }
      else if (!this.hasValue() && this.shouldAddDefaultValue) {
        // If shown, ensure the default is set.
        this.setValue(this.defaultValue, {
          noUpdateEvent: true
        });
      }
    }
  }

  /**
   * Clears the components data if it is conditionally hidden AND clearOnHide is set to true for this component.
   */
  clearOnHide() {
    this.clearComponentOnHide();
  }

  /**
   * Triggers a debounced onChange event for the root component (usually Webform).
   * @param {...any} args - The arguments to pass to the onChange event.
   */
  triggerRootChange(...args) {
    if (this.options.onChange) {
      this.options.onChange(...args);
    }
    else if (this.root && this.root.triggerChange) {
      this.root.triggerChange(...args);
    }
  }

  /**
   * Called when the component value has been changed. This will then trigger the root level onChange handler which
   * propagates the checkData methods for the full component tree.
   * @param {any} flags - The flags for the change event propagation.
   * @param {boolean} fromRoot - If the change event is from the root component.
   * @returns {boolean} - TRUE if the component has changed.
   */
  onChange(flags, fromRoot) {
    flags = flags || {};
    if (flags.modified) {
      if (!flags.noPristineChangeOnModified) {
        this.pristine = false;
      }
      this.addClass(this.getElement(), 'formio-modified');
    }

    // If we are supposed to validate on blur, then don't trigger validation yet.
    if (this.component.validateOn === 'blur' || this.component.validateOn === 'submit') {
      flags.noValidate = true;
    }

    if (this.component.onChange) {
      this.evaluate(this.component.onChange, {
        flags
      });
    }

    // Set the changed variable.
    const changed = {
      instance: this,
      component: this.component,
      value: this.dataValue,
      flags: flags
    };

    // Emit the change.
    this.emit('componentChange', changed);

    // Do not propogate the modified flag.
    let modified = false;
    if (flags.modified) {
      modified = true;
      delete flags.modified;
    }

    // Bubble this change up to the top.
    if (!fromRoot) {
      this.triggerRootChange(flags, changed, modified);
    }
    return changed;
  }

  get wysiwygDefault() {
    return {
      quill: {
        theme: 'snow',
        placeholder: this.t(this.component.placeholder, { _userInput: true }),
        modules: {
          toolbar: [
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            ['bold', 'italic', 'underline', 'strike', { 'script': 'sub' }, { 'script': 'super' }, 'clean'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }, { 'align': [] }],
            ['blockquote', 'code-block'],
            ['link', 'image', 'video', 'formula', 'source']
          ]
        }
      },
      ace: {
        theme: 'ace/theme/xcode',
        maxLines: 12,
        minLines: 12,
        tabSize: 2,
        mode: 'ace/mode/javascript',
        placeholder: this.t(this.component.placeholder, { _userInput: true })
      },
      ckeditor: {
        image: {
          toolbar: [
            'imageTextAlternative',
            '|',
            'imageStyle:full',
            'imageStyle:alignLeft',
            'imageStyle:alignCenter',
            'imageStyle:alignRight'
          ],
          styles: [
            'full',
            'alignLeft',
            'alignCenter',
            'alignRight'
          ]
        },
        extraPlugins: []
      },
      default: {}
    };
  }

  addCKE(element, settings, onChange) {
    settings = _.isEmpty(settings) ? {} : settings;
    settings.base64Upload = this.component.isUploadEnabled ? false : true;
    settings.mediaEmbed = { previewsInData: true };
    settings = _.merge(this.wysiwygDefault.ckeditor, _.get(this.options, 'editors.ckeditor.settings', {}), settings);

    if (this.component.isUploadEnabled) {
      settings.extraPlugins.push(getFormioUploadAdapterPlugin(this.fileService, this));
    }

    return Formio.requireLibrary(
      'ckeditor',
      isIEBrowser ? 'CKEDITOR' : 'ClassicEditor',
      _.get(this.options, 'editors.ckeditor.src',
      `${Formio.cdn.ckeditor}/ckeditor.js`
    ), true)
      .then(() => {
        if (!element.parentNode) {
          return Promise.reject();
        }
        if (isIEBrowser) {
          const editor = CKEDITOR.replace(element);
          editor.on('change', () => onChange(editor.getData()));
          return Promise.resolve(editor);
        }
        else {
          return ClassicEditor.create(element, settings).then(editor => {
            editor.model.document.on('change', () => onChange(editor.data.get()));
            return editor;
          });
        }
      });
  }

  addQuill(element, settings, onChange) {
    settings = _.isEmpty(settings) ? this.wysiwygDefault.quill : settings;
    settings = _.merge(this.wysiwygDefault.quill, _.get(this.options, 'editors.quill.settings', {}), settings);
    settings = {
      ...settings,
      modules: {
        table: true,
        ...settings.modules
      }
    };
    // Lazy load the quill css.
    Formio.requireLibrary(`quill-css-${settings.theme}`, 'Quill', [
      { type: 'styles', src: `${Formio.cdn.quill}/quill.${settings.theme}.css` }
    ], true);

    // Lazy load the quill library.
    return Formio.requireLibrary('quill', 'Quill', _.get(this.options, 'editors.quill.src', `${Formio.cdn.quill}/quill.min.js`), true)
      .then(() => {
        return Formio.requireLibrary('quill-table', 'Quill', `${Formio.cdn.baseUrl}/quill/quill-table.js`, true)
          .then(() => {
            if (!element.parentNode) {
              return Promise.reject();
            }
            this.quill = new Quill(element, isIEBrowser ? { ...settings, modules: {} } : settings);

            /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ */
            const txtArea = document.createElement('textarea');
            txtArea.setAttribute('class', 'quill-source-code');
            this.quill.addContainer('ql-custom').appendChild(txtArea);
            const qlSource = element.parentNode.querySelector('.ql-source');
            if (qlSource) {
              this.addEventListener(qlSource, 'click', (event) => {
                event.preventDefault();
                if (txtArea.style.display === 'inherit') {
                  this.quill.setContents(this.quill.clipboard.convert({ html: txtArea.value }));
                }
                txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
              });
            }
            /** END CODEBLOCK */

            // Make sure to select cursor when they click on the element.
            this.addEventListener(element, 'click', () => this.quill.focus());

            // Allows users to skip toolbar items when tabbing though form
            const elm = document.querySelectorAll('.ql-formats > button');
            for (let i = 0; i < elm.length; i++) {
              elm[i].setAttribute('tabindex', '-1');
            }

            this.quill.on('text-change', () => {
              txtArea.value = this.quill.root.innerHTML;
              onChange(txtArea);
            });
            return this.quill;
          });
      });
  }

  get shouldSanitizeValue() {
    // Sanitize value if sanitizing for thw whole content is turned off
    return (this.options?.sanitize !== false);
  }

  addAce(element, settings, onChange) {
    if (!settings || (settings.theme === 'snow')) {
      const mode = settings ? settings.mode : '';
      settings = {};
      if (mode) {
        settings.mode = mode;
      }
    }
    settings = _.merge(this.wysiwygDefault.ace, _.get(this.options, 'editors.ace.settings', {}), settings || {});
    return Formio.requireLibrary('ace', 'ace', _.get(this.options, 'editors.ace.src', `${Formio.cdn.ace}/ace.js`), true)
      .then((editor) => {
        editor = editor.edit(element);
        editor.removeAllListeners('change');
        editor.setOptions(settings);
        editor.getSession().setMode(settings.mode);
        editor.on('change', () => onChange(editor.getValue()));
        if (settings.isUseWorkerDisabled) {
          editor.session.setUseWorker(false);
        }
        return editor;
      });
  }

  get tree() {
    return this.component.tree || false;
  }

  /**
   * The empty value for this component.
   * @returns {null} - The empty value for this component.
   */
  get emptyValue() {
    return null;
  }

  /**
   * Returns if this component has a value set.
   * @param {any} data - The global data object.
   * @returns {boolean} - TRUE if a value is set.
   */
  hasValue(data) {
    return !_.isUndefined(_.get(data || this.data, this.key));
  }

  /**
   * Get the data value at the root level.
   * @returns {*} - The root value for the component, typically the Webform data object.
   */
  get rootValue() {
    return this.root ? this.root.data : this.data;
  }

  get rootPristine() {
    return _.get(this, 'root.pristine', false);
  }

  /**
   * Get the static value of this component.
   * @returns {*} - The value for this component.
   */
  get dataValue() {
    if (!this.key) {
      return this.component.multiple ? [] : this.emptyValue;
    }
    return _.get(this._data, this.key, this.component.multiple ? [] : this.emptyValue);
  }

  /**
   * Sets the static value of this component.
   * @param {*} value - The value to set for this component.
   */
  set dataValue(value) {
    if (!this.allowData || !this.key) {
      return;
    }
    if ((value !== null) && (value !== undefined)) {
      value = this.hook('setDataValue', value, this.key, this._data);
    }
    if ((value === null) || (value === undefined)) {
      this.unset();
      return;
    }
    _.set(this._data, this.key, value);
    return;
  }

  /**
   * Splice a value from the dataValue.
   * @param {number} index - The index to splice for an array component values.
   * @param {*} flags - The flags to use when splicing the value.
   */
  splice(index, flags = {}) {
    if (this.hasValue()) {
      const dataValue = this.dataValue || [];
      if (_.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
        dataValue.splice(index, 1);
        this.dataValue = dataValue;
        this.triggerChange(flags);
      }
    }
  }

  unset() {
    _.unset(this._data, this.key);
  }

  /**
   * Deletes the value of the component.
   */
  deleteValue() {
    this.setValue(null, {
      noUpdateEvent: true,
      noDefault: true
    });
    this.unset();
  }

  getCustomDefaultValue(defaultValue) {
    if (this.component.customDefaultValue && !this.options.preview) {
     defaultValue = this.evaluate(
        this.component.customDefaultValue,
        { value: this.dataValue },
        'value'
      );
    }
    return defaultValue;
  }

  /**
   * Returns if a component has a default value set.
   * @returns {boolean} - TRUE if a default value is set.
   */
  get hasDefaultValue() {
    return this.component.customDefaultValue || (
      this.component.hasOwnProperty('defaultValue') &&
      (this.component.defaultValue !== null) &&
      (this.component.defaultValue !== undefined)
    );
  }

  /**
   * Determine if we should add a default value for this component.
   * @returns {boolean} - TRUE if a default value should be set
   */
  get shouldAddDefaultValue() {
    return this.pristine && this.allowData && (this.hasDefaultValue || !this.options.noDefaults);
  }

  /**
   * Get the default value of this component.
   * @returns {*} - The default value for this component.
   */
  get defaultValue() {
    let defaultValue = this.emptyValue;
    if (this.component.defaultValue) {
      defaultValue = this.component.defaultValue;
    }

    defaultValue = this.getCustomDefaultValue(defaultValue);

    const checkMask = (value) => {
      if (typeof value === 'string') {
        if (this.component.type !== 'textfield') {
          const placeholderChar = this.placeholderChar;

          value = conformToMask(value, this.defaultMask, { placeholderChar }).conformedValue;
          if (!FormioUtils.matchInputMask(value, this.defaultMask)) {
            value = '';
          }
        }
      }
      else {
        value = '';
      }
      return value;
    };

    if (this.defaultMask) {
      if (Array.isArray(defaultValue)) {
        defaultValue = defaultValue.map(checkMask);
      }
      else {
        defaultValue = checkMask(defaultValue);
      }
    }

    // Clone so that it creates a new instance.
    return _.cloneDeep(defaultValue);
  }

  /**
   * Get the input value of this component.
   * @returns {*} - The value for the component.
   */
  getValue() {
    if (!this.hasInput || this.viewOnly || !this.refs.input || !this.refs.input.length) {
      return this.dataValue;
    }
    const values = [];
    for (const i in this.refs.input) {
      if (this.refs.input.hasOwnProperty(i)) {
        if (!this.component.multiple) {
          return this.getValueAt(i);
        }
        values.push(this.getValueAt(i));
      }
    }
    if (values.length === 0 && !this.component.multiple) {
      return '';
    }

    return values;
  }

  /**
   * Get the value at a specific index.
   * @param {number} index - For an array component or multiple values, this returns the value at a specific index.
   * @returns {*} - The value at the specified index.
   */
  getValueAt(index) {
    const input = this.performInputMapping(this.refs.input[index]);
    return input ? input.value : undefined;
  }

  /**
   * Set the value of this component.
   * @param {*} value - The value to set for this component.
   * @param {*} flags - The flags to use when setting the value.
   * @returns {boolean} - If the value changed.
   */
  setValue(value, flags = {}) {
    const changed = this.updateValue(value, flags);
    value = this.dataValue;
    if (!this.hasInput) {
      return changed;
    }
    const isArray = Array.isArray(value);
    const valueInput = this.refs.fileLink || this.refs.input;
    if (
      isArray &&
      Array.isArray(this.defaultValue) &&
      this.refs.hasOwnProperty('input') &&
      valueInput &&
      (valueInput.length !== value.length) &&
      this.visible
    ) {
      this.redraw();
    }
    if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
      this.redraw();
      return changed;
    }
    for (const i in this.refs.input) {
      if (this.refs.input.hasOwnProperty(i)) {
        this.setValueAt(i, isArray && !this.isSingleInputValue() ? value[i] : value, flags);
      }
    }
    return changed;
  }

  /**
   * Returns if the value (e.g. array) should be divided between several inputs
   * @returns {boolean}
   */
  isSingleInputValue() {
    return false;
  }

  /**
   * Set the value at a specific index.
   * @param {number} index - The index to set the value at.
   * @param {*} value - The value to set at the specified index.
   * @param {*} flags - The flags to use when setting the value.
   */
  setValueAt(index, value, flags = {}) {
    if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
      value = this.defaultValue;
    }

    const input = this.performInputMapping(this.refs.input[index]);
    const valueMaskInput = this.refs.valueMaskInput;

    if (valueMaskInput?.mask && valueMaskInput.mask.textMaskInputElement) {
      valueMaskInput.mask.textMaskInputElement.update(value);
    }

    if (input.mask && input.mask.textMaskInputElement) {
      input.mask.textMaskInputElement.update(value);
    }
    else if (input.widget && input.widget.setValue) {
      input.widget.setValue(value);
    }
    else {
      input.value = value;
    }
  }

  get hasSetValue() {
    return this.hasValue() && !this.isEmpty(this.dataValue);
  }

  setDefaultValue() {
    if (this.defaultValue && this.shouldAddDefaultValue) {
      const defaultValue = (this.component.multiple && !this.dataValue.length) ? [] : this.defaultValue;
      this.setValue(defaultValue, {
        noUpdateEvent: true
      });
    }
  }

  /**
   * Restore the value of a control.
   */
  restoreValue() {
    if (this.hasSetValue) {
      this.setValue(this.dataValue, {
        noUpdateEvent: true
      });
    }
    else {
      this.setDefaultValue();
    }
  }

  /**
   * Normalize values coming into updateValue.
   * @param {*} value - The value to normalize before setting.
   * @returns {*} - The normalized value.
   */
  normalizeValue(value) {
    return value;
  }

  /**
   * Update a value of this component.
   * @param {*} value - The value to update.
   * @param {*} flags - The flags to use when updating the value.
   * @returns {boolean} - If the value changed.
   */
  updateComponentValue(value, flags = {}) {
    let newValue = (!flags.resetValue && (value === undefined || value === null)) ? this.getValue() : value;
    newValue = this.normalizeValue(newValue, flags);
    const oldValue = this.dataValue;
    let changed = ((newValue !== undefined) ? this.hasChanged(newValue, oldValue) : false);
    if (changed) {
      this.dataValue = newValue;
      changed = this.dataValue !== oldValue;
      this.updateOnChange(flags, changed);
    }
    if (this.componentModal && flags && flags.fromSubmission) {
      this.componentModal.setValue(value);
    }
    return changed;
  }

  /**
   * Updates the value of this component plus all sub-components.
   * @param {...any} args - The arguments to pass to updateValue.
   * @returns {boolean} - If the value changed.
   */
  updateValue(...args) {
    return this.updateComponentValue(...args);
  }

  getIcon(name, content, styles, ref = 'icon') {
    return this.renderTemplate('icon', {
      className: this.iconClass(name),
      ref,
      styles,
      content
    });
  }

  /**
   * Resets the value of this component.
   */
  resetValue() {
    this.unset();
    this.setValue(this.defaultValue || this.emptyValue, {
      noUpdateEvent: true,
      noValidate: true,
      resetValue: true
    });
  }

  /**
   * Determine if the value of this component has changed.
   * @param {*} newValue - The new value to check.
   * @param {*} oldValue - The existing value of the component.
   * @returns {boolean} - TRUE if the value has changed.
   */
  hasChanged(newValue, oldValue) {
    if (
      ((newValue === undefined) || (newValue === null)) &&
      ((oldValue === undefined) || (oldValue === null) || this.isEmpty(oldValue))
    ) {
      return false;
    }
    // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
    if (
      newValue !== undefined &&
      newValue !== null &&
      this.allowData &&
      !this.hasValue()
    ) {
      return true;
    }
    return !_.isEqual(newValue, oldValue);
  }

  /**
   * Update the value on change.
   * @param {*} flags - The flags to use when triggering the on change event.
   * @param {boolean} changed - If the value has changed.
   * @returns {boolean} - If the value changed.
   */
  updateOnChange(flags = {}, changed = false) {
    if (!flags.noUpdateEvent && changed) {
      if (flags.fromSubmission) {
        // Reset the errors when a submission has been made and allow it to revalidate.
        this._errors = [];
      }
      this.triggerChange(flags);
      return true;
    }
    return false;
  }

  convertNumberOrBoolToString(value) {
    if (typeof value === 'number' || typeof value === 'boolean' ) {
      return value.toString();
    }
    return value;
  }

  doValueCalculation(dataValue, data, row) {
      return this.evaluate(this.component.calculateValue, {
        value: dataValue,
        data,
        row: row || this.data,
        submission: this.root?._submission || {
          data: this.rootValue
        }
      }, 'value');
  }

  /* eslint-disable max-statements */
  calculateComponentValue(data, flags, row) {
    // Skip value calculation for the component if we don't have entire form data set or in builder mode
    if (this.builderMode || _.isUndefined(_.get(this, 'root.data'))) {
      return false;
    }
    // If no calculated value or
    // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
    const allowOverride = _.get(this.component, 'allowCalculateOverride', false);

    if (this.shouldConditionallyClear()) {
      // remove calculated value so that the value is recalculated once component becomes visible
      if (this.hasOwnProperty('calculatedValue') && allowOverride) {
        _.unset(this, 'calculatedValue');
      }
      return false;
    }

    // Handle all cases when calculated values should not fire.
    if (
      (this.options.readOnly && !this.options.pdf && !this.component.calculateValue) ||
      !(this.component.calculateValue || this.component.calculateValueVariable) ||
      (this.options.server && !this.component.calculateServer) ||
      (flags.dataSourceInitialLoading && allowOverride)
    ) {
      return false;
    }

    const dataValue = this.dataValue;
    // Calculate the new value.
    let calculatedValue = this.doValueCalculation(dataValue, data, row, flags);

    if (this.options.readOnly && dataValue && !calculatedValue) {
      return false;
    }

    if (_.isNil(calculatedValue)) {
      calculatedValue = this.emptyValue;
    }

    const changed = !_.isEqual(dataValue, calculatedValue);

    // Do not override calculations on server if they have calculateServer set.
    if (allowOverride) {
      // The value is considered locked if it is not empty and comes from a submission value.
      const fromSubmission = (flags.fromSubmission && this.component.persistent === true);
      if (this.isEmpty(dataValue)) {
        // Reset the calculation lock if ever the data is cleared.
        this.calculationLocked = false;
      }
      else if (this.calculationLocked || fromSubmission) {
        this.calculationLocked = true;
        return false;
      }

      const firstPass = (this.calculatedValue === undefined) || flags.resetValue;
      if (firstPass) {
        this.calculatedValue = null;
      }
      const newCalculatedValue = this.normalizeValue(this.convertNumberOrBoolToString(calculatedValue));
      const previousCalculatedValue = this.normalizeValue(this.convertNumberOrBoolToString(this.calculatedValue));
      const normalizedDataValue = this.normalizeValue(this.convertNumberOrBoolToString(dataValue));
      const calculationChanged = !_.isEqual(previousCalculatedValue, newCalculatedValue);
      const previousChanged = !_.isEqual(normalizedDataValue, previousCalculatedValue);

      if (calculationChanged && previousChanged && !firstPass) {
        return false;
      }

      // Check to ensure that the calculated value is different than the previously calculated value.
      if (previousCalculatedValue && previousChanged && !calculationChanged) {
        this.calculatedValue = null;
        return false;
      }

      if (flags.isReordered || !calculationChanged) {
        return false;
      }

      if (fromSubmission) {
        // If we set value from submission and it differs from calculated one, set the calculated value to prevent overriding dataValue in the next pass
        this.calculatedValue = fastCloneDeep(calculatedValue);
        return false;
      }

      // If this is the firstPass, and the dataValue is different than to the calculatedValue.
      if (firstPass && !this.isEmpty(dataValue) && changed && calculationChanged) {
        // Return that we have a change so it will perform another pass.
        return true;
      }
    }

    this.calculatedValue = fastCloneDeep(calculatedValue);

    if (changed) {
      if (!flags.noPristineChangeOnModified && this.root.initialized) {
        this.pristine = false;
      }

      flags.triggeredComponentId = this.id;
      return this.setValue(calculatedValue, flags);
    }
    return false;
  }
  /* eslint-enable max-statements */

  /**
   * Performs calculations in this component plus any child components.
   * @param {*} data - The data to perform the calculation with.
   * @param {*} flags - The flags to use when calculating the value.
   * @param {*} row - The contextual row data to use when performing the calculation.
   * @returns {boolean} - TRUE if the value changed.
   */
  calculateValue(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    return this.calculateComponentValue(data, flags, row);
  }

  /**
   * Get this component's label text.
   * @returns {string} - The label text for this component.
   */
  get label() {
    return this.component.label;
  }

  /**
   * Set this component's label text and render it.
   * @param {string} value - The new label text.
   */
  set label(value) {
    this.component.label = value;
    if (this.labelElement) {
      this.labelElement.innerText = value;
    }
  }

  /**
   * Get FormioForm element at the root of this component tree.
   * @returns {*} root - The root component to search from.
   */
  getRoot() {
    return this.root;
  }

  /**
   * Returns the invalid message, or empty string if the component is valid.
   * @param {*} data - The data to check if the component is valid.
   * @param {boolean} dirty - If the component is dirty.
   * @param {boolean} ignoreCondition - If conditions for the component should be ignored when checking validity.
   * @param {*} row - Contextual row data for this component.
   * @param {*} options - Additional options for validation.
   * @returns {string} - The message to show when the component is invalid.
   */
  invalidMessage(data, dirty, ignoreCondition, row, options = {}) {
    const { local } = options;
    if (!row) {
      row = getContextualRowData(this.component, data, this.paths);
    }
    if (!ignoreCondition && !this.checkCondition(row, data)) {
      return '';
    }

    // See if this is forced invalid.
    if (this.invalid) {
      return this.invalid;
    }

    // No need to check for errors if there is no input or if it is pristine.
    if (!this.hasInput || (!dirty && this.pristine)) {
      return '';
    }

    const validationScope = { errors: [] };
    processOneSync({
      component: this.component,
      data,
      row,
      local,
      path: this.path || this.component.key,
      parent: this.parent?.component,
      paths: this.paths,
      scope: validationScope,
      instance: this,
      processors: [
        validateProcessInfo
      ]
    });
    const errors = validationScope.errors;
    const interpolatedErrors = FormioUtils.interpolateErrors(this.component, errors, this.t.bind(this));

    return _.map(interpolatedErrors, 'message').join('\n\n');
  }

  /**
   * Returns if the component is valid or not.
   * @param {*} data - The data to check if the component is valid.
   * @param {boolean} dirty - If the component is dirty.
   * @returns {boolean} - TRUE if the component is valid.
   */
  isValid(data, dirty) {
    return !this.invalidMessage(data, dirty);
  }

  setComponentValidity(errors, dirty, silentCheck) {
    if (silentCheck) {
      return [];
    }
    const messages = errors.filter(message => !message.fromServer);
    if (errors.length && !!messages.length && (!this.isEmpty(this.defaultValue) || dirty || !this.pristine)) {
      return this.setCustomValidity(messages, dirty);
    }
    else {
      return this.setCustomValidity('');
    }
  }

  /**
   * Interpolate errors from the validation methods.
   * @param {Array<any>} errors - An array of errors to interpolate.
   * @returns {Array<any>} - The interpolated errors.
   */
  interpolateErrors(errors) {
    const interpolatedErrors = FormioUtils.interpolateErrors(this.component, errors, this.t.bind(this));
    return this.serverErrors?.length ? [...interpolatedErrors, ...this.serverErrors] : interpolatedErrors;
  }

  /**
   * Show component validation errors.
   * @param {*} errors - An array of errors that have occured.
   * @param {*} data - The root submission data.
   * @param {*} row - The contextual row data.
   * @param {*} flags - The flags to perform validation.
   * @returns {boolean} - TRUE if the component is valid.
   */
  showValidationErrors(errors, data, row, flags) {
    if (flags.silentCheck) {
      return [];
    }
    let isDirty = (flags.dirty === false) ? false : (this.dirty || flags.dirty);
    if (this.options.alwaysDirty) {
      isDirty = true;
    }
    this.setDirty(isDirty);
    return this.setComponentValidity(errors, isDirty, flags.silentCheck, flags.fromSubmission);
  }

  /**
   * Perform a component validation.
   * @param {*} data - The root data you wish to use for this component.
   * @param {*} row - The contextual row data you wish to use for this component.
   * @param {*} flags - The flags to control the behavior of the validation.
   * @returns {Array<any>} - An array of errors if the component is invalid.
   */
  validateComponent(data = null, row = null, flags = {}) {
    data = data || this.rootValue;
    row = row || this.data;
    const { async = false } = flags;
    if (this.shouldSkipValidation(data, row, flags)) {
      return async ? Promise.resolve([]) : [];
    }
    const processContext = {
      component: this.component,
      data,
      row,
      local: !!flags.local,
      value: this.validationValue,
      parent: this.parent?.component,
      paths: this.paths,
      path: this.path || this.component.key,
      instance: this,
      form: this.root ? this.root._form : {},
      scope: { errors: [] },
      processors: [
        validateProcessInfo
      ]
    };

    if (async) {
      return processOne(processContext).then(() => {
        this._errors = this.interpolateErrors(processContext.scope.errors);
        return this._errors;
      });
    }
    processOneSync(processContext);
    this._errors = this.interpolateErrors(processContext.scope.errors);
    return this._errors;
  }

  /**
   * Checks the validity of this component and sets the error message if it is invalid.
   * @param {*} data - The data to check if the component is valid.
   * @param {boolean} dirty - If the component is dirty.
   * @param {*} row - The contextual row data for this component.
   * @param {*} flags - The flags to use when checking the validity.
   * @param {Array<any>} allErrors - An array of all errors that have occured so that it can be appended when another one occurs here.
   * @returns {boolean} - TRUE if the component is valid.
   */
  checkComponentValidity(data = null, dirty = false, row = null, flags = {}, allErrors = []) {
    data = data || this.rootValue;
    row = row || this.data;
    flags.dirty = dirty || false;
    if (flags.async) {
      return this.validateComponent(data, row, flags).then((errors) => {
        allErrors.push(...errors);
        if (this.parent && this.parent.childErrors) {
          if (errors.length) {
            this.parent.childErrors.push(...errors);
          }
          else {
            _.remove(this.parent.childErrors, (err) => (err?.component?.key || err?.context?.key) === this.component.key);
          }
        }
        this.showValidationErrors(errors, data, row, flags);
        return errors.length === 0;
      });
    }
    else {
      const errors = this.validateComponent(data, row, flags);
      this.showValidationErrors(errors, data, row, flags);
      allErrors.push(...errors);
      if (this.parent && this.parent.childErrors) {
        if (errors.length) {
          this.parent.childErrors.push(...errors);
        }
        else {
          _.remove(this.parent.childErrors, (err) => (err?.component?.key || err?.context?.key) === this.component.key);
        }
      }
      return errors.length === 0;
    }
  }

  /**
   * Checks the validity of the component.
   * @param {*} data - The data to check if the component is valid.
   * @param {boolean} dirty - If the component is dirty.
   * @param {*} row - The contextual row data for this component.
   * @param {boolean} silentCheck - If the check should be silent and not set the error messages.
   * @param {Array<any>} errors - An array of all errors that have occured so that it can be appended when another one occurs here.
   * @returns {boolean} - TRUE if the component is valid.
   */
  checkValidity(data = null, dirty = false, row = null, silentCheck = false, errors = []) {
    data = data || this.rootValue;
    row = row || this.data;
    return this.checkComponentValidity(data, dirty, row, { silentCheck }, errors);
  }

  checkAsyncValidity(data = null, dirty = false, row = null, silentCheck = false, errors = []) {
    return this.checkComponentValidity(data, dirty, row, { async: true, silentCheck }, errors);
  }

  /**
   * Check the conditions, calculations, and validity of a single component and triggers an update if
   * something changed.
   * @param {*} data - The root data of the change event.
   * @param {*} flags - The flags from this change event.
   * @param {*} row - The contextual row data for this component.
   * @returns {void|boolean} - TRUE if no check should be performed on the component.
   */
  checkData(data = null, flags = null, row = null) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;

    // Some components (for legacy reasons) have calls to "checkData" in inappropriate places such
    // as setValue. Historically, this was bypassed by a series of cached states around the data model
    // which caused its own problems. We need to ensure that premium and custom components do not fall into
    // an infinite loop by only checking this component once.
    if (this.checkingData) {
      return;
    }
    this.checkingData = true;

    // Needs for Nextgen Rules Engine
    this.resetCaches();

    // Do not trigger refresh if change was triggered on blur event since components with Refresh on Blur have their own listeners
    if (!flags.fromBlur) {
      this.checkRefreshOn(flags.changes, flags);
    }

    if (flags.noCheck) {
      return true;
    }

    this.checkComponentConditions(data, flags, row);

    if (this.id !== flags.triggeredComponentId) {
      this.calculateComponentValue(data, flags, row);
    }

    // We are done checking data.
    this.checkingData = false;
  }

  checkModal(errors = [], dirty = false) {
    const messages = errors.filter(error => !error.fromServer);
    const isValid = errors.length === 0;
    if (!this.component.modalEdit || !this.componentModal) {
      return;
    }
    if (dirty && !isValid) {
      this.setErrorClasses([this.refs.openModal], dirty, !isValid, !!messages.length, this.refs.openModalWrapper);
    }
    else {
      this.clearErrorClasses(this.refs.openModalWrapper);
    }
  }

  get validationValue() {
    return this.dataValue;
  }

  isEmpty(value = this.dataValue) {
    const isEmptyArray = (_.isArray(value) && value.length === 1) ? _.isEqual(value[0], this.emptyValue) : false;
    return value == null || value.length === 0 || _.isEqual(value, this.emptyValue) || isEmptyArray;
  }

  isEqual(valueA, valueB = this.dataValue) {
    return (this.isEmpty(valueA) && this.isEmpty(valueB)) || _.isEqual(valueA, valueB);
  }

  /**
   * Check if a component is eligible for multiple validation
   * @returns {boolean} - TRUE if the component is eligible for multiple validation.
   */
  validateMultiple() {
    return true;
  }

  clearErrorClasses(element = this.element) {
    this.removeClass(element, this.options.componentErrorClass);
    this.removeClass(element, 'alert alert-danger');
    this.removeClass(element, 'has-error');
    this.removeClass(element, 'has-message');
  }

  setInputWidgetErrorClasses(inputRefs, hasErrors) {
    if (!this.isInputComponent || !this.component.widget || !inputRefs?.length) {
      return;
    }

    inputRefs.forEach((input) => {
      if (input?.widget && input.widget.setErrorClasses) {
        input.widget.setErrorClasses(hasErrors);
      }
    });
  }

  addFocusBlurEvents(element) {
    this.addEventListener(element, 'focus', () => {
      if (this.root.focusedComponent !== this) {
        if (this.root.pendingBlur) {
          this.root.pendingBlur();
        }

        this.root.focusedComponent = this;

        this.emit('focus', this);
      }
      else if (this.root.focusedComponent === this && this.root.pendingBlur) {
        this.root.pendingBlur.cancel();
        this.root.pendingBlur = null;
      }
    });
    this.addEventListener(element, 'blur', () => {
      this.root.pendingBlur = FormioUtils.delay(() => {
        this.emit('blur', this);
        if (this.component.validateOn === 'blur') {
          this.root.triggerChange({ fromBlur: true }, {
            instance: this,
            component: this.component,
            value: this.dataValue,
            flags: { fromBlur: true }
          });
        }
        this.root.focusedComponent = null;
        this.root.pendingBlur = null;
      });
    });
  }

  // eslint-disable-next-line max-statements
  setCustomValidity(messages, dirty, external) {
    const inputRefs = this.isInputComponent ? this.refs.input || [] : null;

    if (typeof messages === 'string' && messages) {
      messages = {
        level: 'error',
        message: messages,
        component: this.component,
      };
    }

    if (!Array.isArray(messages)) {
      if (messages) {
        messages = [messages];
      }
      else {
        messages = [];
      }
    }

    const errors = messages.filter(message => message.level === 'error');
    let invalidInputRefs = inputRefs;
    // Filter the invalid input refs in multiple components
    if (this.component.multiple) {
      const refsArray = Array.from(inputRefs);
      refsArray.forEach((input) => {
        this.setElementInvalid(this.performInputMapping(input), false);
      });
      this.setInputWidgetErrorClasses(refsArray, false);

      invalidInputRefs = refsArray.filter((ref, index) => {
        return messages.some?.((msg) => {
          return msg?.context?.index === index;
        });
      });
    }

    if (messages.length) {
      if (this.refs.messageContainer) {
        this.empty(this.refs.messageContainer);
      }
      this.emit('componentError', {
        instance: this,
        component: this.component,
        message: messages[0].message,
        messages,
        external: !!external,
      });
      this.addMessages(messages, dirty, invalidInputRefs);
      if (invalidInputRefs) {
        this.setErrorClasses(invalidInputRefs, dirty, !!errors.length, !!messages.length);
      }
    }
    else if (!errors.length || (errors[0].external === !!external)) {
      if (this.refs.messageContainer) {
        this.empty(this.refs.messageContainer);
      }
      if (this.refs.modalMessageContainer) {
        this.empty(this.refs.modalMessageContainer);
      }
      if (invalidInputRefs) {
        this.setErrorClasses(invalidInputRefs, dirty, !!errors.length, !!messages.length);
      }
      this.clearErrorClasses();
    }
    this._visibleErrors = messages;
    return messages;
  }

  /**
   * Determines if the value of this component is hidden from the user as if it is coming from the server, but is
   * protected.
   * @returns {boolean|*} - TRUE if the value is hidden.
   */
  isValueHidden() {
    if (this.component.protected && this.root.editing) {
      return false;
    }
    if (!this.root || !this.root.hasOwnProperty('editing')) {
      return false;
    }
    if (!this.root || !this.root.editing) {
      return false;
    }
    return (this.component.protected || !this.component.persistent || (this.component.persistent === 'client-only'));
  }

  shouldSkipValidation(data, row, flags = {}) {
    const rules = [
      // Do not validate if the flags say not too.
      () => flags.noValidate,
      // Force valid if component is read-only
      () => this.options.readOnly,
      // Do not check validations if component is not an input component.
      () => !this.hasInput,
      // Check to see if we are editing and if so, check component persistence.
      () => this.isValueHidden(),
      // Force valid if component is hidden.
      () => {
        if (!this.component.validateWhenHidden && (!this.visible || !this.checkCondition(row, data))) {
          // If this component is forced valid when it is hidden, then we also need to reset the errors for this component.
          this._errors = [];
          return true;
        }
        return false;
      }
    ];

    return rules.some(pred => pred());
  }

  // Maintain reverse compatibility.
  whenReady() {
    console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
    return this.dataReady;
  }

  get dataReady() {
    return Promise.resolve();
  }

  /**
   * Prints out the value of this component as a string value.
   * @param {*} value - The value to print out.
   * @returns {string} - The string representation of the value.
   */
  asString(value) {
    value = value || this.getValue();
    return (Array.isArray(value) ? value : [value]).map(_.toString).join(', ');
  }

  /**
   * Return if the component is disabled.
   * @returns {boolean} - TRUE if the component is disabled.
   */
  get disabled() {
    return this._disabled || this.parentDisabled;
  }

  /**
   * Disable this component.
   * @param {boolean} disabled - TRUE to disable the component.
   */
  set disabled(disabled) {
    this._disabled = disabled;
  }

  setDisabled(element, disabled) {
    if (!element) {
      return;
    }
    element.disabled = disabled;
    if (disabled) {
      element.setAttribute('disabled', 'disabled');
    }
    else {
      element.removeAttribute('disabled');
    }
  }

  setLoading(element, loading) {
    if (!element || (element.loading === loading)) {
      return;
    }

    element.loading = loading;
    if (!element.loader && loading) {
      element.loader = this.ce('i', {
        class: `${this.iconClass('refresh', true)} button-icon-right`
      });
    }
    if (element.loader) {
      if (loading) {
        this.appendTo(element.loader, element);
      }
      else {
        this.removeChildFrom(element.loader, element);
      }
    }
  }

  selectOptions(select, tag, options, defaultValue) {
    _.each(options, (option) => {
      const attrs = {
        value: option.value
      };
      if (defaultValue !== undefined && (option.value === defaultValue)) {
        attrs.selected = 'selected';
      }
      const optionElement = this.ce('option', attrs);
      optionElement.appendChild(this.text(option.label));
      select.appendChild(optionElement);
    });
  }

  setSelectValue(select, value) {
    const options = select.querySelectorAll('option');
    _.each(options, (option) => {
      if (option.value === value) {
        option.setAttribute('selected', 'selected');
      }
      else {
        option.removeAttribute('selected');
      }
    });
    if (select.onchange) {
      select.onchange();
    }
    if (select.onselect) {
      select.onselect();
    }
  }

  getRelativePath(path) {
    const keyPart = `.${this.key}`;
    const thisPath = this.isInputComponent ? this.path
                                           : this.path.slice(0).replace(keyPart, '');
    return path.replace(thisPath, '');
  }

  clear() {
    this.detach();
    this.empty(this.getElement());
  }

  append(element) {
    this.appendTo(element, this.element);
  }

  prepend(element) {
    this.prependTo(element, this.element);
  }

  removeChild(element) {
    this.removeChildFrom(element, this.element);
  }

  detachLogic() {
    this.logic.forEach(logic => {
      if (logic.trigger.type === 'event') {
        const event = this.interpolate(logic.trigger.event);
        this.off(event); // only applies to callbacks on this component
      }
    });
  }

  attachLogic() {
    // Do not attach logic during builder mode.
    if (this.builderMode) {
      return;
    }
    this.logic.forEach((logic) => {
      if (logic.trigger.type === 'event') {
        const event = this.interpolate(logic.trigger.event);
        this.on(event, (...args) => {
          const newComponent = fastCloneDeep(this.originalComponent);
          if (this.applyActions(newComponent, logic.actions, args)) {
            // If component definition changed, replace it.
            if (!_.isEqual(this.component, newComponent)) {
              this.component = newComponent;
              const visible = this.hasCondition() ? !this.conditionallyHidden() : !this.component.hidden;
              const disabled = this.shouldDisabled;

              // Change states which won't be recalculated during redrawing
              if (this.visible !== visible) {
                this.visible = visible;
              }
              if (this.disabled !== disabled) {
                this.disabled = disabled;
              }

              this.redraw();
            }
          }
        }, true);
      }
    });
  }

  /**
   * Get the element information.
   * @returns {*} - The components "input" DOM element information.
   */
  elementInfo() {
    const attributes = {
      name: this.options.name,
      type: this.component.inputType || 'text',
      class: 'form-control',
      lang: this.options.language
    };

    if (this.component.placeholder) {
      attributes.placeholder = this.t(this.component.placeholder, { _userInput: true });
    }

    if (this.component.tabindex) {
      attributes.tabindex = this.component.tabindex;
    }

    if (this.disabled) {
      attributes.disabled = 'disabled';
    }

    _.defaults(attributes, this.component.attributes);

    return {
      type: 'input',
      component: this.component,
      changeEvent: 'change',
      attr: attributes
    };
  }

  autofocus() {
    const hasAutofocus = this.component.autofocus && !this.builderMode && !this.options.preview;

    if (hasAutofocus) {
      this.on('render', () => this.focus(), true);
    }
  }

  scrollIntoView(element = this.element, verticalOnly) {
    if (!element) {
      return;
    }
    const { left, top } = element.getBoundingClientRect();
    window.scrollTo(verticalOnly ? window.scrollX : left + window.scrollX, top + window.scrollY);
  }

  focus(index) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }

    if (!index && !_.isNumber(index) && this.refs?.input?.length) {
      index = this.refs.input.length - 1;
    }

    if (this.refs.input?.length) {
      const focusingInput = this.refs.input[index];
      if (this.component.widget?.type === 'calendar') {
        const sibling = focusingInput.nextSibling;
        if (sibling) {
          sibling.focus();
        }
      }
      else {
        focusingInput.focus();
      }
    }

    if (this.refs.openModal) {
      this.refs.openModal.focus();
    }

    if (this.parent.refs.openModal) {
      this.parent.refs.openModal.focus();
    }
  }

  /**
   * Get `Formio` instance for working with files
   * @returns {import('@formio/core').Formio} - The Formio instance file service.
   */
  get fileService() {
    if (this.options.fileService) {
      return this.options.fileService;
    }
    if (this.options.formio) {
      return this.options.formio;
    }
    if (this.root && this.root.formio) {
      return this.root.formio;
    }
    const formio = new Formio();
    // If a form is loaded, then make sure to set the correct formUrl.
    if (this.root && this.root._form && this.root._form._id) {
      formio.formUrl = `${formio.projectUrl}/form/${this.root._form._id}`;
    }
    return formio;
  }

  resetCaches() {}

  get previewMode() {
    return false;
  }
}

Component.externalLibraries = {};
Component.requireLibrary = function(name, property, src, polling) {
  if (!Component.externalLibraries.hasOwnProperty(name)) {
    Component.externalLibraries[name] = {};
    Component.externalLibraries[name].ready = new Promise((resolve, reject) => {
      Component.externalLibraries[name].resolve = resolve;
      Component.externalLibraries[name].reject = reject;
    });

    const callbackName = `${name}Callback`;

    if (!polling && !window[callbackName]) {
      window[callbackName] = function() {
        this.resolve();
      }.bind(Component.externalLibraries[name]);
    }
    // See if the plugin already exists.
    const plugin = getScriptPlugin(property);
    if (plugin) {
      Component.externalLibraries[name].resolve(plugin);
    }
    else {
      src = Array.isArray(src) ? src : [src];
      src.forEach((lib) => {
        let attrs = {};
        let elementType = '';
        if (typeof lib === 'string') {
          lib = {
            type: 'script',
            src: lib
          };
        }
        switch (lib.type) {
          case 'script':
            elementType = 'script';
            attrs = {
              src: lib.src,
              type: 'text/javascript',
              defer: true,
              async: true
            };
            break;
          case 'styles':
            elementType = 'link';
            attrs = {
              href: lib.src,
              rel: 'stylesheet'
            };
            break;
        }

        // Add the script to the top page.
        const script = document.createElement(elementType);
        for (const attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }
        document.getElementsByTagName('head')[0].appendChild(script);
      });

      // if no callback is provided, then check periodically for the script.
      if (polling) {
        setTimeout(function checkLibrary() {
          const plugin = getScriptPlugin(property);
          if (plugin) {
            Component.externalLibraries[name].resolve(plugin);
          }
          else {
            // check again after 200 ms.
            setTimeout(checkLibrary, 200);
          }
        }, 200);
      }
    }
  }
  return Component.externalLibraries[name].ready;
};

Component.libraryReady = function(name) {
  if (
    Component.externalLibraries.hasOwnProperty(name) &&
    Component.externalLibraries[name].ready
  ) {
    return Component.externalLibraries[name].ready;
  }

  return Promise.reject(`${name} library was not required.`);
};
