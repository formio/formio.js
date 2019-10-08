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

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

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

var _dragula = _interopRequireDefault(require("dragula/dist/dragula"));

var _NestedComponent2 = _interopRequireDefault(require("../_classes/nested/NestedComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
        icon: 'th',
        group: 'data',
        documentation: 'http://help.form.io/userguide/#datagrid',
        weight: 30,
        schema: DataGridComponent.schema()
      };
    }
  }]);

  function DataGridComponent() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, DataGridComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(DataGridComponent)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.type = 'datagrid';
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: "init",
    value: function init() {
      this.components = this.components || []; // Add new values based on minLength.

      this.rows = [];
      this.createRows();
      this.visibleColumns = {};
      this.checkColumns(this.dataValue);
    }
  }, {
    key: "getRowChunks",

    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */
    value: function getRowChunks(groups, rows) {
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
        return _lodash.default.slice.apply(_lodash.default, [rows].concat(_toConsumableArray(range)));
      });
    }
    /**
     * Create groups object.
     * Each key in object represents index of first row in group.
     * @return {Object}
     */

  }, {
    key: "getGroups",
    value: function getGroups() {
      var groups = _lodash.default.get(this.component, 'rowGroups', []);

      var sizes = _lodash.default.map(groups, 'numberOfRows').slice(0, -1);

      var indexes = sizes.reduce(function (groupIndexes, size) {
        var last = groupIndexes[groupIndexes.length - 1];
        return groupIndexes.concat(last + size);
      }, [0]);
      return groups.reduce(function (gidxs, group, idx) {
        return _objectSpread({}, gidxs, _defineProperty({}, indexes[idx], group));
      }, {});
    }
    /**
     * Retrun group sizes.
     * @return {Number[]}
     */

  }, {
    key: "getGroupSizes",
    value: function getGroupSizes() {
      return _lodash.default.map(_lodash.default.get(this.component, 'rowGroups', []), 'numberOfRows');
    }
  }, {
    key: "hasRowGroups",
    value: function hasRowGroups() {
      return _lodash.default.get(this, 'component.enableRowGroups', false) && !this.builderMode;
    }
  }, {
    key: "totalRowsNumber",
    value: function totalRowsNumber(groups) {
      return _lodash.default.sum(_lodash.default.map(groups, 'numberOfRows'));
    }
  }, {
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

      return !this.component.disableAddingRemovingRows && !this.disabled && this.fullMode && !this.options.preview && (!maxLength || this.dataValue.length < maxLength);
    }
  }, {
    key: "hasExtraColumn",
    value: function hasExtraColumn() {
      return this.hasRemoveButtons() || this.builderMode;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
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
    value: function hasChanged(newValue, oldValue) {
      return !_lodash.default.isEqual(newValue, oldValue);
    }
  }, {
    key: "render",
    value: function render() {
      return _get(_getPrototypeOf(DataGridComponent.prototype), "render", this).call(this, this.renderTemplate('datagrid', {
        rows: this.getRows(),
        columns: this.getColumns(),
        groups: this.hasRowGroups() ? this.getGroups() : [],
        visibleColumns: this.visibleColumns,
        hasToggle: _lodash.default.get(this, 'component.groupToggle', false),
        hasHeader: this.hasHeader(),
        hasExtraColumn: this.hasExtraColumn(),
        hasAddButton: this.hasAddButton(),
        hasRemoveButtons: this.hasRemoveButtons(),
        hasTopSubmit: this.hasTopSubmit(),
        hasBottomSubmit: this.hasBottomSubmit(),
        hasGroups: this.hasRowGroups(),
        numColumns: _lodash.default.filter(this.visibleColumns).length + (this.hasExtraColumn() ? 1 : 0),
        datagridKey: this.datagridKey,
        allowReorder: this.allowReorder,
        builder: this.builderMode,
        placeholder: this.renderTemplate('builderPlaceholder', {
          position: this.componentComponents.length
        })
      }));
    }
  }, {
    key: "getRows",
    value: function getRows() {
      return this.rows.map(function (row) {
        var components = {};

        _lodash.default.each(row, function (col, key) {
          components[key] = col.render();
        });

        return components;
      });
    }
  }, {
    key: "getColumns",
    value: function getColumns() {
      return this.component.components;
    }
  }, {
    key: "hasHeader",
    value: function hasHeader() {
      return this.component.components.reduce(function (hasHeader, col) {
        // If any of the components has a title and it isn't hidden, display the header.
        return hasHeader || (col.label || col.title) && !col.hideLabel;
      }, false);
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this2 = this;

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-row"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-tbody"), 'single'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-addRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-removeRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-group-header"), 'multiple'), _defineProperty(_this$loadRefs, this.datagridKey, 'multiple'), _this$loadRefs));

      if (this.allowReorder) {
        this.refs["".concat(this.datagridKey, "-row")].forEach(function (row, index) {
          row.dragInfo = {
            index: index
          };
        });
        this.dragula = (0, _dragula.default)([this.refs["".concat(this.datagridKey, "-tbody")]], {
          moves: function moves(_draggedElement, _oldParent, clickedElement) {
            return clickedElement.classList.contains('formio-drag-button');
          }
        }).on('drop', this.onReorder.bind(this));
      }

      this.refs["".concat(this.datagridKey, "-addRow")].forEach(function (addButton) {
        _this2.addEventListener(addButton, 'click', _this2.addRow.bind(_this2));
      });
      this.refs["".concat(this.datagridKey, "-removeRow")].forEach(function (removeButton, index) {
        _this2.addEventListener(removeButton, 'click', _this2.removeRow.bind(_this2, index));
      });

      if (this.hasRowGroups()) {
        this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs["".concat(this.datagridKey, "-row")]);
        this.refs["".concat(this.datagridKey, "-group-header")].forEach(function (header, index) {
          _this2.addEventListener(header, 'click', function () {
            return _this2.toggleGroup(header, index);
          });
        });
      }

      var rowLength = _lodash.default.filter(this.visibleColumns).length;

      this.rows.forEach(function (row, rowIndex) {
        var columnIndex = 0;

        _this2.getColumns().forEach(function (col) {
          if (!_this2.visibleColumns.hasOwnProperty(col.key) || _this2.visibleColumns[col.key]) {
            _this2.attachComponents(_this2.refs[_this2.datagridKey][rowIndex * rowLength + columnIndex], [_this2.rows[rowIndex][col.key]], _this2.component.components);

            columnIndex++;
          }
        });
      });
      return _get(_getPrototypeOf(DataGridComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "onReorder",
    value: function onReorder(element, _target, _source, sibling) {
      if (!element.dragInfo || sibling && !sibling.dragInfo) {
        console.warn('There is no Drag Info available for either dragged or sibling element');
        return;
      }

      var oldPosition = element.dragInfo.index; //should drop at next sibling position; no next sibling means drop to last position

      var newPosition = sibling ? sibling.dragInfo.index : this.dataValue.length;
      var movedBelow = newPosition > oldPosition;

      var dataValue = _lodash.default.cloneDeep(this.dataValue);

      var draggedRowData = dataValue[oldPosition]; //insert element at new position

      dataValue.splice(newPosition, 0, draggedRowData); //remove element from old position (if was moved above, after insertion it's at +1 index)

      dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1); //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)

      this.setValue(dataValue);
    }
  }, {
    key: "addRow",
    value: function addRow() {
      this.dataValue.push({});
      var index = this.rows.length;
      this.rows[index] = this.createRowComponents(this.dataValue[index], index);
      this.redraw();
    }
  }, {
    key: "removeRow",
    value: function removeRow(index) {
      this.splice(index);
      this.rows.splice(index, 1);
      this.redraw();
    }
  }, {
    key: "createRows",
    value: function createRows() {
      var _this3 = this;

      // Create any missing rows.
      this.dataValue.forEach(function (row, index) {
        if (!_this3.rows[index]) {
          _this3.rows[index] = _this3.createRowComponents(row, index);
        }
      }); // Delete any extra rows.

      this.rows.splice(this.dataValue.length);
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this4 = this;

      var components = {};
      this.component.components.map(function (col, colIndex) {
        var options = _lodash.default.clone(_this4.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);
        components[col.key] = _this4.createComponent(col, options, row);
        components[col.key].rowIndex = rowIndex;
        components[col.key].inDataGrid = true;
      });
      return components;
    }
  }, {
    key: "checkColumns",
    value: function checkColumns(data) {
      var show = false;

      if (!this.rows || !this.rows.length) {
        return {
          rebuld: false,
          show: false
        };
      }

      var visibility = {};
      this.rows.forEach(function (row) {
        _lodash.default.each(row, function (col, key) {
          if (col && typeof col.checkConditions === 'function') {
            visibility[key] = !!visibility[key] || col.checkConditions(data) && col.type !== 'hidden';
          }
        });
      });
      var rebuild = !_lodash.default.isEqual(visibility, this.visibleColumns);

      _lodash.default.each(visibility, function (col) {
        show |= col;
      });

      this.visibleColumns = visibility;
      return {
        rebuild: rebuild,
        show: show
      };
    }
  }, {
    key: "checkComponentConditions",
    value: function checkComponentConditions(data) {
      // If table isn't visible, don't bother calculating columns.
      if (!_get(_getPrototypeOf(DataGridComponent.prototype), "checkComponentConditions", this).call(this, data)) {
        return false;
      }

      var _this$checkColumns = this.checkColumns(data),
          rebuild = _this$checkColumns.rebuild,
          show = _this$checkColumns.show; // If a rebuild is needed, then rebuild the table.


      if (rebuild) {
        this.redraw();
      } // Return if this table should show.


      return show;
    }
  }, {
    key: "updateValue",
    value: function updateValue(value, flags) {
      // Intentionally skip over nested component updateValue method to keep recursive update from occurring with sub components.
      return _Component.default.prototype.updateValue.call(this, value, flags);
    }
  }, {
    key: "setValue",
    value: function setValue(value, flags) {
      flags = flags || {};

      if (!value) {
        this.dataValue = this.defaultValue;
        this.createRows();
        return false;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          this.createRows();
          value = [{}];
        }
      }

      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;
      this.createRows();
      this.rows.forEach(function (row, rowIndex) {
        if (value.length <= rowIndex) {
          return;
        }

        _lodash.default.each(row, function (col, key) {
          if (col.type === 'components') {
            col.data = value[rowIndex];
            col.setValue(value[rowIndex], flags);
          } else if (value[rowIndex].hasOwnProperty(key)) {
            col.data = value[rowIndex];
            col.setValue(value[rowIndex][key], flags);
          } else {
            col.data = value[rowIndex];
            col.setValue(col.defaultValue, flags);
          }
        });
      });
      this.updateOnChange(flags, changed);
      changed && this.redraw();
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
      var _this5 = this;

      this.rows.forEach(function (row, index) {
        return _lodash.default.forIn(row, function (component) {
          return component.data = _this5.dataValue[index];
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
  }, {
    key: "toggleGroup",
    value: function toggleGroup(element, index) {
      element.classList.toggle('collapsed');

      _lodash.default.each(this.refs.chunks[index], function (row) {
        row.classList.toggle('hidden');
      });
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
    key: "minLength",
    get: function get() {
      if (this.hasRowGroups()) {
        return _lodash.default.sum(this.getGroupSizes());
      } else {
        return _lodash.default.get(this.component, 'validate.minLength', 0);
      }
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(DataGridComponent.prototype), "defaultValue", this);

      var defaultValue;

      if (Array.isArray(value)) {
        defaultValue = value;
      } else if (value && _typeof(value) === 'object') {
        defaultValue = [value];
      } else {
        defaultValue = this.emptyValue;
      }

      for (var dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
        defaultValue.push({});
      }

      return defaultValue;
    }
  }, {
    key: "disabled",
    set: function set(disabled) {
      _set(_getPrototypeOf(DataGridComponent.prototype), "disabled", disabled, this, true);

      _lodash.default.each(this.refs["".concat(this.datagridKey, "-addRow")], function (button) {
        button.disabled = disabled;
      });

      _lodash.default.each(this.refs["".concat(this.datagridKey, "-removeRow")], function (button) {
        button.disabled = disabled;
      });
    },
    get: function get() {
      return _get(_getPrototypeOf(DataGridComponent.prototype), "disabled", this);
    }
  }, {
    key: "datagridKey",
    get: function get() {
      return "datagrid-".concat(this.key);
    }
  }, {
    key: "allowReorder",
    get: function get() {
      return !this.options.readOnly && _lodash.default.get(this.component, 'reorder', false);
    }
  }]);

  return DataGridComponent;
}(_NestedComponent2.default);

exports.default = DataGridComponent;