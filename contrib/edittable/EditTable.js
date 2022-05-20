"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es.reflect.construct.js");

require("core-js/modules/es.reflect.get.js");

require("core-js/modules/es.object.get-own-property-descriptor.js");

require("core-js/modules/es.symbol.js");

require("core-js/modules/es.symbol.description.js");

require("core-js/modules/es.symbol.iterator.js");

require("core-js/modules/es.array.iterator.js");

require("core-js/modules/es.string.iterator.js");

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.function.name.js");

require("core-js/modules/es.array.from.js");

require("core-js/modules/es.regexp.exec.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.array.concat.js");

require("core-js/modules/es.array.filter.js");

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.array.map.js");

require("core-js/modules/es.array.join.js");

require("core-js/modules/web.dom-collections.for-each.js");

require("core-js/modules/es.array.slice.js");

require("core-js/modules/es.object.get-prototype-of.js");

var _lodash = _interopRequireDefault(require("lodash"));

var _DataGrid = _interopRequireDefault(require("../../components/datagrid/DataGrid"));

var _ModalEdit = _interopRequireDefault(require("../modaledit/ModalEdit"));

var _EditTable = _interopRequireDefault(require("./EditTable.form"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var EditTableComponent = /*#__PURE__*/function (_DataGridComponent) {
  _inherits(EditTableComponent, _DataGridComponent);

  var _super = _createSuper(EditTableComponent);

  function EditTableComponent() {
    var _this;

    _classCallCheck(this, EditTableComponent);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    var groups = _lodash.default.get(_this.component, 'rowGroups', []);

    if (_this.hasColumns()) {
      _this.component.components = _this.componentComponents;
    }

    if (_this.groupsMode) {
      _this.addEmptyRows(_this.totalRowsNumber(groups));
    }

    return _this;
  }
  /**
   * Checks whether columns are available
   * @return {Boolean}
   */


  _createClass(EditTableComponent, [{
    key: "hasColumns",
    value: function hasColumns() {
      return this.getColumns().length > 0;
    }
    /** Don't show last col in header **/

    /** @override **/

  }, {
    key: "hasExtraColumn",
    value: function hasExtraColumn() {
      return false;
    }
    /** @override **/

  }, {
    key: "hasAddButton",
    value: function hasAddButton() {
      return _get(_getPrototypeOf(EditTableComponent.prototype), "hasAddButton", this).call(this) && this.hasColumns();
    }
  }, {
    key: "componentSchema",
    value: function componentSchema() {
      for (var _len2 = arguments.length, extend = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        extend[_key2] = arguments[_key2];
      }

      return _ModalEdit.default.schema.apply(_ModalEdit.default, [{
        rows: 0,
        editor: 'ckeditor',
        hideLabel: true
      }].concat(extend));
    }
    /**
     * Returns all non-empty columns.
     *
     * @return {Array}
     */

  }, {
    key: "getColumns",
    value: function getColumns() {
      var _this2 = this;

      var cols = _lodash.default.get(this, 'component.columns', []);

      return _lodash.default.filter(_lodash.default.map(cols, function (c) {
        return _lodash.default.pick(c, ['label', 'key']);
      }), function (c) {
        return !_lodash.default.isEqual(c, _this2.emptyColumn);
      });
    }
  }, {
    key: "getGroups",
    value: function getGroups() {
      return _lodash.default.get(this.component, 'rowGroups', []);
    }
  }, {
    key: "totalRowsNumber",
    value: function totalRowsNumber(groups) {
      return _lodash.default.sum(_lodash.default.map(groups, 'numberOfRows'));
    }
  }, {
    key: "addEmptyRows",
    value: function addEmptyRows(n) {
      this.dataValue = _lodash.default.range(n).map(function () {
        return {};
      });
    }
  }, {
    key: "emptyColumn",
    get: function get() {
      return {
        label: '',
        key: ''
      };
    }
  }, {
    key: "componentComponents",
    get: function get() {
      var _this3 = this;

      return this.getColumns().map(function (_ref) {
        var label = _ref.label,
            key = _ref.key;
        return _this3.componentSchema({
          label: label,
          key: key
        });
      });
    }
  }, {
    key: "tableClass",
    get: function get() {
      var _this4 = this;

      var type = _lodash.default.get(this.component, 'type', 'edittable');

      var defaultClass = ['table', 'table-bordered', "table-".concat(type), 'form-group', "formio-".concat(type, "-table")].join(' ');

      var className = _lodash.default.get(this.component, 'tableClass');

      if (className === '' || !_lodash.default.isString(className)) {
        className = defaultClass;
      }

      ['striped', 'bordered', 'hover', 'condensed'].forEach(function (prop) {
        if (_this4.component[prop]) {
          className = "".concat(className, " table-").concat(prop);
        }
      });
      return className;
    }
  }, {
    key: "groupsMode",
    get: function get() {
      return _lodash.default.get(this.component, 'enableRowGroups', false);
    }
    /** @override **/

  }, {
    key: "build",
    value: function build() {
      var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _get(_getPrototypeOf(EditTableComponent.prototype), "build", this).call(this, state);

      this.tableElement.className = this.tableClass;

      if (this.builderMode && !this.hasColumns()) {
        this.element.appendChild(this.builderView());
      }

      this.setMeta();
    }
  }, {
    key: "buildRows",
    value: function buildRows() {
      _get(_getPrototypeOf(EditTableComponent.prototype), "buildRows", this).call(this);

      if (this.groupsMode) {
        this.buildGroups();
      }
    }
  }, {
    key: "buildGroups",
    value: function buildGroups() {
      var _this5 = this;

      var groups = _lodash.default.get(this.component, 'rowGroups', []);

      var ranges = _lodash.default.map(groups, 'numberOfRows');

      var rows = this.tableElement.querySelectorAll('tbody>tr');
      var tbody = this.tableElement.querySelector('tbody');
      var chunks = this.getRowChunks(ranges, rows);
      var firstElements = chunks.map(_lodash.default.head);
      var groupElements = groups.map(function (g) {
        return _this5.buildGroup(g);
      });
      groupElements.forEach(function (elt, index) {
        var row = firstElements[index];

        if (row) {
          tbody.insertBefore(elt, row);
        }
      });
    }
    /**
     * @param {Numbers[]} groups
     * @param {Array<T>} coll - collection
     *
     * @return {Array<T[]>}
     */

  }, {
    key: "getRowChunks",
    value: function getRowChunks(groups, coll) {
      var _groups$reduce = groups.reduce(function (_ref2, size) {
        var _ref3 = _slicedToArray(_ref2, 2),
            startIndex = _ref3[0],
            acc = _ref3[1];

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
    key: "buildGroup",
    value: function buildGroup(_ref4) {
      var label = _ref4.label;
      var colsNumber = this.getColumns().length;
      var cell = this.ce('td', {
        colspan: colsNumber,
        class: 'edittable-group-label'
      }, label);
      return this.ce('tr', null, cell);
    }
    /** @override **/

  }, {
    key: "buildRow",
    value: function buildRow(row, index) {
      var _this6 = this;

      var state = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (this.builderMode) {
        return null;
      }

      this.rows[index] = {};
      var colSchemes = this.componentComponents;
      var lastIndex = colSchemes.length - 1;
      var columns = colSchemes.map(function (col, colIndex) {
        var colContainer = _this6.buildComponent(col, colIndex, row, index, _this6.getComponentState(col, state));

        if (_this6.hasRemoveButtons() && colIndex === lastIndex) {
          colContainer.append(_this6.removeButton(index));
        }

        return colContainer;
      });
      return this.ce('tr', null, columns);
    }
    /** override **/

  }, {
    key: "removeButton",
    value: function removeButton(index) {
      var _this7 = this;

      var type = _lodash.default.get(this.component, 'type', 'edittable');

      var button = this.ce('button', {
        type: 'button',
        class: "btn btn-xxs btn-danger formio-".concat(type, "-remove")
      }, this.ce('i', {
        class: this.iconClass('remove')
      }));
      this.addEventListener(button, 'click', function (event) {
        event.preventDefault();

        _this7.removeValue(index);
      });
      return button;
    }
  }, {
    key: "builderView",
    value: function builderView() {
      return this.ce('div', {
        class: 'well edittable-placeholder'
      }, [this.ce('i', {
        class: this.iconClass('warning-sign')
      }), ' ', this.t('No columns provided')]);
    }
  }, {
    key: "getMeta",
    value: function getMeta() {
      var groups = this.getGroups();

      if (this.hasColumns && groups.length) {
        return groups.reduce(function (info, g) {
          info[g.label] = g.numberOfRows;
          return info;
        }, {});
      } else {
        return null;
      }
    }
  }, {
    key: "setMeta",
    value: function setMeta() {
      var key = _lodash.default.get(this.component, 'key');

      var data = this.getMeta();

      if (key && data) {
        _lodash.default.set(this.root, ['_submission', 'metadata', key], data);
      }
    }
  }], [{
    key: "schema",
    value: function schema() {
      for (var _len3 = arguments.length, extend = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        extend[_key3] = arguments[_key3];
      }

      return _DataGrid.default.schema.apply(_DataGrid.default, [{
        label: 'Edit Table',
        key: 'editTable',
        type: 'edittable',
        input: true,
        tree: true,
        components: [],
        columns: []
      }].concat(extend));
    }
  }, {
    key: "builderInfo",
    get: function get() {
      return {
        title: 'Edit Table',
        icon: 'th',
        group: 'data',
        weight: 50,
        schema: EditTableComponent.schema()
      };
    }
  }]);

  return EditTableComponent;
}(_DataGrid.default);

exports.default = EditTableComponent;
EditTableComponent.editForm = _EditTable.default;