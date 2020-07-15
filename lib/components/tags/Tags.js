"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.exec");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Input2 = _interopRequireDefault(require("../_classes/input/Input"));

var _choices = _interopRequireDefault(require("choices.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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

      this.choices = new _choices.default(element, {
        delimiter: this.delimiter,
        editItems: true,
        maxItemCount: this.component.maxTags,
        removeItemButton: true,
        duplicateItemsAllowed: false
      });
      this.choices.itemList.element.tabIndex = element.tabIndex;
      this.addEventListener(this.choices.input.element, 'blur', function () {
        var value = _this.choices.input.value;
        var maxTagsNumber = _this.component.maxTags;

        var valuesCount = _this.choices.getValue(true).length;

        if (value) {
          if (maxTagsNumber && valuesCount === maxTagsNumber) {
            _this.choices.addItems = false;

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

          this.choices.setValue(Array.isArray(dataValue) ? dataValue : [dataValue]);
        }
      }

      return changed;
    }
  }, {
    key: "focus",
    value: function focus() {
      if (this.refs.input && this.refs.input.length) {
        this.refs.input[0].parentNode.lastChild.focus();
      }
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
    key: "disabled",
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
    },
    get: function get() {
      return _get(_getPrototypeOf(TagsComponent.prototype), "disabled", this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Input2.default.schema.apply(_Input2.default, [{
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
        documentation: 'http://help.form.io/userguide/#tags',
        weight: 30,
        schema: TagsComponent.schema()
      };
    }
  }]);

  return TagsComponent;
}(_Input2.default);

exports.default = TagsComponent;