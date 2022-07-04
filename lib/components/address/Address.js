"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

require("core-js/modules/es.object.define-properties.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.array.slice.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.AddressComponentMode = void 0;

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.for-each.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.search.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _autocompleter = _interopRequireDefault(require("autocompleter"));

var _lodash = _interopRequireDefault(require("lodash"));

var _Formio = require("../../Formio");

var _GoogleAddressProvider = require("../../providers/address/GoogleAddressProvider");

var _Field = _interopRequireDefault(require("../_classes/field/Field"));

var _NestedComponent = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _Container = _interopRequireDefault(require("../container/Container"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var AddressComponentMode = {
  Autocomplete: 'autocomplete',
  Manual: 'manual'
};
exports.AddressComponentMode = AddressComponentMode;
var RemoveValueIconHiddenClass = 'address-autocomplete-remove-value-icon--hidden';
var ChildConditional = 'show = _.get(instance, \'parent.manualMode\', false);';

var AddressComponent = /*#__PURE__*/function (_ContainerComponent) {
  _inherits(AddressComponent, _ContainerComponent);

  var _super = _createSuper(AddressComponent);

  function AddressComponent() {
    _classCallCheck(this, AddressComponent);

    return _super.apply(this, arguments);
  }

  _createClass(AddressComponent, [{
    key: "mergeSchema",
    value: function mergeSchema() {
      var component = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var defaultSchema = this.defaultSchema;

      if (component.components) {
        defaultSchema = _lodash["default"].omit(defaultSchema, 'components');
      }

      return _lodash["default"].defaultsDeep(component, defaultSchema);
    }
  }, {
    key: "init",
    value: function init() {
      this.components = this.components || [];

      if (this.builderMode || this.manualModeEnabled) {
        _NestedComponent["default"].prototype.addComponents.call(this, this.manualMode ? this.address : {});
      }

      _Field["default"].prototype.init.call(this);

      if (!this.builderMode) {
        if (this.component.provider) {
          var _this$component = this.component,
              provider = _this$component.provider,
              providerOptions = _this$component.providerOptions;
          this.provider = this.initializeProvider(provider, providerOptions);
        } else if (this.component.map) {
          // Fallback to legacy version where Google Maps was the only provider.
          this.component.provider = _GoogleAddressProvider.GoogleAddressProvider.name;
          this.component.providerOptions = this.component.providerOptions || {};
          var _this$component2 = this.component,
              map = _this$component2.map,
              _provider = _this$component2.provider,
              _providerOptions = _this$component2.providerOptions;
          var key = map.key,
              region = map.region;

          if (key) {
            _lodash["default"].set(_providerOptions, 'params.key', key);
          }

          if (region) {
            _lodash["default"].set(_providerOptions, 'params.region', region);
          }

          this.provider = this.initializeProvider(_provider, _providerOptions);
        }
      }
    }
  }, {
    key: "initializeProvider",
    value: function initializeProvider(provider) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var url = this.interpolate(options.url);

      var Provider = _Formio.GlobalFormio.Providers.getProvider('address', provider);

      return new Provider(_objectSpread(_objectSpread({}, options), {}, {
        url: url
      }));
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.manualModeEnabled ? {
        mode: AddressComponentMode.Autocomplete,
        address: {}
      } : {};
    }
  }, {
    key: "mode",
    get: function get() {
      var _this$dataValue$mode, _this$dataValue;

      if (!this.manualModeEnabled) {
        return AddressComponentMode.Autocomplete;
      }

      return (_this$dataValue$mode = (_this$dataValue = this.dataValue) === null || _this$dataValue === void 0 ? void 0 : _this$dataValue.mode) !== null && _this$dataValue$mode !== void 0 ? _this$dataValue$mode : AddressComponentMode.Autocomplete;
    },
    set: function set(value) {
      if (this.manualModeEnabled) {
        this.dataValue.mode = value;
      }
    }
  }, {
    key: "autocompleteMode",
    get: function get() {
      return this.mode === AddressComponentMode.Autocomplete;
    }
  }, {
    key: "manualMode",
    get: function get() {
      return this.mode === AddressComponentMode.Manual;
    }
  }, {
    key: "manualModeEnabled",
    get: function get() {
      return !this.isMultiple && Boolean(this.component.enableManualMode);
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this = this;

      this.getComponents().forEach(function (component) {
        component.data = _this.address;
        component.setValue(component.dataValue, {
          noUpdateEvent: true
        });
      });
    }
  }, {
    key: "isMultiple",
    get: function get() {
      return Boolean(this.component.multiple);
    }
  }, {
    key: "address",
    get: function get() {
      if (this.isMultiple) {
        return _lodash["default"].isArray(this.dataValue) ? this.dataValue : [this.dataValue];
      } // Manual mode is not implementing for multiple value


      return this.manualModeEnabled && this.dataValue ? this.dataValue.address : this.dataValue;
    },
    set: function set(value) {
      if (this.manualModeEnabled && !this.isMultiple) {
        this.dataValue.address = value;
      } else {
        this.dataValue = value;
      }
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = _get(_getPrototypeOf(AddressComponent.prototype), "defaultValue", this);

      if (this.isMultiple) {
        defaultValue = _lodash["default"].isArray(defaultValue) ? defaultValue : [defaultValue];
      }

      return defaultValue;
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return AddressComponent.schema();
    }
  }, {
    key: "isValueInLegacyFormat",
    value: function isValueInLegacyFormat(value) {
      return value && !value.mode;
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      return this.manualModeEnabled && this.isValueInLegacyFormat(value) ? {
        mode: AddressComponentMode.Autocomplete,
        address: value
      } : value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _Field["default"].prototype.setValue.call(this, value, flags);

      if (this.manualMode) {
        this.restoreComponentsContext();
      }

      if (changed || !_lodash["default"].isEmpty(value) && flags.fromSubmission) {
        this.redraw();
      }

      return changed;
    }
  }, {
    key: "modeSwitcher",
    get: function get() {
      return this.refs ? this.refs[AddressComponent.modeSwitcherRef] || null : null;
    }
  }, {
    key: "removeValueIcon",
    get: function get() {
      return this.refs ? this.refs[AddressComponent.removeValueIconRef] || null : null;
    }
  }, {
    key: "searchInput",
    get: function get() {
      return this.refs ? this.refs[AddressComponent.searchInputRef] || null : null;
    }
  }, {
    key: "addRowButton",
    get: function get() {
      return this.refs ? this.refs[AddressComponent.addRowButtonRef] || null : null;
    }
  }, {
    key: "removeRowButton",
    get: function get() {
      return this.refs ? this.refs[AddressComponent.removeRowButtonRef] || null : null;
    }
  }, {
    key: "searchInputAttributes",
    get: function get() {
      var attr = {
        name: this.options.name,
        type: 'text',
        "class": 'form-control',
        lang: this.options.language,
        tabindex: this.component.tabindex || 0
      };

      if (this.component.placeholder) {
        attr.placeholder = this.t(this.component.placeholder), {
          _userInput: true
        };
      }

      if (this.disabled) {
        attr.disabled = 'disabled';
      }

      _lodash["default"].defaults(attr, this.component.attributes);

      return attr;
    }
  }, {
    key: "templateName",
    get: function get() {
      return 'address';
    }
  }, {
    key: "gridTemplateName",
    get: function get() {
      return 'multiValueTable';
    }
  }, {
    key: "rowTemplateName",
    get: function get() {
      return 'multiValueRow';
    }
  }, {
    key: "hasChildren",
    get: function get() {
      return !this.isMultiple && (this.builderMode || this.manualModeEnabled);
    }
  }, {
    key: "addAnother",
    get: function get() {
      return this.t(this.component.addAnother || 'Add Another');
    }
  }, {
    key: "renderElement",
    value: function renderElement(value) {
      return this.renderTemplate(this.templateName, {
        children: this.hasChildren ? this.renderComponents() : '',
        nestedKey: this.nestedKey,
        inputAttributes: this.searchInputAttributes,
        ref: {
          modeSwitcher: AddressComponent.modeSwitcherRef,
          removeValueIcon: AddressComponent.removeValueIconRef,
          searchInput: AddressComponent.searchInputRef
        },
        displayValue: this.getDisplayValue(value),
        mode: {
          autocomplete: this.autocompleteMode,
          manual: this.manualMode
        }
      });
    }
  }, {
    key: "renderRow",
    value: function renderRow(value, index) {
      return this.renderTemplate(this.rowTemplateName, {
        index: index,
        disabled: this.disabled,
        element: "".concat(this.renderElement(value, index))
      });
    }
  }, {
    key: "renderGrid",
    value: function renderGrid() {
      return this.renderTemplate(this.gridTemplateName, {
        rows: this.address.map(this.renderRow.bind(this)).join(''),
        disabled: this.disabled,
        addAnother: this.addAnother
      });
    }
  }, {
    key: "render",
    value: function render() {
      if (this.isMultiple) {
        return _get(_getPrototypeOf(AddressComponent.prototype), "render", this).call(this, this.renderGrid());
      }

      return _get(_getPrototypeOf(AddressComponent.prototype), "render", this).call(this, this.renderElement());
    }
  }, {
    key: "onSelectAddress",
    value: function onSelectAddress(address, element, index) {
      if (this.isMultiple) {
        this.address[index] = address;
        this.address = _toConsumableArray(this.address);
      } else {
        this.address = address;
      }

      this.triggerChange({
        modified: true
      });

      if (element) {
        element.value = this.getDisplayValue(this.isMultiple ? this.address[index] : this.address);
      }

      this.updateRemoveIcon(index);
    }
  }, {
    key: "addRow",
    value: function addRow() {
      this.address = this.address.concat(this.emptyValue);

      _get(_getPrototypeOf(AddressComponent.prototype), "redraw", this).call(this);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this2 = this;

      var result = (this.builderMode || this.manualMode ? _get(_getPrototypeOf(AddressComponent.prototype), "attach", this) : _Field["default"].prototype.attach).call(this, element);

      if (!this.builderMode) {
        if (!this.provider && this.component.provider) {
          var _this$component3 = this.component,
              provider = _this$component3.provider,
              providerOptions = _this$component3.providerOptions;
          this.provider = this.initializeProvider(provider, providerOptions);
        }
      }

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, AddressComponent.addRowButtonRef, 'single'), _defineProperty(_this$loadRefs, AddressComponent.modeSwitcherRef, 'single'), _defineProperty(_this$loadRefs, AddressComponent.removeRowButtonRef, 'multiple'), _defineProperty(_this$loadRefs, AddressComponent.removeValueIconRef, 'multiple'), _defineProperty(_this$loadRefs, AddressComponent.searchInputRef, 'multiple'), _this$loadRefs));
      this.searchInput.forEach(function (element, index) {
        if (!_this2.builderMode && element && _this2.provider) {
          if (_this2.component.provider === 'google') {
            _this2.provider.attachAutocomplete(element, index, _this2.onSelectAddress.bind(_this2));
          } else {
            (0, _autocompleter["default"])({
              input: element,
              debounceWaitMs: 300,
              fetch: function fetch(text, update) {
                var query = text;

                _this2.provider.search(query).then(update);
              },
              render: function render(address) {
                var div = _this2.ce('div');

                div.textContent = _this2.getDisplayValue(address);
                return div;
              },
              onSelect: function onSelect(address) {
                _this2.onSelectAddress(address, element, index);
              }
            });
          }

          _this2.addEventListener(element, 'blur', function () {
            if (!element) {
              return;
            }

            if (element.value) {
              element.value = _this2.getDisplayValue(_this2.isMultiple ? _this2.address[index] : _this2.address);
            }
          });

          _this2.addEventListener(element, 'keyup', function () {
            if (!element) {
              return;
            }

            if (!element.value) {
              _this2.clearAddress(element, index);
            }
          });
        }
      });

      if (this.addRowButton) {
        this.addEventListener(this.addRowButton, 'click', function (event) {
          event.preventDefault();

          _this2.addRow();
        });
      }

      this.removeRowButton.forEach(function (removeRowButton, index) {
        _this2.addEventListener(removeRowButton, 'click', function (event) {
          event.preventDefault();

          _this2.removeValue(index);
        });
      });

      if (this.modeSwitcher) {
        this.addEventListener(this.modeSwitcher, 'change', function () {
          if (!_this2.modeSwitcher) {
            return;
          }

          _this2.dataValue = _this2.emptyValue;
          _this2.mode = _this2.modeSwitcher.checked ? AddressComponentMode.Manual : AddressComponentMode.Autocomplete;

          if (!_this2.builderMode) {
            if (_this2.manualMode) {
              _this2.restoreComponentsContext();
            }

            _this2.triggerChange({
              modified: true
            });
          }

          _this2.redraw();
        });
      }

      if (!this.builderMode) {
        this.removeValueIcon.forEach(function (removeValueIcon, index) {
          _this2.updateRemoveIcon(index);

          var removeValueHandler = function removeValueHandler() {
            var _this2$searchInput;

            var searchInput = (_this2$searchInput = _this2.searchInput) === null || _this2$searchInput === void 0 ? void 0 : _this2$searchInput[index];

            _this2.clearAddress(searchInput, index);

            if (searchInput) {
              searchInput.focus();
            }
          };

          _this2.addEventListener(removeValueIcon, 'click', removeValueHandler);

          _this2.addEventListener(removeValueIcon, 'keydown', function (_ref) {
            var key = _ref.key;

            if (key === 'Enter') {
              removeValueHandler();
            }
          });
        });
      }

      return result;
    }
  }, {
    key: "addChildComponent",
    value: function addChildComponent(component) {
      component.customConditional = ChildConditional;
    }
  }, {
    key: "redraw",
    value: function redraw() {
      var _this3 = this;

      var modeSwitcherInFocus = this.modeSwitcher && document.activeElement === this.modeSwitcher;
      return _get(_getPrototypeOf(AddressComponent.prototype), "redraw", this).call(this).then(function (result) {
        if (modeSwitcherInFocus && _this3.modeSwitcher) {
          _this3.modeSwitcher.focus();
        }

        return result;
      });
    }
  }, {
    key: "clearAddress",
    value: function clearAddress(element, index) {
      var _this$address;

      if (!this.isEmpty()) {
        this.triggerChange();
      }

      if ((_this$address = this.address) !== null && _this$address !== void 0 && _this$address[index]) {
        this.address[index] = this.emptyValue;
      } else {
        this.address = this.emptyValue;
      }

      if (element) {
        element.value = '';
      }

      this.updateRemoveIcon(index);
    }
  }, {
    key: "getDisplayValue",
    value: function getDisplayValue() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.address;
      return this.provider && !this.manualMode ? this.provider.getDisplayValue(value) : '';
    }
  }, {
    key: "validateMultiple",
    value: function validateMultiple() {
      return this.isMultiple;
    }
  }, {
    key: "updateRemoveIcon",
    value: function updateRemoveIcon(index) {
      var _this$removeValueIcon;

      var removeValueIcon = (_this$removeValueIcon = this.removeValueIcon) === null || _this$removeValueIcon === void 0 ? void 0 : _this$removeValueIcon[index];

      if (removeValueIcon) {
        var value = this.isMultiple ? this.address[index] : this.address;

        if (this.isEmpty(value) || this.disabled) {
          this.addClass(removeValueIcon, RemoveValueIconHiddenClass);
        } else {
          this.removeClass(removeValueIcon, RemoveValueIconHiddenClass);
        }
      }
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value, options) {
      if (!value) {
        return '';
      }

      var normalizedValue = this.normalizeValue(value);

      var _ref2 = this.manualModeEnabled ? normalizedValue : {
        address: normalizedValue,
        mode: AddressComponentMode.Autocomplete
      },
          address = _ref2.address,
          mode = _ref2.mode;

      var valueInManualMode = mode === AddressComponentMode.Manual;

      if (this.provider && !valueInManualMode) {
        return this.getDisplayValue(address);
      }

      if (valueInManualMode) {
        if (this.component.manualModeViewString) {
          return this.interpolate(this.component.manualModeViewString, {
            address: address,
            data: this.data,
            component: this.component
          });
        }

        return this.getComponents().filter(function (component) {
          return component.hasValue(address);
        }).map(function (component) {
          return [component, _lodash["default"].get(address, component.key)];
        }).filter(function (_ref3) {
          var _ref4 = _slicedToArray(_ref3, 2),
              component = _ref4[0],
              componentValue = _ref4[1];

          return !component.isEmpty(componentValue);
        }).map(function (_ref5) {
          var _ref6 = _slicedToArray(_ref5, 2),
              component = _ref6[0],
              componentValue = _ref6[1];

          return component.getValueAsString(componentValue, options);
        }).join(', ');
      }

      return _get(_getPrototypeOf(AddressComponent.prototype), "getValueAsString", this).call(this, address, options);
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.searchInput && this.searchInput[0]) {
        this.searchInput[0].focus();
      }
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Container["default"].schema.apply(_Container["default"], [{
        type: 'address',
        label: 'Address',
        key: 'address',
        switchToManualModeLabel: 'Can\'t find address? Switch to manual mode.',
        provider: '',
        providerOptions: {},
        manualModeViewString: '',
        hideLabel: false,
        disableClearIcon: false,
        enableManualMode: false,
        components: [{
          label: 'Address 1',
          tableView: false,
          key: 'address1',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }, {
          label: 'Address 2',
          tableView: false,
          key: 'address2',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }, {
          label: 'City',
          tableView: false,
          key: 'city',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }, {
          label: 'State',
          tableView: false,
          key: 'state',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }, {
          label: 'Country',
          tableView: false,
          key: 'country',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }, {
          label: 'Zip Code',
          tableView: false,
          key: 'zip',
          type: 'textfield',
          input: true,
          customConditional: ChildConditional
        }]
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Address',
        group: 'advanced',
        icon: 'home',
        documentation: '/userguide/forms/form-components#address',
        weight: 35,
        schema: AddressComponent.schema()
      };
    }
  }, {
    key: "modeSwitcherRef",
    get: function get() {
      return 'modeSwitcher';
    }
  }, {
    key: "removeValueIconRef",
    get: function get() {
      return 'removeValueIcon';
    }
  }, {
    key: "searchInputRef",
    get: function get() {
      return 'searchInput';
    }
  }, {
    key: "addRowButtonRef",
    get: function get() {
      return 'addButton';
    }
  }, {
    key: "removeRowButtonRef",
    get: function get() {
      return 'removeRow';
    }
  }]);

  return AddressComponent;
}(_Container["default"]);

exports["default"] = AddressComponent;