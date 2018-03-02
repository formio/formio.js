'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ResourceComponent = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Select = require('../select/Select');

var _dialogPolyfill = require('dialog-polyfill');

var _dialogPolyfill2 = _interopRequireDefault(_dialogPolyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceComponent = exports.ResourceComponent = function (_SelectComponent) {
  _inherits(ResourceComponent, _SelectComponent);

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

      var addButton = this.ce('a', {
        class: 'btn btn-primary'
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });
      addButton.appendChild(addIcon);
      addButton.appendChild(this.text(' ' + (this.component.addResourceLabel || 'Add Resource')));

      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();

        // HTML for dialog
        var template = '' + ('<div class="row">' + '<div class="col-sm-12">' + '<b id="close" class="formio-dialog-close pull-right">X</b>' + '</div>' + '</div>' + '<div class="row">' + '<div class="col-sm-12">' + '<div class="panel panel-default">' + '<div class="panel-heading">' + '<h3 class="panel-title">') + (_this2.component.addResourceLabel || 'Add Resource') + '</h3>' + '</div>' + '<div class="panel-body">' + '<div id="formio"></div>' + '</div>' + '</div>' + '</div>' + '</div>';

        _this2.dialog = _this2.ce('dialog', {
          class: 'formio-dialog'
        });
        _this2.dialog.innerHTML = template;
        addButton.ownerDocument.body.appendChild(_this2.dialog);
        _dialogPolyfill2.default.registerDialog(_this2.dialog);

        var self = _this2;
        var close = _this2.dialog.querySelector('#close');
        var form = new FormioForm(_this2.dialog.querySelector('#formio'));

        close.onclick = function () {
          self.dialog.close();
        };

        form.on('submit', function (submission) {
          self.setValue(submission);
          self.dialog.close();
        });
        form.src = Formio.getBaseUrl() + '/form/' + self.component.resource;

        _this2.dialog.onclose = function () {
          self.removeChildFrom(self.dialog, self.dialog.parentElement);
        };

        _this2.dialog.showModal();
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