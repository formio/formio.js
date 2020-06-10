var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
// Import from "dist" because it would require and "global" would not be defined in Angular apps.
import dragula from 'dragula/dist/dragula';
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';
import { fastCloneDeep } from '../../utils/utils';
var DataGridComponent = /** @class */ (function (_super) {
    __extends(DataGridComponent, _super);
    function DataGridComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'datagrid';
        return _this;
    }
    DataGridComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedArrayComponent.schema.apply(NestedArrayComponent, __spreadArrays([{
                label: 'Data Grid',
                key: 'dataGrid',
                type: 'datagrid',
                clearOnHide: true,
                input: true,
                tree: true,
                components: []
            }], extend));
    };
    Object.defineProperty(DataGridComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Data Grid',
                icon: 'th',
                group: 'data',
                documentation: 'http://help.form.io/userguide/#datagrid',
                weight: 30,
                schema: DataGridComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    DataGridComponent.prototype.init = function () {
        this.components = this.components || [];
        // Add new values based on minLength.
        this.rows = [];
        this.createRows(true);
        this.visibleColumns = {};
        this.checkColumns();
    };
    Object.defineProperty(DataGridComponent.prototype, "dataValue", {
        get: function () {
            var dataValue = _super.prototype.dataValue;
            if (!dataValue || !Array.isArray(dataValue)) {
                return this.emptyValue;
            }
            return dataValue;
        },
        set: function (value) {
            _super.prototype.dataValue = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "defaultSchema", {
        get: function () {
            return DataGridComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "emptyValue", {
        get: function () {
            return [{}];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "addAnotherPosition", {
        get: function () {
            return _.get(this.component, 'addAnotherPosition', 'bottom');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "minLength", {
        get: function () {
            if (this.hasRowGroups()) {
                return _.sum(this.getGroupSizes());
            }
            else {
                return _.get(this.component, 'validate.minLength', 0);
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            var defaultValue;
            if (Array.isArray(value)) {
                defaultValue = value;
            }
            else if (value && (typeof value === 'object')) {
                defaultValue = [value];
            }
            else {
                defaultValue = this.emptyValue;
            }
            for (var dIndex = defaultValue.length; dIndex < this.minLength; dIndex++) {
                defaultValue.push({});
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            _.each(this.refs[this.datagridKey + "-addRow"], function (button) {
                button.disabled = disabled;
            });
            _.each(this.refs[this.datagridKey + "-removeRow"], function (button) {
                button.disabled = disabled;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "datagridKey", {
        get: function () {
            return "datagrid-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "allowReorder", {
        get: function () {
            return !this.options.readOnly && _.get(this.component, 'reorder', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataGridComponent.prototype, "iteratableRows", {
        get: function () {
            var _this = this;
            return this.rows.map(function (row, index) { return ({
                components: row,
                data: _this.dataValue[index],
            }); });
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Split rows into chunks.
     * @param {Number[]} groups - array of numbers where each item is size of group
     * @param {Array<T>} rows - rows collection
     * @return {Array<T[]>}
     */
    DataGridComponent.prototype.getRowChunks = function (groups, rows) {
        var _a = groups.reduce(function (_a, size) {
            var startIndex = _a[0], acc = _a[1];
            var endIndex = startIndex + size;
            return [endIndex, __spreadArrays(acc, [[startIndex, endIndex]])];
        }, [0, []]), chunks = _a[1];
        return chunks.map(function (range) { return _.slice.apply(_, __spreadArrays([rows], range)); });
    };
    /**
     * Create groups object.
     * Each key in object represents index of first row in group.
     * @return {Object}
     */
    DataGridComponent.prototype.getGroups = function () {
        var groups = _.get(this.component, 'rowGroups', []);
        var sizes = _.map(groups, 'numberOfRows').slice(0, -1);
        var indexes = sizes.reduce(function (groupIndexes, size) {
            var last = groupIndexes[groupIndexes.length - 1];
            return groupIndexes.concat(last + size);
        }, [0]);
        return groups.reduce(function (gidxs, group, idx) {
            var _a;
            return __assign(__assign({}, gidxs), (_a = {}, _a[indexes[idx]] = group, _a));
        }, {});
    };
    /**
     * Retrun group sizes.
     * @return {Number[]}
     */
    DataGridComponent.prototype.getGroupSizes = function () {
        return _.map(_.get(this.component, 'rowGroups', []), 'numberOfRows');
    };
    DataGridComponent.prototype.hasRowGroups = function () {
        return _.get(this, 'component.enableRowGroups', false) && !this.builderMode;
    };
    DataGridComponent.prototype.totalRowsNumber = function (groups) {
        return _.sum(_.map(groups, 'numberOfRows'));
    };
    DataGridComponent.prototype.setStaticValue = function (n) {
        this.dataValue = _.range(n).map(function () { return ({}); });
    };
    DataGridComponent.prototype.hasExtraColumn = function () {
        return (this.hasRemoveButtons() || this.canAddColumn);
    };
    DataGridComponent.prototype.hasRemoveButtons = function () {
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
    };
    DataGridComponent.prototype.hasTopSubmit = function () {
        return this.hasAddButton() && ['top', 'both'].includes(this.addAnotherPosition);
    };
    DataGridComponent.prototype.hasBottomSubmit = function () {
        return this.hasAddButton() && ['bottom', 'both'].includes(this.addAnotherPosition);
    };
    Object.defineProperty(DataGridComponent.prototype, "canAddColumn", {
        get: function () {
            return this.builderMode;
        },
        enumerable: false,
        configurable: true
    });
    DataGridComponent.prototype.render = function () {
        var columns = this.getColumns();
        return _super.prototype.render.call(this, this.renderTemplate('datagrid', {
            rows: this.getRows(),
            columns: columns,
            groups: this.hasRowGroups() ? this.getGroups() : [],
            visibleColumns: this.visibleColumns,
            hasToggle: _.get(this, 'component.groupToggle', false),
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
                position: this.componentComponents.length,
            }),
        }));
    };
    DataGridComponent.prototype.getRows = function () {
        return this.rows.map(function (row) {
            var components = {};
            _.each(row, function (col, key) {
                components[key] = col.render();
            });
            return components;
        });
    };
    DataGridComponent.prototype.getColumns = function () {
        var _this = this;
        return this.component.components.filter(function (comp) {
            return (!_this.visibleColumns.hasOwnProperty(comp.key) || _this.visibleColumns[comp.key]);
        });
    };
    DataGridComponent.prototype.hasHeader = function () {
        return this.component.components.reduce(function (hasHeader, col) {
            // If any of the components has a title and it isn't hidden, display the header.
            return hasHeader || ((col.label || col.title) && !col.hideLabel);
        }, false);
    };
    DataGridComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {},
            _a[this.datagridKey + "-row"] = 'multiple',
            _a[this.datagridKey + "-tbody"] = 'single',
            _a[this.datagridKey + "-addRow"] = 'multiple',
            _a[this.datagridKey + "-removeRow"] = 'multiple',
            _a[this.datagridKey + "-group-header"] = 'multiple',
            _a[this.datagridKey] = 'multiple',
            _a));
        if (this.allowReorder) {
            this.refs[this.datagridKey + "-row"].forEach(function (row, index) {
                row.dragInfo = { index: index };
            });
            this.dragula = dragula([this.refs[this.datagridKey + "-tbody"]], {
                moves: function (_draggedElement, _oldParent, clickedElement) { return clickedElement.classList.contains('formio-drag-button'); }
            }).on('drop', this.onReorder.bind(this));
        }
        this.refs[this.datagridKey + "-addRow"].forEach(function (addButton) {
            _this.addEventListener(addButton, 'click', _this.addRow.bind(_this));
        });
        this.refs[this.datagridKey + "-removeRow"].forEach(function (removeButton, index) {
            _this.addEventListener(removeButton, 'click', _this.removeRow.bind(_this, index));
        });
        if (this.hasRowGroups()) {
            this.refs.chunks = this.getRowChunks(this.getGroupSizes(), this.refs[this.datagridKey + "-row"]);
            this.refs[this.datagridKey + "-group-header"].forEach(function (header, index) {
                _this.addEventListener(header, 'click', function () { return _this.toggleGroup(header, index); });
            });
        }
        var columns = this.getColumns();
        var rowLength = columns.length;
        this.rows.forEach(function (row, rowIndex) {
            var columnIndex = 0;
            columns.forEach(function (col) {
                _this.attachComponents(_this.refs[_this.datagridKey][(rowIndex * rowLength) + columnIndex], [_this.rows[rowIndex][col.key]], _this.component.components);
                columnIndex++;
            });
        });
        return _super.prototype.attach.call(this, element);
    };
    DataGridComponent.prototype.onReorder = function (element, _target, _source, sibling) {
        if (!element.dragInfo || (sibling && !sibling.dragInfo)) {
            console.warn('There is no Drag Info available for either dragged or sibling element');
            return;
        }
        var oldPosition = element.dragInfo.index;
        //should drop at next sibling position; no next sibling means drop to last position
        var newPosition = sibling ? sibling.dragInfo.index : this.dataValue.length;
        var movedBelow = newPosition > oldPosition;
        var dataValue = fastCloneDeep(this.dataValue);
        var draggedRowData = dataValue[oldPosition];
        //insert element at new position
        dataValue.splice(newPosition, 0, draggedRowData);
        //remove element from old position (if was moved above, after insertion it's at +1 index)
        dataValue.splice(movedBelow ? oldPosition : oldPosition + 1, 1);
        //need to re-build rows to re-calculate indexes and other indexed fields for component instance (like rows for ex.)
        this.setValue(dataValue);
        this.redraw();
    };
    DataGridComponent.prototype.addRow = function () {
        var index = this.rows.length;
        // Handle length mismatch between rows and dataValue
        if (this.dataValue.length === index) {
            this.dataValue.push({});
        }
        this.rows[index] = this.createRowComponents(this.dataValue[index], index);
        this.checkConditions();
        this.redraw();
    };
    DataGridComponent.prototype.removeRow = function (index) {
        var _this = this;
        this.splice(index);
        var row = this.rows.splice(index, 1)[0];
        _.each(row, function (component) { return _this.removeComponent(component); });
        this.redraw();
    };
    DataGridComponent.prototype.getRowValues = function () {
        return this.dataValue;
    };
    DataGridComponent.prototype.setRowComponentsData = function (rowIndex, rowData) {
        _.each(this.rows[rowIndex], function (component) {
            component.data = rowData;
        });
    };
    DataGridComponent.prototype.createRows = function (init) {
        var _this = this;
        var added = false;
        var rowValues = this.getRowValues();
        // Create any missing rows.
        rowValues.forEach(function (row, index) {
            if (_this.rows[index]) {
                _this.setRowComponentsData(index, row);
            }
            else {
                _this.rows[index] = _this.createRowComponents(row, index);
                added = true;
            }
        });
        // Delete any extra rows.
        var removed = !!this.rows.splice(rowValues.length).length;
        if (!init && (added || removed)) {
            this.redraw();
        }
        return added;
    };
    DataGridComponent.prototype.createRowComponents = function (row, rowIndex) {
        var _this = this;
        var components = {};
        this.component.components.map(function (col, colIndex) {
            var options = _.clone(_this.options);
            options.name += "[" + rowIndex + "]";
            options.row = rowIndex + "-" + colIndex;
            var component = _this.createComponent(col, options, row);
            component.parentDisabled = !!_this.disabled;
            component.rowIndex = rowIndex;
            component.inDataGrid = true;
            components[col.key] = component;
        });
        return components;
    };
    /**
     * Checks the validity of this datagrid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    DataGridComponent.prototype.checkValidity = function (data, dirty, row) {
        data = data || this.rootValue;
        row = row || this.data;
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        if (!this.checkComponentValidity(data, dirty, row)) {
            return false;
        }
        return this.checkRows('checkValidity', data, dirty, true);
    };
    DataGridComponent.prototype.checkColumns = function (data, flags) {
        if (flags === void 0) { flags = {}; }
        data = data || this.rootValue;
        var show = false;
        if (!this.rows || !this.rows.length) {
            return { rebuild: false, show: false };
        }
        if (this.builderMode) {
            return { rebuild: false, show: true };
        }
        var visibility = {};
        var dataValue = this.dataValue;
        this.rows.forEach(function (row, rowIndex) {
            _.each(row, function (col, key) {
                if (col && (typeof col.checkConditions === 'function')) {
                    visibility[key] = !!visibility[key] ||
                        (col.checkConditions(data, flags, dataValue[rowIndex]) && col.type !== 'hidden');
                }
            });
        });
        var rebuild = !_.isEqual(visibility, this.visibleColumns);
        _.each(visibility, function (col) {
            show |= col;
        });
        this.visibleColumns = visibility;
        return { rebuild: rebuild, show: show };
    };
    DataGridComponent.prototype.checkComponentConditions = function (data, flags, row) {
        // If table isn't visible, don't bother calculating columns.
        if (!_super.prototype.checkComponentConditions.call(this, data, flags, row)) {
            return false;
        }
        var _a = this.checkColumns(data, flags), rebuild = _a.rebuild, show = _a.show;
        // If a rebuild is needed, then rebuild the table.
        if (rebuild) {
            this.redraw();
        }
        // Return if this table should show.
        return show;
    };
    DataGridComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            this.dataValue = this.defaultValue;
            this.createRows();
            return false;
        }
        if (!Array.isArray(value)) {
            if (typeof value === 'object') {
                value = [value];
            }
            else {
                this.createRows();
                value = [{}];
            }
        }
        // Make sure we always have at least one row.
        // NOTE: Removing this will break "Public Configurations" in portal. ;)
        if (value && !value.length) {
            value.push({});
        }
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        this.createRows();
        this.rows.forEach(function (row, rowIndex) {
            if (value.length <= rowIndex) {
                return;
            }
            _.each(row, function (col) {
                col.rowIndex = rowIndex;
                _this.setNestedValue(col, value[rowIndex], flags);
            });
        });
        this.updateOnChange(flags, changed);
        return changed;
    };
    DataGridComponent.prototype.restoreComponentsContext = function () {
        var _this = this;
        this.rows.forEach(function (row, index) { return _.forIn(row, function (component) { return component.data = _this.dataValue[index]; }); });
    };
    DataGridComponent.prototype.getComponent = function (path, fn) {
        path = Array.isArray(path) ? path : [path];
        var key = path[0], remainingPath = path.slice(1);
        var result = [];
        if (_.isNumber(key) && remainingPath.length) {
            var compKey = remainingPath.pop();
            result = this.rows[key][compKey];
            if (result && _.isFunction(fn)) {
                fn(result, this.getComponents());
            }
            if (remainingPath.length && 'getComponent' in result) {
                return result.getComponent(remainingPath, fn);
            }
            return result;
        }
        if (!_.isString(key)) {
            return result;
        }
        this.everyComponent(function (component, components) {
            if (component.component.key === key) {
                var comp = component;
                if (remainingPath.length > 0 && 'getComponent' in component) {
                    comp = component.getComponent(remainingPath, fn);
                }
                else if (fn) {
                    fn(component, components);
                }
                result = result.concat(comp);
            }
        });
        return result;
    };
    DataGridComponent.prototype.toggleGroup = function (element, index) {
        element.classList.toggle('collapsed');
        _.each(this.refs.chunks[index], function (row) {
            row.classList.toggle('hidden');
        });
    };
    return DataGridComponent;
}(NestedArrayComponent));
export default DataGridComponent;
