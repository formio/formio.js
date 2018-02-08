'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ColumnsComponent = exports.ColumnsComponent = function (_FormioComponents) {
  _inherits(ColumnsComponent, _FormioComponents);

  function ColumnsComponent() {
    _classCallCheck(this, ColumnsComponent);

    return _possibleConstructorReturn(this, (ColumnsComponent.__proto__ || Object.getPrototypeOf(ColumnsComponent)).apply(this, arguments));
  }

  _createClass(ColumnsComponent, [{
    key: 'addComponents',
    value: function addComponents() {
      var _this2 = this;

      (0, _each3.default)(this.component.columns, function (column) {
        column.type = 'column';
        _this2.addComponent(column, _this2.element, _this2.data);
      });
    }
  }, {
    key: 'className',
    get: function get() {
      return 'row ' + this.component.customClass;
    }
  }]);

  return ColumnsComponent;
}(_Components.FormioComponents);