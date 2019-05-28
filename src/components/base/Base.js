/* globals Quill, ClassicEditor */
import { conformToMask } from 'vanilla-text-mask';
import Promise from 'native-promise-only';
import _ from 'lodash';
import Tooltip from 'tooltip.js';
import * as FormioUtils from '../../utils/utils';
import Formio from '../../Formio';
import Validator from '../Validator';
import Widgets from '../../widgets';
import Component from '../../Component';
import dragula from 'dragula';
const CKEDITOR = 'https://cdn.staticaly.com/gh/formio/ckeditor5-build-classic/master/build/ckeditor.js';

/**
 * This is the BaseComponent class which all elements within the FormioForm derive from.
 */
export default class BaseComponent extends Component {
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
       * If this component should be included as a column within a submission table.
       */
      tableView: true,

      /**
       * If true, will show label when component is in a datagrid.
       */
      dataGridLabel: false,

      /**
       * The input label provided to this component.
       */
      label: '',
      labelPosition: 'top',
      labelWidth: 30,
      labelMargin: 3,
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
      allowCalculateOverride: false,
      widget: null,

      /**
       * This will refresh this component when this field changes.
       */
      refreshOn: '',

      /**
       * Determines if we should clear our value when a refresh occurs.
       */
      clearOnRefresh: false,

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
        customPrivate: false
      },

      /**
       * The simple conditional settings for a component.
       */
      conditional: {
        show: null,
        when: null,
        eq: ''
      }
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
   * Initialize a new BaseComponent.
   *
   * @param {Object} component - The component JSON you wish to initialize.
   * @param {Object} options - The options for this component.
   * @param {Object} data - The global data submission object this component will belong.
   */
  /* eslint-disable max-statements */
  constructor(component, options, data) {
    super(options, (component && component.id) ? component.id : null);

    // Determine if we are inside a datagrid.
    this.inDataGrid = this.options.inDataGrid;
    this.options.inDataGrid = false;

    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */
    this._hasCondition = null;

    /**
     * A persistent data object that can persist between component instances.
     */
    this.persist = {};

    /**
     * The data object in which this component resides.
     * @type {*}
     */
    this.data = data || {};

    // Allow global override for any component JSON.
    if (
      this.options.components &&
      this.options.components[component.type]
    ) {
      _.merge(component, this.options.components[component.type]);
    }

    /**
     * The Form.io component JSON schema.
     * @type {*}
     */
    this.component = _.defaultsDeep(component || {}, this.defaultSchema);

    // Add the id to the component.
    this.component.id = this.id;

    // Set the original component.
    this.originalComponent = _.cloneDeep(this.component);

    /**
     * The bounding HTML Element which this component is rendered.
     * @type {null}
     */
    this.element = null;

    /**
     * The HTML Element for the table body. This is relevant for the "multiple" flag on inputs.
     * @type {null}
     */
    this.tbody = null;

    /**
     * The HTMLElement that is assigned to the label of this component.
     * @type {null}
     */
    this.labelElement = null;

    /**
     * The HTMLElement for which the errors are rendered for this component (usually underneath the component).
     * @type {null}
     */
    this.errorElement = null;

    /**
     * The existing error that this component has.
     * @type {string}
     */
    this.error = '';

    /**
     * An array of all of the input HTML Elements that have been added to this component.
     * @type {Array}
     */
    this.inputs = [];

    /**
     * The basic component information which tells the BaseComponent how to render the input element of the components that derive from this class.
     * @type {null}
     */
    this.info = null;

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
    this._disabled = false;

    /**
     * Determines if this component is visible, or not.
     */
    this._visible = true;
    this._parentVisible = true;

    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */
    this.pristine = true;

    /**
     * Points to the parent component.
     *
     * @type {BaseComponent}
     */
    this.parent = null;

    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {BaseComponent}
     */
    this.root = this;

    this.options.name = this.options.name || 'data';

    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */
    this.validators = ['required', 'minLength', 'maxLength', 'custom', 'pattern', 'json', 'mask'];

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

    // To force this component to be invalid.
    this.invalid = false;

    // Determine if the component has been built.
    this.isBuilt = false;

    if (this.component) {
      this.type = this.component.type;
      if (this.hasInput && this.key) {
        this.options.name += `[${this.key}]`;
      }

      /**
       * The element information for creating the input element.
       * @type {*}
       */
      this.info = this.elementInfo();
    }

    // Allow anyone to hook into the component creation.
    this.hook('component');
  }
  /* eslint-enable max-statements */

  get hasInput() {
    return this.component.input || this.inputs.length;
  }

  get defaultSchema() {
    return BaseComponent.schema();
  }

  get key() {
    return _.get(this.component, 'key', '');
  }

  get currentForm() {
    return this._currentForm;
  }

  set currentForm(instance) {
    this._currentForm = instance;
  }

  /**
   * Returns only the schema that is different from the default.
   *
   * @param schema
   * @param defaultSchema
   */
  getModifiedSchema(schema, defaultSchema) {
    const modified = {};
    if (!defaultSchema) {
      return schema;
    }
    _.each(schema, (val, key) => {
      if (!_.isArray(val) && _.isObject(val) && defaultSchema.hasOwnProperty(key)) {
        const subModified = this.getModifiedSchema(val, defaultSchema[key]);
        if (!_.isEmpty(subModified)) {
          modified[key] = subModified;
        }
      }
      else if (
        (key === 'type') ||
        (key === 'key') ||
        (key === 'label') ||
        (key === 'input') ||
        (key === 'tableView') ||
        !defaultSchema.hasOwnProperty(key) ||
        _.isArray(val) ||
        (val !== defaultSchema[key])
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
    params = params || {};
    params.data = this.rootValue;
    params.row = this.data;
    params.component = this.component;
    return super.t(text, params);
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
   * Called before a next page is triggered allowing the components
   * to perform special functions.
   *
   * @return {*}
   */
  beforeNext() {
    return Promise.resolve(true);
  }

  /**
   * Called before a submission is triggered allowing the components
   * to perform special async functions.
   *
   * @return {*}
   */
  beforeSubmit() {
    return Promise.resolve(true);
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

  get shouldDisable() {
    return (this.options.readOnly || this.component.disabled) && !this.component.alwaysEnabled;
  }

  /**
   * Builds the component.
   */
  build(state) {
    state = state || {};
    this.calculatedValue = state.calculatedValue;
    if (this.viewOnly) {
      this.viewOnlyBuild();
    }
    else {
      this.createElement();

      const labelAtTheBottom = this.component.labelPosition === 'bottom';
      if (!labelAtTheBottom) {
        this.createLabel(this.element);
      }
      if (!this.createWrapper()) {
        this.createInput(this.element);
      }
      if (labelAtTheBottom) {
        this.createLabel(this.element);
      }
      this.createDescription(this.element);

      // Disable if needed.
      if (this.shouldDisable) {
        this.disabled = true;
      }

      // Restore the value.
      this.restoreValue();

      // Attach the refresh on events.
      this.attachRefreshOn();

      this.autofocus();
    }

    this.attachLogic();
  }

  attachRefreshEvent(refreshData) {
    this.on('change', (event) => {
      if (refreshData === 'data') {
        this.refresh(this.data);
      }
      else if (
        event.changed &&
        event.changed.component &&
        (event.changed.component.key === refreshData) &
        // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
        // in fields inside EditGrids could alter their state from other rows (which is bad).
        this.inContext(event.changed.instance)
      ) {
        this.refresh(event.changed.value);
      }
    }, true);
  }

  attachRefreshOn() {
    // If they wish to refresh on a value, then add that here.
    if (this.component.refreshOn) {
      if (Array.isArray(this.component.refreshOn)) {
        this.component.refreshOn.forEach(refreshData => {
          this.attachRefreshEvent(refreshData);
        });
      }
      else {
        this.attachRefreshEvent(this.component.refreshOn);
      }
    }
  }

  get viewOnly() {
    return this.options.readOnly && this.options.viewAsHtml;
  }

  viewOnlyBuild() {
    this.createViewOnlyElement();
    this.createViewOnlyLabel(this.element);
    this.createViewOnlyValue(this.element);
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

  createViewOnlyLabel(container) {
    if (this.labelIsHidden()) {
      return;
    }

    this.labelElement = this.ce('dt');
    this.labelElement.appendChild(this.text(this.component.label));
    this.createTooltip(this.labelElement);
    container.appendChild(this.labelElement);
  }

  createViewOnlyValue(container) {
    this.valueElement = this.ce('dd');
    this.setupValueElement(this.valueElement);
    container.appendChild(this.valueElement);
  }

  setupValueElement(element) {
    let value = this.getValue();
    value = this.isEmpty(value) ? this.defaultViewOnlyValue : this.getView(value);
    element.innerHTML = value;
  }

  get defaultViewOnlyValue() {
    return '-';
  }

  getView(value) {
    if (!value) {
      return '';
    }
    const widget = this.widget;
    if (widget && widget.getView) {
      return widget.getView(value);
    }
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return value.toString();
  }

  updateItems(...args) {
    this.restoreValue();
    this.onChange(...args);
  }

  updateViewOnlyValue() {
    if (!this.valueElement) {
      return;
    }

    this.setupValueElement(this.valueElement);
  }

  createModal() {
    const modalBody = this.ce('div');
    const modalOverlay = this.ce('div', {
      class: 'formio-dialog-overlay'
    });
    const closeDialog = this.ce('button', {
      class: 'formio-dialog-close pull-right btn btn-default btn-xs',
      'aria-label': 'close'
    });

    const modalBodyContainer = this.ce('div', {
      class: 'formio-dialog-content'
    }, [
      modalBody,
      closeDialog
    ]);

    const dialog = this.ce('div', {
      class: 'formio-dialog formio-dialog-theme-default component-settings'
    }, [
      modalOverlay,
      modalBodyContainer
    ]);

    this.addEventListener(modalOverlay, 'click', (event) => {
      event.preventDefault();
      dialog.close();
    });
    this.addEventListener(closeDialog, 'click', (event) => {
      event.preventDefault();
      dialog.close();
    });
    this.addEventListener(dialog, 'close', () => {
      this.removeChildFrom(dialog, document.body);
    });
    document.body.appendChild(dialog);
    dialog.body = modalBody;
    dialog.bodyContainer = modalBodyContainer;
    dialog.close = () => {
      dialog.dispatchEvent(new CustomEvent('close'));
      this.removeChildFrom(dialog, document.body);
    };
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
    if (this.hasInput && this.component.validate && this.component.validate.required) {
      className += ' required';
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
   * Create the outside wrapping element for this component.
   * @returns {HTMLElement}
   */
  createElement() {
    // If the element is already created, don't recreate.
    if (this.element) {
      //update class for case when Logic changed container class (customClass)
      this.element.className = this.className;
      return this.element;
    }

    this.element = this.ce('div', {
      id: this.id,
      class: this.className,
      style: this.customStyle
    });

    // Ensure you can get the component info from the element.
    this.element.component = this;

    this.hook('element', this.element);
    return this.element;
  }

  /**
   * Create the input wrapping element. For multiple, this may be the table wrapper for the elements.
   * @returns {boolean}
   */
  createWrapper() {
    if (!this.component.multiple) {
      return false;
    }
    else {
      const table = this.ce('table', {
        class: 'table table-bordered'
      });
      this.tbody = this.ce('tbody');
      table.appendChild(this.tbody);

      // Add a default value.
      const dataValue = this.dataValue;
      if (!dataValue || !dataValue.length) {
        this.addNewValue(this.defaultValue);
      }

      // Build the rows.
      this.buildRows();

      this.setInputStyles(table);

      // Add the table to the element.
      this.append(table);
      return true;
    }
  }

  evalContext(additional) {
    return super.evalContext(Object.assign({
      instance: this,
      component: this.component,
      row: this.data,
      value: ((this.key && this.hasValue()) ? this.dataValue : this.emptyValue),
      rowIndex: this.rowIndex,
      data: this.rootValue,
      submission: (this.root ? this.root._submission : {}),
      form: this.root ? this.root._form : {}
    }, additional));
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

    if (this._inputMask) {
      defaultValue = conformToMask(defaultValue, this._inputMask).conformedValue;
      if (!FormioUtils.matchInputMask(defaultValue, this._inputMask)) {
        defaultValue = '';
      }
    }

    // Let the widget provide default value if none is already provided.
    if (!defaultValue) {
      const widget = this.widget;
      if (widget) {
        defaultValue = widget.defaultValue;
      }
    }

    // Clone so that it creates a new instance.
    return _.clone(defaultValue);
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
   * Adds a new empty value to the data array.
   */
  addNewValue(value) {
    if (value === undefined) {
      value = this.emptyValue;
    }
    let dataValue = this.dataValue || [];
    if (!Array.isArray(dataValue)) {
      dataValue = [dataValue];
    }

    if (Array.isArray(value)) {
      dataValue = dataValue.concat(value);
    }
    else {
      dataValue.push(value);
    }
    this.dataValue = dataValue;
  }

  /**
   * Adds a new empty value to the data array, and add a new row to contain it.
   */
  addValue() {
    this.addNewValue();
    this.buildRows();
    this.checkConditions();
    this.restoreValue();
    if (this.root) {
      this.root.onChange();
    }
  }

  /**
   * Removes a value out of the data array and rebuild the rows.
   * @param {number} index - The index of the data element to remove.
   */
  removeValue(index) {
    this.splice(index);
    this.buildRows();
    this.restoreValue();
    if (this.root) {
      this.root.onChange();
    }
  }

  /**
   * Rebuild the rows to contain the values of this component.
   */
  buildRows(values) {
    if (!this.tbody) {
      return;
    }
    const allowReorder = this.allowReorder;
    this.inputs = [];
    this.tbody.innerHTML = '';
    values = (values && values.length > 0) ? values : this.dataValue;
    _.each(values, (value, index) => {
      const tr = this.ce('tr');
      if (allowReorder) {
        tr.appendChild(this.ce('td', {
          class: 'formio-drag-column'
        }, this.dragButton()));
      }
      const td = this.ce('td');
      this.buildInput(td, value, index);
      tr.appendChild(td);

      if (!this.shouldDisable) {
        const tdAdd = this.ce('td', {
          class: 'formio-remove-column'
        });
        tdAdd.appendChild(this.removeButton(index));
        tr.appendChild(tdAdd);
      }

      if (allowReorder) {
        tr.dragInfo = {
          index: index
        };
      }
      this.tbody.appendChild(tr);
    });

    if (!this.shouldDisable) {
      const tr = this.ce('tr');
      const td = this.ce('td', {
        colspan: allowReorder ? '3' : '2'
      });
      td.appendChild(this.addButton());
      tr.appendChild(td);
      this.tbody.appendChild(tr);
    }

    if (this.shouldDisable) {
      this.disabled = true;
    }

    if (allowReorder) {
      this.addDraggable([this.tbody]);
    }
  }

  get allowReorder() {
    return this.component.reorder && !this.options.readOnly;
  }

  addDraggable(containers) {
    this.dragula = dragula(containers, this.getRowDragulaOptions()).on('drop', this.onRowDrop.bind(this));
  }

  getRowDragulaOptions() {
    return {
      moves: function(draggedElement, oldParent, clickedElement) {
        //allow dragging only on drag button (not the whole row)
        return clickedElement.classList.contains('formio-drag-button');
      }
    };
  }

  onRowDrop(droppedElement, newParent, oldParent, nextSibling) {
    //move them in data value as well
    if (!droppedElement.dragInfo || (nextSibling && !nextSibling.dragInfo)) {
      console.warn('There is no Drag Info available for either dragged or sibling element');
      return;
    }
    const oldPosition = droppedElement.dragInfo.index;
    //should drop at next sibling position; no next sibling means drop to last position
    const newPosition = nextSibling ? nextSibling.dragInfo.index : this.dataValue.length;
    const movedBelow = newPosition > oldPosition;
    const dataValue = _.cloneDeep(this.dataValue);
    const draggedRowData = dataValue[oldPosition];

    //insert element at new position
    dataValue.splice(newPosition, 0, draggedRowData);
    //remove element from old position (if was moved above, after insertion it's at +1 index)
    dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1);
    //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)
    this.setValue(dataValue);
  }

  buildInput(container, value) {
    const input = this.createInput(container);
    input.value = value;
  }

  /**
   * Adds a new button to add new rows to the multiple input elements.
   * @returns {HTMLElement} - The "Add New" button html element.
   */
  addButton(justIcon) {
    const addButton = this.ce('button', {
      class: 'btn btn-primary formio-button-add-row'
    });
    this.addEventListener(addButton, 'click', (event) => {
      event.preventDefault();
      this.addValue();
    });

    const addIcon = this.ce('i', {
      class: this.iconClass('plus')
    });

    if (justIcon) {
      addButton.appendChild(addIcon);
      return addButton;
    }
    else {
      addButton.appendChild(addIcon);
      addButton.appendChild(this.text(' '));
      addButton.appendChild(this.text(this.component.addAnother || 'Add Another'));
      return addButton;
    }
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

  /**
   * Creates a new "remove" row button and returns the html element of that button.
   * @param {number} index - The index of the row that should be removed.
   * @returns {HTMLElement} - The html element of the remove button.
   */
  removeButton(index) {
    const removeButton = this.ce('button', {
      type: 'button',
      class: 'btn btn-default btn-secondary formio-button-remove-row'
    });

    this.addEventListener(removeButton, 'click', (event) => {
      event.preventDefault();
      this.removeValue(index);
    });

    const removeIcon = this.ce('i', {
      class: this.iconClass('remove-circle')
    });
    removeButton.appendChild(removeIcon);
    return removeButton;
  }

  dragButton() {
    return this.ce('button', {
      class: `formio-drag-button btn btn-default btn-small ${this.iconClass('menu-hamburger')}`
    });
  }

  labelOnTheLeft(position) {
    return [
      'left-left',
      'left-right'
    ].includes(position);
  }

  labelOnTheRight(position) {
    return [
      'right-left',
      'right-right'
    ].includes(position);
  }

  rightAlignedLabel(position) {
    return [
      'left-right',
      'right-right'
    ].includes(position);
  }

  labelOnTheLeftOrRight(position) {
    return this.labelOnTheLeft(position) || this.labelOnTheRight(position);
  }

  getLabelWidth() {
    if (!this.component.labelWidth) {
      this.component.labelWidth = 30;
    }

    return this.component.labelWidth;
  }

  getLabelMargin() {
    if (!this.component.labelMargin) {
      this.component.labelMargin = 3;
    }

    return this.component.labelMargin;
  }

  setInputStyles(input) {
    if (this.labelIsHidden()) {
      return;
    }

    if (this.labelOnTheLeftOrRight(this.component.labelPosition)) {
      const totalLabelWidth = this.getLabelWidth() + this.getLabelMargin();
      input.style.width = `${100 - totalLabelWidth}%`;

      if (this.labelOnTheLeft(this.component.labelPosition)) {
        input.style.marginLeft = `${totalLabelWidth}%`;
      }
      else {
        input.style.marginRight = `${totalLabelWidth}%`;
      }
    }
  }

  labelIsHidden() {
    return !this.component.label ||
      this.component.hideLabel ||
      this.options.inputsOnly ||
      (this.inDataGrid && !this.component.dataGridLabel);
  }

  /**
   * Create the HTML element for the label of this component.
   * @param {HTMLElement} container - The containing element that will contain this label.
   */
  createLabel(container) {
    const isLabelHidden = this.labelIsHidden();
    let className = 'control-label';
    let style = '';
    if (!isLabelHidden) {
      const {
        labelPosition
      } = this.component;

      // Determine label styles/classes depending on position.
      if (labelPosition === 'bottom') {
        className += ' control-label--bottom';
      }
      else if (labelPosition && labelPosition !== 'top') {
        const labelWidth = this.getLabelWidth();
        const labelMargin = this.getLabelMargin();

        // Label is on the left or right.
        if (this.labelOnTheLeft(labelPosition)) {
          style += `float: left; width: ${labelWidth}%; margin-right: ${labelMargin}%; `;
        }
        else if (this.labelOnTheRight(labelPosition)) {
          style += `float: right; width: ${labelWidth}%; margin-left: ${labelMargin}%; `;
        }
        if (this.rightAlignedLabel(labelPosition)) {
          style += 'text-align: right; ';
        }
      }
    }
    else {
      this.addClass(container, 'formio-component-label-hidden');
      className += ' control-label--hidden';
    }

    if (this.hasInput && this.component.validate && this.component.validate.required) {
      className += ' field-required';
    }
    this.labelElement = this.ce('label', {
      class: className,
      style
    });
    if (!isLabelHidden) {
      if (this.info.attr.id) {
        this.labelElement.setAttribute('for', this.info.attr.id);
      }
      this.labelElement.appendChild(this.text(this.component.label));
      this.createTooltip(this.labelElement);
    }
    container.appendChild(this.labelElement);
  }

  addShortcutToLabel(label, shortcut) {
    if (!label) {
      label = this.component.label;
    }

    if (!shortcut) {
      shortcut = this.component.shortcut;
    }

    if (!shortcut || !/^[A-Za-z]$/.test(shortcut)) {
      return label;
    }

    const match = label.match(new RegExp(shortcut, 'i'));

    if (!match) {
      return label;
    }

    const index = match.index + 1;
    const lowLineCombinator = '\u0332';

    return label.substring(0, index) + lowLineCombinator + label.substring(index);
  }

  addShortcut(element, shortcut) {
    // Avoid infinite recursion.
    if (this.root === this) {
      return;
    }

    if (!element) {
      element = this.labelElement;
    }

    if (!shortcut) {
      shortcut = this.component.shortcut;
    }

    this.root.addShortcut(element, shortcut);
  }

  removeShortcut(element, shortcut) {
    // Avoid infinite recursion.
    if (this.root === this) {
      return;
    }

    if (!element) {
      element = this.labelElement;
    }

    if (!shortcut) {
      shortcut = this.component.shortcut;
    }

    this.root.removeShortcut(element, shortcut);
  }

  /**
   * Create the HTML element for the tooltip of this component.
   * @param {HTMLElement} container - The containing element that will contain this tooltip.
   */
  createTooltip(container, component, classes) {
    if (this.tooltip) {
      return;
    }
    component = component || this.component;
    classes = classes || `${this.iconClass('question-sign')} text-muted`;
    if (!component.tooltip) {
      return;
    }
    const ttElement = this.ce('i', {
      class: classes
    });
    container.appendChild(this.text(' '));
    container.appendChild(ttElement);
    this.tooltip = new Tooltip(ttElement, {
      trigger: 'hover click',
      placement: 'right',
      html: true,
      title: this.interpolate(component.tooltip).replace(/(?:\r\n|\r|\n)/g, '<br />')
    });
  }

  /**
   * Creates the description block for this input field.
   * @param container
   */
  createDescription(container) {
    if (!this.component.description) {
      return;
    }
    this.description = this.ce('div', {
      class: 'help-block'
    });
    this.description.innerHTML = this.t(this.component.description);
    container.appendChild(this.description);
  }

  /**
   * Creates a new error element to hold the errors of this element.
   */
  createErrorElement() {
    if (!this.errorContainer) {
      return;
    }
    this.errorElement = this.ce('div', {
      class: 'formio-errors invalid-feedback'
    });
    this.errorContainer.appendChild(this.errorElement);
  }

  /**
   * Adds a prefix html element.
   *
   * @param {HTMLElement} input - The input element.
   * @param {HTMLElement} inputGroup - The group that will hold this prefix.
   * @returns {HTMLElement} - The html element for this prefix.
   */
  addPrefix(input, inputGroup) {
    let prefix = null;
    if (input.widget) {
      return input.widget.addPrefix(inputGroup);
    }
    if (this.component.prefix && (typeof this.component.prefix === 'string')) {
      prefix = this.ce('div', {
        class: 'input-group-addon input-group-prepend'
      });
      prefix.appendChild(this.ce('span', {
        class: 'input-group-text'
      }, this.text(this.component.prefix)));
      inputGroup.appendChild(prefix);
    }
    return prefix;
  }

  /**
   * Adds a suffix html element.
   *
   * @param {HTMLElement} input - The input element.
   * @param {HTMLElement} inputGroup - The group that will hold this suffix.
   * @returns {HTMLElement} - The html element for this suffix.
   */
  addSuffix(input, inputGroup) {
    let suffix = null;
    if (input.widget) {
      return input.widget.addSuffix(inputGroup);
    }
    if (this.component.suffix && (typeof this.component.suffix === 'string')) {
      suffix = this.ce('div', {
        class: 'input-group-addon input-group-append'
      });
      suffix.appendChild(this.ce('span', {
        class: 'input-group-text'
      }, this.text(this.component.suffix)));
      inputGroup.appendChild(suffix);
    }
    return suffix;
  }

  /**
   * Adds a new input group to hold the input html elements.
   *
   * @param {HTMLElement} input - The input html element.
   * @param {HTMLElement} container - The containing html element for this group.
   * @returns {HTMLElement} - The input group element.
   */
  addInputGroup(input, container) {
    let inputGroup = null;
    if (this.component.prefix || this.component.suffix) {
      inputGroup = this.ce('div', {
        class: 'input-group'
      });
      container.appendChild(inputGroup);
    }
    return inputGroup;
  }

  // Default the mask to the component input mask.
  setInputMask(input, inputMask) {
    return super.setInputMask(input, (inputMask || this.component.inputMask), !this.component.placeholder);
  }

  /**
   * Creates a new input element.
   * @param {HTMLElement} container - The container which should hold this new input element.
   * @returns {HTMLElement} - Either the input or the group that contains the input.
   */
  createInput(container) {
    const input = this.ce(this.info.type, this.info.attr);

    this.setInputMask(input);
    input.widget = this.createWidget();
    const inputGroup = this.addInputGroup(input, container);
    this.addPrefix(input, inputGroup);
    this.addInput(input, inputGroup || container);
    this.addSuffix(input, inputGroup);
    this.errorContainer = container;
    this.setInputStyles(inputGroup || input);
    // Attach the input to the widget.
    if (input.widget) {
      input.widget.attach(input);
    }
    return inputGroup || input;
  }

  /**
   * Returns the instance of the widget for this component.
   *
   * @return {*}
   */
  get widget() {
    if (this._widget) {
      return this._widget;
    }
    return this.createWidget();
  }

  /**
   * Creates an instance of a widget for this component.
   *
   * @return {null}
   */
  createWidget() {
    // Return null if no widget is found.
    if (!this.component.widget) {
      return null;
    }

    // Get the widget settings.
    const settings = (typeof this.component.widget === 'string') ? {
      type: this.component.widget
    } : this.component.widget;

    // Make sure we have a widget.
    if (!Widgets.hasOwnProperty(settings.type)) {
      return null;
    }

    // Pass along some options.
    settings.icons = this.options.icons;
    settings.i18n = this.options.i18n;
    settings.language = this.options.language;

    // Create the widget.
    const widget = new Widgets[settings.type](settings, this.component);
    widget.on('update', () => this.updateValue(), true);
    widget.on('redraw', () => this.redraw(), true);
    this._widget = widget;
    return widget;
  }

  redraw() {
    // Don't bother if we have not built yet.
    if (!this.isBuilt) {
      return;
    }
    this.build(this.clear());
  }

  destroyInputs() {
    _.each(this.inputs, (input) => {
      input = this.performInputMapping(input);
      if (input.mask && input.mask.destroy) {
        input.mask.destroy();
      }
      if (input.widget) {
        input.widget.destroy();
      }
    });
    if (this.tooltip) {
      this.tooltip.dispose();
      this.tooltip = null;
    }
    this.inputs = [];
  }

  /**
   * Remove all event handlers.
   */
  destroy() {
    const state = super.destroy(...arguments) || {};
    this.destroyInputs();
    state.calculatedValue = this.calculatedValue;
    return state;
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
  renderTemplate(template, data, actions = []) {
    return this.renderTemplateToElement(this.ce('div'), template, data, actions);
  }

  renderElement(template, data, actions = []) {
    return this.renderTemplate(template, data, actions).firstChild;
  }

  renderTemplateToElement(element, template, data, actions = []) {
    element.innerHTML = this.interpolate(template, data).trim();
    this.attachActions(element, actions);
    return element;
  }

  attachActions(element, actions) {
    actions.forEach((action) => {
      const elements = element.getElementsByClassName(action.class);
      Array.prototype.forEach.call(elements, (element) => {
        element.addEventListener(action.event, action.action);
      });
    });
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
    if (this.options.builder || !this.hasCondition()) {
      return true;
    }
    return this.checkCondition(null, data);
  }

  /**
   * Checks the condition of this component.
   *
   * @param row - The row contextual data.
   * @param data - The global data object.
   *
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
  checkConditions(data) {
    data = data || this.rootValue;

    // Check advanced conditions
    const result = this.show(this.conditionallyVisible(data));
    if (!this.options.builder && this.fieldLogic(data)) {
      this.redraw();
    }

    return result;
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
      changed = true;
    }

    return changed;
  }

  applyActions(actions, result, data, newComponent) {
    return actions.reduce((changed, action) => {
      switch (action.type) {
        case 'property':
          FormioUtils.setActionProperty(newComponent, action, this.data, data, newComponent, result, this);
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

  /**
   * Add a new input error to this element.
   *
   * @param message
   * @param dirty
   */
  addInputError(message, dirty) {
    if (!message) {
      return;
    }

    if (this.errorElement) {
      const errorMessage = this.ce('p', {
        class: 'help-block'
      });
      errorMessage.appendChild(this.text(message));
      this.errorElement.appendChild(errorMessage);
    }

    // Add error classes
    this.addClass(this.element, 'has-error');
    this.inputs.forEach((input) => this.addClass(this.performInputMapping(input), 'is-invalid'));
    if (dirty && this.options.highlightErrors) {
      this.addClass(this.element, 'alert alert-danger');
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

  /**
   * Hide or Show an element.
   *
   * @param show
   */
  show(show, noClear) {
    if (
      !this.options.builder &&
      this.options.hide &&
      this.options.hide[this.component.key]
    ) {
      show = false;
    }
    else if (
      this.options.builder ||
      (this.options.show && this.options.show[this.component.key])
    ) {
      show = true;
    }

    // Execute only if visibility changes or if we are in builder mode or if hidden fields should be shown.
    if (!show === !this._visible || this.options.builder || this.options.showHiddenFields) {
      if (!show) {
        this.clearOnHide(false);
      }
      return show;
    }

    this.visible = show;
    this.showElement(show && !this.component.hidden);
    if (!noClear) {
      this.clearOnHide(show);
    }
    return show;
  }

  /**
   * Show or hide the root element of this component.
   *
   * @param element
   * @param show
   */
  showElement(element, show) {
    if (typeof element === 'boolean') {
      show = element;
      element = this.getElement();
    }

    if (element) {
      if (show) {
        element.removeAttribute('hidden');
        element.style.visibility = 'visible';
        element.style.position = 'relative';
      }
      else if (
        this.parent &&
        this.parent.parent &&
        (this.parent.parent.component.type === 'columns') &&
        this.parent.parent.component.autoAdjust
      ) {
        element.style.visibility = 'hidden';
        element.style.position = 'relative';
      }
      else {
        element.setAttribute('hidden', true);
        element.style.visibility = 'hidden';
        element.style.position = 'absolute';
      }
    }
    return show;
  }

  clearOnHide(show) {
    // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
    if (this.component.clearOnHide !== false && !this.options.readOnly) {
      if (!show) {
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

  set visible(visible) {
    this._visible = visible;
  }

  get visible() {
    return this._visible && this._parentVisible;
  }

  set parentVisible(value) {
    if (this._parentVisible !== value) {
      this._parentVisible = value;
    }
  }

  get parentVisible() {
    return this._parentVisible;
  }

  onChange(flags, fromRoot) {
    flags = flags || {};

    if (flags.modified) {
      // Add a modified class if this element was manually modified.
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
  }

  addInputSubmitListener(input) {
    if (!this.options.submitOnEnter) {
      return;
    }
    this.addEventListener(input, 'keypress', (event) => {
      const key = event.keyCode || event.which;
      if (key === 13) {
        event.preventDefault();
        event.stopPropagation();
        this.emit('submitButton');
      }
    });
  }

  /**
   * Add new input element listeners.
   *
   * @param input
   */
  addInputEventListener(input) {
    this.addEventListener(input, this.info.changeEvent, () => this.updateValue({
      modified: true
    }));
  }

  /**
   * Add a new input to this comonent.
   *
   * @param input
   * @param container
   * @param noSet
   */
  addInput(input, container) {
    if (!input) {
      return;
    }
    if (input && container) {
      input = container.appendChild(input);
    }

    this.inputs.push(input);
    this.hook('input', input, container);
    this.addFocusBlurEvents(input);
    this.addInputEventListener(input);
    this.addInputSubmitListener(input);
    return input;
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
          this.root.triggerChange({}, {
            instance: this,
            component: this.component,
            value: this.dataValue,
            flags: {}
          });
        }
        this.root.focusedComponent = null;
        this.root.pendingBlur = null;
      });
    });
  }

  get wysiwygDefault() {
    return {
      theme: 'snow',
      placeholder: this.t(this.component.placeholder),
      modules: {
        clipboard: {
          matchVisual: false
        },
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
    settings = _.isEmpty(settings) ? null : settings;
    return Formio.requireLibrary('ckeditor', 'ClassicEditor', CKEDITOR, true)
      .then(() => {
        if (!element.parentNode) {
          return Promise.reject();
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
    Formio.requireLibrary(`quill-css-${settings.theme}`, 'Quill', [
      { type: 'styles', src: `https://cdn.quilljs.com/1.3.6/quill.${settings.theme}.css` }
    ], true);

    // Lazy load the quill library.
    return Formio.requireLibrary('quill', 'Quill', 'https://cdn.quilljs.com/1.3.6/quill.min.js', true)
      .then(() => {
        if (!element.parentNode) {
          return Promise.reject();
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
   * Get the value of this component.
   *
   * @return {*}
   */
  get value() {
    return this.dataValue;
  }

  /**
   * Get the data value at the root level.
   *
   * @return {*}
   */
  get rootValue() {
    return this.root ? this.root.data : this.data;
  }

  /**
   * Get the static value of this component.
   * @return {*}
   */
  get dataValue() {
    if (!this.key) {
      return this.emptyValue;
    }
    if (!this.hasValue()) {
      this.dataValue = this.component.multiple ? [] : this.emptyValue;
    }
    return _.get(this.data, this.key);
  }

  /**
   * Sets the static value of this component.
   *
   * @param value
   */
  set dataValue(value) {
    if (!this.key) {
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

  /**
   * Get the value at a specific index.
   *
   * @param index
   * @returns {*}
   */
  getValueAt(index) {
    const input = this.performInputMapping(this.inputs[index]);
    if (input.widget) {
      return input.widget.getValue();
    }
    return input ? input.value : undefined;
  }

  /**
   * Get the input value of this component.
   *
   * @return {*}
   */
  getValue() {
    if (!this.hasInput) {
      return;
    }
    if (this.viewOnly) {
      return this.dataValue;
    }
    const values = [];
    for (const i in this.inputs) {
      if (this.inputs.hasOwnProperty(i)) {
        if (!this.component.multiple) {
          return this.getValueAt(i);
        }
        values.push(this.getValueAt(i));
      }
    }
    return values;
  }

  /**
   * Determine if the value of this component has changed.
   *
   * @param before
   * @param after
   * @return {boolean}
   */
  hasChanged(before, after) {
    if (
      ((before === undefined) || (before === null)) &&
      ((after === undefined) || (after === null))
    ) {
      return false;
    }
    return !_.isEqual(before, after);
  }

  /**
   * Update the value on change.
   *
   * @param flags
   * @param changed
   */
  updateOnChange(flags, changed) {
    if (!flags.noUpdateEvent && changed) {
      this.triggerChange(flags);
      return true;
    }
    return false;
  }

  /**
   * Update a value of this component.
   *
   * @param flags
   */
  updateValue(flags, value) {
    if (!this.hasInput) {
      return false;
    }

    flags = flags || {};
    let newValue = value;
    if (!this.visible && this.component.clearOnHide) {
      newValue = this.dataValue;
    }
    else if (value === undefined || value === null) {
      newValue = this.getValue(flags);
    }
    const changed = (newValue !== undefined) ? this.hasChanged(newValue, this.dataValue) : false;
    this.dataValue = newValue;
    if (this.viewOnly) {
      this.updateViewOnlyValue(newValue);
    }

    this.updateOnChange(flags, changed);
    return changed;
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
      const defaultValue = this.defaultValue;
      if (!_.isNil(defaultValue)) {
        this.setValue(defaultValue, {
          noUpdateEvent: true
        });
      }
    }
  }

  /**
   * Perform a calculated value operation.
   *
   * @param data - The global data object.
   *
   * @return {boolean} - If the value changed during calculation.
   */
  calculateValue(data, flags) {
    // If no calculated value or
    // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
    if (!this.component.calculateValue || ((!this.visible || this.component.hidden) && this.component.clearOnHide)) {
      return false;
    }

    // Get the dataValue.
    let firstPass = false;
    let dataValue = null;
    const allowOverride = this.component.allowCalculateOverride;
    if (allowOverride) {
      dataValue = this.dataValue;
    }

    // First pass, the calculatedValue is undefined.
    if (this.calculatedValue === undefined) {
      firstPass = true;
      this.calculatedValue = null;
    }

    // Check to ensure that the calculated value is different than the previously calculated value.
    if (
      allowOverride &&
      (this.calculatedValue !== null) &&
      (this.calculatedValue !== this.emptyValue) &&
      !_.isEqual(dataValue, this.calculatedValue)
    ) {
      return false;
    }

    // Calculate the new value.
    const calculatedValue = this.evaluate(this.component.calculateValue, {
      value: this.defaultValue,
      data
    }, 'value');

    // If this is the firstPass, and the dataValue is different than to the calculatedValue.
    if (
      allowOverride &&
      firstPass &&
      (dataValue !== this.emptyValue) &&
      !_.isEqual(dataValue, calculatedValue)
    ) {
      // Return that we have a change so it will perform another pass.
      this.calculatedValue = calculatedValue;
      return true;
    }

    flags = flags || {};
    flags.noCheck = true;
    const changed = this.setValue(calculatedValue, flags);
    this.calculatedValue = this.dataValue;
    return changed;
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
    // Force valid if component is conditionally hidden.
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

  checkValidity(data, dirty, rowData) {
    if (this.shouldSkipValidation(data, dirty, rowData)) {
      this.setCustomValidity('');
      return true;
    }

    const message = this.invalidMessage(data, dirty, true);
    this.setCustomValidity(message, dirty);
    return message ? false : true;
  }

  /* eslint-disable max-len */
  getRawValue() {
    console.warn('component.getRawValue() has been deprecated. Use component.validationValue or component.dataValue instead.');
    return this.validationValue;
  }
  /* eslint-enable max-len */

  get validationValue() {
    // Let widgets have the first attempt.
    const widget = this.widget;
    if (widget && widget.validationValue) {
      return widget.validationValue(this.dataValue);
    }
    return this.dataValue;
  }

  isEmpty(value) {
    return value == null || value.length === 0 || _.isEqual(value, this.emptyValue);
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

  setCustomValidity(message, dirty) {
    if (this.errorElement && this.errorContainer) {
      this.errorElement.innerHTML = '';
      this.removeChildFrom(this.errorElement, this.errorContainer);
    }
    if (message) {
      this.error = {
        component: this.component,
        message: message
      };
      this.emit('componentError', this.error);
      this.createErrorElement();
      this.addInputError(message, dirty);
    }
    else {
      this.inputs.forEach((input) => this.removeClass(this.performInputMapping(input), 'is-invalid'));
      if (this.options.highlightErrors) {
        this.removeClass(this.element, 'alert alert-danger');
      }
      this.removeClass(this.element, 'has-error');
      this.error = null;
    }
    this.inputs.forEach((input) => {
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

  /**
   * Set the value at a specific index.
   *
   * @param index
   * @param value
   */
  setValueAt(index, value, flags) {
    flags = flags || {};
    if (!flags.noDefault && (value === null || value === undefined)) {
      value = this.defaultValue;
    }
    const input = this.performInputMapping(this.inputs[index]);
    if (input.mask) {
      input.mask.textMaskInputElement.update(value);
    }
    else {
      input.value = value;
    }
    if (input.widget) {
      input.widget.setValue(value);
    }
  }

  getFlags() {
    return (typeof arguments[1] === 'boolean') ? {
      noUpdateEvent: arguments[1],
      noValidate: arguments[2]
    } : (arguments[1] || {});
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
   * Set the value of this component.
   *
   * @param value
   * @param flags
   *
   * @return {boolean} - If the value changed.
   */
  setValue(value, flags) {
    flags = this.getFlags.apply(this, arguments);
    if (!this.hasInput) {
      return false;
    }
    if (this.component.multiple && !Array.isArray(value)) {
      value = value ? [value] : [];
    }
    this.buildRows(value);
    const isArray = Array.isArray(value);
    for (const i in this.inputs) {
      if (this.inputs.hasOwnProperty(i)) {
        this.setValueAt(i, isArray ? value[i] : value, flags);
      }
    }
    return this.updateValue(flags);
  }

  /**
   * Resets the value of this component.
   */
  resetValue() {
    this.setValue(this.emptyValue, { noUpdateEvent: true, noValidate: true });
    _.unset(this.data, this.key);
  }

  /**
   * Prints out the value of this component as a string value.
   */
  asString(value) {
    value = value || this.getValue();
    return Array.isArray(value) ? value.join(', ') : value.toString();
  }

  /**
   * Return if the component is disabled.
   * @return {boolean}
   */
  get disabled() {
    return this._disabled;
  }

  /**
   * Disable this component.
   *
   * @param {boolean} disabled
   */
  set disabled(disabled) {
    // Do not allow a component to be disabled if it should be always...
    if ((!disabled && this.shouldDisable) || (disabled && !this.shouldDisable)) {
      return;
    }

    this._disabled = disabled;

    // Add/remove the disabled class from the element.
    if (disabled) {
      this.addClass(this.getElement(), 'formio-disabled-input');
    }
    else {
      this.removeClass(this.getElement(), 'formio-disabled-input');
    }

    // Disable all inputs.
    _.each(this.inputs, (input) => this.setDisabled(this.performInputMapping(input), disabled));
  }

  setDisabled(element, disabled) {
    element.disabled = disabled;
    if (element.widget) {
      element.widget.disabled = disabled;
    }
    if (disabled) {
      element.setAttribute('disabled', 'disabled');
    }
    else {
      element.removeAttribute('disabled');
    }
  }

  setLoading(element, loading) {
    if (element.loading === loading) {
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
      select.onchange();
    }
  }

  /**
   * Destroys and clears a component and returns the current state.
   */
  clear() {
    const state = this.destroy() || {};
    this.empty(this.getElement());
    return state;
  }

  /**
   * Get the element information.
   */
  elementInfo() {
    const attributes = {
      name: this.options.name,
      type: this.component.inputType || 'text',
      class: 'form-control',
      lang: this.options.language,
      id: this.key || this.id
    };

    if (this.component.placeholder) {
      attributes.placeholder = this.t(this.component.placeholder);
    }

    if (this.component.tabindex) {
      attributes.tabindex = this.component.tabindex;
    }

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
    // Do not focus for readOnly forms.
    if (this.options.readOnly) {
      return;
    }
    const input = this.performInputMapping(this.inputs[0]);
    if (input) {
      if (input.widget) {
        input.widget.input.focus();
      }
      else {
        input.focus();
      }
    }
  }

  /**
   * Append an element to this elements containing element.
   *
   * @param {HTMLElement} element - The DOM element to append to this component.
   */
  append(element) {
    this.appendTo(element, this.element);
  }

  /**
   * Prepend an element to this elements containing element.
   *
   * @param {HTMLElement} element - The DOM element to prepend to this component.
   */
  prepend(element) {
    this.prependTo(element, this.element);
  }

  /**
   * Removes a child from this component.
   *
   * @param {HTMLElement} element - The DOM element to remove from this component.
   */
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
}
