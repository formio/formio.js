"use strict";

require("core-js/modules/es.symbol");

require("core-js/modules/es.symbol.description");

require("core-js/modules/es.symbol.iterator");

require("core-js/modules/es.array.concat");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/es.array.reduce");

require("core-js/modules/es.array.slice");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

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

var _NestedArrayComponent2 = _interopRequireDefault(require("../_classes/nestedarray/NestedArrayComponent"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var DataGridComponent = /*#__PURE__*/function (_NestedArrayComponent) {
  _inherits(DataGridComponent, _NestedArrayComponent);

  var _super = _createSuper(DataGridComponent);

  _createClass(DataGridComponent, null, [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
      }

      return _NestedArrayComponent2.default.schema.apply(_NestedArrayComponent2.default, [{
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
    var _this;

    _classCallCheck(this, DataGridComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'datagrid';
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: "init",
    value: function init() {
      this.components = this.components || []; // Add new values based on minLength.

      this.rows = [];
      this.createRows(true);
      this.visibleColumns = {};
      this.checkColumns();
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
        return _objectSpread(_objectSpread({}, gidxs), {}, _defineProperty({}, indexes[idx], group));
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
    key: "hasExtraColumn",
    value: function hasExtraColumn() {
      return this.hasRemoveButtons() || this.canAddColumn;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
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
    key: "render",
    value: function render() {
      var columns = this.getColumns();
      return _get(_getPrototypeOf(DataGridComponent.prototype), "render", this).call(this, this.renderTemplate('datagrid', {
        rows: this.getRows(),
        columns: columns,
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
        numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
        datagridKey: this.datagridKey,
        allowReorder: this.allowReorder,
        builder: this.builderMode,
        canAddColumn: this.canAddColumn,
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
      var _this2 = this;

      return this.component.components.filter(function (comp) {
        return !_this2.visibleColumns.hasOwnProperty(comp.key) || _this2.visibleColumns[comp.key];
      });
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
          _this3 = this;

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
        _this3.addEventListener(addButton, 'click', _this3.addRow.bind(_this3));
      });
      this.refs["".concat(this.datagridKey, "-removeRow")].forEach(function (removeButton, index) {
        _this3.addEventListener(removeButton, 'click', _this3.removeRow.bind(_this3, index));
      });

      if (this.hasRowGroups()) {
        this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs["".concat(this.datagridKey, "-row")]);
        this.refs["".concat(this.datagridKey, "-group-header")].forEach(function (header, index) {
          _this3.addEventListener(header, 'click', function () {
            return _this3.toggleGroup(header, index);
          });
        });
      }

      var columns = this.getColumns();
      var rowLength = columns.length;
      this.rows.forEach(function (row, rowIndex) {
        var columnIndex = 0;
        columns.forEach(function (col) {
          _this3.attachComponents(_this3.refs[_this3.datagridKey][rowIndex * rowLength + columnIndex], [_this3.rows[rowIndex][col.key]], _this3.component.components);

          columnIndex++;
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
      var dataValue = (0, _utils.fastCloneDeep)(this.dataValue);
      var draggedRowData = dataValue[oldPosition]; //insert element at new position

      dataValue.splice(newPosition, 0, draggedRowData); //remove element from old position (if was moved above, after insertion it's at +1 index)

      dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1); //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)

      this.setValue(dataValue, {
        isReordered: true
      });
      this.redraw();
    }
  }, {
    key: "addRow",
    value: function addRow() {
      var index = this.rows.length; // Handle length mismatch between rows and dataValue

      if (this.dataValue.length === index) {
        this.dataValue.push({});
      }

      this.rows[index] = this.createRowComponents(this.dataValue[index], index);
      this.checkConditions();
      this.redraw();
    }
  }, {
    key: "removeRow",
    value: function removeRow(index) {
      var _this4 = this;

      this.splice(index);

      var _this$rows$splice = this.rows.splice(index, 1),
          _this$rows$splice2 = _slicedToArray(_this$rows$splice, 1),
          row = _this$rows$splice2[0];

      _lodash.default.each(row, function (component) {
        return _this4.removeComponent(component);
      });

      this.redraw();
    }
  }, {
    key: "getRowValues",
    value: function getRowValues() {
      return this.dataValue;
    }
  }, {
    key: "setRowComponentsData",
    value: function setRowComponentsData(rowIndex, rowData) {
      _lodash.default.each(this.rows[rowIndex], function (component) {
        component.data = rowData;
      });
    }
  }, {
    key: "createRows",
    value: function createRows(init) {
      var _this5 = this;

      var added = false;
      var rowValues = this.getRowValues(); // Create any missing rows.

      rowValues.forEach(function (row, index) {
        if (_this5.rows[index]) {
          _this5.setRowComponentsData(index, row);
        } else {
          _this5.rows[index] = _this5.createRowComponents(row, index);
          added = true;
        }
      }); // Delete any extra rows.

      var removed = !!this.rows.splice(rowValues.length).length;

      if (!init && (added || removed)) {
        this.redraw();
      }

      return added;
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this6 = this;

      var components = {};
      this.component.components.map(function (col, colIndex) {
        var options = _lodash.default.clone(_this6.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);

        var component = _this6.createComponent(col, options, row);

        component.parentDisabled = !!_this6.disabled;
        component.rowIndex = rowIndex;
        component.inDataGrid = true;
        components[col.key] = component;
      });
      return components;
    }
    /**
     * Checks the validity of this datagrid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */

  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row, silentCheck) {
      data = data || this.rootValue;
      row = row || this.data;

      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      if (!this.checkComponentValidity(data, dirty, row, {
        silentCheck: silentCheck
      })) {
        return false;
      }

      return this.checkRows('checkValidity', data, dirty, true, silentCheck);
    }
  }, {
    key: "checkColumns",
    value: function checkColumns(data) {
      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      data = data || this.rootValue;
      var show = false;

      if (!this.rows || !this.rows.length) {
        return {
          rebuild: false,
          show: false
        };
      }

      if (this.builderMode) {
        return {
          rebuild: false,
          show: true
        };
      }

      var visibility = {};
      var dataValue = this.dataValue;
      this.rows.forEach(function (row, rowIndex) {
        _lodash.default.each(row, function (col, key) {
          if (col && typeof col.checkConditions === 'function') {
            visibility[key] = !!visibility[key] || col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden';
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
    value: function checkComponentConditions(data, flags, row) {
      // If table isn't visible, don't bother calculating columns.
      if (!_get(_getPrototypeOf(DataGridComponent.prototype), "checkComponentConditions", this).call(this, data, flags, row)) {
        return false;
      }

      var _this$checkColumns = this.checkColumns(data, flags),
          rebuild = _this$checkColumns.rebuild,
          show = _this$checkColumns.show; // If a rebuild is needed, then rebuild the table.


      if (rebuild) {
        this.redraw();
      } // Return if this table should show.


      return show;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this7 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

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
      } // Make sure we always have at least one row.
      // NOTE: Removing this will break "Public Configurations" in portal. ;)


      if (value && !value.length && !this.component.noFirstRow) {
        value.push({});
      }

      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;
      this.createRows();
      this.rows.forEach(function (row, rowIndex) {
        if (value.length <= rowIndex) {
          return;
        }

        _lodash.default.each(row, function (col) {
          col.rowIndex = rowIndex;

          _this7.setNestedValue(col, value[rowIndex], flags);
        });
      });
      this.updateOnChange(flags, changed);
      return changed;
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this8 = this;

      this.rows.forEach(function (row, index) {
        return _lodash.default.forIn(row, function (component) {
          return component.data = _this8.dataValue[index];
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

      if (_lodash.default.isNumber(key) && remainingPath.length) {
        var compKey = remainingPath.pop();
        result = this.rows[key][compKey];

        if (result && _lodash.default.isFunction(fn)) {
          fn(result, this.getComponents());
        }

        if (remainingPath.length && 'getComponent' in result) {
          return result.getComponent(remainingPath, fn);
        }

        return result;
      }

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
      // Ensure we have one and only one row in builder mode.
      if (this.builderMode) {
        return [{}];
      }

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
  }, {
    key: "iteratableRows",
    get: function get() {
      var _this9 = this;

      return this.rows.map(function (row, index) {
        return {
          components: row,
          data: _this9.dataValue[index]
        };
      });
    }
  }, {
    key: "canAddColumn",
    get: function get() {
      return this.builderMode;
    }
  }]);

  return DataGridComponent;
}(_NestedArrayComponent2.default);

exports.default = DataGridComponent;