"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Field2 = _interopRequireDefault(require("../_classes/field/Field"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SurveyComponent =
/*#__PURE__*/
function (_Field) {
  _inherits(SurveyComponent, _Field);

  function SurveyComponent() {
    _classCallCheck(this, SurveyComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SurveyComponent).apply(this, arguments));
  }

  _createClass(SurveyComponent, [{
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(SurveyComponent.prototype), "render", this).call(this, this.renderTemplate('survey'));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this = this;

      this.loadRefs(element, {
        input: 'multiple'
      });

      var superAttach = _get(_getPrototypeOf(SurveyComponent.prototype), "attach", this).call(this, element);

      this.refs.input.forEach(function (input) {
        _this.addEventListener(input, 'change', function () {
          return _this.updateValue(null, {
            modified: true
          });
        });
      });
      this.setValue(this.dataValue);
      return superAttach;
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this2 = this;

      flags = flags || {};

      if (!value) {
        return false;
      }

      _lodash.default.each(this.component.questions, function (question) {
        _lodash.default.each(_this2.refs.input, function (input) {
          if (input.name === _this2.getInputName(question)) {
            input.checked = input.value === value[question.value];
          }
        });
      });

      return this.updateValue(value, flags);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var _this3 = this;

      if (this.viewOnly || !this.refs.input || !this.refs.input.length) {
        return this.dataValue;
      }

      var value = {};

      _lodash.default.each(this.component.questions, function (question) {
        _lodash.default.each(_this3.refs.input, function (input) {
          if (input.checked && input.name === _this3.getInputName(question)) {
            value[question.value] = input.value;
            return false;
          }
        });
      });

      return value;
    }
  }, {
    key: "validateRequired",
    value: function validateRequired(setting, value) {
      if (!(0, _utils.boolValue)(setting)) {
        return true;
      }

      return this.component.questions.reduce(function (result, question) {
        return result && Boolean(value[question.value]);
      }, true);
    }
  }, {
    key: "getInputName",
    value: function getInputName(question) {
      return "".concat(this.options.name, "[").concat(question.value, "]");
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return SurveyComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(SurveyComponent.prototype), "disabled", disabled, this, true);

      _lodash.default.each(this.refs.input, function (input) {
        input.disabled = true;
      });
    },
    get: function get() {
      return _get(_getPrototypeOf(SurveyComponent.prototype), "disabled", this);
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Field2.default.schema.apply(_Field2.default, [{
        type: 'survey',
        label: 'Survey',
        key: 'survey',
        questions: [],
        values: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Survey',
        group: 'advanced',
        icon: 'list',
        weight: 110,
        documentation: 'http://help.form.io/userguide/#survey',
        schema: SurveyComponent.schema()
      };
    }
  }]);

  return SurveyComponent;
}(_Field2.default);

exports.default = SurveyComponent;