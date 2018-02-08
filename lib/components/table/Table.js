'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TableComponent = exports.TableComponent = function (_FormioComponents) {
  _inherits(TableComponent, _FormioComponents);

  function TableComponent() {
    _classCallCheck(this, TableComponent);

    return _possibleConstructorReturn(this, (TableComponent.__proto__ || Object.getPrototypeOf(TableComponent)).apply(this, arguments));
  }

  _createClass(TableComponent, [{
    key: 'build',
    value: function build() {
      var _this2 = this;

      this.element = this.ce('div', {
        class: 'table-responsive'
      });

      var tableClass = 'table ';
      (0, _each3.default)(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this2.component[prop]) {
          tableClass += 'table-' + prop + ' ';
        }
      });
      var table = this.ce('table', {
        class: tableClass
      });

      // Build the header.
      if (this.component.header && this.component.header.length) {
        var thead = this.ce('thead');
        var thr = this.ce('tr');
        (0, _each3.default)(this.component.header, function (header) {
          var th = _this2.ce('th');
          th.appendChild(_this2.text(header));
          thr.appendChild(th);
        });
        thead.appendChild(thr);
        table.appendChild(thead);
      }

      // Build the body.
      var tbody = this.ce('tbody');
      (0, _each3.default)(this.component.rows, function (row) {
        var tr = _this2.ce('tr');
        (0, _each3.default)(row, function (column) {
          var td = _this2.ce('td');
          (0, _each3.default)(column.components, function (comp) {
            _this2.addComponent(comp, td);
          });
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      this.element.appendChild(table);
    }
  }]);

  return TableComponent;
}(_Components.FormioComponents);