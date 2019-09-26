"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Base = _interopRequireDefault(require("../base/Base"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _lodash = _interopRequireDefault(require("lodash"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataMapComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(DataMapComponent, _NestedComponent);

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

      return _Base.default.schema.apply(_Base.default, [{
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
        icon: 'fa fa-th-list',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#datamap',
        weight: 25,
        schema: DataMapComponent.schema()
      };
    }
  }]);

  function DataMapComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DataMapComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataMapComponent).call(this, component, options, data));
    _this.type = 'datamap';
    _this.rows = {};
    return _this;
  }

  _createClass(DataMapComponent, [{
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && !this.options.preview && (!maxLength || Object.keys(this.dataValue).length < maxLength);
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && Object.keys(this.dataValue).length > _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(before, after) {
      return !_lodash.default.isEqual(before, after);
    }
  }, {
    key: "build",
    value: function build(state) {
      var _this2 = this;

      if (this.options.builder) {
        return _get(_getPrototypeOf(DataMapComponent.prototype), "build", this).call(this, state, true);
      }

      this.createElement();
      this.createLabel(this.element);
      var tableClass = 'table datagrid-table table-bordered form-group formio-data-map ';

      _lodash.default.each(['striped', 'bordered', 'hover', 'condensed'], function (prop) {
        if (_this2.component[prop]) {
          tableClass += "table-".concat(prop, " ");
        }
      });

      this.tableElement = this.ce('table', {
        class: tableClass
      });
      this.buildRows(state);
      this.element.appendChild(this.tableElement);
      this.createDescription(this.element);
      this.attachLogic();
    }
  }, {
    key: "addKeyButton",
    value: function addKeyButton() {
      var _this3 = this;

      if (!this.hasAddButton()) {
        return null;
      }

      var addButton = this.ce('button', {
        class: 'btn btn-primary formio-button-add-row'
      });
      this.addEventListener(addButton, 'click', function (event) {
        event.preventDefault();

        _this3.addRow();
      });
      addButton.appendChild(this.ce('i', {
        class: this.iconClass('plus')
      }));
      addButton.appendChild(this.text(' '));
      addButton.appendChild(this.text(this.component.addAnother || 'Add Another'));
      return addButton;
    }
  }, {
    key: "removeKeyButton",
    value: function removeKeyButton(key) {
      var _this4 = this;

      var removeButton = this.ce('button', {
        type: 'button',
        class: 'btn btn-default btn-secondary formio-button-remove-row'
      });
      this.addEventListener(removeButton, 'click', function (event) {
        event.preventDefault();

        _this4.removeRow(key);
      });
      removeButton.appendChild(this.ce('i', {
        class: this.iconClass('remove-circle')
      }));
      return removeButton;
    } // Build the header.

  }, {
    key: "createHeader",
    value: function createHeader() {
      var valueHeader = this.ce('th', {
        'class': 'col-9 col-sm-8'
      }, this.text(this.component.valueComponent.label));

      if (this.component.valueComponent.tooltip) {
        this.createTooltip(valueHeader, {
          tooltip: this.t(this.component.valueComponent.tooltip)
        });
      }

      var keyHeader = this.ce('th', {
        'class': 'col-2 col-sm-3'
      }, this.text('Key'));
      this.createTooltip(keyHeader, {
        tooltip: this.t('Enter the map "key" for this value.')
      });
      return this.ce('thead', null, this.ce('tr', {
        class: 'd-flex'
      }, [this.component.keyBeforeValue ? keyHeader : valueHeader, this.component.keyBeforeValue ? valueHeader : keyHeader, this.hasRemoveButtons() ? this.ce('th', {
        'class': 'col-1 col-sm-1'
      }, null) : null]));
    }
  }, {
    key: "buildRows",
    value: function buildRows(state) {
      var _this5 = this;

      // Do not builder rows when in builder mode.
      if (this.options.builder) {
        return;
      } // Destroy all value components before they are recreated.


      this.destroyComponents();

      _lodash.default.each(this.rows, function (row) {
        return row.value.destroy();
      });

      this.rows = {};
      this.empty(this.tableElement);
      var tableRows = [];

      _lodash.default.each(this.dataValue, function (value, key) {
        return tableRows.push(_this5.buildRow(value, key, state));
      });

      this.tableElement.appendChild(this.createHeader());
      this.tableElement.appendChild(this.ce('tbody', null, tableRows));
      this.tableElement.appendChild(this.ce('tfoot', null, this.ce('tr', null, this.ce('td', {
        colspan: this.hasRemoveButtons() ? 3 : 2
      }, this.addKeyButton()))));
    }
  }, {
    key: "createValueComponent",
    value: function createValueComponent(state) {
      var _this6 = this;

      var container = this.ce('td', {
        class: 'col-9 col-sm-8'
      });
      var schema = this.component.valueComponent;
      schema.hideLabel = true;
      var value = this.addComponent(schema, container, {}, null, null, state);
      value.on('change', function () {
        return _this6.updateValue();
      }, true);
      return {
        value: value,
        container: container
      };
    }
  }, {
    key: "buildRow",
    value: function buildRow(value, key, state) {
      if (!this.rows[key]) {
        this.rows[key] = this.createValueComponent(state);
      }

      var row = this.rows[key];
      var lastColumn = null;

      if (this.hasRemoveButtons()) {
        row.remove = this.removeKeyButton(key);
        lastColumn = this.ce('td', {
          class: 'col-1 col-sm-1'
        }, row.remove);
      }

      row.element = this.ce('tr', {
        class: 'd-flex',
        id: "".concat(this.component.id, "-row-").concat(key)
      }); // Create our key input.

      row.keyInput = this.ce('input', {
        type: 'text',
        class: 'form-control',
        id: "".concat(this.component.id, "-value-").concat(key),
        value: key
      });
      this.addInput(row.keyInput);

      if (this.component.keyBeforeValue) {
        row.element.appendChild(this.ce('td', {
          class: 'col-2 col-sm-3'
        }, row.keyInput));
        row.element.appendChild(row.container);
      } else {
        row.element.appendChild(row.container);
        row.element.appendChild(this.ce('td', null, row.keyInput));
      }

      row.element.appendChild(lastColumn); // Set the value on the value component.

      row.value.setValue(value);
      return row.element;
    }
  }, {
    key: "addRow",
    value: function addRow() {
      var component = this.createValueComponent();
      var key = (0, _utils.uniqueKey)(this.dataValue, _lodash.default.camelCase(component.value.defaultValue) || 'key');
      this.rows[key] = component;
      this.dataValue[key] = component.value.defaultValue;
      this.buildRows();
      this.triggerChange();
    }
  }, {
    key: "removeRow",
    value: function removeRow(key) {
      var value = this.dataValue;
      delete value[key];
      this.dataValue = value;
      this.buildRows();
      this.triggerChange();
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;
      this.buildRows();
      return changed;
    }
    /**
     * Get the value of this component.
     *
     * @returns {*}
     */

  }, {
    key: "getValue",
    value: function getValue() {
      var value = {};

      _lodash.default.each(this.rows, function (row) {
        value[row.keyInput.value] = row.value.getValue();
      });

      return value;
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
    key: "componentComponents",
    get: function get() {
      return [this.component.valueComponent];
    }
  }]);

  return DataMapComponent;
}(_NestedComponent2.default);

exports.default = DataMapComponent;