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

require("core-js/modules/es.array.some");

require("core-js/modules/es.array.splice");

require("core-js/modules/es.function.name");

require("core-js/modules/es.object.assign");

require("core-js/modules/es.object.get-own-property-descriptor");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.keys");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.reflect.get");

require("core-js/modules/es.regexp.to-string");

require("core-js/modules/es.string.includes");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _nativePromiseOnly = _interopRequireDefault(require("native-promise-only"));

var _NestedArrayComponent2 = _interopRequireDefault(require("../_classes/nestedarray/NestedArrayComponent"));

var _Component = _interopRequireDefault(require("../_classes/component/Component"));

var _Alert = _interopRequireDefault(require("../alert/Alert"));

var _utils = require("../../utils/utils");

var _templates = _interopRequireDefault(require("./templates"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EditRowState = {
  New: 'new',
  Editing: 'editing',
  Saved: 'saved',
  Removed: 'removed',
  Draft: 'draft'
};

var EditGridComponent = /*#__PURE__*/function (_NestedArrayComponent) {
  _inherits(EditGridComponent, _NestedArrayComponent);

  var _super = _createSuper(EditGridComponent);

  _createClass(EditGridComponent, [{
    key: "defaultDialogTemplate",
    get: function get() {
      return "\n    <h3 ref=\"dialogHeader\">".concat(this.t('Do you want to clear data?'), "</h3>\n    <div style=\"display:flex; justify-content: flex-end;\">\n      <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\">").concat(this.t('Cancel'), "</button>\n      <button ref=\"dialogYesButton\" class=\"btn btn-primary\">").concat(this.t('Yes, delete it'), "</button>\n    </div>\n  ");
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
        var rowData = data[index];
        row.data = rowData;
        row.components.forEach(function (component) {
          component.data = rowData;
        });
      });
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
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len = arguments.length, extend = new Array(_len), _key = 0; _key < _len; _key++) {
        extend[_key] = arguments[_key];
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
      return "<div class=\"row\">\n  {% (component.components || []).forEach(function(component) { %}\n    <div class=\"col-sm-2\">{{ component.label }}</div>\n  {% }) %}\n</div>";
    }
  }, {
    key: "defaultRowTemplate",
    get: function get() {
      return "<div class=\"row\">\n  {% instance.eachComponent(function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ component.getView(component.dataValue) }}\n    </div>\n  {% }, rowIndex) %}\n  {% if (!instance.options.readOnly && !instance.originalComponent.disabled) { %}\n    <div class=\"col-sm-2\">\n      <div class=\"btn-group pull-right\">\n        <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n          <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n        {% } %}\n      </div>\n    </div>\n  {% } %}\n</div>";
    }
  }]);

  function EditGridComponent() {
    var _this;

    _classCallCheck(this, EditGridComponent);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.type = 'editgrid';
    return _this;
  }

  _createClass(EditGridComponent, [{
    key: "loadRefs",
    value: function loadRefs(element, refs) {
      _get(_getPrototypeOf(EditGridComponent.prototype), "loadRefs", this).call(this, element, refs);

      var massageContainerRef = 'messageContainer';

      if (refs["".concat(massageContainerRef)] === 'single') {
        this.refs["".concat(massageContainerRef)] = element.querySelector(":scope > [ref=\"".concat(massageContainerRef, "\"]"));
      }
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
      var dataValue = this.dataValue || [];
      var openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;

      if (openWhenEmpty) {
        var dataObj = {};
        this.editRows = [{
          components: this.createRowComponents(dataObj, 0),
          data: dataObj,
          state: EditRowState.New,
          backup: null,
          error: null
        }];

        if (this.inlineEditMode) {
          this.dataValue.push(dataObj);
        }
      } else {
        this.editRows = dataValue.map(function (row, rowIndex) {
          return {
            components: _this2.createRowComponents(row, rowIndex),
            data: row,
            state: EditRowState.Saved,
            backup: null,
            error: null
          };
        });
      }

      this.checkData();
    }
  }, {
    key: "isOpen",
    value: function isOpen(editRow) {
      return [EditRowState.New, EditRowState.Editing].includes(editRow.state);
    }
  }, {
    key: "render",
    value: function render(children) {
      var _this3 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this);
      }

      var dataValue = this.dataValue || [];
      var headerTemplate = _utils.Evaluator.noeval ? _templates.default.header : _lodash.default.get(this.component, 'templates.header');
      return _get(_getPrototypeOf(EditGridComponent.prototype), "render", this).call(this, children || this.renderTemplate('editgrid', {
        ref: {
          row: this.rowRef,
          addRow: this.addRowRef,
          saveRow: this.saveRowRef,
          cancelRow: this.cancelRowRef
        },
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
          return _this3.isOpen(row);
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
          _this4 = this;

      if (this.builderMode) {
        return _get(_getPrototypeOf(EditGridComponent.prototype), "attach", this).call(this, element);
      }

      this.loadRefs(element, (_this$loadRefs = {}, _defineProperty(_this$loadRefs, this.addRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.saveRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.cancelRowRef, 'multiple'), _defineProperty(_this$loadRefs, this.rowRef, 'multiple'), _this$loadRefs));
      this.addRowElements.forEach(function (addButton) {
        _this4.addEventListener(addButton, 'click', function () {
          return _this4.addRow();
        });
      });
      var openRowCount = 0;
      this.rowElements.forEach(function (row, rowIndex) {
        var editRow = _this4.editRows[rowIndex];

        if (_this4.isOpen(editRow)) {
          _this4.attachComponents(row, editRow.components);

          _this4.addEventListener(_this4.saveRowElements[openRowCount], 'click', function () {
            return _this4.saveRow(rowIndex);
          });

          _this4.addEventListener(_this4.cancelRowElements[openRowCount], 'click', function () {
            return _this4.cancelRow(rowIndex);
          });

          openRowCount++;
        } else {
          // Attach edit and remove button events.
          [{
            className: 'removeRow',
            event: 'click',
            action: function action() {
              return _this4.removeRow(rowIndex);
            }
          }, {
            className: 'editRow',
            event: 'click',
            action: function action() {
              _this4.editRow(rowIndex).then(function () {
                if (_this4.component.rowDrafts) {
                  _this4.validateRow(editRow, false);

                  if (_this4.component.modal && editRow.errors && !!editRow.errors.length) {
                    _this4.alert.showErrors(editRow.errors, false);
                  }
                }
              });
            }
          }].forEach(function (_ref) {
            var className = _ref.className,
                event = _ref.event,
                action = _ref.action;
            var elements = row.getElementsByClassName(className);
            Array.prototype.forEach.call(elements, function (element) {
              _this4.addEventListener(element, event, action);
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
      var _this5 = this;

      var flattened = {};
      Object.keys(dataValue).forEach(function (key) {
        if (_lodash.default.isObject(dataValue[key]) && !_lodash.default.isNil(dataValue[key])) {
          Object.assign(flattened, _this5.flattenRowDataValue(dataValue[key]));
        } else {
          flattened[key] = dataValue[key];
        }
      });
      return flattened;
    }
  }, {
    key: "renderRow",
    value: function renderRow(row, rowIndex) {
      var dataValue = this.dataValue || [];

      if (this.isOpen(row)) {
        return this.renderComponents(row.components);
      } else {
        var flattenedComponents = this.flattenComponents(rowIndex);
        var rowTemplate = _utils.Evaluator.noeval ? _templates.default.row : _lodash.default.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
        return this.renderString(rowTemplate, {
          row: dataValue[rowIndex] || {},
          data: this.data,
          rowIndex: rowIndex,
          components: this.component.components,
          flattenedComponents: flattenedComponents,
          getView: function getView(component, data) {
            var instance = flattenedComponents[component.key];
            var view = instance ? instance.getView(data || instance.dataValue) : '';

            if (instance && instance.widget && view !== '--- PROTECTED ---') {
              if (_lodash.default.isArray(view)) {
                view = view.map(function (value) {
                  return instance.widget.getValueAsString(value);
                });
              } else {
                view = instance.widget.getValueAsString(view);
              }
            }

            return view;
          },
          state: this.editRows[rowIndex].state
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
      var _this6 = this;

      this.getComponents().forEach(function (component) {
        return component.data = _this6.dataValue[component.rowIndex];
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
      var rowIndex = this.editRows.length;
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
      var _this7 = this;

      var modalContent = this.ce('div');
      var editRow = this.editRows[rowIndex];
      editRow.willBeSaved = false;
      var components = editRow.components;
      modalContent.innerHTML = this.renderComponents(components);
      var dialog = this.component.modal ? this.createModal(modalContent, {}, function () {
        return _this7.showDialog(rowIndex);
      }) : undefined;

      if (this.alert) {
        this.alert.clear();
        this.alert = null;
      }

      this.alert = new _Alert.default(dialog.refs.dialogContents, this);
      this.addEventListener(dialog, 'close', function () {
        if (!editRow.willBeSaved) {
          _this7.cancelRow(rowIndex);
        }

        if (_this7.alert) {
          _this7.alert.clear();

          _this7.alert = null;
        }
      });
      dialog.refs.dialogContents.appendChild(this.ce('button', {
        class: 'btn btn-primary',
        onClick: function onClick() {
          if (_this7.validateRow(editRow, true) || _this7.component.rowDrafts) {
            editRow.willBeSaved = true;
            dialog.close();

            _this7.saveRow(rowIndex);
          } else {
            _this7.alert.showErrors(editRow.errors, false);
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
      return promise;
    }
  }, {
    key: "editRow",
    value: function editRow(rowIndex) {
      var editRow = this.editRows[rowIndex];
      var isAlreadyEditing = editRow.state === EditRowState.Editing || editRow.state === EditRowState.New;

      if (!editRow || isAlreadyEditing) {
        return;
      }

      editRow.prevState = editRow.state;

      if (!this.options.readOnly) {
        editRow.state = EditRowState.Editing;
      }

      var dataSnapshot = (0, _utils.fastCloneDeep)(editRow.data);

      if (this.inlineEditMode) {
        editRow.backup = dataSnapshot;
      } else {
        editRow.backup = editRow.data;
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

            if (!this.component.rowDrafts) {
              this.clearErrors(rowIndex);
            }

            break;
          }
      }

      this.checkValidity(null, true);
      this.redraw();

      if (this.component.rowDrafts) {
        this.checkValidity(this.data, false);
      }
    }
  }, {
    key: "saveRow",
    value: function saveRow(rowIndex) {
      var _this8 = this;

      var editRow = this.editRows[rowIndex];

      if (this.options.readOnly) {
        return;
      }

      var isRowValid = this.validateRow(editRow, true);

      if (!this.component.rowDrafts) {
        if (!isRowValid) {
          return false;
        }
      }

      if (this.saveEditMode) {
        var dataValue = this.dataValue || [];

        switch (editRow.state) {
          case EditRowState.New:
            {
              var newIndex = dataValue.length;
              dataValue.push(editRow.data);

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
      this.triggerChange();

      if (this.component.rowDrafts) {
        editRow.components.forEach(function (comp) {
          return comp.setPristine(_this8.pristine);
        });
      }

      this.checkValidity(null, true);
      this.redraw();
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
      var _this9 = this;

      this.editRows.slice(rowIndex).forEach(function (row, index) {
        _this9.updateComponentsRowIndex(row.components, index);
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
    value: function removeRow(rowIndex) {
      if (this.options.readOnly) {
        return;
      }

      this.baseRemoveRow(rowIndex);
      this.splice(rowIndex);
      this.editRows.splice(rowIndex, 1);
      this.updateRowsComponents(rowIndex);
      this.updateValue();
      this.triggerChange();
      this.checkValidity(null, true);
      this.checkData();
      this.redraw();
    }
  }, {
    key: "createRowComponents",
    value: function createRowComponents(row, rowIndex) {
      var _this10 = this;

      return this.component.components.map(function (col, colIndex) {
        var column = _lodash.default.clone(col);

        var options = _lodash.default.clone(_this10.options);

        options.name += "[".concat(rowIndex, "]");
        options.row = "".concat(rowIndex, "-").concat(colIndex);

        options.onChange = function (flags, changed, modified) {
          var editRow = _this10.editRows[rowIndex];

          if (_this10.inlineEditMode) {
            _this10.triggerRootChange(flags, changed, modified);
          } else if (editRow) {
            _this10.checkRow('checkData', null, _objectSpread(_objectSpread({}, flags), {}, {
              changed: changed
            }), editRow.data, editRow.components);
          }
        };

        var comp = _this10.createComponent(_lodash.default.assign({}, column, {
          row: options.row
        }), options, row);

        comp.rowIndex = rowIndex;
        return comp;
      });
    }
  }, {
    key: "hasOpenRows",
    value: function hasOpenRows() {
      var _this11 = this;

      return this.editRows.some(function (row) {
        return _this11.isOpen(row);
      });
    }
  }, {
    key: "validateRow",
    value: function validateRow(editRow, dirty) {
      var _this12 = this;

      var valid = true;

      var errorsSnapshot = _toConsumableArray(this.errors);

      if (editRow.state === EditRowState.Editing || dirty || editRow.state === EditRowState.Draft && !this.pristine && !this.root.pristine && !this.hasOpenRows()) {
        editRow.components.forEach(function (comp) {
          if (!_this12.component.rowDrafts) {
            comp.setPristine(!dirty);
          }

          valid &= comp.checkValidity(null, dirty, editRow.data);
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
      return !!valid;
    }
  }, {
    key: "checkValidity",
    value: function checkValidity(data, dirty, row) {
      data = data || this.rootValue;
      row = row || this.data;

      if (!this.checkCondition(row, data)) {
        this.setCustomValidity('');
        return true;
      }

      return this.checkComponentValidity(data, dirty, row);
    }
  }, {
    key: "checkComponentValidity",
    value: function checkComponentValidity(data, dirty, row) {
      var _this13 = this;

      if (!_get(_getPrototypeOf(EditGridComponent.prototype), "checkComponentValidity", this).call(this, data, dirty, row)) {
        return false;
      }

      if (this.shouldSkipValidation(data, dirty, row)) {
        return true;
      }

      var rowsValid = true;
      var rowsEditing = false;
      this.editRows.forEach(function (editRow, index) {
        // Trigger all errors on the row.
        var rowValid = _this13.validateRow(editRow, dirty);

        rowsValid &= rowValid;

        var rowRefs = _this13.refs["editgrid-".concat(_this13.component.key, "-row")];

        if (rowRefs) {
          var rowContainer = rowRefs[index];

          if (rowContainer) {
            var errorContainer = rowContainer.querySelector('.editgrid-row-error');

            if (!rowValid) {
              errorContainer.textContent = 'Invalid row. Please correct it or delete.';
            }
          }
        } // If this is a dirty check, and any rows are still editing, we need to throw validation error.


        rowsEditing |= dirty && _this13.isOpen(editRow);
      });

      if (!rowsValid) {
        this.setCustomValidity('Please correct invalid rows before proceeding.', dirty);
        return false;
      } else if (rowsEditing && this.saveEditMode) {
        this.setCustomValidity('Please save all rows before proceeding.', dirty);
        return false;
      }

      var message = this.invalid || this.invalidMessage(data, dirty);
      this.setCustomValidity(message, dirty);
      return true;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      var _this14 = this;

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
      this.dataValue = value; // Refresh editRow data when data changes.

      this.dataValue.forEach(function (row, rowIndex) {
        var editRow = _this14.editRows[rowIndex];

        if (editRow) {
          editRow.data = row;

          _this14.restoreRowContext(editRow, flags);

          editRow.state = EditRowState.Saved;
          editRow.backup = null;
          editRow.error = null;
        } else {
          _this14.editRows[rowIndex] = {
            components: _this14.createRowComponents(row, rowIndex),
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
        return _this14.baseRemoveRow(dataLength + index);
      });
      this.editRows = this.editRows.slice(0, dataLength);
      this.updateOnChange(flags, changed);
      this.checkData();

      if (changed || flags.resetValue) {
        this.rebuild();
      }

      return changed;
    }
  }, {
    key: "restoreRowContext",
    value: function restoreRowContext(editRow) {
      var _this15 = this;

      var flags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      editRow.components.forEach(function (component) {
        component.data = editRow.data;

        _this15.setNestedValue(component, editRow.data, flags);
      });
    }
  }]);

  return EditGridComponent;
}(_NestedArrayComponent2.default);

exports.default = EditGridComponent;
EditGridComponent.prototype.hasChanged = _Component.default.prototype.hasChanged;