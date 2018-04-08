'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceComponent = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Select = require('../select/Select');

var _formio = require('../../formio.form');

var _formio2 = _interopRequireDefault(_formio);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceComponent = exports.ResourceComponent = function (_SelectComponent) {
  _inherits(ResourceComponent, _SelectComponent);

  _createClass(ResourceComponent, null, [{
    key: 'schema',
    value: function schema() {
      for (var _len = arguments.length, extend = Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Select.SelectComponent.schema.apply(_Select.SelectComponent, [{
        type: 'resource',
        label: 'Resource',
        key: 'resource',
        dataSrc: 'resource',
        resource: '',
        project: '',
        template: '<span>{{ item.data }}</span>'
      }].concat(extend));
    }
  }, {
    key: 'builderInfo',
    get: function get() {
      return {
        title: 'Resource',
        group: 'advanced',
        icon: 'fa fa-files-o',
        weight: 90,
        documentation: 'http://help.form.io/userguide/#resource',
        schema: ResourceComponent.schema()
      };
    }
  }]);

  function ResourceComponent(component, options, data) {
    _classCallCheck(this, ResourceComponent);

    var _this = _possibleConstructorReturn(this, (ResourceComponent.__proto__ || Object.getPrototypeOf(ResourceComponent)).call(this, component, options, data));

    _this.component.dataSrc = 'resource';
    _this.component.data = {
      resource: _this.component.resource
    };
    return _this;
  }

  /**
   * Creates a new button to add a resource instance
   * @returns {HTMLElement} - The "Add Resource" button html element.
   */


  _createClass(ResourceComponent, [{
    key: 'addButton',
    value: function addButton() {
      var _this2 = this;

      var addButton = this.ce('button', {
        class: 'btn btn-primary'
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });
      addButton.appendChild(addIcon);
      addButton.appendChild(this.text(' ' + (this.component.addResourceLabel || 'Add Resource')));

      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();
        var dialog = _this2.createModal(_this2.component.addResourceLabel || 'Add Resource');
        var formioForm = _this2.ce('div');
        dialog.body.appendChild(formioForm);
        var form = new _formio2.default(formioForm);
        form.on('submit', function (submission) {
          _this2.setValue(submission);
          dialog.close();
        });
        form.src = Formio.getBaseUrl() + '/form/' + _this2.component.resource;
      });

      return addButton;
    }
  }, {
    key: 'addInput',
    value: function addInput(input, container) {
      // Add Resource button
      if (this.component.addResource) {
        var table = this.ce('table', {
          class: 'table table-bordered'
        });
        var template = '<tbody>' + '<tr>' + '<td id="select">' + '</td>' + '</tr>' + '<tr>' + '<td id="button" colspan="2">' + '</td>' + '</tr>' + '</tbody>';
        container.appendChild(table);
        table.innerHTML = template;
        table.querySelector('#button').appendChild(this.addButton());
        _get(ResourceComponent.prototype.__proto__ || Object.getPrototypeOf(ResourceComponent.prototype), 'addInput', this).call(this, input, table.querySelector('#select'));
      } else {
        _get(ResourceComponent.prototype.__proto__ || Object.getPrototypeOf(ResourceComponent.prototype), 'addInput', this).call(this, input, container);
      }
    }
  }]);

  return ResourceComponent;
}(_Select.SelectComponent);