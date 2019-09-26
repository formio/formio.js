"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _Select = _interopRequireDefault(require("../select/Select"));

var _Webform = _interopRequireDefault(require("../../Webform"));

var _Formio = _interopRequireDefault(require("../../Formio"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ResourceComponent =
/*#__PURE__*/
function (_SelectComponent) {
  _inherits(ResourceComponent, _SelectComponent);

  _createClass(ResourceComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Select.default.schema.apply(_Select.default, [{
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
    key: "builderInfo",
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
    var _this;

    _classCallCheck(this, ResourceComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ResourceComponent).call(this, component, options, data));
    _this.component.dataSrc = 'resource';
    _this.component.data = {
      resource: _this.component.resource
    };
    return _this;
  }

  _createClass(ResourceComponent, [{
    key: "addButton",

    /**
     * Creates a new button to add a resource instance
     * @returns {HTMLElement} - The "Add Resource" button html element.
     */
    value: function addButton() {
      var _this2 = this;

      var addButton = this.ce('button', {
        class: 'btn btn-primary'
      });
      var addIcon = this.ce('i', {
        class: this.iconClass('plus')
      });
      addButton.appendChild(addIcon);
      addButton.appendChild(this.text(' '));
      addButton.appendChild(this.text(this.component.addResourceLabel || 'Add Resource'));
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();

        var dialog = _this2.createModal(_this2.component.addResourceLabel || 'Add Resource');

        var formioForm = _this2.ce('div');

        dialog.body.appendChild(formioForm);
        var form = new _Webform.default(formioForm);
        form.on('submit', function (submission) {
          if (_this2.component.multiple) {
            submission = [].concat(_toConsumableArray(_this2.dataValue), [submission]);
          }

          _this2.setValue(submission);

          form.destroy();
          dialog.close();
        });
        form.src = "".concat(_lodash.default.get(_this2.root, 'formio.projectUrl', _Formio.default.getBaseUrl()), "/form/").concat(_this2.component.resource);
      });
      return addButton;
    }
  }, {
    key: "addInput",
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

        _get(_getPrototypeOf(ResourceComponent.prototype), "addInput", this).call(this, input, table.querySelector('#select'));
      } else {
        _get(_getPrototypeOf(ResourceComponent.prototype), "addInput", this).call(this, input, container);
      }
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return ResourceComponent.schema();
    }
  }]);

  return ResourceComponent;
}(_Select.default);

exports.default = ResourceComponent;