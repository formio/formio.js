"use strict";

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.reflect.set.js");

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.object.get-own-property-descriptors.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/es.object.keys.js");

require("core-js/modules/es.object.assign.js");

require("core-js/modules/es.regexp.constructor.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.to-string.js");

require("core-js/modules/es.string.replace.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.array.splice.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _NestedArrayComponent2 = _interopRequireDefault(require("../_classes/nestedarray/NestedArrayComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _Alert = _interopRequireDefault(require("../alert/Alert"));

var _utils = require("../../utils/utils");

var _templates = _interopRequireDefault(require("./templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function set(target, property, value, receiver) { if (typeof Reflect !== "undefined" && Reflect.set) { set = Reflect.set; } else { set = function set(target, property, value, receiver) { var base = _superPropBase(target, property); var desc; if (base) { desc = Object.getOwnPropertyDescriptor(base, property); if (desc.set) { desc.set.call(receiver, value); return true; } else if (!desc.writable) { return false; } } desc = Object.getOwnPropertyDescriptor(receiver, property); if (desc) { if (!desc.writable) { return false; } desc.value = value; Object.defineProperty(receiver, property, desc); } else { _defineProperty(receiver, property, value); } return true; }; } return set(target, property, value, receiver); }

function _set(target, property, value, receiver, isStrict) { var s = set(target, property, value, receiver || target); if (!s && isStrict) { throw new Error('failed to set property'); } return value; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EditRowState = {
  New: 'new',
  Editing: 'editing',
  Saved: 'saved',
  Viewing: 'viewing',
  Removed: 'removed',
  Draft: 'draft'
};

var EditGridComponent = /*#__PURE__*/function (_NestedArrayComponent) {
  _inherits(EditGridComponent, _NestedArrayComponent);

  var _super = _createSuper(EditGridComponent);

  function EditGridComponent() {
    var _this;

    _classCallCheck(this, EditGridComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'editgrid';
    return _this;
  }

  _createClass(EditGridComponent, [{
    key: "defaultDialogTemplate",
    get: function get() {
      return "\n    <h3 ref=\"dialogHeader\">".concat(this.t('Do you want to clear data?'), "</h3>\n    <div style=\"display:flex; justify-content: flex-end;\">\n      <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\" aria-label=\"").concat(this.t('Cancel'), "\">").concat(this.t('Cancel'), "</button>\n      <button ref=\"dialogYesButton\" class=\"btn btn-danger\" aria-label=\"").concat(this.t('Yes, delete it'), "\">").concat(this.t('Yes, delete it'), "</button>\n    </div>\n  ");
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return this.displayAsTable ? EditGridComponent.defaultTableRowTemplate : EditGridComponent.defaultRowTemplate;
    }
  }, {
    key: "defaultHeaderTemplate",
    get: function get() {
      return this.displayAsTable ? EditGridComponent.defaultTableHeaderTemplate : EditGridComponent.defaultHeaderTemplate;
    }
  }, {
    key: "rowTemplate",
    get: function get() {
      var rowTemplate;

      if (_utils.Evaluator.noeval) {
        rowTemplate = this.displayAsTable ? _templates.default.tableRow : _templates.default.row;
      } else {
        rowTemplate = this.displayAsTable ? _lodash.default.get(this.component, 'templates.tableRow', this.defaultRowTemplate) : _lodash.default.get(this.component, 'templates.row', this.defaultRowTemplate);
      }

      return rowTemplate;
    }
  }, {
    key: "headerTemplate",
    get: function get() {
      var headerTemplate;

      if (_utils.Evaluator.noeval) {
        headerTemplate = this.displayAsTable ? _templates.default.tableHeader : _templates.default.header;
      } else {
        headerTemplate = this.displayAsTable ? _lodash.default.get(this.component, 'templates.tableHeader', this.defaultHeaderTemplate) : _lodash.default.get(this.component, 'templates.header', this.defaultHeaderTemplate);
      }

      return headerTemplate;
    }
    /**
     * Returns true if the component has nested components which don't trigger changes on the root level
     */

  }, {
    key: "hasScopedChildren",
    get: function get() {
      return !this.inlineEditMode;
    }
  }, {
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
    key: "rowRef",
    get: function get() {
      return "".concat(this.editgridKey, "-row");
    }
  }, {
    key: "rowElements",
    get: function get() {
      return this.refs[this.rowRef];
    }
  }, {
    key: "rowRefs",
    get: function get() {
      return this.refs["editgrid-".concat(this.component.key, "-row")];
    }
  }, {
    key: "addRowRef",
    get: function get() {
      return "".concat(this.editgridKey, "-addRow");
    }
  }, {
    key: "addRowElements",
    get: function get() {
      return this.refs[this.addRowRef];
    }
  }, {
    key: "saveRowRef",
    get: function get() {
      return "".concat(this.editgridKey, "-saveRow");
    }
  }, {
    key: "saveRowElements",
    get: function get() {
      return this.refs[this.saveRowRef];
    }
  }, {
    key: "cancelRowRef",
    get: function get() {
      return "".concat(this.editgridKey, "-cancelRow");
    }
  }, {
    key: "cancelRowElements",
    get: function get() {
      return this.refs[this.cancelRowRef];
    }
  }, {
    key: "inlineEditMode",
    get: function get() {
      return this.component.inlineEdit;
    }
  }, {
    key: "saveEditMode",
    get: function get() {
      return !this.inlineEditMode;
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
        if (!data[index] && row.state !== EditRowState.New) {
          data[index] = {};
        }

        var rowData = data[index] || {};
        row.data = rowData;
        row.components.forEach(function (component) {
          component.data = rowData;
        });
      });
    }
  }, {
    key: "dataValue",
    get: function get() {
      return _get(_getPrototypeOf(EditGridComponent.prototype), "dataValue", this) || [];
    },
    set: function set(value) {
      _set(_getPrototypeOf(EditGridComponent.prototype), "dataValue", value, this, true);
    }
  }, {
    key: "displayAsTable",
    get: function get() {
      return this.component.displayAsTable;
    }
  }, {
    key: "iteratableRows",
    get: function get() {
      return this.editRows;
    }
  }, {
    key: "defaultValue",
    get: function get() {
      var value = _get(_getPrototypeOf(EditGridComponent.prototype), "defaultValue", this);

      var defaultValue = Array.isArray(value) ? value : [];

      _lodash.default.times(this.minLength - defaultValue.length, function () {
        return defaultValue.push({});
      });

      return defaultValue;
    }
  }, {
    key: "hasRemoveButtons",
    value: function hasRemoveButtons() {
      return !this.component.disableAddingRemovingRows && !this.options.readOnly && !this.disabled && this.fullMode && this.dataValue.length > _lodash.default.get(this.component, 'validate.minLength', 0);
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
      var dataValue = this.dataValue;
      var openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;

      if (openWhenEmpty) {
        var dataObj = {};
        this.editRows = [];
        this.createRow(dataObj, 0);
      } else {
        this.editRows = dataValue.map(function (row, rowIndex) {
          return {
            components: _this2.lazyLoad ? [] : _this2.createRowComponents(row, rowIndex),
            data: row,
            state: EditRowState.Saved,
            backup: null,
            error: null
          };
        });
      }

      this.prevHasAddButton = this.hasAddButton();
      this.checkData();
    }
  }, {
    key: "isOpen",
    value: function isOpen(editRow) {
      return [EditRowState.New, EditRowState.Editing, EditRowState.Viewing].includes(editRow.state);
    }
  }, {
    key: "isComponentVisibleInSomeRow",
    value: function isComponentVisibleInSomeRow(component) {
      var _this3 = this;

      var rows = this.editRows;
      var savedStates = [EditRowState.Saved, EditRowState.Editing, EditRowState.Draft];
      var savedRows = rows.filter(function (row) {
        return _lodash.default.includes(savedStates, row.state);
      });
      this.visibleInHeader = this.visibleInHeader || [];

      var changeVisibleInHeader = function changeVisibleInHeader(component, isVisible) {
        if (!isVisible) {
          _lodash.default.remove(_this3.visibleInHeader, function (key) {
            return key === component.key;
          });
        }

        if (isVisible && !_lodash.default.includes(_this3.visibleInHeader, component.key)) {
          _this3.visibleInHeader.push(component.key);
        }
      };

      if (_lodash.default.isEmpty(rows)) {
        var rowComponents = this.createRowComponents({}, 0);
        var checkComponent;
        (0, _utils.eachComponent)(rowComponents, function (comp) {
          if (comp.component.key === component.key) {
            checkComponent = comp;
          }

          comp.checkConditions();
        });
        var isVisible = checkComponent ? checkComponent.visible : true;

        _toConsumableArray(this.components).forEach(function (comp) {
          return _this3.removeComponent(comp, _this3.components);
        });

        changeVisibleInHeader(component, isVisible);
        return isVisible;
      }

      var isOpenRowWhenEmpty = _lodash.default.get(this.component, 'openWhenEmpty') && rows.length === 1 && rows[0].state === EditRowState.New;

      if (!_lodash.default.isEmpty(rows) && _lodash.default.isEmpty(savedRows) && !isOpenRowWhenEmpty) {
        return _lodash.default.includes(this.visibleInHeader, component.key);
      }

      return _lodash.default.some(isOpenRowWhenEmpty ? rows : savedRows, function (row, index) {
        var editingRow = row.state === EditRowState.Editing;
        var isVisible;

        if (!editingRow) {
          var flattenedComponents = _this3.flattenComponents(index);

          var instance = flattenedComponents[component.key];
          isVisible = instance ? instance.visible : true;
          changeVisibleInHeader(component, isVisible);
        } else {
          isVisible = _lodash.default.includes(_this3.visibleInHeader, component.key);
        }

        return isVisible;
      });
    }
  }, {
    key: "render",
    value: function render(children) {
      var _this4 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this);
      }

      var dataValue = this.dataValue;
      var headerTemplate = this.headerTemplate;
      var t = this.t.bind(this);
      var templateName = this.displayAsTable ? 'editgridTable' : 'editgrid';
      return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this, children || this.renderTemplate(templateName, {
        ref: {
          row: this.rowRef,
          addRow: this.addRowRef,
          saveRow: this.saveRowRef,
          cancelRow: this.cancelRowRef
        },
        header: this.renderString(headerTemplate, {
          displayValue: function displayValue(component) {
            return _this4.displayComponentValue(component, true);
          },
          components: this.component.components,
          value: dataValue,
          t: t
        }),
        footer: this.renderString(_lodash.default.get(this.component, 'templates.footer'), {
          components: this.component.components,
          value: dataValue,
          t: t
        }),
        rows: this.editRows.map(this.renderRow.bind(this)),
        openRows: this.editRows.map(function (row) {
          return _this4.isOpen(row);
        }),
        errors: this.editRows.map(function (row) {
          return row.error;
        }),
        hasAddButton: this.hasAddButton(),
        hasRemoveButtons: this.hasRemoveButtons()
      }));
    }
  }, {
    key: "renderComponents",
    value: function renderComponents(components) {
      components = components || this.getComponents();
      var children = components.map(function (component) {
        return component.render();
      });
      var templateName = this.displayAsTable && this.prevHasAddButton ? 'tableComponents' : 'components';
      return this.renderTemplate(templateName, {
        children: children,
        components: components
      });
    }
  }, {
    key: "attach",
    value: function attach(element) {
      var _this$loadRefs,
          _this5 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
      }

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, this.addRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.saveRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.cancelRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.rowRef, 'multiple'), _this$loadRefs));
      this.addRowElements.forEach(function (addButton) {
        _this5.addEventListener(addButton, 'click', function () {
          return _this5.addRow();
        });
      });
      var openRowCount = 0;
      this.rowElements.forEach(function (row, rowIndex) {
        var editRow = _this5.editRows[rowIndex];

        if (editRow !== null && editRow !== void 0 && editRow.isRowSelected) {
          row.classList.add('selected');
        }

        if (_this5.isOpen(editRow)) {
          _this5.attachComponents(row, editRow.components);

          _this5.addEventListener(_this5.saveRowElements[openRowCount], 'click', function () {
            return _this5.saveRow(rowIndex, true);
          });

          _this5.addEventListener(_this5.cancelRowElements[openRowCount], 'click', function () {
            return _this5.cancelRow(rowIndex);
          });

          openRowCount++;
        } else {
          // Attach edit and remove button events.
          [{
            className: 'removeRow',
            event: 'click',
            action: function action() {
              return _this5.removeRow(rowIndex, true);
            }
          }, {
            className: 'editRow',
            event: 'click',
            action: function action() {
              _this5.editRow(rowIndex).then(function () {
                if (_this5.component.rowDrafts) {
                  var _this5$root;

                  _this5.validateRow(editRow, false);

                  var hasErrors = editRow.errors && !!editRow.errors.length;
                  var shouldShowRowErrorsAlert = _this5.component.modal && hasErrors && ((_this5$root = _this5.root) === null || _this5$root === void 0 ? void 0 : _this5$root.submitted);

                  if (shouldShowRowErrorsAlert) {
                    _this5.alert.showErrors(editRow.errors, false);

                    editRow.alerts = true;
                  }
                }
              });
            }
          }, {
            className: 'row',
            event: 'click',
            action: function action() {
              row.classList.toggle('selected');
              var eventName = 'editGridSelectRow';

              if (Array.from(row.classList).includes('selected')) {
                editRow.isRowSelected = true;
              } else {
                delete editRow.isRowSelected;
                eventName = 'editGridUnSelectRow';
              }

              _this5.emit(eventName, {
                component: _this5.component,
                data: _this5.dataValue[rowIndex]
              });
            }
          }].forEach(function (_ref) {
            var className = _ref.className,
                event = _ref.event,
                action = _ref.action;
            var elements = row.getElementsByClassName(className);
            Array.prototype.forEach.call(elements, function (element) {
              _this5.addEventListener(element, event, action);
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
    key: "flattenRowDataValue",
    value: function flattenRowDataValue(dataValue) {
      var _this6 = this;

      var flattened = {};
      Object.keys(dataValue).forEach(function (key) {
        if (_lodash.default.isObject(dataValue[key]) && !_lodash.default.isNil(dataValue[key])) {
          Object.assign(flattened, _this6.flattenRowDataValue(dataValue[key]));
        } else {
          flattened[key] = dataValue[key];
        }
      });
      return flattened;
    }
  }, {
    key: "isComponentVisibleInRow",
    value: function isComponentVisibleInRow(component, flattenedComponents) {
      var instance = flattenedComponents[component.key];
      return instance ? instance.visible : true;
    }
  }, {
    key: "displayComponentValue",
    value: function displayComponentValue(component, header) {
      return !!((!component.hasOwnProperty('tableView') || component.tableView) && header ? this.isComponentVisibleInSomeRow(component) : _lodash.default.includes(this.visibleInHeader, component.key));
    }
  }, {
    key: "renderRow",
    value: function renderRow(row, rowIndex) {
      var _this7 = this;

      var dataValue = this.dataValue;

      if (this.isOpen(row)) {
        return this.renderComponents(row.components);
      } else {
        var flattenedComponents = this.flattenComponents(rowIndex);
        var rowTemplate = this.rowTemplate;
        return this.renderString(rowTemplate, {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex: rowIndex,
          components: this.component.components,
          flattenedComponents: flattenedComponents,
          displayValue: function displayValue(component) {
            return _this7.displayComponentValue(component);
          },
          isVisibleInRow: function isVisibleInRow(component) {
            return _this7.isComponentVisibleInRow(component, flattenedComponents);
          },
          getView: function getView(component, data) {
            var _instance$component, _instance$component2;

            var instance = flattenedComponents[component.key];
            var view = instance ? instance.getView(data || instance.dataValue) : ''; // If there is an html tag in view, don't allow it to be injected in template

            var htmlTagRegExp = new RegExp('<(.*?)>');
            return typeof view === 'string' && view.length && !((_instance$component = instance.component) !== null && _instance$component !== void 0 && _instance$component.template) && htmlTagRegExp.test(view) && ((_instance$component2 = instance.component) === null || _instance$component2 === void 0 ? void 0 : _instance$component2.inputFormat) !== 'html' ? "<input type=\"text\" value=\"".concat(view.replace(/"/g, '&quot;'), "\" readonly/>") : view;
          },
          state: this.editRows[rowIndex].state,
          t: this.t.bind(this)
        });
      }
    }
  }, {
    key: "eachComponent",
    value: function eachComponent(fn, rowIndex) {
      _lodash.default.each(this.getComponents(rowIndex), function (component, index) {
        if (fn(component, index) === false) {
          return false;
        }
      });
    }
  }, {
    key: "restoreComponentsContext",
    value: function restoreComponentsContext() {
      var _this8 = this;

      this.getComponents().forEach(function (component) {
        var _this8$editRows$compo;

        var rowData = _this8.dataValue[component.rowIndex];
        var editRowData = (_this8$editRows$compo = _this8.editRows[component.rowIndex]) === null || _this8$editRows$compo === void 0 ? void 0 : _this8$editRows$compo.data;
        component.data = rowData || editRowData;
      });
    }
  }, {
    key: "flattenComponents",
    value: function flattenComponents(rowIndex) {
      var result = {};
      this.everyComponent(function (component) {
        result[component.component.flattenAs || component.key] = component;
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
      var _this9 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "destroyComponents", this).call(this);
      }

      var components = this.getComponents(rowIndex).slice();
      components.forEach(function (comp) {
        return _this9.removeComponent(comp, _this9.components);
      });
    }
  }, {
    key: "createRow",
    value: function createRow(dataObj, rowIndex) {
      var editRow = {
        components: this.createRowComponents(dataObj, rowIndex),
        data: dataObj,
        state: EditRowState.New,
        backup: null,
        error: null
      };
      this.editRows.push(editRow);

      if (this.inlineEditMode) {
        this.dataValue.push(dataObj);
      }

      return editRow;
    }
  }, {
    key: "addRow",
    value: function addRow() {
      if (this.options.readOnly) {
        return;
      }

      var dataObj = {};
      var rowIndex = this.editRows.length;
      var editRow = this.createRow(dataObj, rowIndex);

      if (this.inlineEditMode) {
        this.triggerChange();
      }

      this.emit('editGridAddRow', {
        component: this.component,
        row: editRow
      });
      this.checkRow('checkData', null, {}, editRow.data, editRow.components);

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
      var _this10 = this;

      var modalContent = this.ce('div');
      var editRow = this.editRows[rowIndex];
      editRow.willBeSaved = false;
      var components = editRow.components;
      modalContent.innerHTML = this.renderComponents(components);
      var dialog = this.component.modal ? this.createModal(modalContent, {}, function () {
        return _this10.showDialog(rowIndex);
      }) : undefined;
      dialog.classList.add("editgrid-row-modal-".concat(this.id));
      editRow.dialog = dialog;

      if (this.alert) {
        this.alert.clear();
        this.alert = null;
      }

      this.alert = new _Alert.default(dialog.refs.dialogContents, this);
      this.addEventListener(dialog, 'close', function () {
        if (!editRow.willBeSaved) {
          if (_this10.editRows[rowIndex] && _this10.editRows[rowIndex].state !== EditRowState.New) {
            _this10.editRows[rowIndex].components.forEach(function (comp) {
              comp.setPristine(true);
            });
          }

          _this10.cancelRow(rowIndex);
        }

        if (_this10.alert) {
          _this10.alert.clear();

          _this10.alert = null;
        } // Remove references to dialog elements to prevent possible in some cases memory leaks


        delete editRow.confirmationDialog;
        delete editRow.dialog;
      });
      dialog.refs.dialogContents.appendChild(this.ce('button', {
        class: 'btn btn-primary',
        onClick: function onClick() {
          // After an attempt to save, all the components inside the row should become not pristine
          if (!_this10.component.rowDrafts) {
            editRow.components.forEach(function (comp) {
              return comp.setPristine(false);
            });
          }

          if (_this10.validateRow(editRow, true) || _this10.component.rowDrafts) {
            editRow.willBeSaved = true;
            dialog.close();

            _this10.saveRow(rowIndex, true);
          } else {
            _this10.alert.showErrors(editRow.errors, false);

            editRow.alerts = true;
          }
        }
      }, this.component.saveRow || 'Save'));
      return this.attachComponents(modalContent, components);
    }
  }, {
    key: "showDialog",
    value: function showDialog(rowIndex) {
      var editRow = this.editRows[rowIndex];

      if (_lodash.default.isEqual(editRow.backup, editRow.data)) {
        return _nativePromiseOnly.default.resolve();
      }

      var wrapper = this.ce('div', {
        ref: 'confirmationDialog'
      });
      var dialogContent = this.component.dialogTemplate || this.defaultDialogTemplate;
      wrapper.innerHTML = dialogContent;
      wrapper.refs = {};
      this.loadRefs.call(wrapper, wrapper, {
        dialogHeader: 'single',
        dialogCancelButton: 'single',
        dialogYesButton: 'single'
      });
      var dialog = this.createModal(wrapper);
      dialog.classList.add("editgrid-row-modal-confirmation-".concat(this.id));

      var close = function close(event) {
        event.preventDefault();
        dialog.close();
      };

      var dialogResult;
      var promise = new _nativePromiseOnly.default(function (resolve, reject) {
        dialogResult = {
          resolve: resolve,
          reject: reject
        };
      });
      this.addEventListener(wrapper.refs.dialogYesButton, 'click', function (event) {
        close(event);
        dialogResult.resolve();
      });
      this.addEventListener(wrapper.refs.dialogCancelButton, 'click', function (event) {
        close(event);
        dialogResult.reject();
      });
      editRow.confirmationDialog = dialog;
      return promise;
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      var editRow = this.editRows[rowIndex];
      var isAlreadyEditing = editRow.state === EditRowState.Editing || editRow.state === EditRowState.New;

      if (!editRow || isAlreadyEditing) {
        return _nativePromiseOnly.default.resolve();
      }

      editRow.prevState = editRow.state;
      editRow.state = this.options.readOnly ? EditRowState.Viewing : EditRowState.Editing;

      if (this.lazyLoad && editRow.components.length === 0) {
        editRow.components = this.createRowComponents(editRow.data, rowIndex);
      }

      var dataSnapshot = (0, _utils.fastCloneDeep)(editRow.data);

      if (this.inlineEditMode) {
        editRow.backup = dataSnapshot;
      } else {
        editRow.backup = (0, _utils.fastCloneDeep)(editRow.data);
        editRow.data = dataSnapshot;
        this.restoreRowContext(editRow);
      }

      if (this.component.modal) {
        return this.addRowModal(rowIndex);
      }

      return this.redraw();
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
      if (this.options.readOnly) {
        return;
      }

      var editRow = this.editRows[rowIndex];

      switch (editRow.state) {
        case EditRowState.New:
          {
            editRow.state = EditRowState.Removed;
            this.clearErrors(rowIndex);
            this.destroyComponents(rowIndex);

            if (this.inlineEditMode) {
              this.splice(rowIndex);
            }

            this.editRows.splice(rowIndex, 1);
            this.openWhenEmpty();
            break;
          }

        case EditRowState.Editing:
          {
            editRow.state = editRow.prevState;

            if (this.inlineEditMode) {
              this.dataValue[rowIndex] = editRow.backup;
            }

            editRow.data = editRow.backup;
            editRow.backup = null;
            this.restoreRowContext(editRow);
            this.clearErrors(rowIndex);
            break;
          }
      }

      this.emit('editGridCancelRow', {
        instance: this,
        component: this.component,
        editRow: editRow
      });
      this.checkValidity(null, true);
      this.redraw();

      if (this.component.rowDrafts) {
        this.checkValidity(this.data, false);
      }
    }
  }, {
    key: "saveRow",
    value: function saveRow(rowIndex, modified) {
      var _this11 = this;

      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        return;
      } // After an attempt to save, all the components inside the row should become not pristine


      if (!this.component.rowDrafts) {
        editRow.components.forEach(function (comp) {
          return comp.setPristine(false);
        });
      }

      var isRowValid = this.validateRow(editRow, true);

      if (!this.component.rowDrafts) {
        if (!isRowValid) {
          return false;
        }
      }

      if (this.saveEditMode) {
        var dataValue = this.dataValue;

        switch (editRow.state) {
          case EditRowState.New:
            {
              var newIndex = dataValue.length;
              dataValue.push(editRow.data);
              editRow.components.forEach(function (component) {
                return component.rowIndex = newIndex;
              });

              if (rowIndex !== newIndex) {
                this.editRows.splice(rowIndex, 1);
                this.editRows.splice(newIndex, 0, editRow);
              }

              break;
            }

          case EditRowState.Editing:
            {
              dataValue[rowIndex] = editRow.data;
              break;
            }
        }
      }

      editRow.state = this.component.rowDrafts && !isRowValid ? EditRowState.Draft : EditRowState.Saved;
      editRow.backup = null;
      this.updateValue();
      this.emit('editGridSaveRow', {
        component: this.component,
        row: editRow.data,
        instance: this
      });
      this.triggerChange({
        modified: modified,
        noPristineChangeOnModified: modified && this.component.rowDrafts,
        isolateRow: true
      });

      if (this.component.rowDrafts) {
        editRow.components.forEach(function (comp) {
          return comp.setPristine(_this11.pristine);
        });
      }

      this.checkValidity(null, true);
      this.redraw();

      if (editRow.alerts) {
        editRow.alerts = false;
      }

      return true;
    }
  }, {
    key: "beforeFocus",
    value: function beforeFocus(component) {
      if ('beforeFocus' in this.parent) {
        this.parent.beforeFocus(this);
      }

      var relativePath = this.getRelativePath(component.path);
      var arrayPath = (0, _utils.getArrayFromComponentPath)(relativePath);

      if (_lodash.default.isNumber(arrayPath[0])) {
        this.editRow(arrayPath[0]);
      }
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
    key: "updateRowsComponents",
    value: function updateRowsComponents(rowIndex) {
      var _this12 = this;

      this.editRows.slice(rowIndex).forEach(function (row, index) {
        _this12.updateComponentsRowIndex(row.components, rowIndex + index);
      });
    }
  }, {
    key: "baseRemoveRow",
    value: function baseRemoveRow(rowIndex) {
      var editRow = this.editRows[rowIndex];
      editRow.state = EditRowState.Removed;
      this.destroyComponents(rowIndex);
      return editRow;
    }
  }, {
    key: "removeRow",
    value: function removeRow(rowIndex, modified) {
      if (this.options.readOnly) {
        return;
      }

      this.clearErrors(rowIndex);
      this.baseRemoveRow(rowIndex);
      this.splice(rowIndex);
      this.emit('editGridDeleteRow', {
        index: rowIndex
      });
      this.editRows.splice(rowIndex, 1);
      this.openWhenEmpty();
      this.updateRowsComponents(rowIndex);
      this.updateValue();
      this.triggerChange({
        modified: modified,
        noPristineChangeOnModified: modified && this.component.rowDrafts,
        isolateRow: true
      });
      this.checkValidity(null, true);
      this.checkData();
      this.redraw();
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this13 = this;

      return this.component.components.map(function (col, colIndex) {
        var column = _lodash.default.clone(col);

        var options = _lodash.default.clone(_this13.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);

        options.onChange = function () {
          var _changed$instance$roo, _this13$root;

          var flags = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
          var changed = arguments.length > 1 ? arguments[1] : undefined;
          var modified = arguments.length > 2 ? arguments[2] : undefined;

          if ((_changed$instance$roo = changed.instance.root) !== null && _changed$instance$roo !== void 0 && _changed$instance$roo.id && ((_this13$root = _this13.root) === null || _this13$root === void 0 ? void 0 : _this13$root.id) !== changed.instance.root.id) {
            changed.instance.root.triggerChange(flags, changed, modified);
          } else if (!_this13.component.modal) {
            _this13.triggerRootChange(flags, changed, modified);
          }

          if (_this13.inlineEditMode) {
            return;
          }

          var editRow = _this13.editRows[rowIndex];

          if (editRow !== null && editRow !== void 0 && editRow.alerts) {
            _this13.checkData(null, _objectSpread(_objectSpread({}, flags), {}, {
              changed: changed,
              rowIndex: rowIndex
            }), _this13.data);
          } else if (editRow) {
            // If drafts allowed, perform validation silently if there was no attempt to submit a form
            var silentCheck = _this13.component.rowDrafts && !_this13.shouldValidateDraft(editRow);

            _this13.checkRow('checkData', null, _objectSpread(_objectSpread({}, flags), {}, {
              changed: changed,
              silentCheck: silentCheck
            }), editRow.data, editRow.components, silentCheck);
          }
        };

        var comp = _this13.createComponent(_lodash.default.assign({}, column, {
          row: options.row
        }), options, row);

        comp.rowIndex = rowIndex;
        comp.inEditGrid = true;
        return comp;
      });
    }
  }, {
    key: "hasOpenRows",
    value: function hasOpenRows() {
      var _this14 = this;

      return this.editRows.some(function (row) {
        return _this14.isOpen(row);
      });
    }
  }, {
    key: "shouldValidateDraft",
    value: function shouldValidateDraft(editRow) {
      var _this$root, _this$root2;

      // Draft rows should be validated only when there was an attempt to submit a form
      return editRow.state === EditRowState.Draft && !this.pristine && !((_this$root = this.root) !== null && _this$root !== void 0 && _this$root.pristine) && !this.hasOpenRows() || ((_this$root2 = this.root) === null || _this$root2 === void 0 ? void 0 : _this$root2.submitted);
    }
  }, {
    key: "shouldValidateRow",
    value: function shouldValidateRow(editRow, dirty) {
      return this.shouldValidateDraft(editRow) || editRow.state === EditRowState.Editing || editRow.alerts || dirty;
    }
  }, {
    key: "validateRow",
    value: function validateRow(editRow, dirty, forceSilentCheck) {
      var _this15 = this,
          _this$root3;

      var valid = true;

      var errorsSnapshot = _toConsumableArray(this.errors);

      if (this.shouldValidateRow(editRow, dirty)) {
        editRow.components.forEach(function (comp) {
          var silentCheck = _this15.component.rowDrafts && !_this15.shouldValidateDraft(editRow) || forceSilentCheck;
          valid &= comp.checkValidity(null, dirty, null, silentCheck);
        });
      }

      if (this.component.validate && this.component.validate.row) {
        valid = this.evaluate(this.component.validate.row, {
          valid: valid,
          row: editRow.data
        }, 'valid', true);

        if (valid.toString() !== 'true') {
          editRow.error = valid;
          valid = false;
        } else {
          editRow.error = null;
        }

        if (valid === null) {
          valid = "Invalid row validation for ".concat(this.key);
        }
      }

      editRow.errors = !valid ? this.errors.filter(function (err) {
        return !errorsSnapshot.includes(err);
      }) : null;

      if (!this.component.rowDrafts || (_this$root3 = this.root) !== null && _this$root3 !== void 0 && _this$root3.submitted) {
        this.showRowErrorAlerts(editRow, !!valid);
      }

      return !!valid;
    }
  }, {
    key: "showRowErrorAlerts",
    value: function showRowErrorAlerts(editRow, valid) {
      if (editRow.alerts) {
        if (this.alert) {
          var _editRow$errors;

          if ((_editRow$errors = editRow.errors) !== null && _editRow$errors !== void 0 && _editRow$errors.length && !valid) {
            this.alert.showErrors(editRow.errors, false);
            editRow.alerts = true;
          } else {
            this.alert.clear();
          }
        }
      }
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row, silentCheck) {
      data = data || this.rootValue;
      row = row || this.data;

      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      return this.checkComponentValidity(data, dirty, row, {
        silentCheck: silentCheck
      });
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row) {
      var _this16 = this,
          _this$errors,
          _this$root5;

      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var silentCheck = options.silentCheck;
      var errorsLength = this.errors.length;

      var superValid = _get(_getPrototypeOf(EditGridComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, row, options); // If super tells us that component invalid and there is no need to update alerts, just return false


      if (!superValid && !this.alert && !this.hasOpenRows()) {
        return false;
      }

      if (this.shouldSkipValidation(data, dirty, row)) {
        return true;
      }

      var rowsValid = true;
      var rowsEditing = false;
      this.editRows.forEach(function (editRow, index) {
        // Trigger all errors on the row.
        var rowValid = _this16.validateRow(editRow, dirty, silentCheck);

        rowsValid &= rowValid;

        if (_this16.rowRefs) {
          var rowContainer = _this16.rowRefs[index];

          if (rowContainer) {
            var errorContainer = rowContainer.querySelector('.editgrid-row-error');

            if (!rowValid && errorContainer && (!_this16.component.rowDrafts || _this16.shouldValidateDraft(editRow))) {
              _this16.addClass(errorContainer, 'help-block');

              errorContainer.textContent = _this16.t('invalidRowError');
            } else if (errorContainer) {
              errorContainer.textContent = '';
            }
          }
        } // If this is a dirty check, and any rows are still editing, we need to throw validation error.


        rowsEditing |= dirty && _this16.isOpen(editRow);
      });

      if (!rowsValid) {
        var _this$root4;

        if (!silentCheck && (!this.component.rowDrafts || (_this$root4 = this.root) !== null && _this$root4 !== void 0 && _this$root4.submitted)) {
          this.setCustomValidity(this.t('invalidRowsError'), dirty); // Delete this class, because otherwise all the components inside EditGrid will has red border even if they are valid

          this.removeClass(this.element, 'has-error');
        }

        return false;
      } else if (rowsEditing && this.saveEditMode) {
        this.setCustomValidity(this.t('unsavedRowsError'), dirty);
        return false;
      }

      var message = this.invalid || this.invalidMessage(data, dirty);

      if (((_this$errors = this.errors) === null || _this$errors === void 0 ? void 0 : _this$errors.length) !== errorsLength && (_this$root5 = this.root) !== null && _this$root5 !== void 0 && _this$root5.submitted && !message) {
        this.setCustomValidity(message, dirty);
        this.root.showErrors();
      } else {
        this.setCustomValidity(message, dirty);
      }

      return superValid;
    }
  }, {
    key: "changeState",
    value: function changeState(changed, flags) {
      if (changed || flags.resetValue && this.component.modalEdit) {
        this.rebuild();
      } else {
        this.redraw();
      }
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this17 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!value) {
        value = this.defaultValue;
      }

      if (!Array.isArray(value)) {
        if (_typeof(value) === 'object') {
          value = [value];
        } else {
          return false;
        }
      }

      var changed = this.hasChanged(value, this.dataValue);
      flags.noValidate = !changed;

      if (this.parent) {
        this.parent.checkComponentConditions();
      }

      this.dataValue = value; // Refresh editRow data when data changes.

      this.dataValue.forEach(function (row, rowIndex) {
        var editRow = _this17.editRows[rowIndex];

        if (editRow) {
          editRow.data = row;

          _this17.restoreRowContext(editRow, flags);

          editRow.state = EditRowState.Saved;
          editRow.backup = null;
          editRow.error = null;
        } else {
          _this17.editRows[rowIndex] = {
            components: _this17.lazyLoad ? [] : _this17.createRowComponents(row, rowIndex),
            data: row,
            state: EditRowState.Saved,
            backup: null,
            error: null
          };
        }
      });
      var dataLength = this.dataValue.length; // If the last row is a new row, then do not remove it.

      if (this.editRows[dataLength] && this.editRows[dataLength].state === EditRowState.New) {
        dataLength = dataLength + 1;
      }

      this.editRows.slice(dataLength).forEach(function (editRow, index) {
        return _this17.baseRemoveRow(dataLength + index);
      });
      this.editRows = this.editRows.slice(0, dataLength);
      this.openWhenEmpty();
      this.updateOnChange(flags, changed);
      this.checkData();
      this.changeState(changed, flags);
      return changed;
    }
  }, {
    key: "openWhenEmpty",
    value: function openWhenEmpty() {
      var shouldBeOpened = !this.dataValue.length && this.component.openWhenEmpty;
      var hasNoRows = !this.editRows.length;

      if (hasNoRows && shouldBeOpened && !this.builderMode) {
        var dataObj = {};
        this.createRow(dataObj, 0);
      }
    }
  }, {
    key: "restoreRowContext",
    value: function restoreRowContext(editRow) {
      var _this18 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      editRow.components.forEach(function (component) {
        component.data = editRow.data;

        _this18.setNestedValue(component, editRow.data, flags);
      });
    }
  }, {
    key: "emptyRows",
    value: function emptyRows() {
      var _this19 = this;

      this.editRows.forEach(function (editRow, index) {
        return _this19.destroyComponents(index);
      });
      this.editRows = [];
    }
  }, {
    key: "resetValue",
    value: function resetValue() {
      _get(_getPrototypeOf(EditGridComponent.prototype), "resetValue", this).call(this);

      this.emptyRows();
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _NestedArrayComponent2.default.schema.apply(_NestedArrayComponent2.default, [{
        type: 'editgrid',
        label: 'Edit Grid',
        key: 'editGrid',
        clearOnHide: true,
        input: true,
        tree: true,
        removeRow: 'Cancel',
        defaultOpen: false,
        openWhenEmpty: false,
        modal: false,
        components: [],
        inlineEdit: false,
        templates: {
          header: EditGridComponent.defaultHeaderTemplate,
          row: EditGridComponent.defaultRowTemplate,
          tableHeader: EditGridComponent.defaultTableHeaderTemplate,
          tableRow: EditGridComponent.defaultTableRowTemplate,
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
        documentation: '/userguide/#editgrid',
        weight: 30,
        schema: EditGridComponent.schema()
      };
    }
  }, {
    key: "defaultHeaderTemplate",
    get: function get() {
      return "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class=\"col-sm-2\">{{ t(component.label) }}</div>\n        {% } %}\n      {% }) %}\n    </div>";
    }
  }, {
    key: "defaultTableHeaderTemplate",
    get: function get() {
      return "\n      <tr>\n        {% util.eachComponent(components, function(component) { %}\n          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n            <td class=\"editgrid-table-column\">{{ component.label }}</td>\n          {% } %}\n        {% }) %}\n        {% if (!instance.options.readOnly && !instance.disabled) { %}\n          <td class=\"editgrid-table-column\">Actions</td>\n        {% } %}\n      </tr>\n    ";
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return "<div class=\"row\">\n      {% util.eachComponent(components, function(component) { %}\n        {% if (displayValue(component)) { %}\n          <div class=\"col-sm-2\">\n            {{ isVisibleInRow(component) ? getView(component, row[component.key]) : ''}}\n          </div>\n        {% } %}\n      {% }) %}\n      {% if (!instance.options.readOnly && !instance.disabled) { %}\n        <div class=\"col-sm-2\">\n          <div class=\"btn-group pull-right\">\n            <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n            {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n            {% } %}\n          </div>\n        </div>\n      {% } %}\n    </div>";
    }
  }, {
    key: "defaultTableRowTemplate",
    get: function get() {
      return "\n      {% util.eachComponent(components, function(component) { %}\n          {% if (!component.hasOwnProperty('tableView') || component.tableView) { %}\n            <td class=\"editgrid-table-column\">\n              {{ getView(component, row[component.key]) }}\n            </td>\n          {% } %}\n        {% }) %}\n        {% if (!instance.options.readOnly && !instance.disabled) { %}\n          <td class=\"editgrid-table-column\">\n            <div class=\"btn-group\">\n              <button class=\"btn btn-default btn-light btn-sm editRow\" aria-label=\"{{ t('Edit row') }}\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n              {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n              <button class=\"btn btn-danger btn-sm removeRow\" aria-label=\"{{ t('Remove row') }}\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n              {% } %}\n            </div>\n          </td>\n        {% } %}\n    ";
    }
  }]);

  return EditGridComponent;
}(_NestedArrayComponent2.default);

exports.default = EditGridComponent;
EditGridComponent.prototype.hasChanged = _Component.default.prototype.hasChanged;