/* globals Quill, ClassicEditor, CKEDITOR */
import { conformToMask } from '@formio/vanilla-text-mask';
import tippy from 'tippy.js';
import _ from 'lodash';
import isMobile from 'ismobilejs';
import { processOne, processOneSync, validateProcessInfo } from '@formio/core/process';

import { Formio } from '../../../Formio';
import * as FormioUtils from '../../../utils/utils';
import {
  fastCloneDeep, boolValue, getComponentPath, isInsideScopingComponent, currentTimezone
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
   * @returns {object}
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
     * The data path to this specific component instance.
     * @type {string}
     */
    this.path = component?.key || '';

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

    this.options.name = this.options.name || 'data';

    this._path = '';

    // Needs for Nextgen Rules Engine
    this.resetCaches();

    /**
     * Determines if this component is visible, or not.
     */
    this._parentVisible = this.options.hasOwnProperty('parentVisible') ? this.options.parentVisible : true;
    this._visible = this._parentVisible && this.conditionallyVisible(null, data);
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
        if (this.visible || !this.component.clearOnHide) {
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
    if (this.localRoot?.childComponentsMap) {
      return this.localRoot.childComponentsMap;
    }
    const localMap = {};
    localMap[this.path] = this;
    return localMap;
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
    this._visible = this.conditionallyVisible(null, null);
    if (this.component.addons?.length) {
      this.component.addons.forEach((addon) => this.createAddon(addon));
    }
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
   *
   * @param value {boolean}
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
      this.clearOnHide();
      this.redraw();
    }
  }

  /**
   *
   * @returns {boolean}
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
   * @param schema
   * @param defaultSchema
   * @param recursion
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
   */
  get schema() {
    return fastCloneDeep(this.getModifiedSchema(_.omit(this.component, 'id'), this.defaultSchema));
  }

  /**
   * Returns true if component is inside DataGrid
   */
  get isInDataGrid() {
    return this.inDataGrid;
  }

  /**
   * Translate a text using the i18n system.
   * @param {string} text - The i18n identifier.
   * @param {object} params - The i18n parameters to use for translation.
   * @param {...any} args
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

  renderTemplate(name, data = {}, modeOption) {
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
   * @param string
   * @param dirty
   * @param forceSanitize
   * @param options
   * @returns {*}
   */
  sanitize(dirty, forceSanitize, options) {
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
   * @param template
   * @param data
   * @param actions
   * @returns {HTMLElement | string} - The created element or an empty string if template is not specified.
   */
  renderString(template, data) {
    if (!template) {
      return '';
    }
    // Interpolate the template and populate
    return this.interpolate(template, data);
  }

  performInputMapping(input) {
    return input;
  }

  get widget() {
    const settings = this.component.widget;

    if (settings && this.root?.shadowRoot) {
      settings.shadowRoot = this.root.shadowRoot;
    }

    const widget = settings && Widgets[settings.type] ? new Widgets[settings.type](settings, this.component, this): null;
    return widget;
  }

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
   * Called before a next and previous page is triggered allowing the components
   * to perform special functions.
   * @returns {*}
   */
  beforePage() {
    return Promise.resolve(true);
  }

  beforeNext() {
    return this.beforePage(true);
  }

  /**
   * Called before a submission is triggered allowing the components
   * to perform special async functions.
   * @returns {*}
   */
  beforeSubmit() {
    return Promise.resolve(true);
  }

  /**
   * Return the submission timezone.
   * @returns {*}
   */
  get submissionTimezone() {
    this.options.submissionTimezone = this.options.submissionTimezone || _.get(this.root, 'options.submissionTimezone');
    return this.options.submissionTimezone;
  }

  get timezone() {
    return this.getTimezone(this.component);
  }

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

  setOpenModalElement(template) {
    this.componentModal.setOpenModalElement(template || this.getModalPreviewTemplate());
  }

  getModalPreviewTemplate() {
    const dataValue = this.component.type === 'password' ? this.dataValue.replace(/./g, '•') : this.dataValue;
    let modalLabel;

    if (this.hasInput && this.component.validate?.required && !this.isPDFReadOnlyMode) {
      modalLabel = { className: 'field-required' };
    }

    return this.renderTemplate('modalPreview', {
      previewText: this.getValueAsString(dataValue, { modalPreview: true }) || this.t('Click to set value'),
      messages: '',
      labelInfo: modalLabel,
    });
  }

  build(element) {
    element = element || this.element;
    this.empty(element);
    this.setContent(element, this.render());
    return this.attach(element);
  }

  get hasModalSaveButton() {
    return true;
  }

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

  attachTooltips(toolTipsRefs) {
    toolTipsRefs?.forEach((tooltip, index) => {
      if (tooltip) {
        const tooltipAttribute = tooltip.getAttribute('data-tooltip');
        const tooltipDataTitle = tooltip.getAttribute('data-title');
        const tooltipText = this.interpolate(tooltipDataTitle || tooltipAttribute)
                                .replace(/(?:\r\n|\r|\n)/g, '<br />');

        this.tooltips[index] = tippy(tooltip, {
          allowHTML: true,
          trigger: 'mouseenter click focus',
          placement: 'right',
          zIndex: 10000,
          interactive: true,
          content: this.t(this.sanitize(tooltipText), { _userInput: true }),
        });
      }
    });
  }

  createComponentModal(element, modalShouldBeOpened, currentValue) {
    return new ComponentModal(this, element, modalShouldBeOpened, currentValue, this._referenceAttributeName);
  }

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

  restoreFocus() {
    const isFocused = this.root?.focusedComponent?.path === this.path;
    if (isFocused) {
      this.loadRefs(this.element, { input: 'multiple' });
      this.focus(this.root.currentSelection?.index);
      this.restoreCaretPosition();
    }
  }

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
      if (typeof ref === NodeList) {
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
      (changePath && getComponentPath(changed.instance) === refreshData) && changed && changed.instance &&
      // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
      // in fields inside EditGrids could alter their state from other rows (which is bad).
      this.inContext(changed.instance)
    ) {
      this.refresh(changed.value, changed, flags);
    }
  }

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
   * @param value
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
   * @param component
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

  get viewOnly() {
    return this.options.readOnly && this.options.viewAsHtml;
  }

  setElement(element) {
    if (this.element) {
      delete this.element.component;
      delete this.element;
    }
    this.element = element;
  }

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

  get defaultViewOnlyValue() {
    return '-';
  }

  /**
   * Uses the widget to determine the output string.
   * @param value
   * @param options
   * @returns {*}
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

  getView(value, options) {
    if (this.component.protected) {
      return '--- PROTECTED ---';
    }
    return this.getValueAsString(value, options);
  }

  updateItems(...args) {
    this.restoreValue();
    this.onChange(...args);
  }

  /**
   * @param {*} data
   * @param {boolean} [forceUseValue] - if true, return 'value' property of the data
   * @returns {*}
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

  itemValueForHTMLMode(value) {
    if (Array.isArray(value)) {
      const values = value.map(item => Array.isArray(item) ? this.itemValueForHTMLMode(item) : this.itemValue(item));

      return values.join(', ');
    }

    return this.itemValue(value);
  }

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

  static get serverConditionSettings() {
    return Component.conditionOperatorsSettings;
  }

  get isMobile() {
    return isMobile();
  }

  /**
   * Returns the outside wrapping element of this component.
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Create an evaluation context for all script executions and interpolations.
   * @param additional
   * @returns {*}
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
   * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
   */
  setPristine(pristine) {
    this.pristine = pristine;
  }

  get isPristine() {
    return this.pristine;
  }

  setDirty(dirty) {
    this.dirty = dirty;
  }

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

  iconClass(name, spinning) {
    const iconset = this.options.iconset || Templates.current.defaultIconset || 'fa';
    return Templates.current.hasOwnProperty('iconClass')
      ? Templates.current.iconClass(iconset, name, spinning)
      : this.options.iconset === 'fa' ? Templates.defaultTemplates.iconClass(iconset, name, spinning) : name;
  }

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

  get visibleErrors() {
    return this._visibleErrors;
  }

  get errors() {
    return this._errors;
  }

  /**
   * Returns the error label for this component.
   * @returns {*}
   */
  get errorLabel() {
    return this.t(this.component.errorLabel
      || this.component.label
      || this.component.placeholder
      || this.key);
  }

  /**
   * Get the error message provided a certain type of error.
   * @param type
   * @returns {*}
   */
  errorMessage(type) {
    return (this.component.errors && this.component.errors[type]) ? this.component.errors[type] :  type;
  }

  setContent(element, content, forceSanitize, sanitizeOptions) {
    if (element instanceof HTMLElement) {
      element.innerHTML = this.sanitize(content, forceSanitize, sanitizeOptions);
      return true;
    }
    return false;
  }

  restoreCaretPosition() {
    if (this.root?.currentSelection) {
      if (this.refs.input?.length) {
        const { selection, index } = this.root.currentSelection;
        let input = this.refs.input[index];
        const isInputRangeSelectable = (i) => /text|search|password|tel|url/i.test(i?.type || '');
        if (input) {
          if (isInputRangeSelectable(input)) {
            input.setSelectionRange(...selection);
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

  rebuild() {
    this.destroy();
    this.init();
    this.visible = this.conditionallyVisible(null, null);
    return this.redraw();
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.tooltips.forEach(tooltip => tooltip.destroy());
    this.tooltips = [];
  }

  hasClass(element, className) {
    if (!element) {
      return;
    }

    return super.hasClass(element, this.transform('class', className));
  }

  addClass(element, className) {
    if (!element) {
      return;
    }

    return super.addClass(element, this.transform('class', className));
  }

  removeClass(element, className) {
    if (!element) {
      return;
    }

    return super.removeClass(element, this.transform('class', className));
  }

  /**
   * Determines if this component has a condition defined.
   * @returns {null}
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
   * @param data
   * @param row
   * @returns {boolean}
   */
  conditionallyVisible(data, row) {
    data = data || this.rootValue;
    row = row || this.data;
    if (this.builderMode || this.previewMode || !this.hasCondition()) {
      return !this.component.hidden;
    }
    data = data || (this.root ? this.root.data : {});
    return this.checkCondition(row, data);
  }

  /**
   * Checks the condition of this component.
   *
   * TODO: Switch row and data parameters to be consistent with other methods.
   * @param row - The row contextual data.
   * @param data - The global data object.
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
   * @param data
   * @param flags
   * @param row
   */
  checkComponentConditions(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;

    if (!this.builderMode & !this.previewMode && this.fieldLogic(data, row)) {
      this.redraw();
    }

    // Check advanced conditions
    const visible = this.conditionallyVisible(data, row);

    if (this.visible !== visible) {
      this.visible = visible;
    }

    return visible;
  }

  /**
   * Checks conditions for this component and any sub components.
   * @param args
   * @param data
   * @param flags
   * @param row
   * @returns {boolean}
   */
  checkConditions(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    return this.checkComponentConditions(data, flags, row);
  }

  get logic() {
    return this.component.logic || [];
  }

  /**
   * Check all triggers and apply necessary actions.
   * @param data
   * @param row
   */
  fieldLogic(data, row) {
    data = data || this.rootValue;
    row = row || this.data;
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

  defineActionValue(action, argsObject) {
    return this.evaluate(
      action.value,
      argsObject,
      'value',
    );
  }

  applyActions(newComponent, actions, result, row, data) {
    data = data || this.rootValue;
    row = row || this.data;

    return actions.reduce((changed, action) => {
      switch (action.type) {
        case 'property': {
          FormioUtils.setActionProperty(newComponent, action, result, row, data, this);

          const property = action.property.value;
          if (!_.isEqual(_.get(this.component, property), _.get(newComponent, property))) {
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

          if (!_.isEqual(oldValue, newValue) && !(this.component.clearOnHide && !this.visible)) {
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

          if (!_.isEqual(oldValue, newValue) && !(this.component.clearOnHide && !this.visible)) {
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
   * @param message
   * @param dirty
   * @param messages
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
        if (message.message && typeof message.message === 'string') {
          message.message = message.message.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
        }
        return this.renderTemplate('message', { ...message });
      }
      ).join(''));
    }
  }

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

  clearOnHide() {
    // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
    if (
      // if change happens inside EditGrid's row, it doesn't trigger change on the root level, so rootPristine will be true
      (!this.rootPristine || this.options.server || isInsideScopingComponent(this)) &&
      this.component.clearOnHide !== false &&
      !this.options.readOnly &&
      !this.options.showHiddenFields
    ) {
      if (!this.visible) {
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

  triggerRootChange(...args) {
    if (this.options.onChange) {
      this.options.onChange(...args);
    }
    else if (this.root && this.root.triggerChange) {
      this.root.triggerChange(...args);
    }
  }

  onChange(flags, fromRoot) {
    flags = flags || {};
    if (flags.modified) {
      if (!flags.noPristineChangeOnModified) {
        this.pristine = false;
      }
      this.addClass(this.getElement(), 'formio-modified');
    }

    // If we are supposed to validate on blur, then don't trigger validation yet.
    if (this.component.validateOn === 'blur') {
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
   * @returns {null}
   */
  get emptyValue() {
    return null;
  }

  /**
   * Returns if this component has a value set.
   * @param data
   */
  hasValue(data) {
    return !_.isUndefined(_.get(data || this.data, this.key));
  }

  /**
   * Get the data value at the root level.
   * @returns {*}
   */
  get rootValue() {
    return this.root ? this.root.data : this.data;
  }

  get rootPristine() {
    return _.get(this, 'root.pristine', false);
  }

  /**
   * Get the static value of this component.
   * @returns {*}
   */
  get dataValue() {
    if (
      !this.key ||
      (!this.visible && this.component.clearOnHide && !this.rootPristine)
    ) {
      return this.emptyValue;
    }
    if (!this.hasValue() && this.shouldAddDefaultValue) {
      const empty = this.component.multiple ? [] : this.emptyValue;
      if (!this.rootPristine) {
        this.dataValue = empty;
      }
      return empty;
    }
    return _.get(this._data, this.key);
  }

  /**
   * Sets the static value of this component.
   * @param value
   */
  set dataValue(value) {
    if (
      !this.allowData ||
      !this.key ||
      (!this.visible && this.component.clearOnHide && !this.rootPristine)
    ) {
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
   * @param index
   * @param flags
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
        { value: '' },
        'value'
      );
    }
    return defaultValue;
  }

  get shouldAddDefaultValue() {
    return !this.options.noDefaults || (this.component.defaultValue && !this.isEmpty(this.component.defaultValue)) || this.component.customDefaultValue;
  }

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
   * @returns {*}
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
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    const input = this.performInputMapping(this.refs.input[index]);
    return input ? input.value : undefined;
  }

  /**
   * Set the value of this component.
   * @param value
   * @param flags
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
        this.setValueAt(i, isArray ? value[i] : value, flags);
      }
    }
    return changed;
  }

  /**
   * Set the value at a specific index.
   * @param index
   * @param value
   * @param flags
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
   * @param value
   * @returns {*}
   */
  normalizeValue(value) {
    if (this.component.multiple && !Array.isArray(value)) {
      value = value ? [value] : [];
    }
    return value;
  }

  /**
   * Update a value of this component.
   * @param value
   * @param flags
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
   * @param args
   * @returns {boolean}
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
    this.setValue(this.emptyValue, {
      noUpdateEvent: true,
      noValidate: true,
      resetValue: true
    });
  }

  /**
   * Determine if the value of this component has changed.
   * @param newValue
   * @param oldValue
   * @returns {boolean}
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
   * @param flags
   * @param changed
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

  /**
   * Perform a calculated value operation.
   * @param data - The global data object.
   * @returns {boolean} - If the value changed during calculation.
   */

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
    const { clearOnHide } = this.component;
    const shouldBeCleared = !this.visible && clearOnHide;
    const allowOverride = _.get(this.component, 'allowCalculateOverride', false);

    if (shouldBeCleared) {
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
      if (!flags.noPristineChangeOnModified) {
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
   * @param args
   * @param data
   * @param flags
   * @param row
   * @returns {boolean}
   */
  calculateValue(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;
    return this.calculateComponentValue(data, flags, row);
  }

  /**
   * Get this component's label text.
   *
   */
  get label() {
    return this.component.label;
  }

  /**
   * Set this component's label text and render it.
   * @param value - The new label text.
   */
  set label(value) {
    this.component.label = value;
    if (this.labelElement) {
      this.labelElement.innerText = value;
    }
  }

  /**
   * Get FormioForm element at the root of this component tree.
   *
   */
  getRoot() {
    return this.root;
  }

  /**
   * Returns the invalid message, or empty string if the component is valid.
   * @param data
   * @param dirty
   * @param ignoreCondition
   * @param row
   * @returns {*}
   */
  invalidMessage(data, dirty, ignoreCondition, row) {
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
      path: this.path || this.component.key,
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
   * @param data
   * @param dirty
   * @returns {boolean}
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
   * @param {*} errors
   * @returns
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
   * @returns
   */
  showValidationErrors(errors, data, row, flags) {
    if (flags.silentCheck) {
      return [];
    }
    if (this.options.alwaysDirty) {
      flags.dirty = true;
    }
    if (flags.fromSubmission && this.hasValue(data)) {
      flags.dirty = true;
    }
    this.setDirty(flags.dirty);
    return this.setComponentValidity(errors, flags.dirty, flags.silentCheck, flags.fromSubmission);
  }

  /**
   * Perform a component validation.
   * @param {*} data - The root data you wish to use for this component.
   * @param {*} row - The contextual row data you wish to use for this component.
   * @param {*} flags - The flags to control the behavior of the validation.
   * @returns
   */
  validateComponent(data, row, flags = {}) {
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
      value: this.validationValue,
      path: this.path || this.component.key,
      instance: this,
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
   * @param data
   * @param dirty
   * @param row
   * @param flags
   * @param allErrors
   * @returns {boolean}
   */
  checkComponentValidity(data, dirty, row, flags = {}, allErrors = []) {
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
            _.remove(this.parent.childErrors, (err) => err.component.key === this.component.key);
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
          _.remove(this.parent.childErrors, (err) => err.component.key === this.component.key);
        }
      }
      return errors.length === 0;
    }
  }

  /**
   * Checks the validity of the component.
   * @param {*} data
   * @param {*} dirty
   * @param {*} row
   * @param {*} silentCheck
   * @param errors
   * @returns
   */
  checkValidity(data, dirty, row, silentCheck, errors = []) {
    data = data || this.rootValue;
    row = row || this.data;
    console.log('Deprecation warning:  Component.checkValidity() will be deprecated in 6.x version of renderer. Use Component.validateComponent instead.');
    return this.checkComponentValidity(data, dirty, row, { silentCheck }, errors);
  }

  checkAsyncValidity(data, dirty, row, silentCheck, errors = []) {
    console.log('Deprecation warning:  Component.checkAsyncValidity() will be deprecated in 6.x version of renderer. Use Component.validateComponent instead.');
    return this.checkComponentValidity(data, dirty, row, { async: true, silentCheck }, errors);
  }

  /**
   * Check the conditions, calculations, and validity of a single component and triggers an update if
   * something changed.
   * @param data - The root data of the change event.
   * @param flags - The flags from this change event.
   * @param row
   * @returns boolean - If component is valid or not.
   */
  checkData(data, flags, row) {
    data = data || this.rootValue;
    flags = flags || {};
    row = row || this.data;

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
   * @returns {boolean}
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
   * @returns {boolean|*}
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
    const { validateWhenHidden = false } = this.component || {};
    const forceValidOnHidden = (!this.visible || !this.checkCondition(row, data)) && !validateWhenHidden;
    if (forceValidOnHidden) {
      // If this component is forced valid when it is hidden, then we also need to reset the errors for this component.
      this._errors = [];
    }
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
      () => forceValidOnHidden
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
   * @param value
   */
  asString(value) {
    value = value || this.getValue();
    return (Array.isArray(value) ? value : [value]).map(_.toString).join(', ');
  }

  /**
   * Return if the component is disabled.
   * @returns {boolean}
   */
  get disabled() {
    return this._disabled || this.parentDisabled;
  }

  /**
   * Disable this component.
   * @param {boolean} disabled
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
              const visible = this.conditionallyVisible(null, null);
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

  scrollIntoView(element = this.element) {
    if (!element) {
      return;
    }
    const { left, top } = element.getBoundingClientRect();
    window.scrollTo(left + window.scrollX, top + window.scrollY);
  }

  focus(index) {
    if ('beforeFocus' in this.parent) {
      this.parent.beforeFocus(this);
    }

    if (this.refs.input?.length) {
      const focusingInput = typeof index === 'number' && this.refs.input[index]
        ? this.refs.input[index]
        : this.refs.input[this.refs.input.length - 1];

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
    const plugin = _.get(window, property);
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
          const plugin = _.get(window, property);
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
