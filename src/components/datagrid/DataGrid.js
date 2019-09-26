"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.reflect.set");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedComponent2 = _interopRequireDefault(require("../nested/NestedComponent"));

var _Base = _interopRequireDefault(require("../base/Base"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DataGridComponent =
/*#__PURE__*/
function (_NestedComponent) {
  _inherits(DataGridComponent, _NestedComponent);

  _createClass(DataGridComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedComponent2.default.schema.apply(_NestedComponent2.default, [{
        label: 'Data Grid',
        key: 'dataGrid',
        type: 'datagrid',
        clearOnHide: true,
        input: true,
        tree: true,
        components: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Data Grid',
        icon: 'fa fa-th',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#datagrid',
        weight: 20,
        schema: DataGridComponent.schema()
      };
    }
  }]);

  function DataGridComponent(component, options, data) {
    var _this;

    _classCallCheck(this, DataGridComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DataGridComponent).call(this, component, options, data));
    _this.type = 'datagrid';
    _this.numRows = 0;
    _this.numColumns = 0;
    _this.rows = [];

    if (_this.hasRowGroups() && !_this.options.builder) {
      var groups = _lodash.default.get(_this.component, 'rowGroups', []);

      var rowsNum = _this.totalRowsNumber(groups);

      _this.setStaticValue(rowsNum);

      _this.dataValue = _lodash.default.zipWith(_this.dataValue, _this.defaultValue, function (a, b) {
        return _lodash.default.merge(a, b);
      });
    }

    return _this;
  }

  _createClass(DataGridComponent, [{
    key: "setStaticValue",
    value: function setStaticValue(n) {
      this.dataValue = _lodash.default.range(n).map(function () {
        return {};
      });
    }
  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      var maxLength = _lodash.default.get(this.component, 'validate.maxLength');

      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && !this.options.preview && (!maxLength || this.dataValue.length < maxLength);
    }
  }, {
    key: "hasExtraColumn",
    value: function hasExtraColumn() {
      var rmPlacement = _lodash.default.get(this, 'component.removePlacement', 'col');

      return this.hasRemoveButtons() && rmPlacement === 'col' || this.options.builder;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.shouldDisable && !this.options.builder && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
    }
  }, {
    key: "hasTopSubmit",
    value: function hasTopSubmit() {
      return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
    }
  }, {
    key: "hasBottomSubmit",
    value: function hasBottomSubmit() {
      return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
    }
  }, {
    key: "hasChanged",
    value: function hasChanged(before, after) {
      return !_lodash.default.isEqual(before, after);
    }
  }, {
    key: "build",
    value: function build() {
      var _this2 = this;

      this.createElement();
      this.createLabel(this.element);
      var tableClass = 'table datagrid-table table-bordered form-group formio-data-grid ';
      ['striped', 'bordered', 'hover', 'condensed'].forEach(function (prop) {
        if (_this2.component[prop]) {
          tableClass += "table-".concat(prop, " ");
        }
      });
      this.tableElement = this.ce('table', {
        class: tableClass,
        style: this.component.layoutFixed ? 'table-layout: fixed;' : ''
      });
      this.element.appendChild(this.tableElement);

      if (!this.dataValue.length) {
        this.addNewValue();
      }

      this.visibleColumns = true;
      this.errorContainer = this.element;
      this.restoreValue();
      this.createDescription(this.element);
      this.attachLogic();
    }
  }, {
    key: "setVisibleComponents",
    value: function setVisibleComponents() {
      var _this3 = this;

      // Add new values based on minLength.
      for (var dIndex = this.dataValue.length; dIndex < _lodash.default.get(this.component, 'validate.minLength', 0); dIndex++) {
        this.dataValue.push({});
      }

      this.numColumns = this.hasExtraColumn() ? 1 : 0;
      this.numColumns += this.allowReorder ? 1 : 0;
      this.numRows = this.dataValue.length;

      if (this.visibleColumns === true) {
        this.numColumns += this.component.components.length;
        this.visibleComponents = this.component.components;
        return this.visibleComponents;
      }

      this.visibleComponents = this.component.components.filter(function (comp) {
        return _this3.visibleColumns[comp.key];
      });
      this.numColumns += this.visibleComponents.length;
    }
  }, {
    key: "buildRows",
    value: function buildRows() {
      var _this4 = this;

      this.setVisibleComponents();
      var state = this.destroy();
      this.empty(this.tableElement); // Build the rows.

      var tableRows = [];
      this.dataValue.forEach(function (row, rowIndex) {
        return tableRows.push(_this4.buildRow(row, rowIndex, state.rows[rowIndex]));
      }); // Create the header (must happen after build rows to get correct column length)

      var header = this.createHeader();

      if (header) {
        this.tableElement.appendChild(header);
      }

      this.tableBody = this.ce('tbody', null, tableRows);
      this.tableElement.appendChild(this.tableBody);

      if (this.allowReorder) {
        this.addDraggable([this.tableBody]);
      }

      if (this.hasRowGroups() && !this.options.builder) {
        this.buildGroups();
      } // Create the add row button footer element.


      if (this.hasBottomSubmit()) {
        this.tableElement.appendChild(this.ce('tfoot', null, this.ce('tr', null, this.ce('td', {
          colspan: this.numColumns
        }, this.addButton()))));
      }
    }
  }, {
    key: "onRowDrop",
    value: function onRowDrop(droppedElement, newParent, oldParent, nextSibling) {
      _get(_getPrototypeOf(DataGridComponent.prototype), "onRowDrop", this).call(this, droppedElement, newParent, oldParent, nextSibling);

      this.triggerChange();
    } // Build the header.

  }, {
    key: "createHeader",
    value: function createHeader() {
      var _this5 = this;

      var hasTopButton = this.hasTopSubmit();
      var hasEnd = this.hasExtraColumn() || hasTopButton;
      var needsHeader = false;
      var thead = this.ce('thead', null, this.ce('tr', null, [this.allowReorder ? this.ce('th', {
        class: 'formio-drag-column-header'
      }) : null, this.visibleComponents.map(function (comp) {
        var th = _this5.ce('th');

        if (comp.validate && comp.validate.required) {
          th.setAttribute('class', 'field-required');
        }

        var title = comp.label || comp.title;

        if (title && !comp.dataGridLabel) {
          needsHeader = true;
          th.appendChild(_this5.text(title));

          _this5.createTooltip(th, comp);
        }

        return th;
      }), hasEnd ? this.ce('th', null, hasTopButton ? this.addButton(true) : null) : null]));
      return needsHeader ? thead : null;
    }
  }, {
    key: "buildRow",
    value: function buildRow(rowData, index, state) {
      var _this6 = this;

      state = state || {};

      var components = _lodash.default.get(this, 'component.components', []);

      var colsNum = components.length;
      var lastColIndex = colsNum - 1;
      var hasRmButton = this.hasRemoveButtons();
      var hasTopButton = this.hasTopSubmit();

      var rmPlacement = _lodash.default.get(this, 'component.removePlacement', 'col');

      var useCorner = false;
      var lastColumn = null;
      this.rows[index] = {};
      var firstColumn = null;

      if (this.allowReorder) {
        firstColumn = this.ce('td', {
          class: 'formio-drag-column'
        }, this.dragButton());
      }

      if (hasRmButton) {
        if (rmPlacement === 'col') {
          lastColumn = this.ce('td', {
            class: 'formio-remove-column'
          }, this.removeButton(index));
        } else {
          useCorner = true;
        }
      } else if (this.options.builder) {
        lastColumn = this.ce('td', {
          id: "".concat(this.id, "-drag-container"),
          class: 'drag-container'
        }, this.ce('div', {
          id: "".concat(this.id, "-placeholder"),
          class: 'alert alert-info',
          style: 'text-align:center; margin-bottom: 0px;',
          role: 'alert'
        }, this.text('Drag and Drop a form component')));
        this.root.addDragContainer(lastColumn, this);
      }

      var rowElement = this.ce('tr', null, [firstColumn, components.map(function (cmp, colIndex) {
        var cell = _this6.buildComponent(cmp, colIndex, rowData, index, _this6.getComponentState(cmp, state));

        if (hasRmButton && useCorner && lastColIndex === colIndex) {
          cell.style.position = 'relative';
          cell.style.width = '50px';
          cell.append(_this6.removeButton(index, 'small'));

          if (hasTopButton) {
            cell.setAttribute('colspan', 2);
          }
        }

        return cell;
      }), lastColumn]); //add element info for drag'n'drop handlers

      if (this.allowReorder) {
        rowElement.dragInfo = {
          index: index
        };
      }

      return rowElement;
    }
  }, {
    key: "destroyRows",
    value: function destroyRows() {
      var _this7 = this;

      var state = {};
      state.rows = state.rows || {};
      this.rows.forEach(function (row, rowIndex) {
        return _lodash.default.forIn(row, function (col) {
          state.rows[rowIndex] = state.rows[rowIndex] || {};

          var compState = _this7.removeComponent(col, row);

          if (col.key && compState) {
            state.rows[rowIndex][col.key] = compState;
          }
        });
      });
      this.rows = [];
      return state;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var state = this.destroyRows();

      _get(_getPrototypeOf(DataGridComponent.prototype), "destroy", this).call(this);

      return state;
    }
  }, {
    key: "buildComponent",
    value: function buildComponent(col, colIndex, row, rowIndex, state) {
      var container;
      var isVisible = this.visibleColumns && (!this.visibleColumns.hasOwnProperty(col.key) || this.visibleColumns[col.key]);

      if (isVisible || this.options.builder) {
        container = this.ce('td');
        container.noDrop = true;
      }

      var column = _lodash.default.clone(col);

      var options = _lodash.default.clone(this.options);

      options.name += "[".concat(rowIndex, "]");
      options.row = "".concat(rowIndex, "-").concat(colIndex);
      options.inDataGrid = true;
      var comp = this.createComponent(_lodash.default.assign({}, column, {
        row: options.row
      }), options, row, null, state);
      comp.rowIndex = rowIndex;
      this.hook('addComponent', container, comp, this);
      this.rows[rowIndex][column.key] = comp;

      if (isVisible || this.options.builder) {
        container.appendChild(comp.getElement());
        return container;
      }
    }
  }, {
    key: "checkConditions",
    value: function checkConditions(data) {
      var _this8 = this;

      var show = _get(_getPrototypeOf(DataGridComponent.prototype), "checkConditions", this).call(this, data); // If table isn't visible, don't bother calculating columns.


      if (!show) {
        return false;
      }

      var rebuild = false;

      if (this.visibleColumns === true) {
        this.visibleColumns = {};
      }

      this.component.components.forEach(function (col) {
        var showColumn = false;

        _this8.rows.forEach(function (comps) {
          if (comps && comps[col.key] && typeof comps[col.key].checkConditions === 'function') {
            showColumn |= comps[col.key].checkConditions(data);
          }
        });

        showColumn = showColumn && col.type !== 'hidden' && !col.hidden;

        if (_this8.visibleColumns[col.key] && !showColumn || !_this8.visibleColumns[col.key] && showColumn) {
          rebuild = true;
        }

        _this8.visibleColumns[col.key] = showColumn;
        show |= showColumn;
      }); // If a rebuild is needed, then rebuild the table.

      if (rebuild) {
        this.restoreValue();
      } // Return if this table should show.


      return show;
    }
  }, {
    key: "updateValue",
    value: function updateValue(flags, value) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Base.default.prototype.updateValue.call(this, flags, value);
    }
    /* eslint-disable max-statements */

  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      var _this9 = this;

      flags = this.getFlags.apply(this, arguments);

      if (!value) {
        this.dataValue = this.defaultValue;
        this.buildRows();
        return;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          this.buildRows();
          return;
        }
      }

      var changed = this.hasChanged(value, this.dataValue); //always should build if not built yet OR is trying to set empty value (in order to prevent deleting last row)

      var shouldBuildRows = !this.isBuilt || changed || _lodash.default.isEqual(this.emptyValue, value); //check if visible columns changed


      var visibleColumnsAmount = 0;

      _lodash.default.forEach(this.visibleColumns, function (value) {
        if (value) {
          visibleColumnsAmount++;
        }
      });

      var visibleComponentsAmount = this.visibleComponents ? this.visibleComponents.length : 0; //should build if visible columns changed

      shouldBuildRows = shouldBuildRows || visibleColumnsAmount !== visibleComponentsAmount; //loop through all rows and check if there is field in new value that differs from current value

      var keys = this.componentComponents.map(function (component) {
        return component.key;
      });

      for (var i = 0; i < value.length; i++) {
        if (shouldBuildRows) {
          break;
        }

        var valueRow = value[i];

        for (var j = 0; j < keys.length; j++) {
          var key = keys[j];
          var newFieldValue = valueRow[key];
          var currentFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].getValue() : undefined;
          var defaultFieldValue = this.rows[i] && this.rows[i][key] ? this.rows[i][key].defaultValue : undefined;
          var isMissingValue = newFieldValue === undefined && currentFieldValue === defaultFieldValue;

          if (!isMissingValue && !_lodash.default.isEqual(newFieldValue, currentFieldValue)) {
            shouldBuildRows = true;
            break;
          }
        }
      }

      this.dataValue = value;

      if (shouldBuildRows) {
        this.buildRows();
      }

      this.rows.forEach(function (row, index) {
        if (value.length <= index) {
          return;
        }

        _lodash.default.forIn(row, function (component) {
          return _this9.setNestedValue(component, value[index], flags);
        });
      });
      return changed;
    }
    /* eslint-enable max-statements */

  }, {
    key: "resetValue",
    value: function resetValue() {
      _get(_getPrototypeOf(DataGridComponent.prototype), "resetValue", this).call(this);

      this.buildRows();
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
      var _this10 = this;

      this.rows.forEach(function (row, index) {
        return _lodash.default.forIn(row, function (component) {
          return component.data = _this10.dataValue[index];
        });
      });
    }
  }, {
    key: "getComponent",
    value: function getComponent(path, fn) {
      path = Array.isArray(path) ? path : [path];

      var _path = path,
          _path2 = _toArray(_path),
          key = _path2[0],
          remainingPath = _path2.slice(1);

      var result = [];

      if (!_lodash.default.isString(key)) {
        return result;
      }

      this.everyComponent(function (component, components) {
        if (component.component.key === key) {
          var comp = component;

          if (remainingPath.length > 0 && 'getComponent' in component) {
            comp = component.getComponent(remainingPath, fn);
          } else if (fn) {
            fn(component, components);
          }

          result = result.concat(comp);
        }
      });
      return result.length > 0 ? result : null;
    }
    /** @override **/

  }, {
    key: "removeButton",
    value: function removeButton(index) {
      var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'basic';

      if (mode === 'small') {
        return this.removeButtonSmall(index);
      }

      return _get(_getPrototypeOf(DataGridComponent.prototype), "removeButton", this).call(this, index);
    }
  }, {
    key: "removeButtonSmall",
    value: function removeButtonSmall(index) {
      var _this11 = this;

      var cmpType = _lodash.default.get(this, 'component.type', 'datagrid');

      var className = "btn btn-xxs btn-danger formio-".concat(cmpType, "-remove");
      var button = this.ce('button', {
        type: 'button',
        tabindex: '-1',
        class: className
      }, this.ce('i', {
        class: this.iconClass('remove')
      }));
      this.addEventListener(button, 'click', function (event) {
        event.preventDefault();

        _this11.removeValue(index);
      });
      return button;
    }
    /*** Row Groups ***/

    /**
     * @param {Numbers[]} groups
     * @param {Array<T>} coll - collection
     *
     * @return {Array<T[]>}
     */

  }, {
    key: "getRowChunks",
    value: function getRowChunks(groups, coll) {
      var _groups$reduce = groups.reduce(function (_ref, size) {
        var _ref2 = _slicedToArray(_ref, 2),
            startIndex = _ref2[0],
            acc = _ref2[1];

        var endIndex = startIndex + size;
        return [endIndex, [].concat(_toConsumableArray(acc), [[startIndex, endIndex]])];
      }, [0, []]),
          _groups$reduce2 = _slicedToArray(_groups$reduce, 2),
          chunks = _groups$reduce2[1];

      return chunks.map(function (range) {
        return _lodash.default.slice.apply(_lodash.default, [coll].concat(_toConsumableArray(range)));
      });
    }
  }, {
    key: "hasRowGroups",
    value: function hasRowGroups() {
      return _lodash.default.get(this, 'component.enableRowGroups', false);
    }
  }, {
    key: "buildGroups",
    value: function buildGroups() {
      var _this12 = this;

      var groups = _lodash.default.get(this.component, 'rowGroups', []);

      var ranges = _lodash.default.map(groups, 'numberOfRows');

      var rows = this.tableElement.querySelectorAll('tbody>tr');
      var tbody = this.tableElement.querySelector('tbody');
      var chunks = this.getRowChunks(ranges, rows);
      var firstElements = chunks.map(_lodash.default.head);
      var groupElements = groups.map(function (g, index) {
        return _this12.buildGroup(g, index, chunks[index]);
      });
      groupElements.forEach(function (elt, index) {
        var row = firstElements[index];

        if (row) {
          tbody.insertBefore(elt, row);
        }
      });
    }
  }, {
    key: "buildGroup",
    value: function buildGroup(_ref3, index, groupRows) {
      var label = _ref3.label;

      var hasToggle = _lodash.default.get(this, 'component.groupToggle', false);

      var colsNumber = _lodash.default.get(this, 'component.components', []).length;

      var cell = this.ce('td', {
        colspan: colsNumber,
        class: 'datagrid-group-label'
      }, [label]);
      var header = this.ce('tr', {
        class: "datagrid-group-header ".concat(hasToggle ? 'clickable' : '')
      }, cell);

      if (hasToggle) {
        this.addEventListener(header, 'click', function () {
          header.classList.toggle('collapsed');

          _lodash.default.each(groupRows, function (row) {
            row.classList.toggle('hidden');
          });
        });
      }

      return header;
    }
  }, {
    key: "totalRowsNumber",
    value: function totalRowsNumber(groups) {
      return _lodash.default.sum(_lodash.default.map(groups, 'numberOfRows'));
    }
  }, {
    key: "defaultSchema",
    get: function get() {
      return DataGridComponent.schema();
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return [{}];
    }
  }, {
    key: "addAnotherPosition",
    get: function get() {
      return _lodash.default.get(this.component, 'addAnotherPosition', 'bottom');
    }
  }, {
    key: "allowReorder",
    get: function get() {
      return _get(_getPrototypeOf(DataGridComponent.prototype), "allowReorder", this) && !this.options.builder;
    }
  }, {
    key: "dataValue",
    get: function get() {
      var dataValue = _get(_getPrototypeOf(DataGridComponent.prototype), "dataValue", this);

      if (!dataValue || !Array.isArray(dataValue)) {
        return this.emptyValue;
      }

      return dataValue;
    },
    set: function set(value) {
      _set(_getPrototypeOf(DataGridComponent.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(DataGridComponent.prototype), "defaultValue", this);

      if (Array.isArray(value)) {
        return value;
      }

      if (value && _typeof(value) === 'object') {
        return [value];
      }

      return this.emptyValue;
    }
  }]);

  return DataGridComponent;
}(_NestedComponent2.default); // const BaseGetSchema = Object.getOwnPropertyDescriptor(BaseComponent.prototype, 'schema');
// Object.defineProperty(DataGridComponent.prototype, 'schema', BaseGetSchema);


exports.default = DataGridComponent;