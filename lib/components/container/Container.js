'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContainerComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _Components = require('../Components');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ContainerComponent = exports.ContainerComponent = function (_FormioComponents) {
  _inherits(ContainerComponent, _FormioComponents);

  _createClass(ContainerComponent, null, [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        type: 'container',
        key: 'container',
        clearOnHide: true,
        input: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Container',
        icon: 'fa fa-folder-open',
        group: 'advanced',
        documentation: 'http://help.form.io/userguide/#container',
        weight: 140,
        schema: ContainerComponent.schema()
      };
    }
  }]);

  function ContainerComponent(component, options, data) {
    _classCallCheck(this, ContainerComponent);

    var _this = _possibleConstructorReturn(this, (ContainerComponent.__proto__ || Object.getPrototypeOf(ContainerComponent)).call(this, component, options, data));

    _this.type = 'container';
    return _this;
  }

  _createClass(ContainerComponent, [{
    key: 'build',
    value: function build() {
      this.createElement();
      if (!this.data[this.component.key]) {
        this.data[this.component.key] = {};
      }
      this.addComponents(this.getContainer(), this.data[this.component.key]);
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      if (this.viewOnly) {
        return this.value;
      }
      var value = {};
      _lodash2.default.each(this.components, function (component) {
        value[component.component.key] = component.getValue();
      });
      return value;
    }
  }, {
    key: 'setValue',
    value: function setValue(value, flags) {
      flags = this.getFlags.apply(this, arguments);
      if (!value || !_lodash2.default.isObject(value)) {
        return;
      }
      _lodash2.default.each(this.components, function (component) {
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