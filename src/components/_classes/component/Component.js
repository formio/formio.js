/* globals Quill, ClassicEditor */
import { conformToMask } from 'vanilla-text-mask';
import NativePromise from 'native-promise-only';
import Tooltip from 'tooltip.js';
import _ from 'lodash';
import Formio from '../../../Formio';
import * as FormioUtils from '../../../utils/utils';
import Validator from '../../Validator';
import Templates from '../../../templates/Templates';
import { boolValue } from '../../../utils/utils';
import Element from '../../../Element';
const CKEDITOR = 'https://cdn.form.io/ckeditor/12.2.0/ckeditor.js';
const QUILL_URL = 'https://cdn.form.io/quill/1.3.6';
const ACE_URL = 'https://cdn.form.io/ace/1.4.5/ace.js';

/**
 * This is the Component class which all elements within the FormioForm derive from.
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
       * The default value of this compoennt.
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
       * The input label provided to this component.
       */
      label: '',
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
        strictDateValidation: false
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
      alwaysEnabled: false,
      showCharCount: false,
      showWordCount: false,
      properties: {},
      allowMultipleMasks: false
    }, ...sources);
  }

  /**
   * Provides a table view for this component. Override if you wish to do something different than using getView
   * method of your instance.
   *
   * @param value
   * @param options
   */
  /* eslint-disable no-unused-vars */
  static tableView(value, options) {}
  /* eslint-enable no-unused-vars */

  /**
   * Initialize a new Component.
   *
   * @param {Object} component - The component JSON you wish to initialize.
   * @param {Object} options - The options for this component.
   * @param {Object} data - The global data submission object this component will belong.
   */
  /* eslint-disable max-statements */
  constructor(component, options, data) {
    super(Object.assign({
      renderMode: 'form',
      attachMode: 'full'
    }, options || {}));

    // Save off the original component.
    this.originalComponent = _.cloneDeep(component);

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
    this.data = data || {};

    /**
     * The Form.io component JSON schema.
     * @type {*}
     */
    this.component = _.defaultsDeep(component || {} , this.defaultSchema);

    // Add the id to the component.
    this.component.id = this.id;

    /**
     * The existing error that this component has.
     * @type {string}
     */
    this.error = '';

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
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */
    this._disabled = boolValue(this.component.disabled) ? this.component.disabled : false;

    /**
     * Determines if this component is visible, or not.
     */
    this._visible = this.conditionallyVisible(data);
    this._parentVisible = this.options.hasOwnProperty('parentVisible') ? this.options.parentVisible : true;
    this._parentDisabled = false;

    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */
    this.pristine = true;

    /**
     * Points to the parent component.
     *
     * @type {Component}
     */
    this.parent = this.options.parent;

    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {Component}
     */
    this.root = this.options.root;

    this.options.name = this.options.name || 'data';

    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */
    this.validators = ['required', 'minLength', 'maxLength', 'minWords', 'maxWords', 'custom', 'pattern', 'json', 'mask'];

    /**
     * Used to trigger a new change in this component.
     * @type {function} - Call to trigger a change in this component.
     */
    let lastChanged = null;
    const _triggerChange = _.debounce((...args) => {
      if (this.root) {
        this.root.changing = false;
      }
      if (!args[1] && lastChanged) {
        // Set the changed component if one isn't provided.
        args[1] = lastChanged;
      }
      lastChanged = null;
      return this.onChange(...args);
    }, 100);
    this.triggerChange = (...args) => {
      if (args[1]) {
        // Make sure that during the debounce that we always track lastChanged component, even if they
        // don't provide one later.
        lastChanged = args[1];
      }
      if (this.root) {
        this.root.changing = true;
      }
      return _triggerChange(...args);
    };

    /**
     * Used to trigger a redraw event within this component.
     *
     * @type {Function}
     */
    this.triggerRedraw = _.debounce(this.redraw.bind(this), 100);

    /**
     * list of attached tooltips
     * @type {Array}
     */
    this.tooltips = [];

    // To force this component to be invalid.
    this.invalid = false;

    // Determine if the component has been built.
    this.isBuilt = false;

    if (this.component) {
      this.type = this.component.type;
      if (this.allowData && this.key) {
        this.options.name += `[${this.key}]`;
        // If component is visible or not set to clear on hide, set the default value.
        if (this.visible || !this.component.clearOnHide) {
          if (!this.hasValue()) {
            this.dataValue = this.defaultValue;
          }
          else {
            // Ensure the dataValue is set.
            this.dataValue = this.dataValue;
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

  // Allow componets to notify when ready.
  get ready() {
    return NativePromise.resolve(this);
  }

  get labelInfo() {
    const label = {};
    label.hidden = this.labelIsHidden();

    label.className = '';
    label.labelPosition = this.component.labelPosition;
    label.tooltipClass = `${this.iconClass('question-sign')} text-muted`;

    if (this.hasInput && this.component.validate && boolValue(this.component.validate.required)) {
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

    // Attach the refresh on events.
    this.attachRefreshOn();
  }

  destroy() {
    super.destroy();
    this.detach();
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
    if (this._parentVisible !== value) {
      this._parentVisible = value;
      this.clearOnHide();
      this.redraw();
    }
  }

  get parentVisible() {
    return this._parentVisible;
  }

  set parentDisabled(value) {
    if (this._parentDisabled !== value) {
      this._parentDisabled = value;
      this.clearOnHide();
      this.redraw();
    }
  }

  get parentDisabled() {
    return this._parentDisabled;
  }

  /**
   *
   * @param value {boolean}
   */
  set visible(value) {
    if (this._visible !== value) {
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
    if (this.builderMode || this.options.showHiddenFields) {
      return true;
    }
    if (
      this.options.hide &&
      this.options.hide[this.component.key]
    ) {
      return false;
    }
    if (
      this.options.show &&
      this.options.show[this.component.key]
    ) {
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

  /**
   * Returns only the schema that is different from the default.
   *
   * @param schema
   * @param defaultSchema
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
        if (val.length !== 0) {
          modified[key] = val;
        }
      }
      else if (
        (!recursion && (key === 'type')) ||
        (!recursion && (key === 'key')) ||
        (!recursion && (key === 'label')) ||
        (!recursion && (key === 'input')) ||
        (val !== '' && !defaultSchema.hasOwnProperty(key)) ||
        (val !== '' && val !== defaultSchema[key])
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
    return this.getModifiedSchema(_.omit(this.component, 'id'), this.defaultSchema);
  }

  /**
   * Translate a text using the i18n system.
   *
   * @param {string} text - The i18n identifier.
   * @param {Object} params - The i18n parameters to use for translation.
   */
  t(text, params) {
    if (!text) {
      return '';
    }
    params = params || {};
    params.data = this.rootValue;
    params.row = this.data;
    params.component = this.component;
    params.nsSeparator = '::';
    params.keySeparator = '.|.';
    params.pluralSeparator = '._.';
    params.contextSeparator = '._.';
    const translated = this.i18next.t(text, params);
    return translated || text;
  }

  labelIsHidden() {
    return !this.component.label ||
      (!this.inDataGrid && this.component.hideLabel) ||
      (this.inDataGrid && !this.component.dataGridLabel) ||
      this.options.inputsOnly;
  }

  get transform() {
    return Templates.current.hasOwnProperty('transform') ? Templates.current.transform.bind(Templates.current) : (type, value) => value;
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
      return `Unknown template: ${name}`;
    }

    const templateByMode = this.checkTemplateMode(templatesByName, modes);
    if (templateByMode) {
      return templateByMode;
    }

    return templatesByName.form;
  }

  checkTemplate(templates, names, modes) {
    for (const name of names) {
      const templatesByName = templates[name];

      if (templatesByName) {
        const templateByMode = this.checkTemplateMode(templatesByName, modes);
        if (templateByMode) {
          return templateByMode;
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

  renderTemplate(name, data = {}, modeOption) {
    // Need to make this fall back to form if renderMode is not found similar to how we search templates.
    const mode = modeOption || this.options.renderMode || 'form';

    data.component = this.component;
    data.self = this;
    data.options = this.options;
    data.readOnly = this.options.readOnly;
    data.iconClass = this.iconClass.bind(this);
    data.t = this.t.bind(this);
    data.transform = this.transform;
    data.id = data.id || this.id;
    data.key = data.key || this.key;
    data.value = data.value || this.dataValue;
    data.disabled = this.disabled;
    data.builder = this.builderMode;
    data.render = this.renderTemplate.bind(this);

    // Allow more specific template names
    const names = [
      `${name}-${this.component.type}-${this.key}`,
      `${name}-${this.component.type}`,
      `${name}-${this.key}`,
      `${name}`,
    ];

    // Allow template alters.
    // console.log(`render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`, data);
    return this.hook(
      `render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`,
      this.interpolate(this.getTemplate(names, mode), data),
      data,
      mode
    );
  }

  /**
   * Sanitize an html string.
   *
   * @param string
   * @returns {*}
   */
  sanitize(dirty) {
    return FormioUtils.sanitize(dirty, this.options);
  }

  /**
   * Render a template string into html.
   *
   * @param template
   * @param data
   * @param actions
   *
   * @return {HTMLElement} - The created element.
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
   *
   * @return {*}
   */
  beforePage() {
    return NativePromise.resolve(true);
  }

  beforeNext() {
    return this.beforePage(true);
  }

  /**
   * Called before a submission is triggered allowing the components
   * to perform special async functions.
   *
   * @return {*}
   */
  beforeSubmit() {
    return NativePromise.resolve(true);
  }

  /**
   * Return the submission timezone.
   *
   * @return {*}
   */
  get submissionTimezone() {
    this.options.submissionTimezone = this.options.submissionTimezone || _.get(this.root, 'options.submissionTimezone');
    return this.options.submissionTimezone;
  }

  get canDisable() {
    return !this.component.alwaysEnabled;
  }

  loadRefs(element, refs) {
    for (const ref in refs) {
      if (refs[ref] === 'single') {
        this.refs[ref] = element.querySelector(`[ref="${ref}"]`);
      }
      else {
        this.refs[ref] = element.querySelectorAll(`[ref="${ref}"]`);
      }
    }
  }

  build(element) {
    element = element || this.element;
    this.empty(element);
    this.setContent(element, this.render());
    return this.attach(element);
  }

  render(children = `Unknown component: ${this.component.type}`, topLevel = false) {
    const isVisible = this.visible;
    this.rendered = true;
    return this.renderTemplate('component', {
      visible: isVisible,
      id: this.id,
      classes: this.className,
      styles: this.customStyle,
      children
    }, topLevel);
  }

  attach(element) {
    this.attached = true;
    this.element = element;
    element.component = this;

    // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.
    if (this.element.id) {
      this.id = this.element.id;
    }

    this.loadRefs(element, {
      messageContainer: 'single',
      tooltip: 'multiple'
    });

    this.refs.tooltip.forEach((tooltip, index) => {
      const title = this.interpolate(tooltip.getAttribute('data-title') || this.t(this.component.tooltip)).replace(/(?:\r\n|\r|\n)/g, '<br />');
      this.tooltips[index] = new Tooltip(tooltip, {
        trigger: 'hover click',
        placement: 'right',
        html: true,
        title: title
      });
    });

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

    return NativePromise.resolve();
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
    this.refs = {};
    this.removeEventListeners();
    if (this.tooltip) {
      this.tooltip.dispose();
    }
  }

  attachRefreshEvent(refreshData) {
    this.on('change', (event) => {
      const changeKey = _.get(event, 'changed.component.key', false);
      // Don't let components change themselves.
      if (changeKey && this.key === changeKey) {
        return;
      }
      if (refreshData === 'data') {
        this.refresh(this.data);
      }
      else if (
        (changeKey && changeKey === refreshData) && event.changed && event.changed.instance &&
        // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
        // in fields inside EditGrids could alter their state from other rows (which is bad).
        this.inContext(event.changed.instance)
      ) {
        this.refresh(event.changed.value);
      }
    }, true);
  }

  attachRefreshOn() {
    const refreshOn = this.component.refreshOn || this.component.redrawOn;
    // If they wish to refresh on a value, then add that here.
    if (refreshOn) {
      if (Array.isArray(refreshOn)) {
        refreshOn.forEach(refreshData => {
          this.attachRefreshEvent(refreshData);
        });
      }
      else {
        this.attachRefreshEvent(refreshOn);
      }
    }
  }

  /**
   * Refreshes the component with a new value.
   *
   * @param value
   */
  refresh(value) {
    if (this.hasOwnProperty('refreshOnValue')) {
      this.refreshOnChanged = !_.isEqual(value, this.refreshOnValue);
    }
    else {
      this.refreshOnChanged = true;
    }
    this.refreshOnValue = value;
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
   *
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

  createViewOnlyElement() {
    this.element = this.ce('dl', {
      id: this.id
    });

    if (this.element) {
      // Ensure you can get the component info from the element.
      this.element.component = this;
    }

    return this.element;
  }

  get defaultViewOnlyValue() {
    return '-';
  }

  getValueAsString(value) {
    if (!value) {
      return '';
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    if (_.isPlainObject(value)) {
      return JSON.stringify(value);
    }
    return value.toString();
  }

  getView(value) {
    if (this.component.protected) {
      return '--- PROTECTED ---';
    }
    return this.getValueAsString(value);
  }

  updateItems(...args) {
    this.restoreValue();
    this.onChange(...args);
  }

  createModal(element) {
    const dialog = this.ce('div');
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

    this.addEventListener(dialog.refs.dialogOverlay, 'click', close);
    this.addEventListener(dialog.refs.dialogClose, 'click', close);

    return dialog;
  }

  /**
   * Retrieves the CSS class name of this component.
   * @returns {string} - The class name of this component.
   */
  get className() {
    let className = this.hasInput ? 'form-group has-feedback ' : '';
    className += `formio-component formio-component-${this.component.type} `;
    if (this.key) {
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
    return className;
  }

  /**
   * Build the custom style from the layout values
   * @return {string} - The custom style
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
   * Returns the outside wrapping element of this component.
   * @returns {HTMLElement}
   */
  getElement() {
    return this.element;
  }

  /**
   * Create an evaluation context for all script executions and interpolations.
   *
   * @param additional
   * @return {*}
   */
  evalContext(additional) {
    return super.evalContext(Object.assign({
      component: this.component,
      row: this.data,
      rowIndex: this.rowIndex,
      data: this.rootValue,
      submission: (this.root ? this.root._submission : {}),
      form: this.root ? this.root._form : {},
    }, additional));
  }

  /**
   * Sets the pristine flag for this component.
   *
   * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
   */
  setPristine(pristine) {
    this.pristine = pristine;
  }

  /**
   * Removes a value out of the data array and rebuild the rows.
   * @param {number} index - The index of the data element to remove.
   */
  removeValue(index) {
    this.splice(index);
    this.redraw();
    this.restoreValue();
    if (this.root) {
      this.root.onChange();
    }
  }

  iconClass(name, spinning) {
    const iconset = this.options.iconset || Templates.current.defaultIconset || 'fa';
    return Templates.current.hasOwnProperty('iconClass') ? Templates.current.iconClass(iconset, name, spinning) : name;
  }

  /**
   * The readible name for this component.
   * @returns {string} - The name of the component.
   */
  get name() {
    return this.t(this.component.label || this.component.placeholder || this.key);
  }

  /**
   * Returns the error label for this component.
   * @return {*}
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
   * @return {*}
   */
  errorMessage(type) {
    return (this.component.errors && this.component.errors[type]) ? this.component.errors[type] :  type;
  }

  setContent(element, content) {
    if (element instanceof HTMLElement) {
      element.innerHTML = this.sanitize(content);
      return true;
    }
    return false;
  }

  redraw() {
    // Don't bother if we have not built yet.
    if (!this.element || !this.element.parentNode) {
      // Return a non-resolving promise.
      return NativePromise.resolve();
    }
    this.clear();
    // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.
    const parent = this.element.parentNode;
    const index = Array.prototype.indexOf.call(parent.children, this.element);
    this.element.outerHTML = this.sanitize(this.render());
    this.element = parent.children[index];
    return this.attach(this.element);
  }

  rebuild() {
    this.destroy();
    this.init();
    return this.redraw();
  }

  removeEventListeners() {
    super.removeEventListeners();
    this.tooltips.forEach(tooltip => tooltip.dispose());
    this.tooltips = [];
    this.refs.input = [];
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
   *
   * @return {null}
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
   *
   * @param data
   * @return {boolean}
   */
  conditionallyVisible(data) {
    data = data || this.rootValue;
    if (this.builderMode || !this.hasCondition()) {
      return !this.component.hidden;
    }
    data = data || (this.root ? this.root.data : {});
    return this.checkCondition(null, data);
  }

  /**
   * Checks the condition of this component.
   *
   * @param row - The row contextual data.
   * @param data - The global data object.
   * @return {boolean} - True if the condition applies to this component.
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
   */
  checkComponentConditions(data) {
    data = data || this.rootValue;

    // Check advanced conditions
    const visible = this.conditionallyVisible(data);
    if (!this.builderMode && this.fieldLogic(data)) {
      this.redraw();
    }

    if (this.visible !== visible) {
      this.visible = visible;
    }

    return visible;
  }

  /**
   * Checks conditions for this component and any sub components.
   * @param args
   * @return {boolean}
   */
  checkConditions(...args) {
    return this.checkComponentConditions(...args);
  }

  get logic() {
    return this.component.logic || [];
  }

  /**
   * Check all triggers and apply necessary actions.
   *
   * @param data
   */
  fieldLogic(data) {
    data = data || this.rootValue;
    const logics = this.logic;

    // If there aren't logic, don't go further.
    if (logics.length === 0) {
      return;
    }

    const newComponent = _.cloneDeep(this.originalComponent);

    let changed = logics.reduce((changed, logic) => {
      const result = FormioUtils.checkTrigger(
        newComponent,
        logic.trigger,
        this.data,
        data,
        this.root ? this.root._form : {},
        this
      );

      if (result) {
        changed |= this.applyActions(logic.actions, result, data, newComponent);
      }
      return changed;
    }, false);

    // If component definition changed, replace and mark as changed.
    if (!_.isEqual(this.component, newComponent)) {
      this.component = newComponent;
      // If disabled changed, be sure to distribute the setting.
      this.disabled = this.shouldDisabled;
      changed = true;
    }

    return changed;
  }

  applyActions(actions, result, data, newComponent) {
    return actions.reduce((changed, action) => {
      switch (action.type) {
        case 'property':
          FormioUtils.setActionProperty(newComponent, action, this.data, data, newComponent, result, this);
          if (!_.isEqual(this, newComponent)) {
            changed = true;
          }
          break;
        case 'value': {
          const oldValue = this.getValue();
          const newValue = this.evaluate(
            action.value,
            {
              value: _.clone(oldValue),
              data,
              component: newComponent,
              result
            },
            'value'
          );
          if (!_.isEqual(oldValue, newValue)) {
            this.setValue(newValue);
            changed = true;
          }
          break;
        }
        case 'validation':
          // TODO
          break;
      }
      return changed;
    }, false);
  }

  addInputWarning(message, dirty, elements) {
    if (!message) {
      return;
    }

    if (this.refs.messageContainer) {
      this.setContent(this.refs.messageContainer, this.renderTemplate('warning', {
        message
      }));
    }

    elements
      .forEach((input) => this.addClass(this.performInputMapping(input), 'is-warning'));

    if (dirty && this.options.highlightErrors) {
      this.addClass(this.element, 'formio-error-wrapper');
    }
    else {
      this.addClass(this.element, 'has-error');
    }
  }

  /**
   * Add a new input error to this element.
   *
   * @param message
   * @param dirty
   */
  addInputError(message, dirty, elements) {
    if (!message) {
      return;
    }

    if (this.refs.messageContainer) {
      this.setContent(this.refs.messageContainer, this.renderTemplate('message', {
        message
      }));
    }

    // Add error classes
    elements.forEach((input) => this.addClass(this.performInputMapping(input), 'is-invalid'));

    if (dirty && this.options.highlightErrors) {
      this.addClass(this.element, 'formio-error-wrapper');
    }
    else {
      this.addClass(this.element, 'has-error');
    }
  }

  clearOnHide() {
    // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
    if (
      !this.rootPristine &&
      this.component.clearOnHide !== false &&
      !this.options.readOnly &&
      !this.options.showHiddenFields
    ) {
      if (!this.visible) {
        this.deleteValue();
      }
      else if (!this.hasValue()) {
        // If shown, ensure the default is set.
        this.setValue(this.defaultValue, {
          noUpdateEvent: true
        });
      }
    }
  }

  onChange(flags, fromRoot) {
    flags = flags || {};
    if (flags.modified) {
      this.pristine = false;
      this.addClass(this.getElement(), 'formio-modified');
    }

    // If we are supposed to validate on blur, then don't trigger validation yet.
    if (this.component.validateOn === 'blur' && !this.errors.length) {
      flags.noValidate = true;
    }

    if (this.component.onChange) {
      this.evaluate(this.component.onChange);
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

    // Bubble this change up to the top.
    if (this.root && !fromRoot) {
      this.root.triggerChange(flags, changed);
    }
    return changed;
  }

  get wysiwygDefault() {
    return {
      theme: 'snow',
      placeholder: this.t(this.component.placeholder),
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
    };
  }

  addCKE(element, settings, onChange) {
    settings = _.isEmpty(settings) ? {} : settings;
    settings.base64Upload = true;
    settings.mediaEmbed = { previewsInData: true };
    settings.image = {
      toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
      styles: ['full', 'alignLeft', 'alignCenter', 'alignRight']
    };
    return Formio.requireLibrary('ckeditor', 'ClassicEditor', CKEDITOR, true)
      .then(() => {
        if (!element.parentNode) {
          return NativePromise.reject();
        }
        return ClassicEditor.create(element, settings).then(editor => {
          editor.model.document.on('change', () => onChange(editor.data.get()));
          return editor;
        });
      });
  }

  addQuill(element, settings, onChange) {
    settings = _.isEmpty(settings) ? this.wysiwygDefault : settings;

    // Lazy load the quill css.
    if (!settings.theme) {
      settings.theme = 'snow';
    }
    Formio.requireLibrary(`quill-css-${settings.theme}`, 'Quill', [
      { type: 'styles', src: `${QUILL_URL}/quill.${settings.theme}.css` }
    ], true);

    // Lazy load the quill library.
    return Formio.requireLibrary('quill', 'Quill', `${QUILL_URL}/quill.min.js`, true)
      .then(() => {
        if (!element.parentNode) {
          return NativePromise.reject();
        }
        this.quill = new Quill(element, settings);

        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
        const txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');
        this.quill.addContainer('ql-custom').appendChild(txtArea);
        const qlSource = element.parentNode.querySelector('.ql-source');
        if (qlSource) {
          this.addEventListener(qlSource, 'click', (event) => {
            event.preventDefault();
            if (txtArea.style.display === 'inherit') {
              this.quill.setContents(this.quill.clipboard.convert(txtArea.value));
            }
            txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/

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
  }

  addAce(element, settings, onChange) {
    return Formio.requireLibrary('ace', 'ace', ACE_URL, true)
      .then((editor) => {
        editor = editor.edit(element);
        editor.removeAllListeners('change');
        editor.setOptions({
          maxLines: 12,
          minLines: 12
        });
        editor.getSession().setTabSize(2);
        editor.getSession().setMode(`ace/mode/${settings.mode}`);
        editor.on('change', () => onChange(editor.getValue()));
        return editor;
      });
  }

  /**
   * The empty value for this component.
   *
   * @return {null}
   */
  get emptyValue() {
    return null;
  }

  /**
   * Returns if this component has a value set.
   *
   */
  hasValue(data) {
    return _.has(data || this.data, this.key);
  }

  /**
   * Get the data value at the root level.
   *
   * @return {*}
   */
  get rootValue() {
    return this.root ? this.root.data : this.data;
  }

  get rootPristine() {
    return _.get(this, 'root.pristine', false);
  }

  /**
   * Get the static value of this component.
   * @return {*}
   */
  get dataValue() {
    if (
      !this.key ||
      (!this.visible && this.component.clearOnHide && !this.rootPristine)
    ) {
      return this.emptyValue;
    }
    if (!this.hasValue()) {
      const empty = this.component.multiple ? [] : this.emptyValue;
      if (!this.rootPristine) {
        this.dataValue = empty;
      }
      return empty;
    }
    return _.get(this.data, this.key);
  }

  /**
   * Sets the static value of this component.
   *
   * @param value
   */
  set dataValue(value) {
    if (
      !this.key ||
      (!this.visible && this.component.clearOnHide && !this.rootPristine)
    ) {
      return value;
    }
    if ((value === null) || (value === undefined)) {
      _.unset(this.data, this.key);
      return value;
    }
    _.set(this.data, this.key, value);
    return value;
  }

  /**
   * Splice a value from the dataValue.
   *
   * @param index
   */
  splice(index) {
    if (this.hasValue()) {
      const dataValue = this.dataValue || [];
      if (_.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
        dataValue.splice(index, 1);
        this.dataValue = dataValue;
        this.triggerChange();
      }
    }
  }

  /**
   * Deletes the value of the component.
   */
  deleteValue() {
    this.setValue(null, {
      noUpdateEvent: true,
      noDefault: true
    });
    _.unset(this.data, this.key);
  }

  get defaultValue() {
    let defaultValue = this.emptyValue;
    if (this.component.defaultValue) {
      defaultValue = this.component.defaultValue;
    }
    if (this.component.customDefaultValue && !this.options.preview) {
      defaultValue = this.evaluate(
        this.component.customDefaultValue,
        { value: '' },
        'value'
      );
    }

    if (this.defaultMask) {
      if (typeof defaultValue === 'string') {
        defaultValue = conformToMask(defaultValue, this.defaultMask).conformedValue;
        if (!FormioUtils.matchInputMask(defaultValue, this.defaultMask)) {
          defaultValue = '';
        }
      }
      else {
        defaultValue = '';
      }
    }

    // Clone so that it creates a new instance.
    return _.clone(defaultValue);
  }

  /**
   * Get the input value of this component.
   *
   * @return {*}
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
   *
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    const input = this.performInputMapping(this.refs.input[index]);
    return input ? input.value : undefined;
  }

  /**
   * Set the value of this component.
   *
   * @param value
   * @param flags
   *
   * @return {boolean} - If the value changed.
   */
  setValue(value, flags) {
    const changed = this.updateValue(value, flags);
    value = this.dataValue;
    if (!this.hasInput) {
      return changed;
    }
    const isArray = Array.isArray(value);
    if (isArray && this.refs.input && this.refs.input.length !== value.length) {
      this.redraw();
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
   *
   * @param index
   * @param value
   */
  setValueAt(index, value, flags) {
    flags = flags || {};
    if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
      value = this.defaultValue;
    }
    const input = this.performInputMapping(this.refs.input[index]);
    if (input.mask) {
      input.mask.textMaskInputElement.update(value);
    }
    else {
      input.value = value;
    }
  }

  get hasSetValue() {
    return this.hasValue() && !this.isEmpty(this.dataValue);
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
      const defaultValue = this.component.multiple ? [] : this.defaultValue;
      if (defaultValue) {
        this.setValue(defaultValue, {
          noUpdateEvent: true
        });
      }
    }
  }

  /**
   * Normalize values coming into updateValue.
   *
   * @param value
   * @return {*}
   */
  normalizeValue(value) {
    if (this.component.multiple && !Array.isArray(value)) {
      value = value ? [value] : [];
    }
    return value;
  }

  /**
   * Update a value of this component.
   *
   * @param flags
   */
  updateComponentValue(value, flags) {
    flags = flags || {};
    let newValue = (value === undefined || value === null) ? this.getValue() : value;
    newValue = this.normalizeValue(newValue);
    const changed = (newValue !== undefined) ? this.hasChanged(newValue, this.dataValue) : false;
    if (changed) {
      this.dataValue = newValue;
      this.updateOnChange(flags, changed);
    }
    return changed;
  }

  /**
   * Updates the value of this component plus all sub-components.
   *
   * @param args
   * @return {boolean}
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
    this.setValue(this.emptyValue, { noUpdateEvent: true, noValidate: true });
    _.unset(this.data, this.key);
  }

  /**
   * Determine if the value of this component has changed.
   *
   * @param newValue
   * @param oldValue
   * @return {boolean}
   */
  hasChanged(newValue, oldValue) {
    if (
      ((newValue === undefined) || (newValue === null)) &&
      ((oldValue === undefined) || (oldValue === null) || this.isEmpty(oldValue))
    ) {
      return false;
    }
    return !_.isEqual(newValue, oldValue);
  }

  /**
   * Update the value on change.
   *
   * @param flags
   * @param changed
   */
  updateOnChange(flags = {}, changed) {
    if (!flags.noUpdateEvent && changed) {
      this.triggerChange(flags);
      return true;
    }
    return false;
  }

  /**
   * Perform a calculated value operation.
   *
   * @param data - The global data object.
   *
   * @return {boolean} - If the value changed during calculation.
   */
  calculateComponentValue(data, flags) {
    // If no calculated value or
    // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
    if (!this.component.calculateValue || ((!this.visible || this.component.hidden) && this.component.clearOnHide && !this.rootPristine)) {
      return false;
    }

    // Skip this operation if this component allows modification and it is no longer pristine.
    if (this.component.allowCalculateOverride && !this.pristine) {
      return false;
    }

    // Calculate the new value.
    return this.setValue(this.evaluate(this.component.calculateValue, {
      value: this.dataValue,
      data
    }, 'value'), flags);
  }

  /**
   * Performs calculations in this component plus any child components.
   *
   * @param args
   * @return {boolean}
   */
  calculateValue(...args) {
    return this.calculateComponentValue(...args);
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
   *
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
   *
   * @param data
   * @param dirty
   * @return {*}
   */
  invalidMessage(data, dirty, ignoreCondition) {
    if (!ignoreCondition && !this.checkCondition(null, data)) {
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

    return Validator.check(this, data);
  }

  /**
   * Returns if the component is valid or not.
   *
   * @param data
   * @param dirty
   * @return {boolean}
   */
  isValid(data, dirty) {
    return !this.invalidMessage(data, dirty);
  }

  /**
   * Checks the validity of this component and sets the error message if it is invalid.
   *
   * @param data
   * @param dirty
   * @param rowData
   * @return {boolean}
   */
  checkComponentValidity(data, dirty, rowData) {
    if (this.shouldSkipValidation(data, dirty, rowData)) {
      this.setCustomValidity('');
      return true;
    }

    const error = Validator.check(this, data);
    if (error && (dirty || !this.pristine)) {
      const message = this.invalidMessage(data, dirty, true);
      this.setCustomValidity(message, dirty);
    }
    else {
      this.setCustomValidity('');
    }
    return !error;
  }

  checkValidity(...args) {
    return this.checkComponentValidity(...args);
  }

  /**
   * Check the conditions, calculations, and validity of a single component and triggers an update if
   * something changed.
   *
   * @param data - The contextual data of the change event.
   * @param flags - The flags from this change event.
   *
   * @return boolean - If component is valid or not.
   */
  checkData(data, flags) {
    flags = flags || {};
    if (flags.noCheck) {
      return true;
    }
    this.calculateComponentValue(data);
    this.checkComponentConditions(data);
    return flags.noValidate ? true : this.checkComponentValidity(data);
  }

  get validationValue() {
    return this.dataValue;
  }

  isEmpty(value = this.dataValue) {
    return value == null || value.length === 0 || _.isEqual(value, this.emptyValue);
  }

  isEqual(valueA, valueB = this.dataValue) {
    return (this.isEmpty(valueA) && this.isEmpty(valueB)) || _.isEqual(valueA, valueB);
  }

  /**
   * Check if a component is eligible for multiple validation
   *
   * @return {boolean}
   */
  validateMultiple(value) {
    return this.component.multiple && Array.isArray(value);
  }

  get errors() {
    return this.error ? [this.error] : [];
  }

  clearErrorClasses() {
    this.removeClass(this.element, 'formio-error-wrapper');
    this.removeClass(this.element, 'alert alert-danger');
    this.removeClass(this.element, 'alert alert-warning');
    this.removeClass(this.element, 'has-error');
  }

  setCustomValidity(message, dirty, external, isWarning = false) {
    if (message) {
      if (this.refs.messageContainer) {
        this.empty(this.refs.messageContainer);
      }
      this.error = {
        component: this.component,
        message: message,
        external: !!external,
      };
      this.emit('componentError', this.error);
      if (this.refs.input) {
        if (isWarning) {
          this.addInputWarning(message, dirty, this.refs.input);
        }
        else {
          this.addInputError(message, dirty, this.refs.input);
        }
      }
    }
    else if (this.error && this.error.external === !!external) {
      if (this.refs.messageContainer) {
        this.empty(this.refs.messageContainer);
      }
      this.error = null;
      if (this.refs.input) {
        this.refs.input.forEach((input) => this.removeClass(this.performInputMapping(input), 'is-invalid'));
        this.refs.input.forEach((input) => this.removeClass(this.performInputMapping(input), 'is-warning'));
      }
      this.clearErrorClasses();
    }

    if (!this.refs.input) {
      return;
    }
    this.refs.input.forEach(input => {
      input = this.performInputMapping(input);
      if (typeof input.setCustomValidity === 'function') {
        input.setCustomValidity(message, dirty);
      }
    });
  }

  shouldSkipValidation(data, dirty, rowData) {
    const rules = [
      // Force valid if component is hidden.
      () => !this.visible,
      // Force valid if component is conditionally hidden.
      () => !this.checkCondition(rowData, data)
    ];

    return rules.some(pred => pred());
  }

  // Maintain reverse compatibility.
  whenReady() {
    console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
    return this.dataReady;
  }

  get dataReady() {
    return NativePromise.resolve();
  }

  /**
   * Prints out the value of this component as a string value.
   */
  asString(value) {
    value = value || this.getValue();
    return (Array.isArray(value) ? value : [value]).map(_.toString).join(', ');
  }

  /**
   * Return if the component is disabled.
   * @return {boolean}
   */
  get disabled() {
    return this._disabled || this.parentDisabled;
  }

  /**
   * Disable this component.
   *
   * @param {boolean} disabled
   */
  set disabled(disabled) {
    // Do not allow a component to be disabled if it should be always...
    if (disabled && !this.canDisable) {
      return;
    }

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

  attachLogic() {
    this.logic.forEach(logic => {
      if (logic.trigger.type === 'event') {
        const event = this.interpolate(logic.trigger.event);
        this.on(event, (...args) => {
          const newComponent = _.cloneDeep(this.originalComponent);
          if (this.applyActions(logic.actions, args, this.data, newComponent)) {
            // If component definition changed, replace it.
            if (!_.isEqual(this.component, newComponent)) {
              this.component = newComponent;
            }
            this.redraw();
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
      attributes.placeholder = this.t(this.component.placeholder);
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
    if (this.component.autofocus) {
      this.on('render', () => this.focus(), true);
    }
  }

  focus() {
    if (this.refs.input && this.refs.input[0]) {
      this.refs.input[0].focus();
    }
  }
}

Component.externalLibraries = {};
Component.requireLibrary = function(name, property, src, polling) {
  if (!Component.externalLibraries.hasOwnProperty(name)) {
    Component.externalLibraries[name] = {};
    Component.externalLibraries[name].ready = new NativePromise((resolve, reject) => {
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

  return NativePromise.reject(`${name} library was not required.`);
};
