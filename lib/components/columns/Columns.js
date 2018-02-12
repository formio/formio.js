'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ColumnsComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

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

      var container = this.getContainer();
      container.noDrop = true;
      _lodash2.default.each(this.component.columns, function (column) {
        column.type = 'column';
        _this2.addComponent(column, container, _this2.data);
      });
    }
  }, {
    key: 'schema',
    get: function get() {
      var schema = _lodash2.default.omit(_get(ColumnsComponent.prototype.__proto__ || Object.getPrototypeOf(ColumnsComponent.prototype), 'schema', this), 'components');
      schema.columns = [];
      this.eachComponent(function (component) {
        return schema.columns.push(component.schema);
      });
      return schema;
    }
  }, {
    key: 'className',
    get: function get() {
      return 'row ' + _get(ColumnsComponent.prototype.__proto__ || Object.getPrototypeOf(ColumnsComponent.prototype), 'className', this);
    }
  }], [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Components.FormioComponents.schema.apply(_Components.FormioComponents, [{
        label: 'Columns',
        key: 'columns',
        type: 'columns',
        columns: [{ components: [], width: 6, offset: 0, push: 0, pull: 0 }, { components: [], width: 6, offset: 0, push: 0, pull: 0 }],
        clearOnHide: false,
        input: false,
        tableView: false
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Columns',
        icon: 'fa fa-columns',
        group: 'layout',
        documentation: 'http://help.form.io/userguide/#columns',
        weight: 10,
        schema: ColumnsComponent.schema()
      };
    }
  }]);

  return ColumnsComponent;
}(_Components.FormioComponents);