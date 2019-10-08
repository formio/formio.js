"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.replace");

require("core-js/modules/es.string.split");

require("core-js/modules/es.weak-map");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vanillaTextMask = require("vanilla-text-mask");

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _tooltip = _interopRequireDefault(require("tooltip.js"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = _interopRequireDefault(require("../../../Formio"));

var FormioUtils = _interopRequireWildcard(require("../../../utils/utils"));

var _Validator = _interopRequireDefault(require("../../Validator"));

var _Templates = _interopRequireDefault(require("../../../templates/Templates"));

var _Element2 = _interopRequireDefault(require("../../../Element"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; if (obj != null) { var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var CKEDITOR = 'https://cdn.form.io/ckeditor/12.2.0/ckeditor.js';
var QUILL_URL = 'https://cdn.form.io/quill/1.3.6';
var ACE_URL = 'https://cdn.form.io/ace/1.4.5/ace.js';
/**
 * This is the Component class which all elements within the FormioForm derive from.
 */

var Component =
/*#__PURE__*/
function (_Element) {
  _inherits(Component, _Element);

  _createClass(Component, null, [{
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
          customPrivate: false
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
          height: ''
        },
        allowCalculateOverride: false,
        encrypted: false,
        alwaysEnabled: false,
        showCharCount: false,
        showWordCount: false,
        properties: {},
        allowMultipleMasks: false
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
     * Initialize a new Component.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */

    /* eslint-disable max-statements */

  }]);

  function Component(component, options, data) {
    var _this;

    _classCallCheck(this, Component);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Component).call(this, Object.assign({
      renderMode: 'form',
      attachMode: 'full'
    }, options || {}))); // Save off the original component.

    _this.originalComponent = _lodash.default.cloneDeep(component);
    /**
     * Determines if this component has a condition assigned to it.
     * @type {null}
     * @private
     */

    _this._hasCondition = null;
    /**
     * References to dom elements
     */

    _this.refs = {}; // Allow global override for any component JSON.

    if (component && _this.options.components && _this.options.components[component.type]) {
      _lodash.default.merge(component, _this.options.components[component.type]);
    }
    /**
     * If the component has been attached
     */


    _this.attached = false;
    /**
     * If the component has been rendered
     */

    _this.rendered = false;
    /**
     * The data object in which this component resides.
     * @type {*}
     */

    _this.data = data || {};
    /**
     * The Form.io component JSON schema.
     * @type {*}
     */

    _this.component = _lodash.default.defaultsDeep(component || {}, _this.defaultSchema); // Add the id to the component.

    _this.component.id = _this.id;
    /**
     * The existing error that this component has.
     * @type {string}
     */

    _this.error = '';
    /**
     * Tool tip text after processing
     * @type {string}
     */

    _this.tooltip = '';
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

    _this._disabled = (0, FormioUtils.boolValue)(_this.component.disabled) ? _this.component.disabled : false;
    /**
     * Determines if this component is visible, or not.
     */

    _this._visible = _this.conditionallyVisible(data);
    _this._parentVisible = _this.options.hasOwnProperty('parentVisible') ? _this.options.parentVisible : true;
    _this._parentDisabled = false;
    /**
     * If this input has been input and provided value.
     *
     * @type {boolean}
     */

    _this.pristine = true;
    /**
     * Points to the parent component.
     *
     * @type {Component}
     */

    _this.parent = _this.options.parent;
    /**
     * Points to the root component, usually the FormComponent.
     *
     * @type {Component}
     */

    _this.root = _this.options.root;
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


    _this.triggerRedraw = _lodash.default.debounce(_this.redraw.bind(_assertThisInitialized(_this)), 100);
    /**
     * list of attached tooltips
     * @type {Array}
     */

    _this.tooltips = []; // To force this component to be invalid.

    _this.invalid = false; // Determine if the component has been built.

    _this.isBuilt = false;

    if (_this.component) {
      _this.type = _this.component.type;

      if (_this.hasInput && _this.key) {
        _this.options.name += "[".concat(_this.key, "]"); // If component is visible or not set to clear on hide, set the default value.

        if (_this.visible || !_this.component.clearOnHide) {
          if (!_this.hasValue()) {
            _this.dataValue = _this.defaultValue;
          } else {
            // Ensure the dataValue is set.
            _this.dataValue = _this.dataValue;
          }
        }
      }
      /**
       * The element information for creating the input element.
       * @type {*}
       */


      _this.info = _this.elementInfo();
    } // Allow anyone to hook into the component creation.


    _this.hook('component');

    if (!_this.options.skipInit) {
      _this.init();
    }

    return _this;
  }
  /* eslint-enable max-statements */
  // Allow componets to notify when ready.


  _createClass(Component, [{
    key: "init",
    value: function init() {
      this.disabled = this.shouldDisabled; // Attach the refresh on events.

      this.attachRefreshOn();
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(Component.prototype), "destroy", this).call(this);

      this.detach();
    }
  }, {
    key: "getModifiedSchema",

    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */
    value: function getModifiedSchema(schema, defaultSchema, recursion) {
      var _this3 = this;

      var modified = {};

      if (!defaultSchema) {
        return schema;
      }

      _lodash.default.each(schema, function (val, key) {
        if (!_lodash.default.isArray(val) && _lodash.default.isObject(val) && defaultSchema.hasOwnProperty(key)) {
          var subModified = _this3.getModifiedSchema(val, defaultSchema[key], true);

          if (!_lodash.default.isEmpty(subModified)) {
            modified[key] = subModified;
          }
        } else if (_lodash.default.isArray(val)) {
          if (val.length !== 0) {
            modified[key] = val;
          }
        } else if (!recursion && key === 'type' || !recursion && key === 'key' || !recursion && key === 'label' || !recursion && key === 'input' || val !== '' && !defaultSchema.hasOwnProperty(key) || val !== '' && val !== defaultSchema[key]) {
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
      var translated = this.i18next.t(text, params);
      return translated || text;
    }
  }, {
    key: "labelIsHidden",
    value: function labelIsHidden() {
      return !this.component.label || !this.inDataGrid && this.component.hideLabel || this.inDataGrid && !this.component.dataGridLabel || this.options.inputsOnly;
    }
  }, {
    key: "getTemplate",
    value: function getTemplate(names, modes) {
      modes = Array.isArray(modes) ? modes : [modes];
      names = Array.isArray(names) ? names : [names];

      if (!modes.includes('form')) {
        modes.push('form');
      }

      var result = null;

      if (this.options.templates) {
        result = this.checkTemplate(this.options.templates, names, modes);

        if (result) {
          return result;
        }
      }

      var frameworkTemplates = this.options.template ? _Templates.default.templates[this.options.template] : _Templates.default.current;
      result = this.checkTemplate(frameworkTemplates, names, modes);

      if (result) {
        return result;
      } // Default back to bootstrap if not defined.


      var name = names[names.length - 1];
      var templatesByName = _Templates.default.defaultTemplates[name];

      if (!templatesByName) {
        return "Unknown template: ".concat(name);
      }

      var templateByMode = this.checkTemplateMode(templatesByName, modes);

      if (templateByMode) {
        return templateByMode;
      }

      return templatesByName.form;
    }
  }, {
    key: "checkTemplate",
    value: function checkTemplate(templates, names, modes) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = names[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var name = _step.value;
          var templatesByName = templates[name];

          if (templatesByName) {
            var templateByMode = this.checkTemplateMode(templatesByName, modes);

            if (templateByMode) {
              return templateByMode;
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return != null) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return null;
    }
  }, {
    key: "checkTemplateMode",
    value: function checkTemplateMode(templatesByName, modes) {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = modes[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var mode = _step2.value;
          var templateByMode = templatesByName[mode];

          if (templateByMode) {
            return templateByMode;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return null;
    }
  }, {
    key: "renderTemplate",
    value: function renderTemplate(name) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var modeOption = arguments.length > 2 ? arguments[2] : undefined;
      // Need to make this fall back to form if renderMode is not found similar to how we search templates.
      var mode = modeOption || this.options.renderMode || 'form';
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
      data.render = this.renderTemplate.bind(this); // Allow more specific template names

      var names = ["".concat(name, "-").concat(this.component.type, "-").concat(this.key), "".concat(name, "-").concat(this.component.type), "".concat(name, "-").concat(this.key), "".concat(name)]; // Allow template alters.
      // console.log(`render${name.charAt(0).toUpperCase() + name.substring(1, name.length)}`, data);

      return this.hook("render".concat(name.charAt(0).toUpperCase() + name.substring(1, name.length)), this.interpolate(this.getTemplate(names, mode), data), data, mode);
    }
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */

  }, {
    key: "sanitize",
    value: function sanitize(dirty) {
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

  }, {
    key: "renderString",
    value: function renderString(template, data) {
      if (!template) {
        return '';
      } // Interpolate the template and populate


      return this.interpolate(template, data);
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
     * Called before a next and previous page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */

  }, {
    key: "beforePage",
    value: function beforePage() {
      return _nativePromiseOnly.default.resolve(true);
    }
  }, {
    key: "beforeNext",
    value: function beforeNext() {
      return this.beforePage(true);
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
    key: "loadRefs",
    value: function loadRefs(element, refs) {
      for (var ref in refs) {
        if (refs[ref] === 'single') {
          this.refs[ref] = element.querySelector("[ref=\"".concat(ref, "\"]"));
        } else {
          this.refs[ref] = element.querySelectorAll("[ref=\"".concat(ref, "\"]"));
        }
      }
    }
  }, {
    key: "build",
    value: function build(element) {
      element = element || this.element;
      this.empty(element);
      this.setContent(element, this.render());
      return this.attach(element);
    }
  }, {
    key: "render",
    value: function render() {
      var children = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "Unknown component: ".concat(this.component.type);
      var topLevel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var isVisible = this.visible;
      this.rendered = true;
      return this.renderTemplate('component', {
        visible: isVisible,
        id: this.id,
        classes: this.className,
        styles: this.customStyle,
        children: children
      }, topLevel);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this4 = this;

      this.attached = true;
      this.element = element;
      element.component = this; // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.

      if (this.element.id) {
        this.id = this.element.id;
      }

      this.loadRefs(element, {
        messageContainer: 'single',
        tooltip: 'multiple'
      });
      this.refs.tooltip.forEach(function (tooltip, index) {
        var title = _this4.interpolate(tooltip.getAttribute('data-title') || _this4.t(_this4.component.tooltip)).replace(/(?:\r\n|\r|\n)/g, '<br />');

        _this4.tooltips[index] = new _tooltip.default(tooltip, {
          trigger: 'hover click',
          placement: 'right',
          html: true,
          title: title
        });
      }); // Attach logic.

      this.attachLogic();
      this.autofocus(); // Allow global attach.

      this.hook('attachComponent', element, this); // Allow attach per component type.

      var type = this.component.type;

      if (type) {
        this.hook("attach".concat(type.charAt(0).toUpperCase() + type.substring(1, type.length)), element, this);
      }

      return _nativePromiseOnly.default.resolve();
    }
  }, {
    key: "addShortcut",
    value: function addShortcut(element, shortcut) {
      // Avoid infinite recursion.
      if (!element || !this.root || this.root === this) {
        return;
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
      if (!element || this.root === this) {
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

  }, {
    key: "detach",
    value: function detach() {
      this.refs = {};
      this.removeEventListeners();

      if (this.tooltip) {
        this.tooltip.dispose();
      }
    }
  }, {
    key: "attachRefreshEvent",
    value: function attachRefreshEvent(refreshData) {
      var _this5 = this;

      this.on('change', function (event) {
        var changeKey = _lodash.default.get(event, 'changed.component.key', false); // Don't let components change themselves.


        if (changeKey && _this5.key === changeKey) {
          return;
        }

        if (refreshData === 'data') {
          _this5.refresh(_this5.data);
        } else if (changeKey && changeKey === refreshData && event.changed && event.changed.instance && // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
        // in fields inside EditGrids could alter their state from other rows (which is bad).
        _this5.inContext(event.changed.instance)) {
          _this5.refresh(event.changed.value);
        }
      }, true);
    }
  }, {
    key: "attachRefreshOn",
    value: function attachRefreshOn() {
      var _this6 = this;

      var refreshOn = this.component.refreshOn || this.component.redrawOn; // If they wish to refresh on a value, then add that here.

      if (refreshOn) {
        if (Array.isArray(refreshOn)) {
          refreshOn.forEach(function (refreshData) {
            _this6.attachRefreshEvent(refreshData);
          });
        } else {
          this.attachRefreshEvent(refreshOn);
        }
      }
    }
    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */

  }, {
    key: "refresh",
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
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      if (Array.isArray(value)) {
        return value.join(', ');
      }

      if (_lodash.default.isPlainObject(value)) {
        return JSON.stringify(value);
      }

      return value.toString();
    }
  }, {
    key: "getView",
    value: function getView(value) {
      if (this.component.protected) {
        return '--- PROTECTED ---';
      }

      return this.getValueAsString(value);
    }
  }, {
    key: "updateItems",
    value: function updateItems() {
      this.restoreValue();
      this.onChange.apply(this, arguments);
    }
  }, {
    key: "createModal",
    value: function createModal(element) {
      var _this7 = this;

      var dialog = this.ce('div');
      this.setContent(dialog, this.renderTemplate('dialog')); // Add refs to dialog, not "this".

      dialog.refs = {};
      this.loadRefs.call(dialog, dialog, {
        dialogOverlay: 'single',
        dialogContents: 'single',
        dialogClose: 'single'
      });
      dialog.refs.dialogContents.appendChild(element);
      document.body.appendChild(dialog);
      document.body.classList.add('modal-open');

      dialog.close = function () {
        document.body.classList.remove('modal-open');
        dialog.dispatchEvent(new CustomEvent('close'));
      };

      this.addEventListener(dialog, 'close', function () {
        return _this7.removeChildFrom(dialog, document.body);
      });

      var close = function close(event) {
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
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */

  }, {
    key: "evalContext",
    value: function evalContext(additional) {
      return _get(_getPrototypeOf(Component.prototype), "evalContext", this).call(this, Object.assign({
        component: this.component,
        row: this.data,
        rowIndex: this.rowIndex,
        data: this.rootValue,
        submission: this.root ? this.root._submission : {},
        form: this.root ? this.root._form : {}
      }, additional));
    }
    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */

  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      this.pristine = pristine;
    }
    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */

  }, {
    key: "removeValue",
    value: function removeValue(index) {
      this.splice(index);
      this.redraw();
      this.restoreValue();

      if (this.root) {
        this.root.onChange();
      }
    }
  }, {
    key: "iconClass",
    value: function iconClass(name, spinning) {
      var iconset = this.options.iconset || _Templates.default.current.defaultIconset || 'fa';
      return _Templates.default.current.hasOwnProperty('iconClass') ? _Templates.default.current.iconClass(iconset, name, spinning) : name;
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
  }, {
    key: "setContent",
    value: function setContent(element, content) {
      if (element instanceof HTMLElement) {
        element.innerHTML = this.sanitize(content);
        return true;
      }

      return false;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      // Don't bother if we have not built yet.
      if (!this.element || !this.element.parentNode) {
        // Return a non-resolving promise.
        return _nativePromiseOnly.default.resolve();
      }

      this.clear(); // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.

      var parent = this.element.parentNode;
      var index = Array.prototype.indexOf.call(parent.children, this.element);
      this.element.outerHTML = this.sanitize(this.render());
      this.element = parent.children[index];
      return this.attach(this.element);
    }
  }, {
    key: "rebuild",
    value: function rebuild() {
      this.destroy();
      this.init();
      return this.redraw();
    }
  }, {
    key: "removeEventListeners",
    value: function removeEventListeners() {
      _get(_getPrototypeOf(Component.prototype), "removeEventListeners", this).call(this);

      this.tooltips.forEach(function (tooltip) {
        return tooltip.dispose();
      });
      this.tooltips = [];
      this.refs.input = [];
    }
  }, {
    key: "hasClass",
    value: function hasClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "hasClass", this).call(this, element, this.transform('class', className));
    }
  }, {
    key: "addClass",
    value: function addClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "addClass", this).call(this, element, this.transform('class', className));
    }
  }, {
    key: "removeClass",
    value: function removeClass(element, className) {
      if (!element) {
        return;
      }

      return _get(_getPrototypeOf(Component.prototype), "removeClass", this).call(this, element, this.transform('class', className));
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

  }, {
    key: "checkCondition",
    value: function checkCondition(row, data) {
      return FormioUtils.checkCondition(this.component, row || this.data, data || this.rootValue, this.root ? this.root._form : {}, this);
    }
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */

  }, {
    key: "checkComponentConditions",
    value: function checkComponentConditions(data) {
      data = data || this.rootValue; // Check advanced conditions

      var visible = this.conditionallyVisible(data);

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

  }, {
    key: "checkConditions",
    value: function checkConditions() {
      return this.checkComponentConditions.apply(this, arguments);
    }
  }, {
    key: "fieldLogic",

    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    value: function fieldLogic(data) {
      var _this8 = this;

      data = data || this.rootValue;
      var logics = this.logic; // If there aren't logic, don't go further.

      if (logics.length === 0) {
        return;
      }

      var newComponent = _lodash.default.cloneDeep(this.originalComponent);

      var changed = logics.reduce(function (changed, logic) {
        var result = FormioUtils.checkTrigger(newComponent, logic.trigger, _this8.data, data, _this8.root ? _this8.root._form : {}, _this8);

        if (result) {
          changed |= _this8.applyActions(logic.actions, result, data, newComponent);
        }

        return changed;
      }, false); // If component definition changed, replace and mark as changed.

      if (!_lodash.default.isEqual(this.component, newComponent)) {
        this.component = newComponent; // If disabled changed, be sure to distribute the setting.

        this.disabled = this.shouldDisabled;
        changed = true;
      }

      return changed;
    }
  }, {
    key: "applyActions",
    value: function applyActions(actions, result, data, newComponent) {
      var _this9 = this;

      return actions.reduce(function (changed, action) {
        switch (action.type) {
          case 'property':
            FormioUtils.setActionProperty(newComponent, action, _this9.data, data, newComponent, result, _this9);
            break;

          case 'value':
            {
              var oldValue = _this9.getValue();

              var newValue = _this9.evaluate(action.value, {
                value: _lodash.default.clone(oldValue),
                data: data,
                component: newComponent,
                result: result
              }, 'value');

              if (!_lodash.default.isEqual(oldValue, newValue)) {
                _this9.setValue(newValue);

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
    value: function addInputError(message, dirty, elements) {
      var _this10 = this;

      if (!message) {
        return;
      }

      if (this.refs.messageContainer) {
        this.setContent(this.refs.messageContainer, this.renderTemplate('message', {
          message: message
        }));
      } // Add error classes


      elements.forEach(function (input) {
        return _this10.addClass(_this10.performInputMapping(input), 'is-invalid');
      });

      if (dirty && this.options.highlightErrors) {
        this.addClass(this.element, 'alert alert-danger');
      } else {
        this.addClass(this.element, 'has-error');
      }
    }
  }, {
    key: "clearOnHide",
    value: function clearOnHide() {
      // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
      if (!this.rootPristine && this.component.clearOnHide !== false && !this.options.readOnly && !this.options.showHiddenFields) {
        if (!this.visible) {
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

      return changed;
    }
  }, {
    key: "addCKE",
    value: function addCKE(element, settings, onChange) {
      settings = _lodash.default.isEmpty(settings) ? {} : settings;
      settings.base64Upload = true;
      settings.mediaEmbed = {
        previewsInData: true
      };
      settings.image = {
        toolbar: ['imageTextAlternative', '|', 'imageStyle:full', 'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight'],
        styles: ['full', 'alignLeft', 'alignCenter', 'alignRight']
      };
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
      var _this11 = this;

      settings = _lodash.default.isEmpty(settings) ? this.wysiwygDefault : settings; // Lazy load the quill css.

      if (!settings.theme) {
        settings.theme = 'snow';
      }

      _Formio.default.requireLibrary("quill-css-".concat(settings.theme), 'Quill', [{
        type: 'styles',
        src: "".concat(QUILL_URL, "/quill.").concat(settings.theme, ".css")
      }], true); // Lazy load the quill library.


      return _Formio.default.requireLibrary('quill', 'Quill', "".concat(QUILL_URL, "/quill.min.js"), true).then(function () {
        if (!element.parentNode) {
          return _nativePromiseOnly.default.reject();
        }

        _this11.quill = new Quill(element, settings);
        /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/

        var txtArea = document.createElement('textarea');
        txtArea.setAttribute('class', 'quill-source-code');

        _this11.quill.addContainer('ql-custom').appendChild(txtArea);

        var qlSource = element.parentNode.querySelector('.ql-source');

        if (qlSource) {
          _this11.addEventListener(qlSource, 'click', function (event) {
            event.preventDefault();

            if (txtArea.style.display === 'inherit') {
              _this11.quill.setContents(_this11.quill.clipboard.convert(txtArea.value));
            }

            txtArea.style.display = txtArea.style.display === 'none' ? 'inherit' : 'none';
          });
        }
        /** END CODEBLOCK **/
        // Make sure to select cursor when they click on the element.


        _this11.addEventListener(element, 'click', function () {
          return _this11.quill.focus();
        }); // Allows users to skip toolbar items when tabbing though form


        var elm = document.querySelectorAll('.ql-formats > button');

        for (var i = 0; i < elm.length; i++) {
          elm[i].setAttribute('tabindex', '-1');
        }

        _this11.quill.on('text-change', function () {
          txtArea.value = _this11.quill.root.innerHTML;
          onChange(txtArea);
        });

        return _this11.quill;
      });
    }
  }, {
    key: "addAce",
    value: function addAce(element, settings, onChange) {
      return _Formio.default.requireLibrary('ace', 'ace', ACE_URL, true).then(function (editor) {
        editor = editor.edit(element);
        editor.removeAllListeners('change');
        editor.setOptions({
          maxLines: 12,
          minLines: 12
        });
        editor.getSession().setTabSize(2);
        editor.getSession().setMode("ace/mode/".concat(settings.mode));
        editor.on('change', function () {
          return onChange(editor.getValue());
        });
        return editor;
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
     * Get the data value at the root level.
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
  }, {
    key: "getValue",

    /**
     * Get the input value of this component.
     *
     * @return {*}
     */
    value: function getValue() {
      if (!this.hasInput || this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var values = [];

      for (var i in this.refs.input) {
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

  }, {
    key: "getValueAt",
    value: function getValueAt(index) {
      var input = this.performInputMapping(this.refs.input[index]);
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

  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var changed = this.updateValue(value, flags);
      value = this.dataValue;

      if (!this.hasInput) {
        return changed;
      }

      var isArray = Array.isArray(value);

      if (isArray && this.refs.input && this.refs.input.length !== value.length) {
        this.redraw();
      }

      for (var i in this.refs.input) {
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

  }, {
    key: "setValueAt",
    value: function setValueAt(index, value, flags) {
      flags = flags || {};

      if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
        value = this.defaultValue;
      }

      var input = this.performInputMapping(this.refs.input[index]);

      if (input.mask) {
        input.mask.textMaskInputElement.update(value);
      } else {
        input.value = value;
      }
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
        var defaultValue = this.component.multiple ? [] : this.defaultValue;

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

  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
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

  }, {
    key: "updateComponentValue",
    value: function updateComponentValue(value, flags) {
      flags = flags || {};
      var newValue = value === undefined || value === null ? this.getValue() : value;
      newValue = this.normalizeValue(newValue);
      var changed = newValue !== undefined ? this.hasChanged(newValue, this.dataValue) : false;

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

  }, {
    key: "updateValue",
    value: function updateValue() {
      return this.updateComponentValue.apply(this, arguments);
    }
  }, {
    key: "getIcon",
    value: function getIcon(name, content, styles) {
      var ref = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'icon';
      return this.renderTemplate('icon', {
        className: this.iconClass(name),
        ref: ref,
        styles: styles,
        content: content
      });
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
     * Determine if the value of this component has changed.
     *
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */

  }, {
    key: "hasChanged",
    value: function hasChanged(newValue, oldValue) {
      if ((newValue === undefined || newValue === null) && (oldValue === undefined || oldValue === null || this.isEmpty(oldValue))) {
        return false;
      }

      return !_lodash.default.isEqual(newValue, oldValue);
    }
    /**
     * Update the value on change.
     *
     * @param flags
     * @param changed
     */

  }, {
    key: "updateOnChange",
    value: function updateOnChange() {
      var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var changed = arguments.length > 1 ? arguments[1] : undefined;

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

  }, {
    key: "calculateComponentValue",
    value: function calculateComponentValue(data, flags) {
      // If no calculated value or
      // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
      if (!this.component.calculateValue || (!this.visible || this.component.hidden) && this.component.clearOnHide && !this.rootPristine) {
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

      var changed = this.setValue(calculatedValue, flags);
      this.calculatedValue = this.dataValue;
      return changed;
    }
    /**
     * Performs calculations in this component plus any child components.
     *
     * @param args
     * @return {boolean}
     */

  }, {
    key: "calculateValue",
    value: function calculateValue() {
      return this.calculateComponentValue.apply(this, arguments);
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
    /**
     * Checks the validity of this component and sets the error message if it is invalid.
     *
     * @param data
     * @param dirty
     * @param rowData
     * @return {boolean}
     */

  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, rowData) {
      if (this.shouldSkipValidation(data, dirty, rowData)) {
        this.setCustomValidity('');
        return true;
      }

      var error = _Validator.default.check(this, data);

      if (error && (dirty || !this.pristine)) {
        var message = this.invalidMessage(data, dirty, true);
        this.setCustomValidity(message, dirty);
      } else {
        this.setCustomValidity('');
      }

      return !error;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity() {
      return this.checkComponentValidity.apply(this, arguments);
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

  }, {
    key: "checkData",
    value: function checkData(data, flags) {
      flags = flags || {};

      if (flags.noCheck) {
        return true;
      }

      this.calculateComponentValue(data);
      this.checkComponentConditions(data);
      return flags.noValidate ? true : this.checkComponentValidity(data);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      return value == null || value.length === 0 || _lodash.default.isEqual(value, this.emptyValue);
    }
  }, {
    key: "isEqual",
    value: function isEqual(valueA) {
      var valueB = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.dataValue;
      return this.isEmpty(valueA) && this.isEmpty(valueB) || _lodash.default.isEqual(valueA, valueB);
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
    value: function setCustomValidity(message, dirty, external) {
      var _this12 = this;

      if (message) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = {
          component: this.component,
          message: message,
          external: !!external
        };
        this.emit('componentError', this.error);

        if (this.refs.input) {
          this.addInputError(message, dirty, this.refs.input);
        }
      } else if (this.error && this.error.external === !!external) {
        if (this.refs.messageContainer) {
          this.empty(this.refs.messageContainer);
        }

        this.error = null;

        if (this.refs.input) {
          this.refs.input.forEach(function (input) {
            return _this12.removeClass(_this12.performInputMapping(input), 'is-invalid');
          });
        }

        this.removeClass(this.element, 'alert alert-danger');
        this.removeClass(this.element, 'has-error');
      }

      if (!this.refs.input) {
        return;
      }

      this.refs.input.forEach(function (input) {
        input = _this12.performInputMapping(input);

        if (typeof input.setCustomValidity === 'function') {
          input.setCustomValidity(message, dirty);
        }
      });
    }
  }, {
    key: "shouldSkipValidation",
    value: function shouldSkipValidation(data, dirty, rowData) {
      var _this13 = this;

      var rules = [// Force valid if component is hidden.
      function () {
        return !_this13.visible;
      }, // Force valid if component is conditionally hidden.
      function () {
        return !_this13.checkCondition(rowData, data);
      }];
      return rules.some(function (pred) {
        return pred();
      });
    } // Maintain reverse compatibility.

  }, {
    key: "whenReady",
    value: function whenReady() {
      console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
      return this.dataReady;
    }
  }, {
    key: "asString",

    /**
     * Prints out the value of this component as a string value.
     */
    value: function asString(value) {
      value = value || this.getValue();
      return (Array.isArray(value) ? value : [value]).map(_lodash.default.toString).join(', ');
    }
    /**
     * Return if the component is disabled.
     * @return {boolean}
     */

  }, {
    key: "setDisabled",
    value: function setDisabled(element, disabled) {
      if (!element) {
        return;
      }

      element.disabled = disabled;

      if (disabled) {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }
    }
  }, {
    key: "setLoading",
    value: function setLoading(element, loading) {
      if (!element || element.loading === loading) {
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
      var _this14 = this;

      _lodash.default.each(options, function (option) {
        var attrs = {
          value: option.value
        };

        if (defaultValue !== undefined && option.value === defaultValue) {
          attrs.selected = 'selected';
        }

        var optionElement = _this14.ce('option', attrs);

        optionElement.appendChild(_this14.text(option.label));
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
        select.onselect();
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      this.detach();
      this.empty(this.getElement());
    }
  }, {
    key: "append",
    value: function append(element) {
      this.appendTo(element, this.element);
    }
  }, {
    key: "prepend",
    value: function prepend(element) {
      this.prependTo(element, this.element);
    }
  }, {
    key: "removeChild",
    value: function removeChild(element) {
      this.removeChildFrom(element, this.element);
    }
  }, {
    key: "attachLogic",
    value: function attachLogic() {
      var _this15 = this;

      this.logic.forEach(function (logic) {
        if (logic.trigger.type === 'event') {
          var event = _this15.interpolate(logic.trigger.event);

          _this15.on(event, function () {
            var newComponent = _lodash.default.cloneDeep(_this15.originalComponent);

            for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
              args[_key3] = arguments[_key3];
            }

            if (_this15.applyActions(logic.actions, args, _this15.data, newComponent)) {
              // If component definition changed, replace it.
              if (!_lodash.default.isEqual(_this15.component, newComponent)) {
                _this15.component = newComponent;
              }

              _this15.redraw();
            }
          }, true);
        }
      });
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

      _lodash.default.defaults(attributes, this.component.attributes);

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
      var _this16 = this;

      if (this.component.autofocus) {
        this.on('render', function () {
          return _this16.focus();
        }, true);
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.refs.input && this.refs.input[0]) {
        this.refs.input[0].focus();
      }
    }
  }, {
    key: "ready",
    get: function get() {
      return _nativePromiseOnly.default.resolve(this);
    }
  }, {
    key: "labelInfo",
    get: function get() {
      var label = {};
      label.hidden = this.labelIsHidden();
      label.className = '';
      label.labelPosition = this.component.labelPosition;
      label.tooltipClass = "".concat(this.iconClass('question-sign'), " text-muted");

      if (this.hasInput && this.component.validate && (0, FormioUtils.boolValue)(this.component.validate.required)) {
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
  }, {
    key: "shouldDisabled",
    get: function get() {
      return this.options.readOnly || this.component.disabled || this.options.hasOwnProperty('disabled') && this.options.disabled[this.key];
    }
  }, {
    key: "isInputComponent",
    get: function get() {
      return !this.component.hasOwnProperty('input') || this.component.input;
    }
  }, {
    key: "hasInput",
    get: function get() {
      return this.isInputComponent || this.refs.input && this.refs.input.length;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return Component.schema();
    }
  }, {
    key: "key",
    get: function get() {
      return _lodash.default.get(this.component, 'key', '');
    }
  }, {
    key: "parentVisible",
    set: function set(value) {
      if (this._parentVisible !== value) {
        this._parentVisible = value;
        this.clearOnHide();
        this.redraw();
      }
    },
    get: function get() {
      return this._parentVisible;
    }
  }, {
    key: "parentDisabled",
    set: function set(value) {
      if (this._parentDisabled !== value) {
        this._parentDisabled = value;
        this.clearOnHide();
        this.redraw();
      }
    },
    get: function get() {
      return this._parentDisabled;
    }
    /**
     *
     * @param value {boolean}
     */

  }, {
    key: "visible",
    set: function set(value) {
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
    ,
    get: function get() {
      // Show only if visibility changes or if we are in builder mode or if hidden fields should be shown.
      if (this.builderMode || this.options.showHiddenFields) {
        return true;
      }

      if (this.options.hide && this.options.hide[this.component.key]) {
        return false;
      }

      if (this.options.show && this.options.show[this.component.key]) {
        return true;
      }

      return this._visible && this._parentVisible;
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
    key: "fullMode",
    get: function get() {
      return this.options.attachMode === 'full';
    }
  }, {
    key: "builderMode",
    get: function get() {
      return this.options.attachMode === 'builder';
    }
  }, {
    key: "schema",
    get: function get() {
      return this.getModifiedSchema(_lodash.default.omit(this.component, 'id'), this.defaultSchema);
    }
  }, {
    key: "transform",
    get: function get() {
      return _Templates.default.current.hasOwnProperty('transform') ? _Templates.default.current.transform.bind(_Templates.default.current) : function (type, value) {
        return value;
      };
    }
  }, {
    key: "submissionTimezone",
    get: function get() {
      this.options.submissionTimezone = this.options.submissionTimezone || _lodash.default.get(this.root, 'options.submissionTimezone');
      return this.options.submissionTimezone;
    }
  }, {
    key: "canDisable",
    get: function get() {
      return !this.component.alwaysEnabled;
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

      if (this.hasInput && this.component.validate && (0, FormioUtils.boolValue)(this.component.validate.required)) {
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
    key: "logic",
    get: function get() {
      return this.component.logic || [];
    }
  }, {
    key: "wysiwygDefault",
    get: function get() {
      return {
        theme: 'snow',
        placeholder: this.t(this.component.placeholder),
        modules: {
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
    key: "rootValue",
    get: function get() {
      return this.root ? this.root.data : this.data;
    }
  }, {
    key: "rootPristine",
    get: function get() {
      return _lodash.default.get(this, 'root.pristine', false);
    }
    /**
     * Get the static value of this component.
     * @return {*}
     */

  }, {
    key: "dataValue",
    get: function get() {
      if (!this.key || !this.visible && this.component.clearOnHide && !this.rootPristine) {
        return this.emptyValue;
      }

      if (!this.hasValue()) {
        var empty = this.component.multiple ? [] : this.emptyValue;

        if (!this.rootPristine) {
          this.dataValue = empty;
        }

        return empty;
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
      if (!this.key || !this.visible && this.component.clearOnHide && !this.rootPristine) {
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

      if (this.defaultMask) {
        if (typeof defaultValue === 'string') {
          defaultValue = (0, _vanillaTextMask.conformToMask)(defaultValue, this.defaultMask).conformedValue;

          if (!FormioUtils.matchInputMask(defaultValue, this.defaultMask)) {
            defaultValue = '';
          }
        } else {
          defaultValue = '';
        }
      } // Clone so that it creates a new instance.


      return _lodash.default.clone(defaultValue);
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
      return this._disabled || this.parentDisabled;
    }
    /**
     * Disable this component.
     *
     * @param {boolean} disabled
     */
    ,
    set: function set(disabled) {
      // Do not allow a component to be disabled if it should be always...
      if (disabled && !this.canDisable) {
        return;
      }

      this._disabled = disabled;
    }
  }]);

  return Component;
}(_Element2.default);

exports.default = Component;
Component.externalLibraries = {};

Component.requireLibrary = function (name, property, src, polling) {
  if (!Component.externalLibraries.hasOwnProperty(name)) {
    Component.externalLibraries[name] = {};
    Component.externalLibraries[name].ready = new _nativePromiseOnly.default(function (resolve, reject) {
      Component.externalLibraries[name].resolve = resolve;
      Component.externalLibraries[name].reject = reject;
    });
    var callbackName = "".concat(name, "Callback");

    if (!polling && !window[callbackName]) {
      window[callbackName] = function () {
        this.resolve();
      }.bind(Component.externalLibraries[name]);
    } // See if the plugin already exists.


    var plugin = _lodash.default.get(window, property);

    if (plugin) {
      Component.externalLibraries[name].resolve(plugin);
    } else {
      src = Array.isArray(src) ? src : [src];
      src.forEach(function (lib) {
        var attrs = {};
        var elementType = '';

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
        } // Add the script to the top page.


        var script = document.createElement(elementType);

        for (var attr in attrs) {
          script.setAttribute(attr, attrs[attr]);
        }

        document.getElementsByTagName('head')[0].appendChild(script);
      }); // if no callback is provided, then check periodically for the script.

      if (polling) {
        setTimeout(function checkLibrary() {
          var plugin = _lodash.default.get(window, property);

          if (plugin) {
            Component.externalLibraries[name].resolve(plugin);
          } else {
            // check again after 200 ms.
            setTimeout(checkLibrary, 200);
          }
        }, 200);
      }
    }
  }

  return Component.externalLibraries[name].ready;
};

Component.libraryReady = function (name) {
  if (Component.externalLibraries.hasOwnProperty(name) && Component.externalLibraries[name].ready) {
    return Component.externalLibraries[name].ready;
  }

  return _nativePromiseOnly.default.reject("".concat(name, " library was not required."));
};