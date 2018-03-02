'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Components = require('../Components');

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _each2 = require('lodash/each');

var _each3 = _interopRequireDefault(_each2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerComponent = exports.ContainerComponent = function (_FormioComponents) {
  _inherits(ContainerComponent, _FormioComponents);

  function ContainerComponent(component, options, data) {
    _classCallCheck(this, ContainerComponent);

    var _this = _possibleConstructorReturn(this, (ContainerComponent.__proto__ || Object.getPrototypeOf(ContainerComponent)).call(this, component, options, data));

    _this.type = 'container';
    return _this;
  }

  _createClass(ContainerComponent, [{
    key: 'build',
    value: function build() {
      this.element = this.ce('div', {
        class: 'formio-container-component ' + this.component.customClass
      });
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = {};
      }
      this.addComponents(this.element, this.data[this.component.key]);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      var value = {};
      (0, _each3.default)(this.components, function (component) {
        value[component.component.key] = component.getValue();
      });
      return value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!value || !(0, _isObject3.default)(value)) {
        return;
      }
      this.value = value;
      (0, _each3.default)(this.components, function (component) {
        if (component.type === 'components') {
          component.setValue(value, flags);
        } else if (value.hasOwnProperty(component.component.key)) {
          component.setValue(value[component.component.key], flags);
        }
      });
      this.updateValue(flags);
    }
  }]);

  return ContainerComponent;
}(_Components.FormioComponents);