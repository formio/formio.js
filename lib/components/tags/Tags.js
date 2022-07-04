"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.object.create.js");

require("core-js/modules/es.object.define-property.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.reflect.set.js");

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

require("core-js/modules/es.array.some.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.string.trim.js");

require("core-js/modules/es.array.is-array.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.date.to-string.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.set-prototype-of.js");

require("core-js/modules/es.function.bind.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Choices;

if (typeof window !== 'undefined') {
  Choices = require('@formio/choices.js');
}

var TagsComponent = /*#__PURE__*/function (_Input) {
  _inherits(TagsComponent, _Input);

  var _super = _createSuper(TagsComponent);

  function TagsComponent() {
    _classCallCheck(this, TagsComponent);

    return _super.apply(this, arguments);
  }

  _createClass(TagsComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(TagsComponent.prototype), "init", this).call(this);
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.component.storeas === 'string' ? '' : [];
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TagsComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(TagsComponent.prototype), "inputInfo", this);

      info.type = 'input';
      info.attr.type = 'text';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: "delimiter",
    get: function get() {
      return this.component.delimeter || ',';
    }
  }, {
    key: "attachElement",
    value: function attachElement(element, index) {
      var _this = this;

      _get(_getPrototypeOf(TagsComponent.prototype), "attachElement", this).call(this, element, index);

      if (!element) {
        return;
      }

      element.setAttribute('dir', this.i18next.dir());

      if (this.choices) {
        this.choices.destroy();
      }

      if (!Choices) {
        return;
      }

      var hasPlaceholder = !!this.component.placeholder;
      this.choices = new Choices(element, {
        delimiter: this.delimiter,
        editItems: true,
        maxItemCount: this.component.maxTags,
        removeItemButton: true,
        duplicateItemsAllowed: false,
        shadowRoot: this.root ? this.root.shadowRoot : null,
        placeholder: hasPlaceholder,
        placeholderValue: hasPlaceholder ? this.t(this.component.placeholder, {
          _userInput: true
        }) : null
      });
      this.choices.itemList.element.tabIndex = element.tabIndex;
      this.addEventListener(this.choices.input.element, 'blur', function () {
        var value = _this.choices.input.value;
        var maxTagsNumber = _this.component.maxTags;

        var valuesCount = _this.choices.getValue(true).length;

        var isRepeatedValue = _this.choices.getValue(true).some(function (existingValue) {
          return existingValue.trim() === value.trim();
        });

        if (value) {
          if (maxTagsNumber && valuesCount === maxTagsNumber) {
            _this.choices.addItems = false;

            _this.choices.clearInput();
          } else if (isRepeatedValue) {
            _this.choices.clearInput();
          } else {
            _this.choices.setValue([value]);

            _this.choices.clearInput();

            _this.choices.hideDropdown(true);

            _this.updateValue(null, {
              modified: true
            });
          }
        }
      });
    }
  }, {
    key: "detach",
    value: function detach() {
      _get(_getPrototypeOf(TagsComponent.prototype), "detach", this).call(this);

      if (this.choices) {
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: "normalizeValue",
    value: function normalizeValue(value) {
      if (this.component.storeas === 'string' && Array.isArray(value)) {
        return value.join(this.delimiter);
      } else if (this.component.storeas === 'array' && typeof value === 'string') {
        return value.split(this.delimiter).filter(function (result) {
          return result;
        });
      }

      return value;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this2 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var changed = _get(_getPrototypeOf(TagsComponent.prototype), "setValue", this).call(this, value, flags);

      if (this.choices) {
        var dataValue = this.dataValue;
        this.choices.removeActiveItems();

        if (dataValue) {
          if (typeof dataValue === 'string') {
            dataValue = dataValue.split(this.delimiter).filter(function (result) {
              return result;
            });
          }

          var _value = Array.isArray(dataValue) ? dataValue : [dataValue];

          this.choices.setValue(_value.map(function (val) {
            return _this2.sanitize(val, _this2.shouldSanitizeValue);
          }));
        }
      }

      return changed;
    }
  }, {
    key: "disabled",
    get: function get() {
      return _get(_getPrototypeOf(TagsComponent.prototype), "disabled", this);
    },
    set: function set(disabled) {
      _set(_getPrototypeOf(TagsComponent.prototype), "disabled", disabled, this, true);

      if (!this.choices) {
        return;
      }

      if (disabled) {
        this.choices.disable();
      } else {
        this.choices.enable();
      }
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.refs.input && this.refs.input.length) {
        this.refs.input[0].parentNode.lastChild.focus();
      }
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      if (Array.isArray(value)) {
        return value.join("".concat(this.delimiter || ',', " "));
      }

      var stringValue = value.toString();
      return this.sanitize(stringValue, this.shouldSanitizeValue);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2["default"].schema.apply(_Input2["default"], [{
        type: 'tags',
        label: 'Tags',
        key: 'tags',
        delimeter: ',',
        storeas: 'string',
        maxTags: 0
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Tags',
        icon: 'tags',
        group: 'advanced',
        documentation: '/userguide/forms/form-components#tags',
        weight: 30,
        schema: TagsComponent.schema()
      };
    }
  }]);

  return TagsComponent;
}(_Input2["default"]);

exports["default"] = TagsComponent;