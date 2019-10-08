"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fastDeepEqual = _interopRequireDefault(require("fast-deep-equal"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _utils = require("../../utils/utils");

var _templates = _interopRequireDefault(require("./templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var EditGridComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(EditGridComponent, _NestedComponent);

  _createClass(EditGridComponent, [{
    key: "defaultSchema",
    get: function get() {
      return EditGridComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [];
    }
  }, {
    key: "editgridKey",
    get: function get() {
      return "editgrid-".concat(this.key);
    }
  }, {
    key: "minLength",
    get: function get() {
      return _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "data",
    get: function get() {
      return this._data;
    },
    set: function set(value) {
      this._data = value;
      var data = this.dataValue;
      (this.editRows || []).forEach(function (row, index) {
        var rowData = data[index];
        row.data = rowData;
        row.components.forEach(function (component) {
          component.data = rowData;
        });
      });
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        type: 'editgrid',
        label: 'Edit Grid',
        key: 'editGrid',
        clearOnHide: true,
        input: true,
        tree: true,
        removeRow: 'Cancel',
        defaultOpen: false,
        components: [],
        inlineEdit: false,
        templates: {
          header: EditGridComponent.defaultHeaderTemplate,
          row: EditGridComponent.defaultRowTemplate,
          footer: ''
        }
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Edit Grid',
        icon: 'tasks',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#editgrid',
        weight: 30,
        schema: EditGridComponent.schema()
      };
    }
  }, {
    key: "defaultHeaderTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n      <div class=\"col-sm-2\">{{ component.label }}</div>\n    {% } %}\n  {% }) %}\n</div>";
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n      <div class=\"col-sm-2\">\n        {{ getView(component, row[component.key]) }}\n      </div>\n    {% } %}\n  {% }) %}\n\n  {% if (!self.options.readOnly && !self.originalComponent.disabled) { %}\n    <div class=\"col-sm-2\">\n      <div class=\"btn-group pull-right\">\n        <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n        {% if (self.hasRemoveButtons()) { %}\n          <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n        {% } %}\n      </div>\n    </div>\n  {% } %}\n</div>";
    }
  }]);

  function EditGridComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, EditGridComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(EditGridComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.type = 'editgrid'; // this.editRows = [];

    return _this;
  }

  _createClass(EditGridComponent, [{
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      return !this.component.disableAddingRemovingRows && !this.disabled && this.fullMode && !this.options.preview && (!maxLength || this.editRows.length < maxLength);
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "init",
    value: function init() {
      var _this2 = this;

      if (this.builderMode) {
        this.editRows = [];
        return _get(_getPrototypeOf(EditGridComponent.prototype), "init", this).call(this);
      }

      this.components = this.components || [];
      var dataValue = this.dataValue || [];
      this.editRows = dataValue.map(function (row, rowIndex) {
        return {
          isOpen: false,
          data: row,
          components: _this2.createRowComponents(row, rowIndex)
        };
      });
      this.checkData(this.data);
    }
  }, {
    key: "render",
    value: function render(children) {
      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this);
      }

      var dataValue = this.dataValue || [];
      var headerTemplate = _utils.Evaluator.noeval ? _templates.default.header : _lodash.default.get(this.component, 'templates.header');
      return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this, children || this.renderTemplate('editgrid', {
        editgridKey: this.editgridKey,
        header: this.renderString(headerTemplate, {
          components: this.component.components,
          value: dataValue
        }),
        footer: this.renderString(_lodash.default.get(this.component, 'templates.footer'), {
          components: this.component.components,
          value: dataValue
        }),
        rows: this.editRows.map(this.renderRow.bind(this)),
        openRows: this.editRows.map(function (row) {
          return row.isOpen;
        }),
        errors: this.editRows.map(function (row) {
          return row.error;
        }),
        hasAddButton: this.hasAddButton(),
        hasRemoveButtons: this.hasRemoveButtons()
      }));
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this3 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
      }

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-addRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-removeRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-saveRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.editgridKey, "-cancelRow"), 'multiple'), _defineProperty(_this$loadRefs, this.editgridKey, 'multiple'), _this$loadRefs));
      this.refs["".concat(this.editgridKey, "-addRow")].forEach(function (addButton) {
        _this3.addEventListener(addButton, 'click', _this3.addRow.bind(_this3));
      });
      var openRowCount = 0;
      this.refs[this.editgridKey].forEach(function (row, rowIndex) {
        if (_this3.editRows[rowIndex].isOpen) {
          _this3.attachComponents(row, _this3.editRows[rowIndex].components);

          _this3.addEventListener(_this3.refs["".concat(_this3.editgridKey, "-saveRow")][openRowCount], 'click', function () {
            return _this3.saveRow(rowIndex);
          });

          _this3.addEventListener(_this3.refs["".concat(_this3.editgridKey, "-cancelRow")][openRowCount], 'click', function () {
            return _this3.cancelRow(rowIndex);
          });

          openRowCount++;
        } else {
          // Attach edit and remove button events.
          [{
            class: 'removeRow',
            event: 'click',
            action: _this3.removeRow.bind(_this3, rowIndex)
          }, {
            class: 'editRow',
            event: 'click',
            action: _this3.editRow.bind(_this3, rowIndex)
          }].forEach(function (action) {
            var elements = row.getElementsByClassName(action.class);
            Array.prototype.forEach.call(elements, function (element) {
              element.addEventListener(action.event, action.action);
            });
          });
        }
      }); // Add open class to the element if any edit grid row is open

      if (openRowCount) {
        this.addClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
      } else {
        this.removeClass(this.refs.component, "formio-component-".concat(this.component.type, "-row-open"));
      }

      return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "renderRow",
    value: function renderRow(row, rowIndex) {
      var dataValue = this.dataValue || [];

      if (row.isOpen) {
        return this.renderComponents(row.components);
      } else {
        var flattenedComponents = this.flattenComponents(rowIndex);
        var rowTemplate = _utils.Evaluator.noeval ? _templates.default.row : _lodash.default.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
        return this.renderString(rowTemplate, {
          row: dataValue[rowIndex],
          data: this.data,
          rowIndex: rowIndex,
          components: this.component.components,
          flattenedComponents: flattenedComponents,
          getView: function getView(component, data) {
            var instance = flattenedComponents[component.key];
            return instance ? instance.getView(data) : '';
          }
        });
      }
    }
  }, {
    key: "checkData",
    value: function checkData(data) {
      var _this4 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.editRows.reduce(function (valid, editRow) {
        return _this4.checkRow(data, editRow, flags) && valid;
      }, true);
    }
  }, {
    key: "checkRow",
    value: function checkRow(data, editRow) {
      var flags = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return _get(_getPrototypeOf(EditGridComponent.prototype), "checkData", this).call(this, data, flags, editRow.components);
    }
  }, {
    key: "everyComponent",
    value: function everyComponent(fn, rowIndex) {
      var components = this.getComponents(rowIndex);

      _lodash.default.each(components, function (component, index) {
        if (fn(component, components, index) === false) {
          return false;
        }

        if (typeof component.everyComponent === 'function') {
          if (component.everyComponent(fn) === false) {
            return false;
          }
        }
      });
    }
  }, {
    key: "flattenComponents",
    value: function flattenComponents(rowIndex) {
      var result = {};
      this.everyComponent(function (component) {
        result[component.key] = component;
      }, rowIndex);
      return result;
    }
  }, {
    key: "getComponents",
    value: function getComponents(rowIndex) {
      // Ensure editrows is set.
      this.editRows = this.editRows || [];
      return this.builderMode ? _get(_getPrototypeOf(EditGridComponent.prototype), "getComponents", this).call(this) : _lodash.default.isNumber(rowIndex) ? this.editRows[rowIndex].components || [] : this.editRows.reduce(function (result, row) {
        return result.concat(row.components || []);
      }, []);
    }
  }, {
    key: "destroyComponents",
    value: function destroyComponents(rowIndex) {
      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "destroyComponents", this).call(this);
      }

      var components = this.getComponents(rowIndex).slice();
      components.forEach(function (comp) {
        return comp.destroy();
      });
    }
  }, {
    key: "addRow",
    value: function addRow() {
      if (this.options.readOnly) {
        return;
      }

      var dataObj = {};
      this.editRows.push({
        components: [],
        isOpen: true,
        data: dataObj
      });

      if (this.component.inlineEdit) {
        this.dataValue.push(dataObj);
      }

      var rowIndex = this.editRows.length - 1;
      var editRow = this.editRows[rowIndex];
      this.emit('editGridAddRow', {
        component: this.component,
        row: editRow
      });
      editRow.components = this.createRowComponents(editRow.data, rowIndex);
      this.checkRow(this.data, editRow);

      if (this.component.modal) {
        this.addRowModal(rowIndex);
      } else {
        this.redraw();
      }

      return editRow;
    }
  }, {
    key: "addRowModal",
    value: function addRowModal(rowIndex) {
      var _this5 = this;

      var formComponents = this.ce('div');
      formComponents.innerHTML = this.renderComponents(this.editRows[rowIndex].components);
      var dialog = this.component.modal ? this.createModal(formComponents) : undefined;
      dialog.refs.dialogContents.appendChild(this.ce('button', {
        class: 'btn btn-primary',
        onClick: function onClick() {
          dialog.close();

          _this5.saveRow(rowIndex);
        }
      }, this.component.saveRow || 'Save'));
      this.attachComponents(formComponents, this.editRows[rowIndex].components);
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      var dataValue = this.dataValue || [];
      var editRow = this.editRows[rowIndex];
      editRow.dirty = false;
      editRow.isOpen = true;
      editRow.editing = true;
      var dataSnapshot = dataValue[rowIndex] ? _lodash.default.cloneDeep(dataValue[rowIndex]) : {};

      if (this.component.inlineEdit) {
        editRow.backup = dataSnapshot;
      } else {
        editRow.data = dataSnapshot;
        this.restoreRowContext(editRow);
      }

      if (this.component.modal) {
        this.addRowModal(rowIndex);
      } else {
        this.redraw();
      }
    }
  }, {
    key: "clearErrors",
    value: function clearErrors(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (editRow && Array.isArray(editRow.components)) {
        editRow.components.forEach(function (comp) {
          comp.setPristine(true);
          comp.setCustomValidity('');
        });
      }
    }
  }, {
    key: "cancelRow",
    value: function cancelRow(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        editRow.dirty = false;
        editRow.isOpen = false;
        this.redraw();
        return;
      }

      if (editRow.editing) {
        var dataValue = this.dataValue || [];
        editRow.dirty = false;
        editRow.isOpen = false;
        editRow.editing = false;

        if (this.component.inlineEdit) {
          this.dataValue[rowIndex] = editRow.backup;
          editRow.data = editRow.backup;
          this.restoreRowContext(editRow);
        }

        editRow.data = dataValue[rowIndex] || {};
        this.clearErrors(rowIndex);
      } else {
        this.clearErrors(rowIndex);
        this.destroyComponents(rowIndex);

        if (this.component.inlineEdit) {
          this.splice(rowIndex);
        }

        this.editRows.splice(rowIndex, 1);
      }

      this.checkValidity(this.data, true);
      this.redraw();
    }
  }, {
    key: "saveRow",
    value: function saveRow(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        editRow.dirty = false;
        editRow.isOpen = false;
        this.redraw();
        return;
      }

      editRow.dirty = true;

      if (!!this.validateRow(editRow) !== true) {
        return;
      }

      if (!this.component.inlineEdit) {
        var dataValue = this.dataValue || [];

        if (editRow.editing) {
          dataValue[rowIndex] = editRow.data;
        } else {
          // Insert this row into its proper place.
          var newIndex = dataValue.length;
          dataValue.push(editRow.data);
          this.editRows.splice(rowIndex, 1);
          this.editRows.splice(newIndex, 0, editRow);
          rowIndex = newIndex;
        }
      }

      editRow.dirty = false;
      editRow.isOpen = false;
      editRow.editing = false;
      this.updateValue();
      this.triggerChange();
      this.checkValidity(this.data, true);
      this.redraw();
    }
  }, {
    key: "updateRowsComponents",
    value: function updateRowsComponents(rowIndex) {
      for (var i = rowIndex; i < this.editRows.length; i++) {
        this.updateComponentsRowIndex(this.editRows[i].components, i);
      }
    }
  }, {
    key: "removeRow",
    value: function removeRow(rowIndex) {
      if (this.options.readOnly) {
        return;
      }

      this.destroyComponents(rowIndex);
      this.splice(rowIndex);
      this.editRows.splice(rowIndex, 1);
      this.updateRowsComponents(rowIndex);
      this.updateValue();
      this.triggerChange();
      this.checkValidity(this.data, true);
      this.checkData(this.data);
      this.redraw();
    }
  }, {
    key: "updateComponentsRowIndex",
    value: function updateComponentsRowIndex(components, rowIndex) {
      components.forEach(function (component, colIndex) {
        component.rowIndex = rowIndex;
        component.row = "".concat(rowIndex, "-").concat(colIndex);
      });
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this6 = this;

      var components = [];
      this.component.components.map(function (col, colIndex) {
        var column = _lodash.default.clone(col);

        var options = _lodash.default.clone(_this6.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);

        var comp = _this6.createComponent(_lodash.default.assign({}, column, {
          row: options.row
        }), options, row);

        comp.rowIndex = rowIndex; // Don't bubble sub changes since they won't apply until pressing save.

        comp.triggerChange = function () {
          // Should we recalculate or something here?
          // TODO: Cause refreshOn to trigger.
          if (_this6.component.inlineEdit) {
            _this6.triggerChange();
          } else {
            _this6.checkRow(_this6.data, _this6.editRows[rowIndex]);
          }
        };

        components.push(comp);
      });
      return components;
    }
  }, {
    key: "validateRow",
    value: function validateRow(editRow, dirty) {
      var valid = true;

      if (editRow.isOpen) {
        var isDirty = dirty || !!editRow.dirty;
        editRow.components.forEach(function (comp) {
          comp.setPristine(!isDirty);
          valid &= comp.checkValidity(null, isDirty, editRow.data);
        });
      }

      if (this.component.validate && this.component.validate.row) {
        valid = this.evaluate(this.component.validate.row, {
          valid: valid,
          row: editRow.data
        }, 'valid', true);

        if (valid.toString() !== 'true') {
          editRow.error = valid;
        } else {
          delete editRow.error;
        }

        if (valid === null) {
          valid = "Invalid row validation for ".concat(this.key);
        }
      }

      return !!valid;
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty) {
      var _this7 = this;

      if (!this.checkCondition(null, data)) {
        this.setCustomValidity('');
        return true;
      }

      var rowsValid = true;
      var rowsClosed = true;
      this.editRows.forEach(function (editRow) {
        // Trigger all errors on the row.
        var rowValid = _this7.validateRow(editRow, dirty);

        rowsValid &= rowValid; // Any open rows causes validation to fail.

        rowsClosed &= !editRow.isOpen;
      });

      if (!rowsValid) {
        this.setCustomValidity('Please correct rows before proceeding.', dirty);
        return false;
      } else if (!rowsClosed && !this.component.inlineEdit) {
        this.setCustomValidity('Please save all rows before proceeding.', dirty);
        return false;
      }

      var message = this.invalid || this.invalidMessage(data, dirty);
      this.setCustomValidity(message, dirty);
      return true;
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this8 = this;

      if ((0, _fastDeepEqual.default)(this.defaultValue, value)) {
        return false;
      }

      if (!value) {
        this.dataValue = this.defaultValue;
        return false;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          return false;
        }
      }

      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value; // Refresh editRow data when data changes.

      this.dataValue.forEach(function (row, rowIndex) {
        var editRow = _this8.editRows[rowIndex];

        if (editRow) {
          editRow.data = row;

          if (editRow.isOpen) {
            editRow.components.forEach(function (col) {
              col.data = row;
              col.setValue(row[col.key], flags);
            });
          }
        } else {
          _this8.editRows[rowIndex] = {
            components: _this8.createRowComponents(row, rowIndex),
            isOpen: false,
            data: row
          };

          _this8.checkRow(_this8.data, _this8.editRows[rowIndex]);
        }
      });
      this.updateOnChange(flags, changed);

      if (changed) {
        this.redraw();
      }

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
      return this.dataValue;
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      return;
    }
  }, {
    key: "restoreRowContext",
    value: function restoreRowContext(editRow) {
      editRow.components.forEach(function (component) {
        return component.data = editRow.data;
      });
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(EditGridComponent.prototype), "defaultValue", this);

      var defaultValue = Array.isArray(value) ? value : [];

      for (var dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
        defaultValue.push({});
      }

      return defaultValue;
    }
  }]);

  return EditGridComponent;
}(_NestedComponent2.default);

exports.default = EditGridComponent;
EditGridComponent.prototype.hasChanged = _Component.default.prototype.hasChanged;
EditGridComponent.prototype.updateValue = _Component.default.prototype.updateValue;