'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurveyComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Base = require('../base/Base');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SurveyComponent = exports.SurveyComponent = function (_BaseComponent) {
  _inherits(SurveyComponent, _BaseComponent);

  function SurveyComponent() {
    _classCallCheck(this, SurveyComponent);

    return _possibleConstructorReturn(this, (SurveyComponent.__proto__ || Object.getPrototypeOf(SurveyComponent)).apply(this, arguments));
  }

  _createClass(SurveyComponent, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

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
        this.setInputStyles(this.table);

        // Build header.
        var thead = this.ce('thead');
        var thr = this.ce('tr');
        thr.appendChild(this.ce('td'));
        _lodash2.default.each(this.component.values, function (value) {
          var th = _this2.ce('th', {
            style: 'text-align: center;'
          });
          th.appendChild(_this2.text(value.label));
          thr.appendChild(th);
        });
        thead.appendChild(thr);
        this.table.appendChild(thead);
        // Build the body.
        var tbody = this.ce('tbody');
        _lodash2.default.each(this.component.questions, function (question) {
          var tr = _this2.ce('tr');
          var td = _this2.ce('td');
          td.appendChild(_this2.text(question.label));
          tr.appendChild(td);
          _lodash2.default.each(_this2.component.values, function (value) {
            var td = _this2.ce('td', {
              style: 'text-align: center;'
            });
            var input = _this2.ce('input', {
              type: 'radio',
              name: 'data[' + _this2.component.key + '][' + question.value + ']',
              value: value.value,
              id: _this2.id + '-' + question.value + '-' + value.value
            });
            _this2.addInput(input, td);
            tr.appendChild(td);
          });
          tbody.appendChild(tr);
        });
        this.table.appendChild(tbody);
        this.element.appendChild(this.table);
        if (labelAtTheBottom) {
          this.createLabel(this.element);
        }
        this.createDescription(this.element);
        this.restoreValue();
        if (this.shouldDisable) {
          this.disabled = true;
        }
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      var _this3 = this;

      flags = this.getFlags.apply(this, arguments);
      if (!value) {
        return;
      }
      var key = 'data[' + this.component.key + ']';
      _lodash2.default.each(this.component.questions, function (question) {
        _lodash2.default.each(_this3.inputs, function (input) {
          if (input.name === key + '[' + question.value + ']') {
            input.checked = input.value === value[question.value];
          }
        });
      });
      this.updateValue(flags);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var _this4 = this;

      if (this.viewOnly) {
        return this.dataValue;
      }
      var value = {};
      var key = 'data[' + this.component.key + ']';
      _lodash2.default.each(this.component.questions, function (question) {
        _lodash2.default.each(_this4.inputs, function (input) {
          if (input.checked && input.name === key + '[' + question.value + ']') {
            value[question.value] = input.value;
            return false;
          }
        });
      });
      return value;
    }
  }, {
    key: 'getView',
    value: function getView(value) {
      var _this5 = this;

      if (!value) {
        return '';
      }
      var table = this.ce('table', {
        class: 'table table-striped table-bordered table-condensed'
      });
      var tbody = this.ce('tbody');

      _lodash2.default.each(value, function (value, question) {
        var row = _this5.ce('tr');

        var questionCell = _this5.ce('th');
        var valueCell = _this5.ce('td');

        var questionText = _lodash2.default.find(_this5.component.questions, ['value', question]).label;
        var valueText = _lodash2.default.find(_this5.component.values, ['value', value]).label;

        questionCell.appendChild(_this5.text(questionText));
        valueCell.appendChild(_this5.text(valueText));

        row.appendChild(questionCell);
        row.appendChild(valueCell);

        tbody.appendChild(row);
      });

      table.appendChild(tbody);
      return table.outerHTML;
    }
  }]);

  return SurveyComponent;
}(_Base.BaseComponent);