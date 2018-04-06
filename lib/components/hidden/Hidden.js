'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HiddenComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Base = require('../base/Base');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HiddenComponent = exports.HiddenComponent = function (_BaseComponent) {
  _inherits(HiddenComponent, _BaseComponent);

  function HiddenComponent() {
    _classCallCheck(this, HiddenComponent);

    return _possibleConstructorReturn(this, (HiddenComponent.__proto__ || Object.getPrototypeOf(HiddenComponent)).apply(this, arguments));
  }

  _createClass(HiddenComponent, [{
    key: 'elementInfo',
    value: function elementInfo() {
      var info = _get(HiddenComponent.prototype.__proto__ || Object.getPrototypeOf(HiddenComponent.prototype), 'elementInfo', this).call(this);
      info.type = 'input';
      info.attr.type = 'hidden';
      info.changeEvent = 'change';
      return info;
    }
  }, {
    key: 'build',
    value: function build() {
      _get(HiddenComponent.prototype.__proto__ || Object.getPrototypeOf(HiddenComponent.prototype), 'build', this).call(this);
      if (this.options.builder) {
        // We need to see it in builder mode.
        this.append(this.text(this.name));
      }
    }
  }, {
    key: 'createLabel',
    value: function createLabel() {
      return;
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Base.BaseComponent.schema.apply(_Base.BaseComponent, [{
        type: 'hidden',
        inputType: 'hidden'
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Hidden',
        group: 'advanced',
        icon: 'fa fa-user-secret',
        weight: 80,
        documentation: 'http://help.form.io/userguide/#hidden',
        schema: HiddenComponent.schema()
      };
    }
  }]);

  return HiddenComponent;
}(_Base.BaseComponent);