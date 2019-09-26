"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.find");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Base = _interopRequireDefault(require("../base/Base"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SurveyComponent =
/*#__PURE__*/
function (_BaseComponent) {
  _inherits(SurveyComponent, _BaseComponent);

  function SurveyComponent() {
    _classCallCheck(this, SurveyComponent);

    return _possibleConstructorReturn(this, _getPrototypeOf(SurveyComponent).apply(this, arguments));
  }

  _createClass(SurveyComponent, [{
    key: "build",
    value: function build() {
      var _this = this;

      if (this.viewOnly) {
        this.viewOnlyBuild();
      } else {
        this.createElement();
        var labelAtTheBottom = this.component.labelPosition === 'bottom';

        if (!labelAtTheBottom) {
          this.createLabel(this.element);
        }

        this.table = this.ce('table', {
          class: 'table table-striped table-bordered'
        });
        this.setInputStyles(this.table); // Build header.

        var thead = this.ce('thead');
        var thr = this.ce('tr');
        thr.appendChild(this.ce('td'));

        _lodash.default.each(this.component.values, function (value) {
          var th = _this.ce('th', {
            style: 'text-align: center;'
          });

          th.appendChild(_this.text(value.label));
          thr.appendChild(th);
        });

        thead.appendChild(thr);
        this.table.appendChild(thead); // Build the body.

        var tbody = this.ce('tbody');

        _lodash.default.each(this.component.questions, function (question) {
          var tr = _this.ce('tr');

          var td = _this.ce('td');

          td.appendChild(_this.text(question.label));
          tr.appendChild(td);

          _lodash.default.each(_this.component.values, function (value) {
            var td = _this.ce('td', {
              style: 'text-align: center;'
            });

            var input = _this.ce('input', {
              type: 'radio',
              name: _this.getInputName(question),
              value: value.value,
              id: "".concat(_this.id, "-").concat(question.value, "-").concat(value.value)
            });

            _this.addInput(input, td);

            tr.appendChild(td);
          });

          tbody.appendChild(tr);
        });

        this.table.appendChild(tbody);
        this.element.appendChild(this.table);
        this.errorContainer = this.element;

        if (labelAtTheBottom) {
          this.createLabel(this.element);
        }

        this.createDescription(this.element);
        this.restoreValue();

        if (this.shouldDisable) {
          this.disabled = true;
        }

        this.autofocus();
      }

      this.attachLogic();
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this2 = this;

      flags = this.getFlags.apply(this, arguments);

      if (!value) {
        return;
      }

      _lodash.default.each(this.component.questions, function (question) {
        _lodash.default.each(_this2.inputs, function (input) {
          if (input.name === _this2.getInputName(question)) {
            input.checked = input.value === value[question.value];
          }
        });
      });

      this.updateValue(flags);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      var _this3 = this;

      if (this.viewOnly) {
        return this.dataValue;
      }

      var value = {};

      _lodash.default.each(this.component.questions, function (question) {
        _lodash.default.each(_this3.inputs, function (input) {
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
    key: "getView",
    value: function getView(value) {
      var _this4 = this;

      if (!value) {
        return '';
      }

      var table = this.ce('table', {
        class: 'table table-striped table-bordered table-condensed'
      });
      var tbody = this.ce('tbody');

      _lodash.default.each(value, function (value, question) {
        var row = _this4.ce('tr');

        var questionCell = _this4.ce('th');

        var valueCell = _this4.ce('td');

        var questionText = _lodash.default.find(_this4.component.questions, ['value', question]).label;

        var valueText = _lodash.default.find(_this4.component.values, ['value', value]).label;

        questionCell.appendChild(_this4.text(questionText));
        valueCell.appendChild(_this4.text(valueText));
        row.appendChild(questionCell);
        row.appendChild(valueCell);
        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      return table.outerHTML;
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
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-list',
        weight: 170,
        documentation: 'http://help.form.io/userguide/#survey',
        schema: SurveyComponent.schema()
      };
    }
  }]);

  return SurveyComponent;
}(_Base.default);

exports.default = SurveyComponent;