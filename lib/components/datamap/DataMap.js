"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _DataGrid = _interopRequireDefault(require("../datagrid/DataGrid"));

var _lodash = _interopRequireDefault(require("lodash"));

var _eventemitter = _interopRequireDefault(require("eventemitter2"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataMapComponent =
/*#__PURE__*/
function (_DataGridComponent) {
  _inherits(DataMapComponent, _DataGridComponent);

  _createClass(DataMapComponent, [{
    key: "schema",
    get: function get() {
      var schema = _get(_getPrototypeOf(DataMapComponent.prototype), "schema", this);

      schema.valueComponent = this.components[this.components.length - 1].schema;
      return _lodash.default.omit(schema, 'components');
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _Component.default.schema.apply(_Component.default, [{
        label: 'Data Map',
        key: 'dataMap',
        type: 'datamap',
        clearOnHide: true,
        addAnother: 'Add Another',
        disableAddingRemovingRows: false,
        keyBeforeValue: true,
        valueComponent: {
          type: 'textfield',
          key: 'value',
          label: 'Value',
          defaultValue: 'Value',
          input: true
        },
        input: true,
        validate: {
          maxLength: 0,
          minLength: 0
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Data Map',
        icon: 'th-list',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#datamap',
        weight: 20,
        schema: DataMapComponent.schema()
      };
    }
  }]);

  function DataMapComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DataMapComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataMapComponent).call(this, component, options, data));
    _this.type = 'datamap';
    return _this;
  }

  _createClass(DataMapComponent, [{
    key: "init",
    value: function init() {
      this.components = [];
      this.rows = [];
      this.rowKeys = [];
      this.createRows();
      this.visibleColumns = _defineProperty({
        key: true
      }, this.valueKey, true);
      this.component.valueComponent.hideLabel = true;
    }
  }, {
    key: "createRows",
    value: function createRows() {
      var _this2 = this;

      var keys = Object.keys(this.dataValue);
      keys.forEach(function (key, index) {
        if (!_this2.rows[index]) {
          var row = _defineProperty({
            key: key
          }, _this2.valueKey, _this2.dataValue[key]);

          _this2.rows[index] = _this2.createRowComponents(row, index);
        }
      }); // Delete any extra rows.

      this.rows.splice(keys.length);
    }
  }, {
    key: "hasHeader",
    value: function hasHeader() {
      return true;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.disabled && this.fullMode;
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      var keySchema = Object.assign({}, this.keySchema);
      var valueSchema = Object.assign({}, this.component.valueComponent);
      keySchema.hideLabel = false;
      valueSchema.hideLabel = false;
      return this.component.keyBeforeValue ? [keySchema, valueSchema] : [valueSchema, keySchema];
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this3 = this;

      // Store existing key name so we know what it is if it changes.
      var key = row['key'];
      this.rowKeys[rowIndex] = key; // Create a new event emitter since fields are isolated.

      var options = _lodash.default.clone(this.options);

      options.events = new _eventemitter.default({
        wildcard: false,
        maxListeners: 0
      });
      options.name += "[".concat(rowIndex, "]");
      options.row = "".concat(rowIndex);
      var components = {};
      components['key'] = this.createComponent(this.keySchema, options, row);
      components[this.valueKey] = this.createComponent(this.component.valueComponent, options, row); // Handle change event

      options.events.on('formio.componentChange', function (event) {
        if (event.component.key === 'key') {
          var newKey = (0, _utils.uniqueKey)(_this3.dataValue, event.value);
          _this3.dataValue[newKey] = _this3.dataValue[key];
          delete _this3.dataValue[key];
          key = newKey;
          _this3.rowKeys[rowIndex] = newKey;

          _this3.triggerChange();
        } else if (event.component.key === _this3.valueKey) {
          _this3.dataValue[key] = event.value;

          _this3.triggerChange();
        }
      });
      return components;
    }
  }, {
    key: "addRow",
    value: function addRow() {
      var newKey = (0, _utils.uniqueKey)(this.dataValue, 'key');
      this.dataValue[newKey] = 'Value';
      var index = this.rows.length;
      this.rows[index] = this.createRowComponents(_defineProperty({
        key: newKey
      }, this.valueKey, this.dataValue[newKey]), index);
      this.rowKeys[index] = newKey;
      this.redraw();
      this.triggerChange();
    }
  }, {
    key: "removeRow",
    value: function removeRow(index) {
      delete this.dataValue[this.rowKeys[index]];
      this.rowKeys.splice(index, 1);
      this.rows.splice(index, 1);
      this.redraw();
      this.triggerChange();
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;
      this.createRows();
      this.updateOnChange(flags, changed);
      return changed;
    }
  }, {
    key: "checkColumns",
    value: function checkColumns() {
      return {
        rebuild: false,
        show: true
      };
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DataMapComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return {};
    }
  }, {
    key: "dataValue",
    get: function get() {
      if (!this.key || !this.visible && this.component.clearOnHide) {
        return this.emptyValue;
      }

      if (!this.hasValue()) {
        this.dataValue = this.emptyValue;
      }

      return _lodash.default.get(this.data, this.key);
    },
    set: function set(value) {
      _set(_getPrototypeOf(DataMapComponent.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(DataMapComponent.prototype), "defaultValue", this);

      if (Array.isArray(value)) {
        return value[0];
      }

      return this.emptyValue;
    }
  }, {
    key: "keySchema",
    get: function get() {
      return {
        type: 'textfield',
        input: true,
        hideLabel: true,
        label: this.component.keyLabel || 'Key',
        key: 'key'
      };
    }
  }, {
    key: "valueKey",
    get: function get() {
      return this.component.valueComponent.key;
    }
  }]);

  return DataMapComponent;
}(_DataGrid.default);

exports.default = DataMapComponent;