"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.constructor");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.match");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.string.trim");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaTextMask = require("vanilla-text-mask");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _lodash = _interopRequireDefault(require("lodash"));

var _tooltip = _interopRequireDefault(require("tooltip.js"));

var FormioUtils = _interopRequireWildcard(require("../../utils/utils"));

var _Formio = _interopRequireDefault(require("../../Formio"));

var _Validator = _interopRequireDefault(require("../Validator"));

var _widgets = _interopRequireDefault(require("../../widgets"));

var _Component2 = _interopRequireDefault(require("../../Component"));

var _dragula = _interopRequireDefault(require("dragula"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CKEDITOR = 'https://cdn.staticaly.com/gh/formio/ckeditor5-build-classic/v12.2.0-formio.1/build/ckeditor.js';
/**
 * This is the BaseComponent class which all elements within the FormioForm derive from.
 */

var BaseComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(BaseComponent, _Component);

  _createClass(BaseComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
        sources[_key] = arguments[_key];
      }

      return _lodash.default.merge.apply(_lodash.default, [{
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
      }].concat(sources));
    }
    /**
     * Provides a table view for this component. Override if you wish to do something different than using getView
     * method of your instance.
     *
     * @param value
     * @param options
     */

    /* eslint-disable no-unused-vars */

  }, {
    key: "tableView",
    value: function tableView(value, options) {}
    /* eslint-enable no-unused-vars */

    /**
     * Initialize a new BaseComponent.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */

    /* eslint-disable max-statements */

  }]);

  function BaseComponent(component, options, data) {
    var _this;

    _classCallCheck(this, BaseComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseComponent).call(this, options, component && component.id ? component.id : null)); // Determine if we are inside a datagrid.

    _this.inDataGrid = _this.options.inDataGrid;
    _this.options.inDataGrid = false;
    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */

    _this._hasCondition = null;
    /**
     * A persistent data object that can persist between component instances.
     */

    _this.persist = {};
    /**
     * The data object in which this component resides.
     * @type {*}
     */

    _this.data = data || {}; // Allow global override for any component JSON.

    if (_this.options.components && _this.options.components[component.type]) {
      _lodash.default.merge(component, _this.options.components[component.type]);
    }
    /**
     * The Form.io component JSON schema.
     * @type {*}
     */


    _this.component = _lodash.default.defaultsDeep(component || {}, _this.defaultSchema); // Add the id to the component.

    _this.component.id = _this.id; // Set the original component.

    _this.originalComponent = _lodash.default.cloneDeep(_this.component);
    /**
     * The bounding HTML Element which this component is rendered.
     * @type {null}
     */

    _this.element = null;
    /**
     * The HTML Element for the table body. This is relevant for the "multiple" flag on inputs.
     * @type {null}
     */

    _this.tbody = null;
    /**
     * The HTMLElement that is assigned to the label of this component.
     * @type {null}
     */

    _this.labelElement = null;
    /**
     * The HTMLElement for which the errors are rendered for this component (usually underneath the component).
     * @type {null}
     */

    _this.errorElement = null;
    /**
     * The existing error that this component has.
     * @type {string}
     */

    _this.error = '';
    /**
     * An array of all of the input HTML Elements that have been added to this component.
     * @type {Array}
     */

    _this.inputs = [];
    /**
     * The basic component information which tells the BaseComponent how to render the input element of the components that derive from this class.
     * @type {null}
     */

    _this.info = null;
    /**
     * The row path of this component.
     * @type {number}
     */

    _this.row = _this.options.row;
    /**
     * Determines if this component is disabled, or not.
     *
     * @type {boolean}
     */

    _this._disabled = false;
    /**
     * Determines if this component is visible, or not.
     */

    _this._visible = true;
    _this._parentVisible = true;
    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */

    _this.pristine = true;
    /**
     * Points to the parent component.
     *
     * @type {BaseComponent}
     */

    _this.parent = null;
    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {BaseComponent}
     */

    _this.root = _assertThisInitialized(_this);
    _this.options.name = _this.options.name || 'data';
    /**
     * The validators that are assigned to this component.
     * @type {[string]}
     */

    _this.validators = ['required', 'minLength', 'maxLength', 'minWords', 'maxWords', 'custom', 'pattern', 'json', 'mask'];
    /**
     * Used to trigger a new change in this component.
     * @type {function} - Call to trigger a change in this component.
     */

    var lastChanged = null;

    var _triggerChange = _lodash.default.debounce(function () {
      var _this2;

      if (_this.root) {
        _this.root.changing = false;
      }

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      if (!args[1] && lastChanged) {
        // Set the changed component if one isn't provided.
        args[1] = lastChanged;
      }

      lastChanged = null;
      return (_this2 = _this).onChange.apply(_this2, args);
    }, 100);

    _this.triggerChange = function () {
      if (arguments.length <= 1 ? undefined : arguments[1]) {
        // Make sure that during the debounce that we always track lastChanged component, even if they
        // don't provide one later.
        lastChanged = arguments.length <= 1 ? undefined : arguments[1];
      }

      if (_this.root) {
        _this.root.changing = true;
      }

      return _triggerChange.apply(void 0, arguments);
    };
    /**
     * Used to trigger a redraw event within this component.
     *
     * @type {Function}
     */


    _this.triggerRedraw = _lodash.default.debounce(_this.redraw.bind(_assertThisInitialized(_this)), 100); // To force this component to be invalid.

    _this.invalid = false; // Determine if the component has been built.

    _this.isBuilt = false;

    if (_this.component) {
      _this.type = _this.component.type;

      if (_this.hasInput && _this.key) {
        _this.options.name += "[".concat(_this.key, "]");
      }
      /**
       * The element information for creating the input element.
       * @type {*}
       */


      _this.info = _this.elementInfo();
    } // Allow anyone to hook into the component creation.


    _this.hook('component');

    return _this;
  }
  /* eslint-enable max-statements */


  _createClass(BaseComponent, [{
    key: "getModifiedSchema",

    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */
    value: function getModifiedSchema(schema, defaultSchema) {
      var _this3 = this;

      var modified = {};

      if (!defaultSchema) {
        return schema;
      }

      _lodash.default.each(schema, function (val, key) {
        if (!_lodash.default.isArray(val) && _lodash.default.isObject(val) && defaultSchema.hasOwnProperty(key)) {
          var subModified = _this3.getModifiedSchema(val, defaultSchema[key]);

          if (!_lodash.default.isEmpty(subModified)) {
            modified[key] = subModified;
          }
        } else if (key === 'type' || key === 'key' || key === 'label' || key === 'input' || key === 'tableView' || !defaultSchema.hasOwnProperty(key) || _lodash.default.isArray(val) || val !== defaultSchema[key]) {
          modified[key] = val;
        }
      });

      return modified;
    }
    /**
     * Returns the JSON schema for this component.
     */

  }, {
    key: "t",

    /**
     * Translate a text using the i18n system.
     *
     * @param {string} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    value: function t(text, params) {
      params = params || {};
      params.data = this.rootValue;
      params.row = this.data;
      params.component = this.component;
      return _get(_getPrototypeOf(BaseComponent.prototype), "t", this).call(this, text, params);
    }
  }, {
    key: "performInputMapping",
    value: function performInputMapping(input) {
      return input;
    }
  }, {
    key: "getBrowserLanguage",
    value: function getBrowserLanguage() {
      var nav = window.navigator;
      var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
      var language; // support for HTML 5.1 "navigator.languages"

      if (Array.isArray(nav.languages)) {
        for (var i = 0; i < nav.languages.length; i++) {
          language = nav.languages[i];

          if (language && language.length) {
            return language.split(';')[0];
          }
        }
      } // support for other well known properties in browsers


      for (var _i = 0; _i < browserLanguagePropertyKeys.length; _i++) {
        language = nav[browserLanguagePropertyKeys[_i]];

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

  }, {
    key: "beforeNext",
    value: function beforeNext() {
      return _nativePromiseOnly.default.resolve(true);
    }
    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      return _nativePromiseOnly.default.resolve(true);
    }
    /**
     * Return the submission timezone.
     *
     * @return {*}
     */

  }, {
    key: "build",

    /**
     * Builds the component.
     */
    value: function build(state) {
      state = state || {};
      this.calculatedValue = state.calculatedValue;

      if (this.viewOnly) {
        this.viewOnlyBuild();
      } else {
        this.createElement();
        var labelAtTheBottom = this.component.labelPosition === 'bottom';

        if (!labelAtTheBottom) {
          this.createLabel(this.element);
        }

        if (!this.createWrapper()) {
          this.createInput(this.element);
        }

        if (labelAtTheBottom) {
          this.createLabel(this.element);
        }

        this.createDescription(this.element); // Disable if needed.

        if (this.shouldDisable) {
          this.disabled = true;
        } // Restore the value.


        this.restoreValue(); // Attach the refresh on events.

        this.attachRefreshOn();
        this.autofocus();
      }

      this.attachLogic();
    }
  }, {
    key: "attachRefreshEvent",
    value: function attachRefreshEvent(refreshData) {
      var _this4 = this;

      this.on('change', function (event) {
        if (refreshData === 'data') {
          _this4.refresh(_this4.data);
        } else if (event.changed && event.changed.component && event.changed.component.key === refreshData & // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
        // in fields inside EditGrids could alter their state from other rows (which is bad).
        _this4.inContext(event.changed.instance)) {
          _this4.refresh(event.changed.value);
        }
      }, true);
    }
  }, {
    key: "attachRefreshOn",
    value: function attachRefreshOn() {
      var _this5 = this;

      // If they wish to refresh on a value, then add that here.
      if (this.component.refreshOn) {
        if (Array.isArray(this.component.refreshOn)) {
          this.component.refreshOn.forEach(function (refreshData) {
            _this5.attachRefreshEvent(refreshData);
          });
        } else {
          this.attachRefreshEvent(this.component.refreshOn);
        }
      }
    }
  }, {
    key: "viewOnlyBuild",
    value: function viewOnlyBuild() {
      this.createViewOnlyElement();
      this.createViewOnlyLabel(this.element);
      this.createViewOnlyValue(this.element);
    }
  }, {
    key: "createViewOnlyElement",
    value: function createViewOnlyElement() {
      this.element = this.ce('dl', {
        id: this.id
      });

      if (this.element) {
        // Ensure you can get the component info from the element.
        this.element.component = this;
      }

      return this.element;
    }
  }, {
    key: "createViewOnlyLabel",
    value: function createViewOnlyLabel(container) {
      if (this.labelIsHidden()) {
        return;
      }

      this.labelElement = this.ce('dt');
      this.labelElement.appendChild(this.text(this.component.label));
      this.createTooltip(this.labelElement);
      container.appendChild(this.labelElement);
    }
  }, {
    key: "createViewOnlyValue",
    value: function createViewOnlyValue(container) {
      this.valueElement = this.ce('dd');
      this.setupValueElement(this.valueElement);
      container.appendChild(this.valueElement);
    }
  }, {
    key: "setupValueElement",
    value: function setupValueElement(element) {
      var value = this.getValue();
      value = this.isEmpty(value) ? this.defaultViewOnlyValue : this.getView(value);
      element.innerHTML = value;
    }
  }, {
    key: "getView",
    value: function getView(value) {
      if (!value) {
        return '';
      }

      var widget = this.widget;

      if (widget && widget.getView) {
        return widget.getView(value);
      }

      if (Array.isArray(value)) {
        return value.join(', ');
      }

      return value.toString();
    }
  }, {
    key: "updateItems",
    value: function updateItems() {
      this.restoreValue();
      this.onChange.apply(this, arguments);
    }
  }, {
    key: "updateViewOnlyValue",
    value: function updateViewOnlyValue() {
      if (!this.valueElement) {
        return;
      }

      this.setupValueElement(this.valueElement);
    }
  }, {
    key: "createModal",
    value: function createModal() {
      var _this6 = this;

      var modalBody = this.ce('div');
      var modalOverlay = this.ce('div', {
        class: 'formio-dialog-overlay'
      });
      var closeDialog = this.ce('button', {
        class: 'formio-dialog-close pull-right btn btn-default btn-xs',
        'aria-label': 'close'
      });
      var modalBodyContainer = this.ce('div', {
        class: 'formio-dialog-content'
      }, [modalBody, closeDialog]);
      var dialog = this.ce('div', {
        class: 'formio-dialog formio-dialog-theme-default component-settings'
      }, [modalOverlay, modalBodyContainer]);
      this.addEventListener(modalOverlay, 'click', function (event) {
        event.preventDefault();
        dialog.close();
      });
      this.addEventListener(closeDialog, 'click', function (event) {
        event.preventDefault();
        dialog.close();
      });
      this.addEventListener(dialog, 'close', function () {
        _this6.removeChildFrom(dialog, document.body);
      });
      document.body.appendChild(dialog);
      dialog.body = modalBody;
      dialog.bodyContainer = modalBodyContainer;

      dialog.close = function () {
        dialog.dispatchEvent(new CustomEvent('close'));

        _this6.removeChildFrom(dialog, document.body);
      };

      return dialog;
    }
    /**
     * Retrieves the CSS class name of this component.
     * @returns {string} - The class name of this component.
     */

  }, {
    key: "getElement",

    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    value: function getElement() {
      return this.element;
    }
    /**
     * Create the outside wrapping element for this component.
     * @returns {HTMLElement}
     */

  }, {
    key: "createElement",
    value: function createElement() {
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
      }); // Ensure you can get the component info from the element.

      this.element.component = this;
      this.hook('element', this.element);
      return this.element;
    }
    /**
     * Create the input wrapping element. For multiple, this may be the table wrapper for the elements.
     * @returns {boolean}
     */

  }, {
    key: "createWrapper",
    value: function createWrapper() {
      if (!this.component.multiple) {
        return false;
      } else {
        var table = this.ce('table', {
          class: 'table table-bordered'
        });
        this.tbody = this.ce('tbody');
        table.appendChild(this.tbody); // Add a default value.

        var dataValue = this.dataValue;

        if (!dataValue || !dataValue.length) {
          this.addNewValue(this.defaultValue);
        } // Build the rows.


        this.buildRows();
        this.setInputStyles(table); // Add the table to the element.

        this.append(table);
        return true;
      }
    }
  }, {
    key: "evalContext",
    value: function evalContext(additional) {
      return _get(_getPrototypeOf(BaseComponent.prototype), "evalContext", this).call(this, Object.assign({
        instance: this,
        component: this.component,
        row: this.data,
        value: this.key && this.hasValue() ? this.dataValue : this.emptyValue,
        rowIndex: this.rowIndex,
        data: this.rootValue,
        submission: this.root ? this.root._submission : {},
        form: this.root ? this.root._form : {}
      }, additional));
    }
  }, {
    key: "setPristine",

    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */
    value: function setPristine(pristine) {
      this.pristine = pristine;
    }
    /**
     * Adds a new empty value to the data array.
     */

  }, {
    key: "addNewValue",
    value: function addNewValue(value) {
      if (value === undefined) {
        value = this.emptyValue;
      }

      var dataValue = this.dataValue || [];

      if (!Array.isArray(dataValue)) {
        dataValue = [dataValue];
      }

      if (Array.isArray(value)) {
        dataValue = dataValue.concat(value);
      } else {
        dataValue.push(value);
      }

      this.dataValue = dataValue;
    }
    /**
     * Adds a new empty value to the data array, and add a new row to contain it.
     */

  }, {
    key: "addValue",
    value: function addValue() {
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

  }, {
    key: "removeValue",
    value: function removeValue(index) {
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

  }, {
    key: "buildRows",
    value: function buildRows(values) {
      var _this7 = this;

      if (!this.tbody) {
        return;
      }

      var allowReorder = this.allowReorder;
      this.inputs = [];
      this.tbody.innerHTML = '';
      values = values && values.length > 0 ? values : this.dataValue;

      _lodash.default.each(values, function (value, index) {
        var tr = _this7.ce('tr');

        if (allowReorder) {
          tr.appendChild(_this7.ce('td', {
            class: 'formio-drag-column'
          }, _this7.dragButton()));
        }

        var td = _this7.ce('td');

        _this7.buildInput(td, value, index);

        tr.appendChild(td);

        if (!_this7.shouldDisable) {
          var tdAdd = _this7.ce('td', {
            class: 'formio-remove-column'
          });

          tdAdd.appendChild(_this7.removeButton(index));
          tr.appendChild(tdAdd);
        }

        if (allowReorder) {
          tr.dragInfo = {
            index: index
          };
        }

        _this7.tbody.appendChild(tr);
      });

      if (!this.shouldDisable) {
        var tr = this.ce('tr');
        var td = this.ce('td', {
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
  }, {
    key: "addDraggable",
    value: function addDraggable(containers) {
      this.dragula = (0, _dragula.default)(containers, this.getRowDragulaOptions()).on('drop', this.onRowDrop.bind(this));
    }
  }, {
    key: "getRowDragulaOptions",
    value: function getRowDragulaOptions() {
      return {
        moves: function moves(draggedElement, oldParent, clickedElement) {
          //allow dragging only on drag button (not the whole row)
          return clickedElement.classList.contains('formio-drag-button');
        }
      };
    }
  }, {
    key: "onRowDrop",
    value: function onRowDrop(droppedElement, newParent, oldParent, nextSibling) {
      //move them in data value as well
      if (!droppedElement.dragInfo || nextSibling && !nextSibling.dragInfo) {
        console.warn('There is no Drag Info available for either dragged or sibling element');
        return;
      }

      var oldPosition = droppedElement.dragInfo.index; //should drop at next sibling position; no next sibling means drop to last position

      var newPosition = nextSibling ? nextSibling.dragInfo.index : this.dataValue.length;
      var movedBelow = newPosition > oldPosition;

      var dataValue = _lodash.default.cloneDeep(this.dataValue);

      var draggedRowData = dataValue[oldPosition]; //insert element at new position

      dataValue.splice(newPosition, 0, draggedRowData); //remove element from old position (if was moved above, after insertion it's at +1 index)

      dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1); //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)

      this.setValue(dataValue);
    }
  }, {
    key: "buildInput",
    value: function buildInput(container, value) {
      var input = this.createInput(container);
      input.value = value;
    }
    /**
     * Adds a new button to add new rows to the multiple input elements.
     * @returns {HTMLElement} - The "Add New" button html element.
     */

  }, {
    key: "addButton",
    value: function addButton(justIcon) {
      var _this8 = this;

      var addButton = this.ce('button', {
        class: 'btn btn-primary formio-button-add-row'
      });
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();

        _this8.addValue();
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });

      if (justIcon) {
        addButton.appendChild(addIcon);
        return addButton;
      } else {
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

  }, {
    key: "errorMessage",

    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    value: function errorMessage(type) {
      return this.component.errors && this.component.errors[type] ? this.component.errors[type] : type;
    }
    /**
     * Creates a new "remove" row button and returns the html element of that button.
     * @param {number} index - The index of the row that should be removed.
     * @returns {HTMLElement} - The html element of the remove button.
     */

  }, {
    key: "removeButton",
    value: function removeButton(index) {
      var _this9 = this;

      var removeButton = this.ce('button', {
        type: 'button',
        class: 'btn btn-default btn-secondary formio-button-remove-row'
      });
      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();

        _this9.removeValue(index);
      });
      var removeIcon = this.ce('i', {
        class: this.iconClass('remove-circle')
      });
      removeButton.appendChild(removeIcon);
      return removeButton;
    }
  }, {
    key: "dragButton",
    value: function dragButton() {
      return this.ce('button', {
        class: "formio-drag-button btn btn-default btn-small ".concat(this.iconClass('menu-hamburger'))
      });
    }
  }, {
    key: "labelOnTheLeft",
    value: function labelOnTheLeft(position) {
      return ['left-left', 'left-right'].includes(position);
    }
  }, {
    key: "labelOnTheRight",
    value: function labelOnTheRight(position) {
      return ['right-left', 'right-right'].includes(position);
    }
  }, {
    key: "rightAlignedLabel",
    value: function rightAlignedLabel(position) {
      return ['left-right', 'right-right'].includes(position);
    }
  }, {
    key: "labelOnTheLeftOrRight",
    value: function labelOnTheLeftOrRight(position) {
      return this.labelOnTheLeft(position) || this.labelOnTheRight(position);
    }
  }, {
    key: "getLabelWidth",
    value: function getLabelWidth() {
      if (!this.component.labelWidth) {
        this.component.labelWidth = 30;
      }

      return this.component.labelWidth;
    }
  }, {
    key: "getLabelMargin",
    value: function getLabelMargin() {
      if (!this.component.labelMargin) {
        this.component.labelMargin = 3;
      }

      return this.component.labelMargin;
    }
  }, {
    key: "setInputStyles",
    value: function setInputStyles(input) {
      if (this.labelIsHidden()) {
        return;
      }

      if (this.labelOnTheLeftOrRight(this.component.labelPosition)) {
        var totalLabelWidth = this.getLabelWidth() + this.getLabelMargin();
        input.style.width = "".concat(100 - totalLabelWidth, "%");

        if (this.labelOnTheLeft(this.component.labelPosition)) {
          input.style.marginLeft = "".concat(totalLabelWidth, "%");
        } else {
          input.style.marginRight = "".concat(totalLabelWidth, "%");
        }
      }
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return !this.component.label || this.component.hideLabel || this.options.inputsOnly || this.inDataGrid && !this.component.dataGridLabel;
    }
    /**
     * Create the HTML element for the label of this component.
     * @param {HTMLElement} container - The containing element that will contain this label.
     */

  }, {
    key: "createLabel",
    value: function createLabel(container) {
      var isLabelHidden = this.labelIsHidden();
      var className = 'control-label';
      var style = '';

      if (!isLabelHidden) {
        var labelPosition = this.component.labelPosition; // Determine label styles/classes depending on position.

        if (labelPosition === 'bottom') {
          className += ' control-label--bottom';
        } else if (labelPosition && labelPosition !== 'top') {
          var labelWidth = this.getLabelWidth();
          var labelMargin = this.getLabelMargin(); // Label is on the left or right.

          if (this.labelOnTheLeft(labelPosition)) {
            style += "float: left; width: ".concat(labelWidth, "%; margin-right: ").concat(labelMargin, "%; ");
          } else if (this.labelOnTheRight(labelPosition)) {
            style += "float: right; width: ".concat(labelWidth, "%; margin-left: ").concat(labelMargin, "%; ");
          }

          if (this.rightAlignedLabel(labelPosition)) {
            style += 'text-align: right; ';
          }
        }
      } else {
        this.addClass(container, 'formio-component-label-hidden');
        className += ' control-label--hidden';
      }

      if (this.hasInput && this.component.validate && this.component.validate.required) {
        className += ' field-required';
      }

      this.labelElement = this.ce('label', {
        class: className,
        style: style
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
  }, {
    key: "addShortcutToLabel",
    value: function addShortcutToLabel(label, shortcut) {
      if (!label) {
        label = this.component.label;
      }

      if (!shortcut) {
        shortcut = this.component.shortcut;
      }

      if (!shortcut || !/^[A-Za-z]$/.test(shortcut)) {
        return label;
      }

      var match = label.match(new RegExp(shortcut, 'i'));

      if (!match) {
        return label;
      }

      var index = match.index + 1;
      var lowLineCombinator = "\u0332";
      return label.substring(0, index) + lowLineCombinator + label.substring(index);
    }
  }, {
    key: "addShortcut",
    value: function addShortcut(element, shortcut) {
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
  }, {
    key: "removeShortcut",
    value: function removeShortcut(element, shortcut) {
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

  }, {
    key: "createTooltip",
    value: function createTooltip(container, component, classes) {
      if (this.tooltip) {
        return;
      }

      component = component || this.component;
      classes = classes || "".concat(this.iconClass('question-sign'), " text-muted");

      if (!component.tooltip) {
        return;
      }

      var ttElement = this.ce('i', {
        class: classes
      });
      container.appendChild(this.text(' '));
      container.appendChild(ttElement);
      this.tooltip = new _tooltip.default(ttElement, {
        trigger: 'hover click',
        placement: 'right',
        html: true,
        title: this.interpolate(this.t(component.tooltip)).replace(/(?:\r\n|\r|\n)/g, '<br />')
      });
    }
    /**
     * Creates the description block for this input field.
     * @param container
     */

  }, {
    key: "createDescription",
    value: function createDescription(container) {
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

  }, {
    key: "createErrorElement",
    value: function createErrorElement() {
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

  }, {
    key: "addPrefix",
    value: function addPrefix(input, inputGroup) {
      var prefix = null;

      if (input.widget) {
        return input.widget.addPrefix(inputGroup);
      }

      if (this.component.prefix && typeof this.component.prefix === 'string') {
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

  }, {
    key: "addSuffix",
    value: function addSuffix(input, inputGroup) {
      var suffix = null;

      if (input.widget) {
        return input.widget.addSuffix(inputGroup);
      }

      if (this.component.suffix && typeof this.component.suffix === 'string') {
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

  }, {
    key: "addInputGroup",
    value: function addInputGroup(input, container) {
      var inputGroup = null;

      if (this.component.prefix || this.component.suffix) {
        inputGroup = this.ce('div', {
          class: 'input-group'
        });
        container.appendChild(inputGroup);
      }

      return inputGroup;
    } // Default the mask to the component input mask.

  }, {
    key: "setInputMask",
    value: function setInputMask(input, inputMask) {
      return _get(_getPrototypeOf(BaseComponent.prototype), "setInputMask", this).call(this, input, inputMask || this.component.inputMask, !this.component.placeholder);
    }
    /**
     * Creates a new input element.
     * @param {HTMLElement} container - The container which should hold this new input element.
     * @returns {HTMLElement} - Either the input or the group that contains the input.
     */

  }, {
    key: "createInput",
    value: function createInput(container) {
      var input = this.ce(this.info.type, this.info.attr);
      this.setInputMask(input);
      input.widget = this.createWidget();
      var inputGroup = this.addInputGroup(input, container);
      this.addPrefix(input, inputGroup);
      this.addInput(input, inputGroup || container);
      this.addSuffix(input, inputGroup);
      this.errorContainer = container;
      this.setInputStyles(inputGroup || input); // Attach the input to the widget.

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

  }, {
    key: "createWidget",

    /**
     * Creates an instance of a widget for this component.
     *
     * @return {null}
     */
    value: function createWidget() {
      var _this10 = this;

      // Return null if no widget is found.
      if (!this.component.widget) {
        return null;
      } // Get the widget settings.


      var settings = typeof this.component.widget === 'string' ? {
        type: this.component.widget
      } : this.component.widget; // Make sure we have a widget.

      if (!_widgets.default.hasOwnProperty(settings.type)) {
        return null;
      } // Pass along some options.


      settings.icons = this.options.icons;
      settings.i18n = this.options.i18n;
      settings.language = this.options.language; // Create the widget.

      var widget = new _widgets.default[settings.type](settings, this.component);
      widget.on('update', function () {
        return _this10.updateValue();
      }, true);
      widget.on('redraw', function () {
        return _this10.redraw();
      }, true);
      this._widget = widget;
      return widget;
    }
  }, {
    key: "redraw",
    value: function redraw(shouldRedrawInBuilder) {
      // Don't bother if we have not built yet.
      // Don't redraw if it's builder - because component would lose builder buttons
      if (!this.isBuilt || !shouldRedrawInBuilder && this.options.builder) {
        return;
      }

      this.build(this.clear());
    }
  }, {
    key: "destroyInputs",
    value: function destroyInputs() {
      var _this11 = this;

      _lodash.default.each(this.inputs, function (input) {
        input = _this11.performInputMapping(input);

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

  }, {
    key: "destroy",
    value: function destroy() {
      var state = _get(_getPrototypeOf(BaseComponent.prototype), "destroy", this).apply(this, arguments) || {};
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

  }, {
    key: "renderTemplate",
    value: function renderTemplate(template, data) {
      var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.renderTemplateToElement(this.ce('div'), template, data, actions);
    }
  }, {
    key: "renderElement",
    value: function renderElement(template, data) {
      var actions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
      return this.renderTemplate(template, data, actions).firstChild;
    }
  }, {
    key: "renderTemplateToElement",
    value: function renderTemplateToElement(element, template, data) {
      var actions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      element.innerHTML = this.interpolate(template, data).trim();
      this.attachActions(element, actions);
      return element;
    }
  }, {
    key: "attachActions",
    value: function attachActions(element, actions) {
      actions.forEach(function (action) {
        var elements = element.getElementsByClassName(action.class);
        Array.prototype.forEach.call(elements, function (element) {
          element.addEventListener(action.event, action.action);
        });
      });
    }
    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */

  }, {
    key: "hasCondition",
    value: function hasCondition() {
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

  }, {
    key: "conditionallyVisible",
    value: function conditionallyVisible(data) {
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

  }, {
    key: "checkCondition",
    value: function checkCondition(row, data) {
      return FormioUtils.checkCondition(this.component, row || this.data, data || this.rootValue, this.root ? this.root._form : {}, this);
    }
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */

  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      data = data || this.rootValue; // Check advanced conditions

      var result = this.show(this.conditionallyVisible(data));

      if (!this.options.builder && this.fieldLogic(data)) {
        this.redraw();
      }

      return result;
    }
  }, {
    key: "fieldLogic",

    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    value: function fieldLogic(data) {
      var _this12 = this;

      data = data || this.rootValue;
      var logics = this.logic; // If there aren't logic, don't go further.

      if (logics.length === 0) {
        return;
      }

      var newComponent = _lodash.default.cloneDeep(this.originalComponent);

      var changed = logics.reduce(function (changed, logic) {
        var result = FormioUtils.checkTrigger(newComponent, logic.trigger, _this12.data, data, _this12.root ? _this12.root._form : {}, _this12);

        if (result) {
          changed |= _this12.applyActions(logic.actions, result, data, newComponent);
        }

        return changed;
      }, false); // If component definition changed, replace and mark as changed.

      if (!_lodash.default.isEqual(this.component, newComponent)) {
        this.component = newComponent;
        changed = true;
      }

      return changed;
    }
  }, {
    key: "applyActions",
    value: function applyActions(actions, result, data, newComponent) {
      var _this13 = this;

      return actions.reduce(function (changed, action) {
        switch (action.type) {
          case 'property':
            FormioUtils.setActionProperty(newComponent, action, _this13.data, data, newComponent, result, _this13);
            break;

          case 'value':
            {
              var oldValue = _this13.getValue();

              var newValue = _this13.evaluate(action.value, {
                value: _lodash.default.clone(oldValue),
                data: data,
                component: newComponent,
                result: result
              }, 'value');

              if (!_lodash.default.isEqual(oldValue, newValue)) {
                _this13.setValue(newValue);

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

  }, {
    key: "addInputError",
    value: function addInputError(message, dirty) {
      var _this14 = this;

      if (!message) {
        return;
      }

      if (this.errorElement) {
        var errorMessage = this.ce('p', {
          class: 'help-block'
        });
        errorMessage.appendChild(this.text(message));
        this.errorElement.appendChild(errorMessage);
      } // Add error classes


      this.addClass(this.element, 'has-error');
      this.inputs.forEach(function (input) {
        return _this14.addClass(_this14.performInputMapping(input), 'is-invalid');
      });

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

  }, {
    key: "inContext",
    value: function inContext(component) {
      if (component.data === this.data) {
        return true;
      }

      var parent = this.parent;

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

  }, {
    key: "show",
    value: function show(_show, noClear) {
      if (!this.options.builder && this.options.hide && this.options.hide[this.component.key]) {
        _show = false;
      } else if (this.options.builder || this.options.show && this.options.show[this.component.key]) {
        _show = true;
      } // Execute only if visibility changes or if we are in builder mode or if hidden fields should be shown.


      if (!_show === !this._visible || this.options.builder || this.options.showHiddenFields) {
        if (!_show) {
          this.clearOnHide(false);
        }

        return _show;
      }

      this.visible = _show;
      this.showElement(_show && !this.component.hidden);

      if (!noClear) {
        this.clearOnHide(_show);
      }

      return _show;
    }
    /**
     * Show or hide the root element of this component.
     *
     * @param element
     * @param show
     */

  }, {
    key: "showElement",
    value: function showElement(element, show) {
      if (typeof element === 'boolean') {
        show = element;
        element = this.getElement();
      }

      if (element) {
        if (show) {
          element.removeAttribute('hidden');
          element.style.visibility = 'visible';
          element.style.position = 'relative';
        } else if (this.parent && this.parent.parent && this.parent.parent.component.type === 'columns' && this.parent.parent.component.autoAdjust) {
          element.style.visibility = 'hidden';
          element.style.position = 'relative';
        } else {
          element.setAttribute('hidden', true);
          element.style.visibility = 'hidden';
          element.style.position = 'absolute';
        }
      }

      return show;
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide(show) {
      // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
      if (this.component.clearOnHide !== false && !this.options.readOnly && !this.options.showHiddenFields) {
        if (!show) {
          this.deleteValue();
        } else if (!this.hasValue()) {
          // If shown, ensure the default is set.
          this.setValue(this.defaultValue, {
            noUpdateEvent: true
          });
        }
      }
    }
  }, {
    key: "onChange",
    value: function onChange(flags, fromRoot) {
      flags = flags || {};

      if (flags.modified) {
        // Add a modified class if this element was manually modified.
        this.pristine = false;
        this.addClass(this.getElement(), 'formio-modified');
      } // If we are supposed to validate on blur, then don't trigger validation yet.


      if (this.component.validateOn === 'blur' && !this.errors.length) {
        flags.noValidate = true;
      }

      if (this.component.onChange) {
        this.evaluate(this.component.onChange);
      } // Set the changed variable.


      var changed = {
        instance: this,
        component: this.component,
        value: this.dataValue,
        flags: flags
      }; // Emit the change.

      this.emit('componentChange', changed); // Bubble this change up to the top.

      if (this.root && !fromRoot) {
        this.root.triggerChange(flags, changed);
      }
    }
  }, {
    key: "addInputSubmitListener",
    value: function addInputSubmitListener(input) {
      var _this15 = this;

      if (!this.options.submitOnEnter) {
        return;
      }

      this.addEventListener(input, 'keypress', function (event) {
        var key = event.keyCode || event.which;

        if (key === 13) {
          event.preventDefault();
          event.stopPropagation();

          _this15.emit('submitButton');
        }
      });
    }
    /**
     * Add new input element listeners.
     *
     * @param input
     */

  }, {
    key: "addInputEventListener",
    value: function addInputEventListener(input) {
      var _this16 = this;

      this.addEventListener(input, this.info.changeEvent, function () {
        return _this16.updateValue({
          modified: true
        });
      });
    }
    /**
     * Add a new input to this comonent.
     *
     * @param input
     * @param container
     * @param noSet
     */

  }, {
    key: "addInput",
    value: function addInput(input, container) {
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
  }, {
    key: "addFocusBlurEvents",
    value: function addFocusBlurEvents(element) {
      var _this17 = this;

      this.addEventListener(element, 'focus', function () {
        if (_this17.root.focusedComponent !== _this17) {
          if (_this17.root.pendingBlur) {
            _this17.root.pendingBlur();
          }

          _this17.root.focusedComponent = _this17;

          _this17.emit('focus', _this17);
        } else if (_this17.root.focusedComponent === _this17 && _this17.root.pendingBlur) {
          _this17.root.pendingBlur.cancel();

          _this17.root.pendingBlur = null;
        }
      });
      this.addEventListener(element, 'blur', function () {
        _this17.root.pendingBlur = FormioUtils.delay(function () {
          _this17.emit('blur', _this17);

          if (_this17.component.validateOn === 'blur') {
            _this17.root.triggerChange({}, {
              instance: _this17,
              component: _this17.component,
              value: _this17.dataValue,
              flags: {}
            });
          }

          _this17.root.focusedComponent = null;
          _this17.root.pendingBlur = null;
        });
      });
    }
  }, {
    key: "addCKE",
    value: function addCKE(element, settings, onChange) {
      settings = _lodash.default.isEmpty(settings) ? {} : settings;
      return _Formio.default.requireLibrary('ckeditor', 'ClassicEditor', CKEDITOR, true).then(function () {
        if (!element.parentNode) {
          return _nativePromiseOnly.default.reject();
        }

        return ClassicEditor.create(element, settings).then(function (editor) {
          editor.model.document.on('change', function () {
            return onChange(editor.data.get());
          });
          return editor;
        });
      });
    }
  }, {
    key: "addQuill",
    value: function addQuill(element, settings, onChange) {
      var _this18 = this;

      settings = _lodash.default.isEmpty(settings) ? this.wysiwygDefault : settings; // Lazy load the quill css.

      _Formio.default.requireLibrary("quill-css-".concat(settings.theme), 'Quill', [{
        type: 'styles',
        src: "https://cdn.quilljs.com/1.3.6/quill.".concat(settings.theme, ".css")
      }], true); // Lazy load the quill library.


      return _Formio.default.requireLibrary('quill', 'Quill', 'https://cdn.quilljs.com/1.3.6/quill.min.js', true).then(function () {
        if (!element.parentNode) {
          return _nativePromiseOnly.default.reject();
        }

        _this18.quill = new Quill(element, settings);
        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/

        var txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');

        _this18.quill.addContainer('ql-custom').appendChild(txtArea);

        var qlSource = element.parentNode.querySelector('.ql-source');

        if (qlSource) {
          _this18.addEventListener(qlSource, 'click', function (event) {
            event.preventDefault();

            if (txtArea.style.display === 'inherit') {
              _this18.quill.setContents(_this18.quill.clipboard.convert(txtArea.value));
            }

            txtArea.style.display = txtArea.style.display === 'none' ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/
        // Make sure to select cursor when they click on the element.


        _this18.addEventListener(element, 'click', function () {
          return _this18.quill.focus();
        }); // Allows users to skip toolbar items when tabbing though form


        var elm = document.querySelectorAll('.ql-formats > button');

        for (var i = 0; i < elm.length; i++) {
          elm[i].setAttribute('tabindex', '-1');
        }

        _this18.quill.on('text-change', function () {
          txtArea.value = _this18.quill.root.innerHTML;
          onChange(txtArea);
        });

        return _this18.quill;
      });
    }
    /**
     * The empty value for this component.
     *
     * @return {null}
     */

  }, {
    key: "hasValue",

    /**
     * Returns if this component has a value set.
     *
     */
    value: function hasValue(data) {
      return _lodash.default.has(data || this.data, this.key);
    }
    /**
     * Get the value of this component.
     *
     * @return {*}
     */

  }, {
    key: "splice",

    /**
     * Splice a value from the dataValue.
     *
     * @param index
     */
    value: function splice(index) {
      if (this.hasValue()) {
        var dataValue = this.dataValue || [];

        if (_lodash.default.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
          dataValue.splice(index, 1);
          this.dataValue = dataValue;
          this.triggerChange();
        }
      }
    }
    /**
     * Deletes the value of the component.
     */

  }, {
    key: "deleteValue",
    value: function deleteValue() {
      this.setValue(null, {
        noUpdateEvent: true,
        noDefault: true
      });

      _lodash.default.unset(this.data, this.key);
    }
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */

  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      var input = this.performInputMapping(this.inputs[index]);

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

  }, {
    key: "getValue",
    value: function getValue() {
      if (!this.hasInput) {
        return;
      }

      if (this.viewOnly) {
        return this.dataValue;
      }

      var values = [];

      for (var i in this.inputs) {
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

  }, {
    key: "hasChanged",
    value: function hasChanged(before, after) {
      if ((before === undefined || before === null) && (after === undefined || after === null)) {
        return false;
      }

      return !_lodash.default.isEqual(before, after);
    }
    /**
     * Update the value on change.
     *
     * @param flags
     * @param changed
     */

  }, {
    key: "updateOnChange",
    value: function updateOnChange(flags, changed) {
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

  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      if (!this.hasInput) {
        return false;
      }

      flags = flags || {};
      var newValue = value;

      if (!this.visible && this.component.clearOnHide) {
        newValue = this.dataValue;
      } else if (value === undefined || value === null) {
        newValue = this.getValue(flags);
      }

      var changed = newValue !== undefined ? this.hasChanged(newValue, this.dataValue) : false;
      this.dataValue = newValue;

      if (this.viewOnly) {
        this.updateViewOnlyValue(newValue);
      }

      this.updateOnChange(flags, changed);
      return changed;
    }
  }, {
    key: "restoreValue",

    /**
     * Restore the value of a control.
     */
    value: function restoreValue() {
      if (this.hasSetValue) {
        this.setValue(this.dataValue, {
          noUpdateEvent: true
        });
      } else {
        var defaultValue = this.defaultValue;

        if (!_lodash.default.isNil(defaultValue)) {
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

  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags) {
      // If no calculated value or
      // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
      if (!this.component.calculateValue || (!this.visible || this.component.hidden) && this.component.clearOnHide) {
        return false;
      } // Get the dataValue.


      var firstPass = false;
      var dataValue = null;
      var allowOverride = this.component.allowCalculateOverride;

      if (allowOverride) {
        dataValue = this.dataValue;
      } // First pass, the calculatedValue is undefined.


      if (this.calculatedValue === undefined) {
        firstPass = true;
        this.calculatedValue = null;
      } // Check to ensure that the calculated value is different than the previously calculated value.


      if (allowOverride && this.calculatedValue !== null && !_lodash.default.isEqual(dataValue, this.calculatedValue)) {
        return false;
      } // Calculate the new value.


      var calculatedValue = this.evaluate(this.component.calculateValue, {
        value: this.defaultValue,
        data: data
      }, 'value'); // If this is the firstPass, and the dataValue is different than to the calculatedValue.

      if (allowOverride && firstPass && !this.isEmpty(dataValue) && !_lodash.default.isEqual(dataValue, calculatedValue)) {
        // Return that we have a change so it will perform another pass.
        this.calculatedValue = calculatedValue;
        return true;
      }

      flags = flags || {};
      flags.noCheck = true;
      var changed = this.setValue(calculatedValue, flags);
      this.calculatedValue = this.dataValue;
      return changed;
    }
    /**
     * Get this component's label text.
     *
     */

  }, {
    key: "getRoot",

    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    value: function getRoot() {
      return this.root;
    }
    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */

  }, {
    key: "invalidMessage",
    value: function invalidMessage(data, dirty, ignoreCondition) {
      // Force valid if component is conditionally hidden.
      if (!ignoreCondition && !this.checkCondition(null, data)) {
        return '';
      } // See if this is forced invalid.


      if (this.invalid) {
        return this.invalid;
      } // No need to check for errors if there is no input or if it is pristine.


      if (!this.hasInput || !dirty && this.pristine) {
        return '';
      }

      return _Validator.default.check(this, data);
    }
    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */

  }, {
    key: "isValid",
    value: function isValid(data, dirty) {
      return !this.invalidMessage(data, dirty);
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, rowData) {
      if (this.shouldSkipValidation(data, dirty, rowData)) {
        this.setCustomValidity('');
        return true;
      }

      var message = this.invalidMessage(data, dirty, true);
      this.setCustomValidity(message, dirty);
      return message ? false : true;
    }
    /* eslint-disable max-len */

  }, {
    key: "getRawValue",
    value: function getRawValue() {
      console.warn('component.getRawValue() has been deprecated. Use component.validationValue or component.dataValue instead.');
      return this.validationValue;
    }
    /* eslint-enable max-len */

  }, {
    key: "isEmpty",
    value: function isEmpty(value) {
      return value == null || value.length === 0 || _lodash.default.isEqual(value, this.emptyValue);
    }
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */

  }, {
    key: "validateMultiple",
    value: function validateMultiple(value) {
      return this.component.multiple && Array.isArray(value);
    }
  }, {
    key: "setCustomValidity",
    value: function setCustomValidity(message, dirty) {
      var _this19 = this;

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
      } else {
        this.inputs.forEach(function (input) {
          return _this19.removeClass(_this19.performInputMapping(input), 'is-invalid');
        });

        if (this.options.highlightErrors) {
          this.removeClass(this.element, 'alert alert-danger');
        }

        this.removeClass(this.element, 'has-error');
        this.error = null;
      }

      this.inputs.forEach(function (input) {
        input = _this19.performInputMapping(input);

        if (typeof input.setCustomValidity === 'function') {
          input.setCustomValidity(message, dirty);
        }
      });
    }
  }, {
    key: "shouldSkipValidation",
    value: function shouldSkipValidation(data, dirty, rowData) {
      var _this20 = this;

      var rules = [// Force valid if component is hidden.
      function () {
        return !_this20.visible;
      }, // Force valid if component is conditionally hidden.
      function () {
        return !_this20.checkCondition(rowData, data);
      }];
      return rules.some(function (pred) {
        return pred();
      });
    }
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */

  }, {
    key: "setValueAt",
    value: function setValueAt(index, value, flags) {
      flags = flags || {};

      if (!flags.noDefault && (value === null || value === undefined)) {
        value = this.defaultValue;
      }

      var input = this.performInputMapping(this.inputs[index]);

      if (input.mask) {
        input.mask.textMaskInputElement.update(value);
      } else {
        input.value = value;
      }

      if (input.widget) {
        input.widget.setValue(value);
      }
    }
  }, {
    key: "getFlags",
    value: function getFlags() {
      return typeof arguments[1] === 'boolean' ? {
        noUpdateEvent: arguments[1],
        noValidate: arguments[2]
      } : arguments[1] || {};
    } // Maintain reverse compatibility.

  }, {
    key: "whenReady",
    value: function whenReady() {
      console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
      return this.dataReady;
    }
  }, {
    key: "refresh",

    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */
    value: function refresh(value) {
      if (this.hasOwnProperty('refreshOnValue')) {
        this.refreshOnChanged = !_lodash.default.isEqual(value, this.refreshOnValue);
      } else {
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

  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);

      if (!this.hasInput) {
        return false;
      }

      if (this.component.multiple && !Array.isArray(value)) {
        value = value ? [value] : [];
      }

      this.buildRows(value);
      var isArray = Array.isArray(value);

      for (var i in this.inputs) {
        if (this.inputs.hasOwnProperty(i)) {
          this.setValueAt(i, isArray ? value[i] : value, flags);
        }
      }

      return this.updateValue(flags);
    }
    /**
     * Resets the value of this component.
     */

  }, {
    key: "resetValue",
    value: function resetValue() {
      this.setValue(this.emptyValue, {
        noUpdateEvent: true,
        noValidate: true
      });

      _lodash.default.unset(this.data, this.key);
    }
    /**
     * Prints out the value of this component as a string value.
     */

  }, {
    key: "asString",
    value: function asString(value) {
      value = value || this.getValue();
      return Array.isArray(value) ? value.join(', ') : value.toString();
    }
    /**
     * Return if the component is disabled.
     * @return {boolean}
     */

  }, {
    key: "setDisabled",
    value: function setDisabled(element, disabled) {
      element.disabled = disabled;

      if (element.widget) {
        element.widget.disabled = disabled;
      }

      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }, {
    key: "setLoading",
    value: function setLoading(element, loading) {
      if (element.loading === loading) {
        return;
      }

      element.loading = loading;

      if (!element.loader && loading) {
        element.loader = this.ce('i', {
          class: "".concat(this.iconClass('refresh', true), " button-icon-right")
        });
      }

      if (element.loader) {
        if (loading) {
          this.appendTo(element.loader, element);
        } else {
          this.removeChildFrom(element.loader, element);
        }
      }
    }
  }, {
    key: "selectOptions",
    value: function selectOptions(select, tag, options, defaultValue) {
      var _this21 = this;

      _lodash.default.each(options, function (option) {
        var attrs = {
          value: option.value
        };

        if (defaultValue !== undefined && option.value === defaultValue) {
          attrs.selected = 'selected';
        }

        var optionElement = _this21.ce('option', attrs);

        optionElement.appendChild(_this21.text(option.label));
        select.appendChild(optionElement);
      });
    }
  }, {
    key: "setSelectValue",
    value: function setSelectValue(select, value) {
      var options = select.querySelectorAll('option');

      _lodash.default.each(options, function (option) {
        if (option.value === value) {
          option.setAttribute('selected', 'selected');
        } else {
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

  }, {
    key: "clear",
    value: function clear() {
      var state = this.destroy() || {};
      this.empty(this.getElement());
      return state;
    }
    /**
     * Get the element information.
     */

  }, {
    key: "elementInfo",
    value: function elementInfo() {
      var attributes = {
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
  }, {
    key: "autofocus",
    value: function autofocus() {
      var _this22 = this;

      if (this.component.autofocus) {
        this.on('render', function () {
          return _this22.focus();
        }, true);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      // Do not focus for readOnly forms.
      if (this.options.readOnly) {
        return;
      }

      var input = this.performInputMapping(this.inputs[0]);

      if (input) {
        if (input.widget) {
          input.widget.input.focus();
        } else {
          input.focus();
        }
      }
    }
    /**
     * Append an element to this elements containing element.
     *
     * @param {HTMLElement} element - The DOM element to append to this component.
     */

  }, {
    key: "append",
    value: function append(element) {
      this.appendTo(element, this.element);
    }
    /**
     * Prepend an element to this elements containing element.
     *
     * @param {HTMLElement} element - The DOM element to prepend to this component.
     */

  }, {
    key: "prepend",
    value: function prepend(element) {
      this.prependTo(element, this.element);
    }
    /**
     * Removes a child from this component.
     *
     * @param {HTMLElement} element - The DOM element to remove from this component.
     */

  }, {
    key: "removeChild",
    value: function removeChild(element) {
      this.removeChildFrom(element, this.element);
    }
  }, {
    key: "attachLogic",
    value: function attachLogic() {
      var _this23 = this;

      this.logic.forEach(function (logic) {
        if (logic.trigger.type === 'event') {
          var event = _this23.interpolate(logic.trigger.event);

          _this23.on(event, function () {
            var newComponent = _lodash.default.cloneDeep(_this23.originalComponent);

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            if (_this23.applyActions(logic.actions, args, _this23.data, newComponent)) {
              // If component definition changed, replace it.
              if (!_lodash.default.isEqual(_this23.component, newComponent)) {
                _this23.component = newComponent;
              }

              _this23.redraw();
            }
          }, true);
        }
      });
    }
  }, {
    key: "hasInput",
    get: function get() {
      return this.component.input || this.inputs.length;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return BaseComponent.schema();
    }
  }, {
    key: "key",
    get: function get() {
      return _lodash.default.get(this.component, 'key', '');
    }
  }, {
    key: "currentForm",
    get: function get() {
      return this._currentForm;
    },
    set: function set(instance) {
      this._currentForm = instance;
    }
  }, {
    key: "schema",
    get: function get() {
      return this.getModifiedSchema(_lodash.default.omit(this.component, 'id'), this.defaultSchema);
    }
  }, {
    key: "submissionTimezone",
    get: function get() {
      this.options.submissionTimezone = this.options.submissionTimezone || _lodash.default.get(this.root, 'options.submissionTimezone');
      return this.options.submissionTimezone;
    }
  }, {
    key: "shouldDisable",
    get: function get() {
      return (this.options.readOnly || this.component.disabled) && !this.component.alwaysEnabled;
    }
  }, {
    key: "viewOnly",
    get: function get() {
      return this.options.readOnly && this.options.viewAsHtml;
    }
  }, {
    key: "defaultViewOnlyValue",
    get: function get() {
      return '-';
    }
  }, {
    key: "className",
    get: function get() {
      var className = this.hasInput ? 'form-group has-feedback ' : '';
      className += "formio-component formio-component-".concat(this.component.type, " ");

      if (this.key) {
        className += "formio-component-".concat(this.key, " ");
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

  }, {
    key: "customStyle",
    get: function get() {
      var customCSS = '';

      _lodash.default.each(this.component.style, function (value, key) {
        if (value !== '') {
          customCSS += "".concat(key, ":").concat(value, ";");
        }
      });

      return customCSS;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = this.emptyValue;

      if (this.component.defaultValue) {
        defaultValue = this.component.defaultValue;
      }

      if (this.component.customDefaultValue && !this.options.preview) {
        defaultValue = this.evaluate(this.component.customDefaultValue, {
          value: ''
        }, 'value');
      }

      if (this._inputMask) {
        defaultValue = (0, _vanillaTextMask.conformToMask)(defaultValue, this._inputMask).conformedValue;

        if (!FormioUtils.matchInputMask(defaultValue, this._inputMask)) {
          defaultValue = '';
        }
      } // Let the widget provide default value if none is already provided.


      if (!defaultValue) {
        var widget = this.widget;

        if (widget) {
          defaultValue = widget.defaultValue;
        }
      } // Clone so that it creates a new instance.


      return _lodash.default.clone(defaultValue);
    }
  }, {
    key: "allowReorder",
    get: function get() {
      return this.component.reorder && !this.options.readOnly;
    }
  }, {
    key: "name",
    get: function get() {
      return this.t(this.component.label || this.component.placeholder || this.key);
    }
    /**
     * Returns the error label for this component.
     * @return {*}
     */

  }, {
    key: "errorLabel",
    get: function get() {
      return this.t(this.component.errorLabel || this.component.label || this.component.placeholder || this.key);
    }
  }, {
    key: "widget",
    get: function get() {
      if (this._widget) {
        return this._widget;
      }

      return this.createWidget();
    }
  }, {
    key: "logic",
    get: function get() {
      return this.component.logic || [];
    }
  }, {
    key: "visible",
    set: function set(visible) {
      this._visible = visible;
    },
    get: function get() {
      return this._visible && this._parentVisible;
    }
  }, {
    key: "parentVisible",
    set: function set(value) {
      if (this._parentVisible !== value) {
        this._parentVisible = value;
      }
    },
    get: function get() {
      return this._parentVisible;
    }
  }, {
    key: "wysiwygDefault",
    get: function get() {
      return {
        theme: 'snow',
        placeholder: this.t(this.component.placeholder),
        modules: {
          clipboard: {
            matchVisual: false
          },
          toolbar: [[{
            'size': ['small', false, 'large', 'huge']
          }], // custom dropdown
          [{
            'header': [1, 2, 3, 4, 5, 6, false]
          }], [{
            'font': []
          }], ['bold', 'italic', 'underline', 'strike', {
            'script': 'sub'
          }, {
            'script': 'super'
          }, 'clean'], [{
            'color': []
          }, {
            'background': []
          }], [{
            'list': 'ordered'
          }, {
            'list': 'bullet'
          }, {
            'indent': '-1'
          }, {
            'indent': '+1'
          }, {
            'align': []
          }], ['blockquote', 'code-block'], ['link', 'image', 'video', 'formula', 'source']]
        }
      };
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return null;
    }
  }, {
    key: "value",
    get: function get() {
      return this.dataValue;
    }
    /**
     * Get the data value at the root level.
     *
     * @return {*}
     */

  }, {
    key: "rootValue",
    get: function get() {
      return this.root ? this.root.data : this.data;
    }
    /**
     * Get the static value of this component.
     * @return {*}
     */

  }, {
    key: "dataValue",
    get: function get() {
      if (!this.key || !this.visible && this.component.clearOnHide) {
        return this.emptyValue;
      }

      if (!this.hasValue()) {
        this.dataValue = this.component.multiple ? [] : this.emptyValue;
      }

      return _lodash.default.get(this.data, this.key);
    }
    /**
     * Sets the static value of this component.
     *
     * @param value
     */
    ,
    set: function set(value) {
      if (!this.key || !this.visible && this.component.clearOnHide) {
        return value;
      }

      if (value === null || value === undefined) {
        _lodash.default.unset(this.data, this.key);

        return value;
      }

      _lodash.default.set(this.data, this.key, value);

      return value;
    }
  }, {
    key: "hasSetValue",
    get: function get() {
      return this.hasValue() && !this.isEmpty(this.dataValue);
    }
  }, {
    key: "label",
    get: function get() {
      return this.component.label;
    }
    /**
     * Set this component's label text and render it.
     *
     * @param value - The new label text.
     */
    ,
    set: function set(value) {
      this.component.label = value;

      if (this.labelElement) {
        this.labelElement.innerText = value;
      }
    }
  }, {
    key: "validationValue",
    get: function get() {
      // Let widgets have the first attempt.
      var widget = this.widget;

      if (widget && widget.validationValue) {
        return widget.validationValue(this.dataValue);
      }

      return this.dataValue;
    }
  }, {
    key: "errors",
    get: function get() {
      return this.error ? [this.error] : [];
    }
  }, {
    key: "dataReady",
    get: function get() {
      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "disabled",
    get: function get() {
      return this._disabled;
    }
    /**
     * Disable this component.
     *
     * @param {boolean} disabled
     */
    ,
    set: function set(disabled) {
      var _this24 = this;

      // Do not allow a component to be disabled if it should be always...
      if (!disabled && this.shouldDisable || disabled && !this.shouldDisable) {
        return;
      }

      this._disabled = disabled; // Add/remove the disabled class from the element.

      if (disabled) {
        this.addClass(this.getElement(), 'formio-disabled-input');
      } else {
        this.removeClass(this.getElement(), 'formio-disabled-input');
      } // Disable all inputs.


      _lodash.default.each(this.inputs, function (input) {
        return _this24.setDisabled(_this24.performInputMapping(input), disabled);
      });
    }
  }]);

  return BaseComponent;
}(_Component2.default);

exports.default = BaseComponent;