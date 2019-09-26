"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.join");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/es.string.split");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../base/Base"));

var _choices = _interopRequireDefault(require("choices.js/public/assets/scripts/choices.js"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var TagsComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(TagsComponent, _BaseComponent);

  _createClass(TagsComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-tags',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#tags',
        weight: 50,
        schema: TagsComponent.schema()
      };
    }
  }]);

  function TagsComponent(component, options, data) {
    var _this;

    _classCallCheck(this, TagsComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TagsComponent).call(this, component, options, data));
    _this.component.delimeter = _this.component.delimeter || ',';
    return _this;
  }

  _createClass(TagsComponent, [{
    key: "elementInfo",
    value: function elementInfo() {
      var info = _get(_getPrototypeOf(TagsComponent.prototype), "elementInfo", this).call(this);

      info.type = 'input';
      info.attr.type = 'text';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: "addInput",
    value: function addInput(input, container) {
      _get(_getPrototypeOf(TagsComponent.prototype), "addInput", this).call(this, input, container);

      if (!input) {
        return;
      }

      input.setAttribute('dir', this.i18next.dir());
      this.choices = new _choices.default(input, {
        delimiter: this.component.delimeter || ',',
        editItems: true,
        maxItemCount: this.component.maxTags,
        removeItemButton: true
      });
      this.choices.itemList.element.tabIndex = input.tabIndex;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      if (this.choices) {
        if (this.component.storeas === 'string' && typeof value === 'string') {
          value = value.split(',');
        }

        if (value && !_lodash.default.isArray(value)) {
          value = [value];
        }

        this.choices.removeActiveItems();

        if (value) {
          this.choices.setValue(value);
        }
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.choices) {
        var value = this.choices.getValue(true);
        return this.component.storeas === 'string' ? value.join(this.component.delimeter) : value;
      }

      return null;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      _get(_getPrototypeOf(TagsComponent.prototype), "destroy", this).call(this);

      if (this.choices) {
        this.choices.destroyed = true;
        this.choices.destroy();
        this.choices = null;
      }
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return TagsComponent.schema();
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
    }
  }]);

  return TagsComponent;
}(_Base.default);

exports.default = TagsComponent;