"use strict";

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.reflect.set.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.object.values.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.array.find.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.find-index.js");

require("core-js/modules/es.object.entries.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _NestedArrayComponent2 = _interopRequireDefault(require("../_classes/nestedarray/NestedArrayComponent"));

var _utils = require("../../utils/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableRest(); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var dragula;

if (typeof window !== 'undefined') {
  // Import from "dist" because it would require and "global" would not be defined in Angular apps.
  dragula = require('dragula/dist/dragula');
}

var DataGridComponent = /*#__PURE__*/function (_NestedArrayComponent) {
  _inherits(DataGridComponent, _NestedArrayComponent);

  var _super = _createSuper(DataGridComponent);

  function DataGridComponent() {
    var _this;

    _classCallCheck(this, DataGridComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'datagrid';
    _this.tabIndex = 0;
    return _this;
  }

  _createClass(DataGridComponent, [{
    key: "init",
    value: function init() {
      this.components = this.components || []; // Add new values based on minLength.

      this.rows = [];
      this.columns = _toConsumableArray(this.component.components);

      if (this.initRows || !_lodash.default.isEqual(this.dataValue, this.emptyValue)) {
        this.createRows(true);
      }

      this.visibleColumns = {};
      this.prevHasAddButton = this.hasAddButton();
      this.checkColumns();
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
    key: "initEmpty",
    get: function get() {
      return this.component.initEmpty || this.component.noFirstRow;
    }
  }, {
    key: "initRows",
    get: function get() {
      return this.builderMode || this.path === 'defaultValue' || !this.initEmpty;
    }
  }, {
    key: "emptyValue",
    get: function get() {
      return this.initEmpty ? [] : [{}];
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
      var isBuilderMode = this.builderMode;
      var isEmptyInit = this.initEmpty; // Ensure we have one and only one row in builder mode.

      if (isBuilderMode || isEmptyInit && !this.dataValue.length) {
        return isEmptyInit && !isBuilderMode ? [] : [{}];
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
    get: function get() {
      return _get(_getPrototypeOf(DataGridComponent.prototype), "disabled", this);
    },
    set: function set(disabled) {
      _set(_getPrototypeOf(DataGridComponent.prototype), "disabled", disabled, this, true);

      _lodash.default.each(this.refs["".concat(this.datagridKey, "-addRow")], function (button) {
        button.disabled = disabled;
      });

      _lodash.default.each(this.refs["".concat(this.datagridKey, "-removeRow")], function (button) {
        button.disabled = disabled;
      });
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
      var _this2 = this;

      return this.rows.map(function (row, index) {
        return {
          components: row,
          data: _this2.dataValue[index]
        };
      });
    }
    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */

  }, {
    key: "getRowChunks",
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
      return !this.builderMode && !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
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
    key: "canAddColumn",
    get: function get() {
      return this.builderMode;
    }
  }, {
    key: "render",
    value: function render() {
      var columns = this.getColumns();
      var columnExtra = 0;
      var hasRemoveButtons = this.hasRemoveButtons();

      if (this.component.reorder) {
        columnExtra++;
      }

      if (hasRemoveButtons) {
        columnExtra++;
      }

      if (this.canAddColumn) {
        columnExtra++;
      }

      var colWidth = Math.floor(12 / (columns.length + columnExtra));
      return _get(_getPrototypeOf(DataGridComponent.prototype), "render", this).call(this, this.renderTemplate('datagrid', {
        rows: this.getRows(),
        columns: columns,
        groups: this.hasRowGroups() ? this.getGroups() : [],
        visibleColumns: this.visibleColumns,
        hasToggle: _lodash.default.get(this, 'component.groupToggle', false),
        hasHeader: this.hasHeader(),
        hasExtraColumn: this.hasExtraColumn(),
        hasAddButton: this.hasAddButton(),
        hasRemoveButtons: hasRemoveButtons,
        hasTopSubmit: this.hasTopSubmit(),
        hasBottomSubmit: this.hasBottomSubmit(),
        hasGroups: this.hasRowGroups(),
        numColumns: columns.length + (this.hasExtraColumn() ? 1 : 0),
        datagridKey: this.datagridKey,
        allowReorder: this.allowReorder,
        builder: this.builderMode,
        canAddColumn: this.canAddColumn,
        tabIndex: this.tabIndex,
        placeholder: this.renderTemplate('builderPlaceholder', {
          position: this.componentComponents.length
        }),
        colWidth: colWidth.toString()
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
      var _this3 = this;

      return this.columns.filter(function (comp) {
        return !_this3.visibleColumns.hasOwnProperty(comp.key) || _this3.visibleColumns[comp.key];
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
    key: "loadRefs",
    value: function loadRefs(element, refs) {
      _get(_getPrototypeOf(DataGridComponent.prototype), "loadRefs", this).call(this, element, refs);

      if (refs['messageContainer'] === 'single') {
        var container = _lodash.default.last(element.querySelectorAll('[ref=messageContainer]'));

        this.refs['messageContainer'] = container || this.refs['messageContainer'];
      }
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this4 = this;

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-row"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-tbody"), 'single'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-addRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-removeRow"), 'multiple'), _defineProperty(_this$loadRefs, "".concat(this.datagridKey, "-group-header"), 'multiple'), _defineProperty(_this$loadRefs, this.datagridKey, 'multiple'), _defineProperty(_this$loadRefs, 'messageContainer', 'single'), _this$loadRefs));

      if (this.allowReorder) {
        this.refs["".concat(this.datagridKey, "-row")].forEach(function (row, index) {
          row.dragInfo = {
            index: index
          };
        });

        if (dragula) {
          this.dragula = dragula([this.refs["".concat(this.datagridKey, "-tbody")]], {
            moves: function moves(_draggedElement, _oldParent, clickedElement) {
              var clickedElementKey = clickedElement.getAttribute('data-key');

              var oldParentKey = _oldParent.getAttribute('data-key'); //Check if the clicked button belongs to that container, if false, it belongs to the nested container


              if (oldParentKey === clickedElementKey) {
                return clickedElement.classList.contains('formio-drag-button');
              }
            }
          }).on('drop', this.onReorder.bind(this));
          this.dragula.on('cloned', function (el, original) {
            if (el && el.children && original && original.children) {
              original.children.forEach(function (child, index) {
                var styles = getComputedStyle(child, null);

                if (styles.cssText !== '') {
                  el.children[index].style.cssText = styles.cssText;
                } else {
                  var cssText = Object.values(styles).reduce(function (css, propertyName) {
                    return "".concat(css).concat(propertyName, ":").concat(styles.getPropertyValue(propertyName), ";");
                  }, '');
                  el.children[index].style.cssText = cssText;
                }
              });
            }
          });
        }
      }

      this.refs["".concat(this.datagridKey, "-addRow")].forEach(function (addButton) {
        _this4.addEventListener(addButton, 'click', _this4.addRow.bind(_this4));
      });
      this.refs["".concat(this.datagridKey, "-removeRow")].forEach(function (removeButton, index) {
        _this4.addEventListener(removeButton, 'click', _this4.removeRow.bind(_this4, index));
      });

      if (this.hasRowGroups()) {
        this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs["".concat(this.datagridKey, "-row")]);
        this.refs["".concat(this.datagridKey, "-group-header")].forEach(function (header, index) {
          _this4.addEventListener(header, 'click', function () {
            return _this4.toggleGroup(header, index);
          });
        });
      }

      var columns = this.getColumns();
      var rowLength = columns.length;
      this.rows.forEach(function (row, rowIndex) {
        var columnIndex = 0;
        columns.forEach(function (col) {
          _this4.attachComponents(_this4.refs[_this4.datagridKey][rowIndex * rowLength + columnIndex], [_this4.rows[rowIndex][col.key]], _this4.getComponentsContainer());

          columnIndex++;
        });
      });
      return _get(_getPrototypeOf(DataGridComponent.prototype), "attach", this).call(this, element);
    }
  }, {
    key: "getComponentsContainer",
    value: function getComponentsContainer() {
      return this.component.components;
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
      this.rebuild();
    }
  }, {
    key: "focusOnNewRowElement",
    value: function focusOnNewRowElement(row) {
      Object.keys(row).find(function (key) {
        var focusableElements = (0, _utils.getFocusableElements)(row[key].element);

        if (focusableElements && focusableElements[0]) {
          focusableElements[0].focus();
          return true;
        }

        return false;
      });
    }
  }, {
    key: "addRow",
    value: function addRow() {
      var _this5 = this;

      var index = this.rows.length; // Handle length mismatch between rows and dataValue

      if (this.dataValue.length === index) {
        this.dataValue.push({});
      }

      var row;
      var dataValue = this.dataValue;
      var defaultValue = this.defaultValue;

      if (this.initEmpty && defaultValue[index]) {
        row = defaultValue[index];
        dataValue[index] = row;
      } else {
        row = dataValue[index];
      }

      this.rows[index] = this.createRowComponents(row, index);
      this.emit('dataGridAddRow', {
        component: this.component,
        row: row
      });
      this.checkConditions();
      this.triggerChange();
      this.redraw().then(function () {
        _this5.focusOnNewRowElement(_this5.rows[index]);
      });
    }
  }, {
    key: "updateComponentsRowIndex",
    value: function updateComponentsRowIndex(components, rowIndex) {
      var _this6 = this;

      components.forEach(function (component, colIndex) {
        var _component$options;

        if ((_component$options = component.options) !== null && _component$options !== void 0 && _component$options.name) {
          var newName = "[".concat(_this6.key, "][").concat(rowIndex, "]");
          component.options.name = component.options.name.replace("[".concat(_this6.key, "][").concat(component.rowIndex, "]"), newName);
        }

        component.rowIndex = rowIndex;
        component.row = "".concat(rowIndex, "-").concat(colIndex);
        component.path = _this6.calculateComponentPath(component);
      });
    }
  }, {
    key: "updateRowsComponents",
    value: function updateRowsComponents(rowIndex) {
      var _this7 = this;

      this.rows.slice(rowIndex).forEach(function (row, index) {
        _this7.updateComponentsRowIndex(Object.values(row), rowIndex + index);
      });
    }
  }, {
    key: "removeRow",
    value: function removeRow(index) {
      this.splice(index, {
        isReordered: true
      });
      this.emit('dataGridDeleteRow', {
        index: index
      });

      var _this$rows$splice = this.rows.splice(index, 1),
          _this$rows$splice2 = _slicedToArray(_this$rows$splice, 1),
          row = _this$rows$splice2[0];

      this.removeRowComponents(row);
      this.updateRowsComponents(index);
      this.setValue(this.dataValue, {
        isReordered: true
      });
      this.redraw();
    }
  }, {
    key: "removeRowComponents",
    value: function removeRowComponents(row) {
      var _this8 = this;

      _lodash.default.each(row, function (component) {
        return _this8.removeComponent(component);
      });
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
    value: function createRows(init, rebuild) {
      var _this9 = this;

      var added = false;
      var rowValues = this.getRowValues(); // Create any missing rows.

      rowValues.forEach(function (row, index) {
        if (!rebuild && _this9.rows[index]) {
          _this9.setRowComponentsData(index, row);
        } else {
          if (_this9.rows[index]) {
            _this9.removeRowComponents(_this9.rows[index]);
          }

          _this9.rows[index] = _this9.createRowComponents(row, index);
          added = true;
        }
      }); // Delete any extra rows.

      var removedRows = this.rows.splice(rowValues.length);
      var removed = !!removedRows.length; // Delete components of extra rows (to make sure that this.components contain only components of exisiting rows)

      if (removed) {
        removedRows.forEach(function (row) {
          return _this9.removeRowComponents(row);
        });
      }

      if (!init && (added || removed)) {
        this.redraw();
      }

      return added;
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this10 = this;

      var components = {};
      this.tabIndex = 0;
      this.component.components.map(function (col, colIndex) {
        var options = _lodash.default.clone(_this10.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);
        var columnComponent;

        if (_this10.builderMode) {
          col.id = col.id + rowIndex;
          columnComponent = col;
        } else {
          columnComponent = _objectSpread(_objectSpread({}, col), {}, {
            id: col.id + rowIndex
          });
        }

        var component = _this10.createComponent(columnComponent, options, row);

        component.parentDisabled = !!_this10.disabled;
        component.rowIndex = rowIndex;
        component.inDataGrid = true;

        if (columnComponent.tabindex && parseInt(columnComponent.tabindex) > _this10.tabIndex) {
          _this10.tabIndex = parseInt(columnComponent.tabindex);
        }

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

      var isValid = this.checkRows('checkValidity', data, dirty, true, silentCheck);
      this.checkModal(isValid, dirty);
      return isValid;
    }
  }, {
    key: "checkColumns",
    value: function checkColumns(data) {
      var _this11 = this;

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
      var logicRebuild = false;
      var dataValue = this.dataValue;
      this.rows.forEach(function (row, rowIndex) {
        _lodash.default.each(row, function (col, key) {
          if (col && typeof col.checkConditions === 'function') {
            var firstRowCheck = visibility[key] === undefined;
            visibility[key] = !!visibility[key] || col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden';

            if (col.component.logic && firstRowCheck) {
              var compIndex = _lodash.default.findIndex(_this11.columns, ['key', key]);

              if (!_lodash.default.isEqual(_this11.columns[compIndex], col.component)) {
                logicRebuild = true;
                _this11.columns[compIndex] = col.component;
              }
            }
          }
        });
      });
      var rebuild = !_lodash.default.isEqual(visibility, this.visibleColumns) || logicRebuild;

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
      var isVisible = this.visible; // If table isn't visible, don't bother calculating columns.

      if (!_get(_getPrototypeOf(DataGridComponent.prototype), "checkComponentConditions", this).call(this, data, flags, row)) {
        return false;
      }

      var _this$checkColumns = this.checkColumns(data, flags),
          rebuild = _this$checkColumns.rebuild,
          show = _this$checkColumns.show; // Check if a rebuild is needed or the visibility changes.


      if (rebuild || !isVisible) {
        this.createRows(false, rebuild);
      } // Return if this table should show.


      return show;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this12 = this;

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


      if (value && !value.length && !this.initEmpty) {
        value.push({});
      }

      var isSettingSubmission = flags.fromSubmission && !_lodash.default.isEqual(value, this.emptyValue);
      var changed = this.hasChanged(value, this.dataValue);
      this.dataValue = value;

      if (this.initRows || isSettingSubmission) {
        if (!this.createRows() && changed) {
          this.redraw();
        }
      }

      if (this.componentModal && isSettingSubmission) {
        this.componentModal.setValue(value);
      }

      this.rows.forEach(function (row, rowIndex) {
        if (value.length <= rowIndex) {
          return;
        }

        _lodash.default.each(row, function (col) {
          col.rowIndex = rowIndex;

          _this12.setNestedValue(col, value[rowIndex], flags);
        });
      });
      this.updateOnChange(flags, changed);
      return changed;
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this13 = this;

      this.rows.forEach(function (row, index) {
        return _lodash.default.forIn(row, function (component) {
          return component.data = _this13.dataValue[index];
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
        result = this.rows[key][compKey]; // If the component is inside a Layout Component, try to find it among all the row's components

        if (!result) {
          Object.entries(this.rows[key]).forEach(function (_ref3) {
            var _ref4 = _slicedToArray(_ref3, 2),
                comp = _ref4[1];

            if ('getComponent' in comp) {
              var possibleResult = comp.getComponent([compKey], fn);

              if (possibleResult) {
                result = possibleResult;
              }
            }
          });
        }

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
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
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
        documentation: '/userguide/#datagrid',
        weight: 30,
        schema: DataGridComponent.schema()
      };
    }
  }]);

  return DataGridComponent;
}(_NestedArrayComponent2.default);

exports.default = DataGridComponent;