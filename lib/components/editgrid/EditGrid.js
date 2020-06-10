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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import _ from 'lodash';
import NestedArrayComponent from '../_classes/nestedarray/NestedArrayComponent';
import Component from '../_classes/component/Component';
import { fastCloneDeep, Evaluator } from '../../utils/utils';
import templates from './templates';
var EditRowState = {
    New: 'new',
    Editing: 'editing',
    Saved: 'saved',
    Removed: 'removed',
};
var EditGridComponent = /** @class */ (function (_super) {
    __extends(EditGridComponent, _super);
    function EditGridComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.type = 'editgrid';
        return _this;
    }
    EditGridComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedArrayComponent.schema.apply(NestedArrayComponent, __spreadArrays([{
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
                // TODO: revisit solution with 'lazyComponentsInstantiation'.
                lazyComponentsInstantiation: false,
                components: [],
                inlineEdit: false,
                templates: {
                    header: EditGridComponent.defaultHeaderTemplate,
                    row: EditGridComponent.defaultRowTemplate,
                    footer: '',
                },
            }], extend));
    };
    Object.defineProperty(EditGridComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Edit Grid',
                icon: 'tasks',
                group: 'data',
                documentation: 'http://help.form.io/userguide/#editgrid',
                weight: 30,
                schema: EditGridComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultHeaderTemplate", {
        get: function () {
            return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">{{ component.label }}</div>\n  {% }) %}\n</div>";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent, "defaultRowTemplate", {
        get: function () {
            return "<div class=\"row\">\n  {% util.eachComponent(components, function(component) { %}\n    <div class=\"col-sm-2\">\n      {{ getView(component, row[component.key]) }}\n    </div>\n  {% }) %}\n  {% if (!instance.options.readOnly && !instance.originalComponent.disabled) { %}\n    <div class=\"col-sm-2\">\n      <div class=\"btn-group pull-right\">\n        <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n        {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n          <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n        {% } %}\n      </div>\n    </div>\n  {% } %}\n</div>";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "defaultSchema", {
        get: function () {
            return EditGridComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "emptyValue", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "editgridKey", {
        get: function () {
            return "editgrid-" + this.key;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowRef", {
        get: function () {
            return this.editgridKey + "-row";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "rowElements", {
        get: function () {
            return this.refs[this.rowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "addRowRef", {
        get: function () {
            return this.editgridKey + "-addRow";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "addRowElements", {
        get: function () {
            return this.refs[this.addRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveRowRef", {
        get: function () {
            return this.editgridKey + "-saveRow";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveRowElements", {
        get: function () {
            return this.refs[this.saveRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "cancelRowRef", {
        get: function () {
            return this.editgridKey + "-cancelRow";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "cancelRowElements", {
        get: function () {
            return this.refs[this.cancelRowRef];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "inlineEditMode", {
        get: function () {
            return this.component.inlineEdit;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "saveEditMode", {
        get: function () {
            return !this.inlineEditMode;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "minLength", {
        get: function () {
            return _.get(this.component, 'validate.minLength', 0);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
            var data = this.dataValue;
            (this.editRows || []).forEach(function (row, index) {
                var rowData = data[index];
                row.data = rowData;
                row.components.forEach(function (component) {
                    component.data = rowData;
                });
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EditGridComponent.prototype, "iteratableRows", {
        get: function () {
            return this.editRows;
        },
        enumerable: false,
        configurable: true
    });
    EditGridComponent.prototype.hasRemoveButtons = function () {
        return !this.component.disableAddingRemovingRows &&
            !this.options.readOnly &&
            !this.disabled &&
            this.fullMode &&
            (this.dataValue.length > _.get(this.component, 'validate.minLength', 0));
    };
    Object.defineProperty(EditGridComponent.prototype, "lazyComponentsInstantiation", {
        get: function () {
            var _a;
            return (_a = this.component.lazyComponentsInstantiation) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    EditGridComponent.prototype.init = function () {
        var _this = this;
        if (this.builderMode) {
            this.editRows = [];
            return _super.prototype.init.call(this);
        }
        this.components = this.components || [];
        var dataValue = this.dataValue || [];
        var openWhenEmpty = !dataValue.length && this.component.openWhenEmpty;
        if (openWhenEmpty) {
            var dataObj = {};
            this.editRows = [
                {
                    components: this.createRowComponents(dataObj, 0),
                    data: dataObj,
                    state: EditRowState.New,
                    backup: null,
                    error: null,
                },
            ];
            if (this.inlineEditMode) {
                this.dataValue.push(dataObj);
            }
        }
        else {
            this.editRows = dataValue.map(function (row, rowIndex) { return ({
                components: _this.lazyComponentsInstantiation ? [] : _this.createRowComponents(row, rowIndex),
                data: row,
                state: EditRowState.Saved,
                backup: null,
                error: null,
            }); });
        }
        this.checkData();
    };
    EditGridComponent.prototype.isOpen = function (editRow) {
        return [EditRowState.New, EditRowState.Editing].includes(editRow.state);
    };
    EditGridComponent.prototype.render = function (children) {
        var _this = this;
        if (this.builderMode) {
            return _super.prototype.render.call(this);
        }
        var dataValue = this.dataValue || [];
        var headerTemplate = Evaluator.noeval ? templates.header : _.get(this.component, 'templates.header');
        return _super.prototype.render.call(this, children || this.renderTemplate('editgrid', {
            ref: {
                row: this.rowRef,
                addRow: this.addRowRef,
                saveRow: this.saveRowRef,
                cancelRow: this.cancelRowRef,
            },
            header: this.renderString(headerTemplate, {
                components: this.component.components,
                value: dataValue,
            }),
            footer: this.renderString(_.get(this.component, 'templates.footer'), {
                components: this.component.components,
                value: dataValue,
            }),
            rows: this.editRows.map(this.renderRow.bind(this)),
            openRows: this.editRows.map(function (row) { return _this.isOpen(row); }),
            errors: this.editRows.map(function (row) { return row.error; }),
            hasAddButton: this.hasAddButton(),
            hasRemoveButtons: this.hasRemoveButtons(),
        }));
    };
    EditGridComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        if (this.builderMode) {
            return _super.prototype.attach.call(this, element);
        }
        this.loadRefs(element, (_a = {},
            _a[this.addRowRef] = 'multiple',
            _a[this.saveRowRef] = 'multiple',
            _a[this.cancelRowRef] = 'multiple',
            _a[this.rowRef] = 'multiple',
            _a));
        this.addRowElements.forEach(function (addButton) {
            _this.addEventListener(addButton, 'click', function () { return _this.addRow(); });
        });
        var openRowCount = 0;
        this.rowElements.forEach(function (row, rowIndex) {
            var editRow = _this.editRows[rowIndex];
            if (_this.isOpen(editRow)) {
                _this.attachComponents(row, editRow.components);
                _this.addEventListener(_this.saveRowElements[openRowCount], 'click', function () { return _this.saveRow(rowIndex); });
                _this.addEventListener(_this.cancelRowElements[openRowCount], 'click', function () { return _this.cancelRow(rowIndex); });
                openRowCount++;
            }
            else {
                // Attach edit and remove button events.
                [
                    {
                        className: 'cloneRow',
                        event: 'click',
                        action: function () { return _this.cloneRow(rowIndex); },
                    },
                    {
                        className: 'removeRow',
                        event: 'click',
                        action: function () { return _this.removeRow(rowIndex); },
                    },
                    {
                        className: 'editRow',
                        event: 'click',
                        action: function () { return _this.editRow(rowIndex); },
                    },
                ].forEach(function (_a) {
                    var className = _a.className, event = _a.event, action = _a.action;
                    var elements = row.getElementsByClassName(className);
                    Array.prototype.forEach.call(elements, function (element) {
                        _this.addEventListener(element, event, action);
                    });
                });
            }
        });
        // Add open class to the element if any edit grid row is open
        if (openRowCount) {
            this.addClass(this.refs.component, "formio-component-" + this.component.type + "-row-open");
        }
        else {
            this.removeClass(this.refs.component, "formio-component-" + this.component.type + "-row-open");
        }
        return _super.prototype.attach.call(this, element);
    };
    EditGridComponent.prototype.renderRow = function (row, rowIndex) {
        var dataValue = this.dataValue || [];
        if (this.isOpen(row)) {
            return this.renderComponents(row.components);
        }
        else {
            var flattenedComponents_1 = this.flattenComponents(rowIndex);
            var rowTemplate = Evaluator.noeval ? templates.row : _.get(this.component, 'templates.row', EditGridComponent.defaultRowTemplate);
            return this.renderString(rowTemplate, {
                row: dataValue[rowIndex] || {},
                data: this.data,
                rowIndex: rowIndex,
                components: this.component.components,
                flattenedComponents: flattenedComponents_1,
                getView: function (component, data) {
                    var instance = flattenedComponents_1[component.key];
                    var view = instance ? instance.getView(data) : '';
                    if (instance && instance.widget && (view !== '--- PROTECTED ---')) {
                        if (_.isArray(view)) {
                            view = view.map(function (value) { return instance.widget.getValueAsString(value); });
                        }
                        else {
                            view = instance.widget.getValueAsString(view);
                        }
                    }
                    return view;
                },
            });
        }
    };
    EditGridComponent.prototype.flattenComponents = function (rowIndex) {
        var result = {};
        this.everyComponent(function (component) {
            result[component.component.flattenAs || component.key] = component;
        }, rowIndex);
        return result;
    };
    EditGridComponent.prototype.getComponents = function (rowIndex) {
        // Ensure editrows is set.
        this.editRows = this.editRows || [];
        return this.builderMode
            ? _super.prototype.getComponents.call(this)
            : _.isNumber(rowIndex)
                ? (this.editRows[rowIndex].components || [])
                : this.editRows.reduce(function (result, row) { return result.concat(row.components || []); }, []);
    };
    EditGridComponent.prototype.destroyComponents = function (rowIndex) {
        if (this.builderMode) {
            return _super.prototype.destroyComponents.call(this);
        }
        var components = this.getComponents(rowIndex).slice();
        components.forEach(function (comp) { return comp.destroy(); });
    };
    EditGridComponent.prototype.addRow = function (data) {
        if (data === void 0) { data = {}; }
        if (this.options.readOnly) {
            return;
        }
        var rowIndex = this.editRows.length;
        var editRow = {
            components: this.createRowComponents(data, rowIndex),
            data: data,
            state: EditRowState.New,
            backup: null,
            error: null,
        };
        this.editRows.push(editRow);
        if (this.inlineEditMode) {
            this.dataValue.push(data);
            this.triggerChange();
        }
        this.emit('editGridAddRow', {
            component: this.component,
            row: editRow,
        });
        this.checkRow('checkData', null, {}, editRow.data, editRow.components);
        if (this.component.modal) {
            this.addRowModal(rowIndex);
        }
        else {
            this.redraw();
        }
        return editRow;
    };
    EditGridComponent.prototype.cloneRow = function (rowIndex) {
        var clonedRow = this.editRows[rowIndex];
        var data = _.cloneDeep(clonedRow.data);
        return this.addRow(data);
    };
    EditGridComponent.prototype.addRowModal = function (rowIndex) {
        var _this = this;
        var modalContent = this.ce('div');
        var editRow = this.editRows[rowIndex];
        var components = editRow.components;
        modalContent.innerHTML = this.renderComponents(components);
        var dialog = this.component.modal ? this.createModal(modalContent) : undefined;
        dialog.refs.dialogContents.appendChild(this.ce('button', {
            class: 'btn btn-primary',
            onClick: function () {
                if (_this.validateRow(editRow, true)) {
                    dialog.close();
                    _this.saveRow(rowIndex);
                }
            },
        }, this.component.saveRow || 'Save'));
        return this.attachComponents(modalContent, components);
    };
    EditGridComponent.prototype.editRow = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        editRow.state = EditRowState.Editing;
        if (this.lazyComponentsInstantiation && (editRow.components.length === 0)) {
            editRow.components = this.createRowComponents(editRow.data, rowIndex);
        }
        var dataSnapshot = fastCloneDeep(editRow.data);
        if (this.inlineEditMode) {
            editRow.backup = dataSnapshot;
        }
        else {
            editRow.backup = editRow.data;
            editRow.data = dataSnapshot;
            this.restoreRowContext(editRow);
        }
        if (this.component.modal) {
            return this.addRowModal(rowIndex);
        }
        return this.redraw();
    };
    EditGridComponent.prototype.clearErrors = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        if (editRow && Array.isArray(editRow.components)) {
            editRow.components.forEach(function (comp) {
                comp.setPristine(true);
                comp.setCustomValidity('');
            });
        }
    };
    EditGridComponent.prototype.cancelRow = function (rowIndex) {
        if (this.options.readOnly) {
            return;
        }
        var editRow = this.editRows[rowIndex];
        switch (editRow.state) {
            case EditRowState.New: {
                editRow.state = EditRowState.Removed;
                this.clearErrors(rowIndex);
                this.destroyComponents(rowIndex);
                if (this.inlineEditMode) {
                    this.splice(rowIndex);
                }
                this.editRows.splice(rowIndex, 1);
                break;
            }
            case EditRowState.Editing: {
                editRow.state = EditRowState.Saved;
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
        this.checkValidity(null, true);
        this.redraw();
    };
    EditGridComponent.prototype.saveRow = function (rowIndex) {
        if (this.options.readOnly) {
            return;
        }
        var editRow = this.editRows[rowIndex];
        if (!this.validateRow(editRow, true)) {
            return false;
        }
        if (this.saveEditMode) {
            var dataValue = this.dataValue || [];
            switch (editRow.state) {
                case EditRowState.New: {
                    var newIndex = dataValue.length;
                    dataValue.push(editRow.data);
                    if (rowIndex !== newIndex) {
                        this.editRows.splice(rowIndex, 1);
                        this.editRows.splice(newIndex, 0, editRow);
                    }
                    break;
                }
                case EditRowState.Editing: {
                    dataValue[rowIndex] = editRow.data;
                    break;
                }
            }
        }
        editRow.state = EditRowState.Saved;
        editRow.backup = null;
        this.updateValue();
        this.triggerChange();
        this.checkValidity(null, true);
        this.redraw();
        return true;
    };
    EditGridComponent.prototype.updateComponentsRowIndex = function (components, rowIndex) {
        components.forEach(function (component, colIndex) {
            component.rowIndex = rowIndex;
            component.row = rowIndex + "-" + colIndex;
        });
    };
    EditGridComponent.prototype.updateRowsComponents = function (rowIndex) {
        var _this = this;
        this.editRows.slice(rowIndex).forEach(function (row, index) {
            _this.updateComponentsRowIndex(row.components, index);
        });
    };
    EditGridComponent.prototype.baseRemoveRow = function (rowIndex) {
        var editRow = this.editRows[rowIndex];
        editRow.state = EditRowState.Removed;
        this.destroyComponents(rowIndex);
        return editRow;
    };
    EditGridComponent.prototype.removeRow = function (rowIndex) {
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
    };
    EditGridComponent.prototype.createRowComponents = function (row, rowIndex) {
        var _this = this;
        return this.component.components.map(function (col, colIndex) {
            var column = _.clone(col);
            var options = _.clone(_this.options);
            options.name += "[" + rowIndex + "]";
            options.row = rowIndex + "-" + colIndex;
            options.onChange = function (flags, changed, modified) {
                var editRow = _this.editRows[rowIndex];
                if (_this.inlineEditMode) {
                    _this.triggerRootChange(flags, changed, modified);
                }
                else if (editRow) {
                    _this.checkRow('checkData', null, {
                        changed: changed,
                    }, editRow.data, editRow.components);
                }
            };
            var comp = _this.createComponent(_.assign({}, column, {
                row: options.row,
            }), options, row);
            comp.rowIndex = rowIndex;
            return comp;
        });
    };
    EditGridComponent.prototype.validateRow = function (editRow, dirty) {
        var valid = true;
        if (editRow.state === EditRowState.Editing || dirty) {
            editRow.components.forEach(function (comp) {
                comp.setPristine(!dirty);
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
            }
            else {
                editRow.error = null;
            }
            if (valid === null) {
                valid = "Invalid row validation for " + this.key;
            }
        }
        return !!valid;
    };
    EditGridComponent.prototype.checkValidity = function (data, dirty, row) {
        data = data || this.rootValue;
        row = row || this.data;
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        return this.checkComponentValidity(data, dirty, row);
    };
    EditGridComponent.prototype.checkComponentValidity = function (data, dirty, row) {
        var _this = this;
        if (!_super.prototype.checkComponentValidity.call(this, data, dirty, row)) {
            return false;
        }
        var rowsValid = true;
        var rowsEditing = false;
        this.editRows.forEach(function (editRow) {
            // Trigger all errors on the row.
            var rowValid = _this.validateRow(editRow, dirty);
            rowsValid &= rowValid;
            // If this is a dirty check, and any rows are still editing, we need to throw validation error.
            rowsEditing |= (dirty && _this.isOpen(editRow));
        });
        if (!rowsValid) {
            this.setCustomValidity('Please correct rows before proceeding.', dirty);
            return false;
        }
        else if (rowsEditing && this.saveEditMode) {
            this.setCustomValidity('Please save all rows before proceeding.', dirty);
            return false;
        }
        var message = this.invalid || this.invalidMessage(data, dirty);
        this.setCustomValidity(message, dirty);
        return true;
    };
    Object.defineProperty(EditGridComponent.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            var defaultValue = Array.isArray(value) ? value : [];
            _.times(this.minLength - defaultValue.length, function () { return defaultValue.push({}); });
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    EditGridComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            value = this.defaultValue;
        }
        if (!Array.isArray(value)) {
            if (typeof value === 'object') {
                value = [value];
            }
            else {
                return false;
            }
        }
        var changed = this.hasChanged(value, this.dataValue);
        this.dataValue = value;
        // Refresh editRow data when data changes.
        this.dataValue.forEach(function (row, rowIndex) {
            var editRow = _this.editRows[rowIndex];
            if (editRow) {
                editRow.data = row;
                _this.restoreRowContext(editRow, flags);
                editRow.state = EditRowState.Saved;
                editRow.backup = null;
                editRow.error = null;
            }
            else {
                _this.editRows[rowIndex] = {
                    components: _this.lazyComponentsInstantiation ? [] : _this.createRowComponents(row, rowIndex),
                    data: row,
                    state: EditRowState.Saved,
                    backup: null,
                    error: null,
                };
            }
        });
        var dataLength = this.dataValue.length;
        // If the last row is a new row, then do not remove it.
        if (this.editRows[dataLength] && (this.editRows[dataLength].state === EditRowState.New)) {
            dataLength = (dataLength + 1);
        }
        this.editRows.slice(dataLength).forEach(function (editRow, index) { return _this.baseRemoveRow(dataLength + index); });
        this.editRows = this.editRows.slice(0, dataLength);
        this.updateOnChange(flags, changed);
        this.checkData();
        if (changed) {
            this.rebuild();
        }
        return changed;
    };
    EditGridComponent.prototype.restoreRowContext = function (editRow, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        editRow.components.forEach(function (component) {
            component.data = editRow.data;
            _this.setNestedValue(component, editRow.data, flags);
        });
    };
    return EditGridComponent;
}(NestedArrayComponent));
export default EditGridComponent;
EditGridComponent.prototype.hasChanged = Component.prototype.hasChanged;
