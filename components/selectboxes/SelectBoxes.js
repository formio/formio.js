"use strict";

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.string.iterator.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _Radio = _interopRequireDefault(require("../radio/Radio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var SelectBoxesComponent = /*#__PURE__*/function (_RadioComponent) {
  _inherits(SelectBoxesComponent, _RadioComponent);

  var _super = _createSuper(SelectBoxesComponent);

  function SelectBoxesComponent() {
    var _this;

    _classCallCheck(this, SelectBoxesComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.validators = _this.validators.concat('minSelectedCount', 'maxSelectedCount');
    return _this;
  }

  _createClass(SelectBoxesComponent, [{
    key: "init",
    value: function init() {
      _get(_getPrototypeOf(SelectBoxesComponent.prototype), "init", this).call(this);

      this.component.inputType = 'checkbox';
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SelectBoxesComponent.schema();
    }
  }, {
    key: "inputInfo",
    get: function get() {
      var info = _get(_getPrototypeOf(SelectBoxesComponent.prototype), "elementInfo", this).call(this);

      info.attr.name += '[]';
      info.attr.type = 'checkbox';
      info.attr.class = 'form-check-input';
      return info;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.component.values.reduce(function (prev, value) {
        if (value.value) {
          prev[value.value] = false;
        }

        return prev;
      }, {});
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var defaultValue = this.emptyValue;

      if (!_lodash.default.isEmpty(this.component.defaultValue)) {
        defaultValue = this.component.defaultValue;
      }

      if (this.component.customDefaultValue && !this.options.preview) {
        defaultValue = this.evaluate(this.component.customDefaultValue, {
          value: ''
        }, 'value');
      }

      return defaultValue;
    }
    /**
     * Only empty if the values are all false.
     *
     * @param value
     * @return {boolean}
     */

  }, {
    key: "isEmpty",
    value: function isEmpty() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.dataValue;
      var empty = true;

      for (var key in value) {
        if (value.hasOwnProperty(key) && value[key]) {
          empty = false;
          break;
        }
      }

      return empty;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var value = {};

      _lodash.default.each(this.refs.input, function (input) {
        value[input.value] = !!input.checked;
      });

      return value;
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
      value = value || {};

      if (_typeof(value) !== 'object') {
        if (typeof value === 'string') {
          value = _defineProperty({}, value, true);
        } else {
          value = {};
        }
      }

      if (Array.isArray(value)) {
        _lodash.default.each(value, function (val) {
          value[val] = true;
        });
      }

      return value;
    }
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     */

  }, {
    key: "setValue",
    value: function setValue(value) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var changed = this.updateValue(value, flags);
      value = this.dataValue;

      if (this.isHtmlRenderMode()) {
        if (changed) {
          this.redraw();
        }
      } else {
        _lodash.default.each(this.refs.input, function (input) {
          if (_lodash.default.isUndefined(value[input.value])) {
            value[input.value] = false;
          }

          input.checked = !!value[input.value];
        });
      }

      return changed;
    }
  }, {
    key: "getValueAsString",
    value: function getValueAsString(value) {
      if (!value) {
        return '';
      }

      return (0, _lodash.default)(this.component.values || []).filter(function (v) {
        return value[v.value];
      }).map('label').join(', ');
    }
  }, {
    key: "setSelectedClasses",
    value: function setSelectedClasses() {
      var _this2 = this;

      if (this.refs.wrapper) {
        //add/remove selected option class
        var value = this.dataValue;
        var valuesKeys = Object.keys(value);
        this.refs.wrapper.forEach(function (wrapper, index) {
          var key = valuesKeys[index];
          var input = _this2.refs.input[index];

          if ((input === null || input === void 0 ? void 0 : input.value.toString()) !== key) {
            key = valuesKeys.find(function (k) {
              return (input === null || input === void 0 ? void 0 : input.value.toString()) === k;
            });
          }

          var isChecked = value[key];

          if (isChecked && key) {
            //add class to container when selected
            _this2.addClass(wrapper, _this2.optionSelectedClass); //change "checked" attribute


            input.setAttribute('checked', 'true');
          } else if (!isChecked && key) {
            _this2.removeClass(wrapper, _this2.optionSelectedClass);

            input.removeAttribute('checked');
          }
        });
      }
    }
  }, {
    key: "setInputsDisabled",
    value: function setInputsDisabled(value, onlyUnchecked) {
      if (this.refs.input) {
        this.refs.input.forEach(function (item) {
          if (onlyUnchecked && !item.checked || !onlyUnchecked) {
            item.disabled = value;
          }
        });
      }
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, rowData, options) {
      var _this3 = this;

      var minCount = this.component.validate.minSelectedCount;
      var maxCount = this.component.validate.maxSelectedCount;
      var isValid = this.isValid(data, dirty);

      if (maxCount || minCount) {
        var count = Object.keys(this.validationValue).reduce(function (total, key) {
          if (_this3.validationValue[key]) {
            total++;
          }

          return total;
        }, 0); // Disable the rest of inputs if the max amount is already checked

        if (maxCount && count >= maxCount) {
          this.setInputsDisabled(true, true);
        } else if (maxCount && !this.shouldDisabled) {
          this.setInputsDisabled(false);
        }

        if (!isValid && maxCount && count > maxCount) {
          var message = this.t(this.component.maxSelectedCountMessage || 'You can only select up to {{maxCount}} items.', {
            maxCount: maxCount
          });
          this.setCustomValidity(message, dirty);
          return false;
        } else if (!isValid && minCount && count < minCount) {
          this.setInputsDisabled(false);

          var _message = this.t(this.component.minSelectedCountMessage || 'You must select at least {{minCount}} items.', {
            minCount: minCount
          });

          this.setCustomValidity(_message, dirty);
          return false;
        }
      }

      return _get(_getPrototypeOf(SelectBoxesComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, rowData, options);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _Radio.default.schema.apply(_Radio.default, [{
        type: 'selectboxes',
        label: 'Select Boxes',
        key: 'selectBoxes',
        inline: false
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Select Boxes',
        group: 'basic',
        icon: 'plus-square',
        weight: 60,
        documentation: '/userguide/#selectboxes',
        schema: SelectBoxesComponent.schema()
      };
    }
  }]);

  return SelectBoxesComponent;
}(_Radio.default);

exports.default = SelectBoxesComponent;