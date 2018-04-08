'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FieldsetComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Components = require('../Components');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FieldsetComponent = exports.FieldsetComponent = function (_FormioComponents) {
  _inherits(FieldsetComponent, _FormioComponents);

  function FieldsetComponent() {
    _classCallCheck(this, FieldsetComponent);

    return _possibleConstructorReturn(this, (FieldsetComponent.__proto__ || Object.getPrototypeOf(FieldsetComponent)).apply(this, arguments));
  }

  _createClass(FieldsetComponent, [{
    key: 'getContainer',
    value: function getContainer() {
      return this.body;
    }
  }, {
    key: 'build',
    value: function build() {
      this.element = this.ce('fieldset', {
        id: this.id,
        class: this.className
      });
      if (this.component.legend) {
        var legend = this.ce('legend');
        legend.appendChild(this.text(this.component.legend));
        this.createTooltip(legend);
        this.setCollapseHeader(legend);
        this.element.appendChild(legend);
      }
      this.body = this.ce('div', {
        class: 'card-body'
      });
      this.addComponents();
      this.element.appendChild(this.body);
      this.setCollapsed();
    }
  }, {
    key: 'className',
    get: function get() {
      return 'form-group ' + _get(FieldsetComponent.prototype.__proto__ || Object.getPrototypeOf(FieldsetComponent.prototype), 'className', this);
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        label: 'Field Set',
        key: 'fieldSet',
        type: 'fieldset',
        legend: '',
        components: [],
        input: false
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Field Set',
        icon: 'fa fa-th-large',
        group: 'layout',
        documentation: 'http://help.form.io/userguide/#fieldset',
        weight: 20,
        schema: FieldsetComponent.schema()
      };
    }
  }]);

  return FieldsetComponent;
}(_Components.FormioComponents);