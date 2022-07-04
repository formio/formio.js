"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.number.parse-int.js");

require("core-js/modules/es.number.constructor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _Component2 = _interopRequireDefault(require("../_classes/component/Component"));

var _ComponentModal = _interopRequireDefault(require("../_classes/componentModal/ComponentModal"));

var _eventemitter = _interopRequireDefault(require("eventemitter3"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _utils = require("../../utils/utils");

var _Formio = require("../../Formio");

var _Form = _interopRequireDefault(require("../../Form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var FormComponent = /*#__PURE__*/function (_Component) {
  _inherits(FormComponent, _Component);

  var _super = _createSuper(FormComponent);

  function FormComponent() {
    _classCallCheck(this, FormComponent);

    return _super.apply(this, arguments);
  }

  _createClass(FormComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(FormComponent.prototype), "init", this).call(this);

      this.formObj = {
        display: this.component.display,
        settings: this.component.settings,
        components: this.component.components
      };
      this.valueChanged = false;
      this.subForm = null;
      this.formSrc = '';

      if (this.component.src) {
        this.formSrc = this.component.src;
      }

      if (!this.component.src && !this.options.formio && (this.component.form || this.component.path)) {
        if (this.component.project) {
          this.formSrc = _Formio.GlobalFormio.getBaseUrl(); // Check to see if it is a MongoID.

          if ((0, _utils.isMongoId)(this.component.project)) {
            this.formSrc += '/project';
          }

          this.formSrc += "/".concat(this.component.project);
          this.options.project = this.formSrc;
        } else {
          this.formSrc = _Formio.GlobalFormio.getProjectUrl();
          this.options.project = this.formSrc;
        }

        if (this.component.form) {
          if ((0, _utils.isMongoId)(this.component.form)) {
            this.formSrc += "/form/".concat(this.component.form);
          } else {
            this.formSrc += "/".concat(this.component.form);
          }
        } else if (this.component.path) {
          this.formSrc += "/".concat(this.component.path);
        }
      } // Build the source based on the root src path.


      if (!this.formSrc && this.options.formio) {
        var rootSrc = this.options.formio.formsUrl;

        if (this.component.form && (0, _utils.isMongoId)(this.component.form)) {
          this.formSrc = "".concat(rootSrc, "/").concat(this.component.form);
        } else {
          var formPath = this.component.path || this.component.form;
          this.formSrc = "".concat(rootSrc.replace(/\/form$/, ''), "/").concat(formPath);
        }
      }

      if (this.builderMode && this.component.hasOwnProperty('formRevision')) {
        this.component.revision = this.component.formRevision;
        delete this.component.formRevision;
      } // Add revision version if set.


      if (this.component.revision || this.component.revision === 0 || this.component.formRevision || this.component.formRevision === 0 || this.component.revisionId) {
        this.setFormRevision(this.component.revisionId || this.component.revision || this.component.formRevision);
      }

      return this.createSubForm();
    }
  }, {
    key: "dataReady",
    get: function get() {
      return this.subFormReady || _nativePromiseOnly["default"].resolve();
    }
  }, {
    key: "defaultValue",
    get: function get() {
      // Not not provide a default value unless the subform is ready so that it will initialize correctly.
      return this.subForm ? _get(_getPrototypeOf(FormComponent.prototype), "defaultValue", this) : null;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return FormComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {
        data: {}
      };
    }
  }, {
    key: "ready",
    get: function get() {
      return this.subFormReady || _nativePromiseOnly["default"].resolve();
    }
  }, {
    key: "useOriginalRevision",
    get: function get() {
      var _this$component, _this$formObj;

      return ((_this$component = this.component) === null || _this$component === void 0 ? void 0 : _this$component.useOriginalRevision) && !!((_this$formObj = this.formObj) !== null && _this$formObj !== void 0 && _this$formObj.revisions);
    }
  }, {
    key: "setFormRevision",
    value: function setFormRevision(rev) {
      // Remove current revisions from src if it is
      this.formSrc = this.formSrc.replace(/\/v\/[0-9a-z]+/, '');
      var revNumber = Number.parseInt(rev);

      if (!isNaN(revNumber)) {
        this.subFormRevision = rev;
        this.formSrc += "/v/".concat(rev);
      } else {
        this.subFormRevision = undefined;
      }
    }
  }, {
    key: "getComponent",
    value: function getComponent(path, fn) {
      path = (0, _utils.getArrayFromComponentPath)(path);

      if (path[0] === 'data') {
        path.shift();
      }

      var originalPathStr = "".concat(this.path, ".data.").concat((0, _utils.getStringFromComponentPath)(path));

      if (this.subForm) {
        return this.subForm.getComponent(path, fn, originalPathStr);
      }
    }
  }, {
    key: "getSubOptions",
    value: function getSubOptions() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      options.parentPath = "".concat(this.path, ".data.");
      options.events = this.createEmitter(); // Make sure to not show the submit button in wizards in the nested forms.

      _lodash["default"].set(options, 'buttonSettings.showSubmit', false);

      if (!this.options) {
        return options;
      }

      if (this.options.base) {
        options.base = this.options.base;
      }

      if (this.options.project) {
        options.project = this.options.project;
      }

      if (this.options.readOnly || this.component.disabled) {
        options.readOnly = this.options.readOnly || this.component.disabled;
      }

      if (this.options.breadcrumbSettings) {
        options.breadcrumbSettings = this.options.breadcrumbSettings;
      }

      if (this.options.buttonSettings) {
        options.buttonSettings = _lodash["default"].clone(this.options.buttonSettings);
      }

      if (this.options.viewAsHtml) {
        options.viewAsHtml = this.options.viewAsHtml;
      }

      if (this.options.language) {
        options.language = this.options.language;
      }

      if (this.options.template) {
        options.template = this.options.template;
      }

      if (this.options.templates) {
        options.templates = this.options.templates;
      }

      if (this.options.renderMode) {
        options.renderMode = this.options.renderMode;
      }

      if (this.options.attachMode) {
        options.attachMode = this.options.attachMode;
      }

      if (this.options.iconset) {
        options.iconset = this.options.iconset;
      }

      if (this.options.fileService) {
        options.fileService = this.options.fileService;
      }

      if (this.options.onChange) {
        options.onChange = this.options.onChange;
      }

      return options;
    }
  }, {
    key: "render",
    value: function render() {
      if (this.builderMode) {
        return _get(_getPrototypeOf(FormComponent.prototype), "render", this).call(this, this.component.label || 'Nested form');
      }

      var subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
      return _get(_getPrototypeOf(FormComponent.prototype), "render", this).call(this, subform);
    }
  }, {
    key: "asString",
    value: function asString(value) {
      return this.getValueAsString(value);
    }
    /**
     * Prints out the value of form components as a datagrid value.
     */

  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return 'No data provided';
      }

      if (!value.data && value._id) {
        return value._id;
      }

      if (!value.data || !Object.keys(value.data).length) {
        return 'No data provided';
      }

      return '[Complex Data]';
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this = this;

      // Don't attach in builder.
      if (this.builderMode) {
        return _get(_getPrototypeOf(FormComponent.prototype), "attach", this).call(this, element);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "attach", this).call(this, element).then(function () {
        if (_this.isSubFormLazyLoad() && !_this.hasLoadedForm && !_this.subFormLoading) {
          _this.createSubForm(true);
        }

        return _this.subFormReady.then(function () {
          _this.empty(element);

          if (_this.options.builder) {
            _this.setContent(element, _this.ce('div', {
              "class": 'text-muted text-center p-2'
            }, _this.text(_this.formObj.title)));

            return;
          }

          _this.setContent(element, _this.render());

          if (_this.subForm) {
            if (_this.isNestedWizard) {
              element = _this.root.element;
            }

            _this.subForm.attach(element);

            _this.valueChanged = _this.hasSetValue;

            if (!_this.valueChanged && _this.dataValue.state !== 'submitted') {
              _this.setDefaultValue();
            } else {
              _this.restoreValue();
            }
          }

          if (!_this.builderMode && _this.component.modalEdit) {
            var modalShouldBeOpened = _this.componentModal ? _this.componentModal.isOpened : false;
            var currentValue = modalShouldBeOpened ? _this.componentModal.currentValue : _this.dataValue;
            _this.componentModal = new _ComponentModal["default"](_this, element, modalShouldBeOpened, currentValue);

            _this.setOpenModalElement();
          }
        });
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      if (this.subForm) {
        this.subForm.detach();
      }

      _get(_getPrototypeOf(FormComponent.prototype), "detach", this).call(this);
    }
  }, {
    key: "currentForm",
    get: function get() {
      return this._currentForm;
    },
    set: function set(instance) {
      var _this2 = this;

      this._currentForm = instance;

      if (!this.subForm) {
        return;
      }

      this.subForm.getComponents().forEach(function (component) {
        component.currentForm = _this2;
      });
    }
  }, {
    key: "hasLoadedForm",
    get: function get() {
      return this.formObj && this.formObj.components && Array.isArray(this.formObj.components) && this.formObj.components.length;
    }
  }, {
    key: "isRevisionChanged",
    get: function get() {
      return _lodash["default"].isNumber(this.subFormRevision) && _lodash["default"].isNumber(this.formObj._vid) && this.formObj._vid !== this.subFormRevision;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      if (this.subForm) {
        this.subForm.destroy();
        this.subForm = null;
        this.subFormReady = null;
      }

      _get(_getPrototypeOf(FormComponent.prototype), "destroy", this).call(this);
    }
  }, {
    key: "redraw",
    value: function redraw() {
      if (this.subForm) {
        this.subForm.form = this.formObj;
        this.setSubFormDisabled(this.subForm);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "redraw", this).call(this);
    }
    /**
     * Pass everyComponent to subform.
     * @param args
     * @returns {*|void}
     */

  }, {
    key: "everyComponent",
    value: function everyComponent() {
      if (this.subForm) {
        var _this$subForm;

        (_this$subForm = this.subForm).everyComponent.apply(_this$subForm, arguments);
      }
    }
  }, {
    key: "setSubFormDisabled",
    value: function setSubFormDisabled(subForm) {
      subForm.disabled = this.disabled; // When the Nested Form is disabled make the subForm disabled
    }
  }, {
    key: "updateSubWizards",
    value: function updateSubWizards(subForm) {
      var _this$root,
          _subForm$_form,
          _this3 = this;

      if (this.isNestedWizard && (_this$root = this.root) !== null && _this$root !== void 0 && _this$root.subWizards && (subForm === null || subForm === void 0 ? void 0 : (_subForm$_form = subForm._form) === null || _subForm$_form === void 0 ? void 0 : _subForm$_form.display) === 'wizard') {
        var existedForm = this.root.subWizards.findIndex(function (form) {
          return form.component.form === _this3.component.form;
        });

        if (existedForm !== -1) {
          this.root.subWizards[existedForm] = this;
        } else {
          this.root.subWizards.push(this);
        }

        this.emit('subWizardsUpdated', subForm);
      }
    }
    /**
     * Create a subform instance.
     *
     * @return {*}
     */

  }, {
    key: "createSubForm",
    value: function createSubForm(fromAttach) {
      var _this4 = this;

      this.subFormReady = this.loadSubForm(fromAttach).then(function (form) {
        if (!form) {
          return;
        } // Iterate through every component and hide the submit button.


        (0, _utils.eachComponent)(form.components, function (component) {
          _this4.hideSubmitButton(component);
        }); // If the subform is already created then destroy the old one.

        if (_this4.subForm) {
          _this4.subForm.destroy();
        } // Render the form.


        return new _Form["default"](form, _this4.getSubOptions()).ready.then(function (instance) {
          _this4.subForm = instance;
          _this4.subForm.currentForm = _this4;
          _this4.subForm.parent = _this4;
          _this4.subForm.parentVisible = _this4.visible;

          _this4.subForm.on('change', function () {
            if (_this4.subForm) {
              _this4.dataValue = _this4.subForm.getValue();

              _this4.triggerChange({
                noEmit: true
              });
            }
          });

          _this4.subForm.url = _this4.formSrc;
          _this4.subForm.nosubmit = true;
          _this4.subForm.root = _this4.root;
          _this4.subForm.localRoot = _this4.isNestedWizard ? _this4.localRoot : _this4.subForm;

          _this4.restoreValue();

          _this4.valueChanged = _this4.hasSetValue;

          _this4.onChange();

          return _this4.subForm;
        });
      }).then(function (subForm) {
        _this4.updateSubWizards(subForm);

        return subForm;
      });
      return this.subFormReady;
    }
  }, {
    key: "hideSubmitButton",
    value: function hideSubmitButton(component) {
      var isSubmitButton = component.type === 'button' && (component.action === 'submit' || !component.action);

      if (isSubmitButton) {
        component.hidden = true;
      }
    }
    /**
     * Load the subform.
     */

  }, {
    key: "loadSubForm",
    value: function loadSubForm(fromAttach) {
      var _this5 = this;

      if (this.builderMode || this.isHidden() || this.isSubFormLazyLoad() && !fromAttach) {
        return _nativePromiseOnly["default"].resolve();
      }

      if (this.hasLoadedForm && !this.isRevisionChanged) {
        // Pass config down to sub forms.
        if (this.root && this.root.form && this.root.form.config && !this.formObj.config) {
          this.formObj.config = this.root.form.config;
        }

        return _nativePromiseOnly["default"].resolve(this.formObj);
      } else if (this.formSrc) {
        this.subFormLoading = true;
        return new _Formio.GlobalFormio(this.formSrc).loadForm({
          params: {
            live: 1
          }
        }).then(function (formObj) {
          _this5.formObj = formObj;
          _this5.subFormLoading = false;
          return formObj;
        })["catch"](function (err) {
          console.log(err);
          return null;
        });
      }

      return _nativePromiseOnly["default"].resolve();
    }
  }, {
    key: "subFormData",
    get: function get() {
      var _this$dataValue;

      return ((_this$dataValue = this.dataValue) === null || _this$dataValue === void 0 ? void 0 : _this$dataValue.data) || {};
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row, options) {
      options = options || {};
      var silentCheck = options.silentCheck || false;

      if (this.subForm) {
        return this.subForm.checkValidity(this.subFormData, dirty, null, silentCheck);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, row, options);
    }
  }, {
    key: "checkComponentConditions",
    value: function checkComponentConditions(data, flags, row) {
      var _this6 = this;

      var visible = _get(_getPrototypeOf(FormComponent.prototype), "checkComponentConditions", this).call(this, data, flags, row); // Return if already hidden


      if (!visible) {
        return visible;
      }

      if (this.subForm) {
        return this.subForm.checkConditions(this.subFormData);
      } // There are few cases when subForm is not loaded when a change is triggered,
      // so we need to perform checkConditions after it is ready, or some conditional fields might be hidden in View mode
      else if (this.subFormReady) {
        this.subFormReady.then(function () {
          if (_this6.subForm) {
            return _this6.subForm.checkConditions(_this6.subFormData);
          }
        });
      }

      return visible;
    }
  }, {
    key: "calculateValue",
    value: function calculateValue(data, flags, row) {
      if (this.subForm) {
        return this.subForm.calculateValue(this.subFormData, flags);
      }

      return _get(_getPrototypeOf(FormComponent.prototype), "calculateValue", this).call(this, data, flags, row);
    }
  }, {
    key: "setPristine",
    value: function setPristine(pristine) {
      _get(_getPrototypeOf(FormComponent.prototype), "setPristine", this).call(this, pristine);

      if (this.subForm) {
        this.subForm.setPristine(pristine);
      }
    }
    /**
     * Determine if the subform should be submitted.
     * @return {*|boolean}
     */

  }, {
    key: "shouldSubmit",
    get: function get() {
      return this.subFormReady && (!this.component.hasOwnProperty('reference') || this.component.reference) && !this.isHidden();
    }
    /**
     * Returns the data for the subform.
     *
     * @return {*}
     */

  }, {
    key: "getSubFormData",
    value: function getSubFormData() {
      if (_lodash["default"].get(this.subForm, 'form.display') === 'pdf') {
        return this.subForm.getSubmission();
      } else {
        return _nativePromiseOnly["default"].resolve(this.dataValue);
      }
    }
    /**
     * Submit the subform if configured to do so.
     *
     * @return {*}
     */

  }, {
    key: "submitSubForm",
    value: function submitSubForm(rejectOnError) {
      var _this7 = this;

      // If we wish to submit the form on next page, then do that here.
      if (this.shouldSubmit) {
        return this.subFormReady.then(function () {
          if (!_this7.subForm) {
            return _this7.dataValue;
          }

          _this7.subForm.nosubmit = false;
          return _this7.subForm.submitForm().then(function (result) {
            _this7.subForm.loading = false;
            _this7.subForm.showAllErrors = false;
            _this7.dataValue = result.submission;
            return _this7.dataValue;
          })["catch"](function (err) {
            _this7.subForm.showAllErrors = true;

            if (rejectOnError) {
              _this7.subForm.onSubmissionError(err);

              return _nativePromiseOnly["default"].reject(err);
            } else {
              return {};
            }
          });
        });
      }

      return this.getSubFormData();
    }
    /**
     * Submit the form before the next page is triggered.
     */

  }, {
    key: "beforePage",
    value: function beforePage(next) {
      var _this8 = this;

      // Should not submit child forms if we are going to the previous page
      if (!next) {
        return _get(_getPrototypeOf(FormComponent.prototype), "beforePage", this).call(this, next);
      }

      return this.submitSubForm(true).then(function () {
        return _get(_getPrototypeOf(FormComponent.prototype), "beforePage", _this8).call(_this8, next);
      });
    }
    /**
     * Submit the form before the whole form is triggered.
     */

  }, {
    key: "beforeSubmit",
    value: function beforeSubmit() {
      var _this$subForm2,
          _this9 = this;

      var submission = this.dataValue;
      var isAlreadySubmitted = submission && submission._id && submission.form; // This submission has already been submitted, so just return the reference data.

      if (isAlreadySubmitted && !((_this$subForm2 = this.subForm) !== null && _this$subForm2 !== void 0 && _this$subForm2.wizard)) {
        this.dataValue = submission;
        return _nativePromiseOnly["default"].resolve(this.dataValue);
      }

      return this.submitSubForm(false).then(function () {
        return _this9.dataValue;
      }).then(function () {
        return _get(_getPrototypeOf(FormComponent.prototype), "beforeSubmit", _this9).call(_this9);
      });
    }
  }, {
    key: "isSubFormLazyLoad",
    value: function isSubFormLazyLoad() {
      var _this$root2, _this$root2$_form;

      return ((_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : (_this$root2$_form = _this$root2._form) === null || _this$root2$_form === void 0 ? void 0 : _this$root2$_form.display) === 'wizard' && this.component.lazyLoad;
    }
  }, {
    key: "isHidden",
    value: function isHidden() {
      if (!this.visible) {
        return true;
      }

      return !_get(_getPrototypeOf(FormComponent.prototype), "checkConditions", this).call(this, this.rootValue);
    }
  }, {
    key: "setValue",
    value: function setValue(submission) {
      var _this10 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(FormComponent.prototype), "setValue", this).call(this, submission, flags);

      this.valueChanged = true;

      if (this.subForm) {
        var _this$subForm$form;

        var revisionPath = submission._frid ? '_frid' : '_vid';
        var shouldLoadOriginalRevision = this.useOriginalRevision && _lodash["default"].isNumber(submission[revisionPath]) && _lodash["default"].isNumber((_this$subForm$form = this.subForm.form) === null || _this$subForm$form === void 0 ? void 0 : _this$subForm$form[revisionPath]) && submission._fvid !== this.subForm.form[revisionPath];

        if (shouldLoadOriginalRevision) {
          this.setFormRevision(submission._frid || submission._fvid);
          this.createSubForm().then(function () {
            _this10.attach(_this10.element);
          });
        } else {
          this.setSubFormValue(submission, flags);
        }
      }

      return changed;
    }
  }, {
    key: "setSubFormValue",
    value: function setSubFormValue(submission, flags) {
      var shouldLoadSubmissionById = submission && submission._id && this.subForm.formio && _lodash["default"].isEmpty(submission.data);

      if (shouldLoadSubmissionById) {
        var formId = submission.form || this.formObj.form || this.component.form;
        var submissionUrl = "".concat(this.subForm.formio.formsUrl, "/").concat(formId, "/submission/").concat(submission._id);
        this.subForm.setUrl(submissionUrl, this.options);
        this.subForm.loadSubmission();
      } else {
        this.subForm.setValue(submission, flags);
      }
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      return value === null || _lodash["default"].isEqual(value, this.emptyValue) || this.areAllComponentsEmpty(value.data) && !value._id;
    }
  }, {
    key: "areAllComponentsEmpty",
    value: function areAllComponentsEmpty(data) {
      var res = true;

      if (this.subForm) {
        this.subForm.everyComponent(function (comp) {
          var componentValue = _lodash["default"].get(data, comp.key);

          res &= comp.isEmpty(componentValue);
        });
      } else {
        res = false;
      }

      return res;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.subForm) {
        return this.subForm.getValue();
      }

      return this.dataValue;
    }
  }, {
    key: "errors",
    get: function get() {
      var errors = _get(_getPrototypeOf(FormComponent.prototype), "errors", this);

      if (this.subForm) {
        errors = errors.concat(this.subForm.errors);
      }

      return errors;
    }
  }, {
    key: "updateSubFormVisibility",
    value: function updateSubFormVisibility() {
      if (this.subForm) {
        this.subForm.parentVisible = this.visible;
      }
    }
    /**
     * Determines if this form is a Nested Wizard
     * which means it should be a Wizard itself and should be a direct child of a Wizard's page
     * @returns {boolean}
     */

  }, {
    key: "isNestedWizard",
    get: function get() {
      var _this$subForm3, _this$subForm3$_form, _this$parent, _this$parent$parent, _this$parent$parent$_;

      return ((_this$subForm3 = this.subForm) === null || _this$subForm3 === void 0 ? void 0 : (_this$subForm3$_form = _this$subForm3._form) === null || _this$subForm3$_form === void 0 ? void 0 : _this$subForm3$_form.display) === 'wizard' && ((_this$parent = this.parent) === null || _this$parent === void 0 ? void 0 : (_this$parent$parent = _this$parent.parent) === null || _this$parent$parent === void 0 ? void 0 : (_this$parent$parent$_ = _this$parent$parent._form) === null || _this$parent$parent$_ === void 0 ? void 0 : _this$parent$parent$_.display) === 'wizard';
    }
  }, {
    key: "visible",
    get: function get() {
      return _get(_getPrototypeOf(FormComponent.prototype), "visible", this);
    },
    set: function set(value) {
      var _this11 = this;

      var isNestedWizard = this.isNestedWizard;

      if (this._visible !== value) {
        this._visible = value; // Form doesn't load if hidden. If it becomes visible, create the form.

        if (!this.subForm && value) {
          this.createSubForm();
          this.subFormReady.then(function () {
            _this11.updateSubFormVisibility();

            _this11.clearOnHide();
          });
          this.redraw();
          return;
        }

        this.updateSubFormVisibility();
        this.clearOnHide();
        isNestedWizard ? this.rebuild() : this.redraw();
      }

      if (!value && isNestedWizard) {
        this.root.redraw();
      }
    }
  }, {
    key: "parentVisible",
    get: function get() {
      return _get(_getPrototypeOf(FormComponent.prototype), "parentVisible", this);
    },
    set: function set(value) {
      var _this12 = this;

      if (this._parentVisible !== value) {
        this._parentVisible = value;
        this.clearOnHide(); // Form doesn't load if hidden. If it becomes visible, create the form.

        if (!this.subForm && value) {
          this.createSubForm();
          this.subFormReady.then(function () {
            _this12.updateSubFormVisibility();
          });
          this.redraw();
          return;
        }

        this.updateSubFormVisibility();
        this.redraw();
      }
    }
  }, {
    key: "isInternalEvent",
    value: function isInternalEvent(event) {
      switch (event) {
        case 'focus':
        case 'blur':
        case 'componentChange':
        case 'componentError':
        case 'error':
        case 'formLoad':
        case 'languageChanged':
        case 'render':
        case 'checkValidity':
        case 'initialized':
        case 'submit':
        case 'submitButton':
        case 'nosubmit':
        case 'updateComponent':
        case 'submitDone':
        case 'submissionDeleted':
        case 'requestDone':
        case 'nextPage':
        case 'prevPage':
        case 'wizardNavigationClicked':
        case 'updateWizardNav':
        case 'restoreDraft':
        case 'saveDraft':
        case 'saveComponent':
        case 'pdfUploaded':
          return true;

        default:
          return false;
      }
    }
  }, {
    key: "createEmitter",
    value: function createEmitter() {
      var emitter = new _eventemitter["default"]();
      var nativeEmit = emitter.emit;
      var that = this;

      emitter.emit = function (event) {
        var eventType = event.replace("".concat(that.options.namespace, "."), '');

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        nativeEmit.call.apply(nativeEmit, [this, event].concat(args));

        if (!that.isInternalEvent(eventType)) {
          that.emit.apply(that, [eventType].concat(args));
        }
      };

      return emitter;
    }
  }, {
    key: "deleteValue",
    value: function deleteValue() {
      _get(_getPrototypeOf(FormComponent.prototype), "setValue", this).call(this, null, {
        noUpdateEvent: true,
        noDefault: true
      });

      this.unset();
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _Component2["default"].schema.apply(_Component2["default"], [{
        label: 'Form',
        type: 'form',
        key: 'form',
        src: '',
        reference: true,
        form: '',
        path: '',
        tableView: true
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Nested Form',
        icon: 'wpforms',
        group: 'premium',
        documentation: '/userguide/forms/premium-components#nested-form',
        weight: 110,
        schema: FormComponent.schema()
      };
    }
  }]);

  return FormComponent;
}(_Component2["default"]);

exports["default"] = FormComponent;